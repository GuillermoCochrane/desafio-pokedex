import { $, createElement } from "../utilities/dom.js";
import { dataFetcher} from "./dataFetcher.js";
import { createListItem } from "../components/searchbar.js";
import { showNotification } from "./notificationHandler.js";

let allPokemonList = [];
let searchedPokemonList = [];

// Inicializar event listeners de búsqueda
export function initSearch(handleSearch, resetSearch) {
    const $seachform = $("#search-form");
    const $searchInput = $("#pokemon-search");
    const $searchResults = $("#search-results");
    const $resetSearch = $("#reset-search");

    //Carga de cache de búsqueda
    loadAllPokemon();

    // Event listeners de búsqueda
    $seachform.addEventListener("submit", (e) => {
        e.preventDefault();
        if (searchedPokemonList.length > 0) {
            handleSearch(searchedPokemonList);
            searchedPokemonList = [];
        } else {
            resetSearch();
        }
    });

    // Event listeners de autocomplete
    $searchInput.addEventListener("input", (e) => {
        const term = e.target.value;
        if (term.length > 1) {
            showSearchSuggestions(term);
        } else {
            $("#search-results").innerHTML = '';
        }
    });

    // Event listeners de click en resultados
    $searchResults.addEventListener("click", (e) => {
        const $clickedElement = e.target.closest("[data-pokemon]");
        if ($clickedElement) {
            const currentSearch = $clickedElement.dataset.pokemon;
            searchedPokemonList = searchedPokemonList.filter(pokemon => pokemon.name == currentSearch);
            handleSearch(searchedPokemonList);
        }
    });

    // Event listeners de reset de búsqueda
    $resetSearch.addEventListener("click", (e) => {
        searchedPokemonList = [];
        resetSearch();
    });

    // Cerrar resultados al hacer click fuera
    document.addEventListener("click", (e) => {
        if (!e.target.closest("#search-form") && !e.target.closest("#search-results")) {
            $("#search-results").innerHTML = "";
        }
    });
}

// Cargar lista completa para autocomplete
async function loadAllPokemon() {
    try {
        const data = await dataFetcher("https://pokeapi.co/api/v2/pokemon?limit=1302", false);
        allPokemonList = data.pokemons.results.map(pokemon => ({
            name: pokemon.name,
            id: pokemon.url.split("/").filter(Boolean).pop(),
            url: pokemon.url
        }));
        showNotification("✅ Buffer de búsqueda cargado", "success");
        console.log("📋 Lista de Pokemon cargada:", allPokemonList.length);
        
    } catch (error) {
        console.error("❌ Error cargando lista de Pokemons:", error);
        showNotification("❌ Error cargando lista de Pokemons", "danger");
    }
}

// Función que muestra las sugerencias de búsqueda
function showSearchSuggestions(searchTerm) {
    searchedPokemonList = allPokemonList.filter(pokemon => 
        pokemon.name.includes(searchTerm.toLowerCase())
    );

    const suggestions = searchedPokemonList.slice(0, 7);
    const $results = $("#search-results");
    
    // LIMPIAMOS RESULTADOS PREVIOS
    $results.innerHTML = '';
    
    const $resultsList = createElement("ul", "list-group");

    if (suggestions.length === 0) {
        const $noResults = createListItem("No se encontraron Pokémon", "text-muted");
        $resultsList.appendChild($noResults);
    } else {
        for (const pokemon of suggestions) {
            const $suggestion = createListItem(null, "list-group-item-action", pokemon);
            $resultsList.appendChild($suggestion);
        }
    }

    $results.appendChild($resultsList);
}