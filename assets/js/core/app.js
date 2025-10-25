import { createCardSection } from '../components/pokemon_cards.js';
import { modalHandler } from '../modal_handler/modal_handler.js';
import { dataFetcher, searchDataFetcher } from './dataFetcher.js';
import { infiniteScrollHandler } from './infiniteScrollHandler.js'
import { initSearch } from './searchHandler.js';
import { uiReset, hiddenToggle, changeContent } from '../utilities/dom.js';

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
        const {pokemons, nextPage} = await searchDataFetcher(searchedPokemonList);
        nextUrl = nextPage;
        uiReset();
        hiddenToggle("search-btn");
        hiddenToggle('reset-search');
        changeContent('results-title', `Resultados de la búsqueda: ${searchedPokemonList.length}`);
        createCardSection(pokemons);
    } catch (error) {
        console.error('❌ Pokémon no encontrado:', error);
        showSearchSuggestions(searchTerm);
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