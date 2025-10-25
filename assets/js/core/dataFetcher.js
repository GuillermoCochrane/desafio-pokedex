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
  try {
    const promises = pokemonList.map(pokemon => 
      fetch(pokemon.url).then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${pokemon.url}`);
        return res.json();
      })
    );
    return await Promise.all(promises);
  } catch (error) {
    console.error("❌ Error en allDataFetcher:", {
      totalPokemon: pokemonList.length,
      error: error.message,
      failedUrl: error.message.includes('HTTP') ? 'Varios URLs' : 'URL específico'
    });
    throw error; //Propagar para manejo superior
  }
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