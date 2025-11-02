import { createCardSection } from '../components/pokemon_cards.js';
import { modalHandler } from '../modal_handler/modal_handler.js';
import { dataFetcher, searchDataFetcher, initialDataFetcher } from './dataFetcher.js';
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

// Función para resetear la búsqueda
function resetSearch() {
    showNotification('ℹ Mostrando todos los Pokemons', 'info');
    hiddenToggle("search-btn");
    hiddenToggle('reset-search');
    changeContent('results-title', 'Todos los Pokemons');
    initialLoad();
}


// Función que carga los datos iniciales del sistema
async function initialLoad() {
    try {
        const {pokemons, nextPage} = await initialDataFetcher();
        nextUrl = nextPage;
        uiReset();
        createCardSection(pokemons);
        return pokemons;
    } catch (error) {
        console.error('❌ Error en initialLoad:', error);
        showNotification('❌ Error en la carga de datos iniciales', 'danger');
    }
}

document.addEventListener('DOMContentLoaded', createApp);