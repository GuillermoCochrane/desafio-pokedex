import { createCardSection } from '../components/pokemon_cards.js';
import { modalHandler } from '../modal_handler/modal_handler.js';
import { dataFetcher, searchDataFetcher } from './dataFetcher.js';
import { infiniteScrollHandler } from './infiniteScrollHandler.js'
import { initSearch } from './searchHandler.js';
import { uiReset, hiddenToggle, changeContent } from '../utilities/dom.js';
import { showNotification } from './notificationHandler.js';

let nextUrl = null;

async function createApp() {
    const pokemons = await initialLoad();
    modalHandler(pokemons);
    infiniteScrollHandler(loadMorePokemons);
    initSearch(handleSearch, resetSearch);
}

// Cargar lista completa para autocomplete
export async function loadMorePokemons() {
    if (!nextUrl) return; // Si no hay más pókemons, salimos

    const {pokemons, nextPage} = await dataFetcher(nextUrl);
    nextUrl = nextPage;
    createCardSection(pokemons);
}

// Función principal de búsqueda
async function handleSearch(searchedPokemonList) {
    try {
        showNotification("🔍 Buscando Pokémon...", "info");

        const {pokemons, nextPage} = await searchDataFetcher(searchedPokemonList);

        if (pokemons.length === 0) {
            showNotification("⚠️ No se encontraron Pokémon", "warning");
            return; 
        }

        showNotification(`✅ ${pokemons.length} Pokémon encontrados`, "success");

        nextUrl = nextPage;
        uiReset();
        hiddenToggle("search-btn");
        hiddenToggle('reset-search');
        changeContent('results-title', `${pokemons.length} Pokémon encontrados`);
        createCardSection(pokemons);
    } catch (error) {
        console.error('❌ Error en búsqueda:', error);
        showNotification('❌ Error en la búsqueda', 'danger');
    }
}

function resetSearch() {
    hiddenToggle("search-btn");
    hiddenToggle('reset-search');
    changeContent('results-title', 'Todos los Pokemones');
    initialLoad();
}


// Función que carga los datos iniciales del sistema
async function initialLoad() {
    const {pokemons, nextPage} = await dataFetcher();
    nextUrl = nextPage;
    uiReset();
    createCardSection(pokemons);
    return pokemons;
}

document.addEventListener('DOMContentLoaded', createApp);