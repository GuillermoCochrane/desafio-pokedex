import { $, $$ } from "../utilities/dom.js";
import { generateMethodSelect, displayLocations } from "../components/modal/modal_locations.js";
import { generateVersionButtons } from "../components/modal/modal_moves.js";
import { dataFetcher } from "../core/dataFetcher.js";
import { individualGames } from "../data/generationsData.js";

let currentVersion = null;
let currentMethod = null;

// Función que carga las ubicaciones donde se encuentra el Pokemon
export async function loadPokemonLocations(pokemonId, types, cachedEncounters) {
  // 1. Fetch (solo cuando no hay cache o cambió el Pokémon)
  if (!cachedEncounters.length || currentPokemon.id !== pokemonId) {
    const { pokemons: encounters } = await dataFetcher(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}/encounters`,
      false
    );
    cachedEncounters = encounters;
  }
    // 2. procesamos los datos de las ubicaciones
    const processedLocations = processLocationData(cachedEncounters);

    // 3. filtramos los datos de las ubicaciones según el método y la versión
    const filteredLocations = filterLocationsData(processedLocations, currentVersion, currentMethod);

    // 4. extraemos los métodos de encuentro únicos para el select
    const methods = getUniqueMethods(processedLocations);

    // 5. generamos el control de filtrado
    generateMethodSelect(methods, handleMethodChange, currentMethod);
    generateVersionButtons(individualGames, handleVersionChange, `var(--solid_${types[0].type.name})`);

    // 6. renderizamos los resultados
    displayLocations(filteredLocations, individualGames, types);

    // 7. actualizamos el botón activo
    updateActiveVersionButton(currentVersion);
}

// Función que procesa los datos de las ubicaciones
function processLocationData(data) {
  const processed = [];

  for (const area of data) {// recorremos cada area 
    const areaInfo = {
      name: area.location_area.name, // nombre de la area
      versions: []
    };

    for (const version of area.version_details) { // recorremos cada version de la area
      const versionInfo = {
        name: version.version.name, // nombre de la version del juego
        encounters: []
      };

      for (const encounter of version.encounter_details) { // recorremos cada encuentro de la version
        const encounterInfo = {
          method: encounter.method.name,  // nombre del método de encuentro
          chance: encounter.chance,       // probabilidad del encuentro
          min_level: encounter.min_level, // nivel mínimo del encuentro
          max_level: encounter.max_level, // nivel máximo del encuentro
          conditions: encounter.condition_values.map(cond => cond.name) // condiciones del encuentro
        };

        versionInfo.encounters.push(encounterInfo); // agregamos el encuentro al objeto de la version
      }

      // Eliminamos duplicados de encuentros idénticos (mismo método + condiciones + nivel)
      const uniqueEncounters = new Map(); // instanciamos un mapa para almacenar los encuentros, ya que no permite duplicados
      for (const encounter of versionInfo.encounters) { // recorremos cada encuentro
        const key = `${encounter.method}-${encounter.min_level}-${encounter.max_level}-${encounter.conditions.join(",")}`; //varaible auxiliar para detectar duplicados
        if (!uniqueEncounters.has(key)) uniqueEncounters.set(key, encounter); // si no existe, lo agregamos
      }
      versionInfo.encounters = [...uniqueEncounters.values()]; // actualizamos la lista de encuentros, sin duplicados

      areaInfo.versions.push(versionInfo); // agregamos la version al objeto de la area
    }

    processed.push(areaInfo); // agregamos la area al objeto procesado
  }

  return processed;
}

// Función que flitra los datos de las ubicaciones, por juego y método
function filterLocationsData(data, selectedVersion, selectedMethod){
  const filteredData = data.map(area => {
  
    const filterByVersions = area.versions.filter(version => !selectedVersion || version.name === selectedVersion ) //Filtramos la version que coincide con la seleccionada o si no se ha seleccionado nada
    const fliterByMethod =  filterByVersions.map(version => ({ 
        ...version,
        encounters: version.encounters.filter(encounter =>
          !selectedMethod || encounter.method === selectedMethod // Filtramos los encuentros que coinciden con el método seleccionado o si no se ha seleccionado nada
        )
    }))
    const filteredEncounters = fliterByMethod.filter(version => version.encounters.length > 0); //descartamos los que no tengan encuentros

    // devolvemos solo áreas con versiones válidas
    return filteredEncounters.length
      ? { ...area, versions: filteredEncounters }
      : null;
  })
  return filteredData.filter(Boolean); // eliminamos nulls
}

// Función que actualiza el método de encuentro del sistema de filtrado de ubicaciones
function handleMethodChange(selectedValue) {
  currentMethod = selectedValue || null;
  loadPokemonLocations(currentPokemon.id, currentPokemon.types);
}

// Función que actualiza versión del juego, del sistema de filtrado de ubicaciones
function handleVersionChange(version) {
  currentVersion = version?.id || null;
    loadPokemonLocations(currentPokemon.id, currentPokemon.types);
}

// Función que devuelve un array con los métodos de encuentro únicos (para el <select>)
function getUniqueMethods(data) {
  return [
    ...new Set( // usamos un Set porque solo almacena valores únicos, eliminando duplicados automáticamente
      data.flatMap(area => // recorremos cada área; flatMap aplana el resultado, evitando arrays anidados
        area.versions.flatMap(version => // recorremos cada versión dentro de la misma área
          version.encounters.map(encounter => encounter.method) // extraemos el nombre del método de encuentro
        )
      )
    )
  ];
}

// Función que actualiza el botón activo en la tabla de ubicaciones (aplicar DRY con la de movimientos)
function updateActiveVersionButton(activeId) {
  const $buttons = $$("#version-buttons button");
  for (const $button of $buttons) {
    $button.classList.remove("active");
  }
  
  const $activeBtn = $(`[data-game="${activeId}"]`);
  if ($activeBtn) $activeBtn.classList.add("active");
}