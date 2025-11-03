import { showNotification } from "./notificationHandler.js";
import { getValidCacheData, saveCacheData, setCacheData } from "../utilities/cacheHandler.js";

// Función principal para fetch de datos
export async function dataFetcher(url = "https://pokeapi.co/api/v2/pokemon", multipleData = true) {
  try {
    const response = await fetch(url);
    
    //VERIFICAR STATUS HTTP
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const info = await response.json();
    const data = multipleData ? await allDataFetcher(info.results) : info;
    const nextPage = multipleData ? info.next : null;
    
    return { pokemons: data, nextPage: nextPage };
    
  } catch (error) {
    showNotification("❌ Error de conexión con la PokeAPI", "danger");
    console.error("❌ Error en dataFetcher:", {
      url: url,
      error: error.message,
      timestamp: new Date().toISOString()
    });
    
    //PROPAGAMOS EL ERROR PARA MANEJO EN CALLER
    throw error; 
  }
}

// Helper para fetch de datos de mútiples Pokemons
async function allDataFetcher(pokemonList, batchSize = 5, delayTime = 100) {
  const results = [];
  for (let i = 0; i < pokemonList.length; i += batchSize) { //recorrremos el array de pokemons, en grupos de batchSize
    const sliceLimit = Math.min(i + batchSize, pokemonList.length) // backdrop por si el batchSize no es multiplo
    const stub = pokemonList.slice(i, sliceLimit); //recortamos el array de pokemons desde la posicion hasta la posicion + batchSize
    const batchResults = await singleBatch(stub); //llamamos a singleBatch para procesar cada batch
    results.push(...batchResults.filter(Boolean));
    await delay(delayTime); // leve pausa entre tandas, opcional
  }
  return results;
}

// Helper para fetch de detalles de habilidad
export async function fetchAbilityDetails(url) {
  try {
    const response = await dataFetcher(url, false);
    const data = response.pokemons;

    const englishEntry = data.effect_entries.find(entry => entry.language.name === "en");
    return englishEntry ? englishEntry.short_effect : "No description available";
    
  } catch (error) {
    console.warn("⚠️ No se pudo cargar descripción de habilidad:", {
      url: url,
      error: error.message
    });
    return "Description not available";
  }
}

// Helper para datos de la búsqueda
export async function searchDataFetcher(dataToFetch = []) {
  try {
    const allSearchedData = await allDataFetcher(dataToFetch);
    return { pokemons: allSearchedData, nextPage: null };
  } catch (error) {
    console.error("❌ Error en searchDataFetcher:", {
      totalSearched: dataToFetch.length,
      error: error.message,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
}

// Carga los datos iniciales del sistema, revisando si hay datos en cache
export async function initialDataFetcher() {
  const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 1 Semana
  const CACHE_KEY = "initial-pokemon-list";
  try {
    // Verificar si hay datos en cache
    const cached = getValidCacheData(CACHE_KEY);
    if (cached.valid) {
      const initialPokemonList = cached.data;
      console.log("✅ Datos iniciales desde cache:", initialPokemonList.pokemons.length);
      showNotification("✅ Carga de datos iniciales desde cache", "success");
      return cached.data;
    } else {
      if (cached.status === "EXPIRED_CACHE") {
        console.log("⚠️ Cache de datos inicial expirada");
        showNotification("⚠️ Cache de datos inicial expirado", "warning");
      }
      if (cached.status === "MISSING_CACHE") {
        console.log("⚠️ Cache de datos inicial no encontrado");
        showNotification("⚠️ Cache de datos inicial no encontrado", "warning");
      }
    }

    // Si no hay datos en cache o expiraron, cargarlos de la API
    const response = await dataFetcher();
    saveCacheData(response, CACHE_KEY, CACHE_DURATION);

    console.log("📋 Carga de datos iniciales actualizado:", response.pokemons.length);
    showNotification("✅ Carga de datos iniciales actualizado", "success");
    return response;
  } catch (error) {
    console.error("❌ Error en initialDataFetcher:", {
      error: error.message,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
}

// Carga los datos de un solo pokemon
export async function pokemonDataFetcher(id) {
  const CACHE_DURATION =  10 * 60 * 1000; // 10 minutos
  const CACHE_KEY = "single-pokemon-cache";
  try {
    // Verificar si hay datos en cache
    const cached = getValidCacheData(CACHE_KEY);
    if (cached.valid && cached.data.id === parseInt(id)) {
      const pokemonData = cached.data;
      console.log("✅ Datos del desde cache del pokemon:", pokemonData.name);
      showNotification("✅ Carga de datos del pokemon desde cache", "success");
      return pokemonData;
    } 
    
    // Si no hay datos en cache, es otro pokemon, o expiraron, cargarlos de la API
    const response = await dataFetcher(`https://pokeapi.co/api/v2/pokemon/${id}`, false);
    console.log(`🔄 Cargando Pokémon #${id}...`);
    showNotification(`🔄 Cargando Pokémon #${id}...`, "success");
    saveCacheData(response, CACHE_KEY, CACHE_DURATION);

    return response;
  } catch (error) {
    console.error("❌ Error en pokemonDataFetcher:", {
      error: error.message,
      timestamp: new Date().toISOString()
    });
    throw error;
  }
}

// Carga los datos de las encuentros de un Pokemon
export async function pokemonEncountersHandler(pokemonId, processedLocations) {
  const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos
  const CACHE_KEY = `pokemon-encounters`;
  
  try {
    const cached = getValidCacheData(CACHE_KEY);
    if (cached.valid && cached.data.id === parseInt(pokemonId)) {
      console.log(`✅ Ubicaciones de Pokémon #${pokemonId} desde cache`);
      showNotification(`✅ Carga ubicaciones del Pokemon #${pokemonId} desde cache`, "success");
      return cached.data.encounters;
    }

    console.log(`🔄 Cargando ubicaciones de Pokémon #${pokemonId}...`);
    showNotification(`🔄 Cargando ubicaciones de Pokémon #${pokemonId}...`, "info");
    const { pokemons: encounters } = await dataFetcher(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}/encounters`,
      false
    );

    const processedEncounters = processedLocations(encounters);

    const data = {
      id: parseInt(pokemonId),
      encounters: processedEncounters
    };

    // GUARDAR DATOS PROCESADOS (evita reprocesar)
    saveCacheData(data, CACHE_KEY, CACHE_DURATION);
    
    return processedEncounters;
    
  } catch (error) {
    console.error(`❌ Error cargando ubicaciones de ${pokemonId}:`, error);
    throw error;
  }
}

// Helper para delay entre peticiones
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

// Helper para procesamiento de fetch por lotes
async function singleBatch(batchList) {
  const promises = batchList.map(async (pokemon) => {
    try {
      const res = await fetch(pokemon.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('⚠️ No se pudo cargar:', pokemon.name, err.message);
      return null;
    }
  });
  return Promise.all(promises);
}

