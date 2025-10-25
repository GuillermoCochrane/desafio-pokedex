import {$, $$, applyBackgroundColor} from "../utilities/dom.js";
import {  generateGameButtons } from "../components/modal/modal_moves.js";
import { createModalTypesBadges } from "../components/modal/modal_abilities.js";
import { dataFetcher } from "../core/dataFetcher.js";
import { games } from "../data/generationsData.js";
import { modalCarouselData, modalStatsData } from "./modal_stats_handler.js";
import { modalAbilitiesData } from "./modal_abilities_handler.js";
import { loadGameMoves, sortingHandler } from "./modal_moves_handler.js";
import { loadPokemonLocations } from "./modal_locations_handler.js";
import { showNotification } from "../core/notificationHandler.js";

let currentPokemon = null;
let cachedEncounters = [];

// Función que maneja el modal de Pokemon
export function modalHandler() {
  const $container = $("#pokemons");
  
  $container.addEventListener("click", async (event) => {
    const $clickedElement = event.target.closest("[data-pokemon]");
    if (!$clickedElement) return;

    const id = $clickedElement.getAttribute("data-pokemon");
    
    try {
      showNotification("🔄 Cargando Pokémon...", "info");
      
      const {pokemons} = await dataFetcher(`https://pokeapi.co/api/v2/pokemon/${id}`, false);
      
      showNotification(`✅ ${pokemons.name} cargado`, "success");
      
      loadModalData(pokemons);
      
    } catch (error) {
      showNotification("❌ Error al cargar el Pokémon", "danger");
      console.error("❌ Error cargando Pokémon:", error);
    }
  });
}

// Carga completa del modal
export function loadModalData(pokemon) {
  currentPokemon = pokemon;
  cachedEncounters = []; // Limpia cache para nuevo Pokémon

  modalHeaderData(pokemon.id, pokemon.name, pokemon.types);
  modalCarouselData(pokemon.sprites, pokemon.name, pokemon.id);
  modalStatsData(pokemon.stats, pokemon.height, pokemon.weight);
  modalAbilitiesData(pokemon.abilities);
  sortingHandler(currentPokemon);

  generateGameButtons(games, game => loadGameMoves(game, pokemon.moves, pokemon.types));
  loadPokemonLocations(pokemon.id, pokemon.types, cachedEncounters);
  loadGameMoves(games[0], pokemon.moves, pokemon.types); // Primer juego por defecto
}

// Función que carga los datos del header del modal
export function modalHeaderData(id,name, types) {
    // Header
    const $modalHeader = $("#modal-header");
    const $pokemonID = $("#modal-header span");
    const $pokemonName = $("#modal-header h2");
    const $accordionsSummary = $$(".games-filter summary");
    applyBackgroundColor($modalHeader, types, true, 90);
    for (const $accordionSummary of $accordionsSummary) {
      applyBackgroundColor($accordionSummary, types, true, 270); 
    }

    $pokemonID.textContent = `#${id.toString().padStart(3, "0")}`;
    $pokemonName.textContent = name;
    
    createModalTypesBadges(types);
} 