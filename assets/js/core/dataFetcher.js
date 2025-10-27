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
async function allDataFetcher(pokemonList) {
  const results = []; // Buffer para los resultados
  let control = 0; // Control de peticiones
  for (const pokemon of pokemonList) {
    if (control > 0 && control % 5 === 0) await delay(100);
    try {
      const response = await fetch(pokemon.url);
      if (!response.ok) throw new Error(`HTTP ${response.status} para ${pokemon.url}`); // capturamos el error
      results.push(await response.json()); // Si es correcto, lo agregamos al buffer
    } catch (error) {
      console.warn('⚠️ No se pudo cargar el Pokémon:', pokemon.name, error.message); //No hay que propagar error para no bloquear el flujo. Solo mostrar en consola
    }
  }
  return results
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