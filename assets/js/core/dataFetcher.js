import { showNotification } from "./notificationHandler.js";

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