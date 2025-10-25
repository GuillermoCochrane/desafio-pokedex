import { $, createElement, createCell, applyBackgroundColor  } from "../../utilities/dom.js";
import { formatText } from "../../utilities/formatData.js";

// Crea el selector de métodos de encuentro del sistema de filtrado de ubicaciones
export function generateMethodSelect(methods, handleMethodChange, currentMethod) {
    const $select = $("#encounter-method");
    $select.innerHTML = "<option value=''>Todos los métodos</option>";

    for (const method of methods) {
        const $option = createElement("option", null, formatText(method));
        $option.value = method;
        $select.appendChild($option);
    }
    $select.value = currentMethod || '';

    $select.addEventListener("change", event => handleMethodChange(event.target.value));
}

// Función que renderiza la lista de ubicaciones en el modal
export function displayLocations(locations, individualGames, types) {
    const $container = $("#pokemon-locations");
    $container.innerHTML = "";

    if (!locations.length) {
        const $emptyLocations = createElement("p", "text-center text-muted", "No hay ubicaciones disponibles con los filtros seleccionados.");
        $container.appendChild($emptyLocations);
        return;
    }

    // Crear cada ubicación
    for (const area of locations) {
        const $details = createLocationsCards(area, individualGames, types);
        $container.appendChild($details);
    }
}

// Función que crea las tarjetas de las ubicaciones
function createLocationsCards(area, individualGames, types){
    const $details = createElement("details", "location-card");
    $details.setAttribute("name", "location-group"); // agrupamos para que solo se abra uno a la vez

    // Summary (título del área)
    const $summary = createElement("summary", "location-summary d-flex justify-content-between align-items-center text-dark");
    $summary.textContent = formatText(area.name); // Ej: cerulean-city-area → Cerulean City Area
    applyBackgroundColor($summary, types, true, 135);

    const $content = createElement("div", "location-content mt-2");

    // Crear listado de versiones y métodos
    for (const version of area.versions) {
        const gameData = individualGames.find(game => game.id === version.name);

        const $versionBlock = createLocationsCardsInfo(version, gameData);
        $content.appendChild($versionBlock);
    }

    $details.appendChild($summary);
    $details.appendChild($content);
    return $details;
}

// Función que crea la información de las tarjetas de ubicaciones
function createLocationsCardsInfo(version, gameData) {
  // Creamos el contenedor principal
    const $versionTable = createElement("table", "location-table table table-sm mb-3");

    // --- HEADER DOBLE: nombre del juego y nombres de columnas ---
    const $thead = createLocationsTableHeader(version, gameData);

    // --- BODY: datos de encuentros ---
    const $tbody = createElement("tbody");
    for (const encounter of version.encounters) {
        const $row = createLocationsTableRows(encounter);
        $tbody.appendChild($row);
    }

    $versionTable.append($thead, $tbody);
    return $versionTable;
}

// Función que crea el encabezado de las tablas de ubicaciones
function createLocationsTableHeader(version, gameData) {
    const $thead = createElement("thead");

    // --- HEADER 1: nombre del juego ---
    const $gameHeader = createElement("tr", "version-header text-light");
    const $gameTitle = createElement("th", "text-center", formatText(version.name));
    $gameTitle.colSpan = 5;
    $gameTitle.style.backgroundColor = gameData?.color || "var(--border-color)";
    $gameTitle.style.color = `var(${gameData?.font || "--light-font"})`;
    $gameHeader.appendChild($gameTitle);

    // --- HEADER 2: nombres de columnas ---
    const $columnsHeader = createElement("tr", "text-dark bg-light");
    const columns = ["Método", "Nivel Min", "Nivel Max", "Condiciones", "Chance"];
    for (const column of columns) {
        const $th = createElement("th", "text-center small fw-bold", column);
        $columnsHeader.appendChild($th);
    };

    $thead.append($gameHeader,$columnsHeader);
    return $thead;
}

// Función que crea las filas de las tablas de ubicaciones
function createLocationsTableRows(encounter) {
    const $row = createElement("tr");
    const conditionsText = encounter.conditions.length 
        ? encounter.conditions.map(condition => formatText(condition)).join(", ") 
        : "-";

    const $method = createCell(formatText(encounter.method), "text-capitalize text-center");
    const $min = createCell(encounter.min_level, "text-center");
    const $max = createCell(encounter.max_level, "text-center");
    const $conds = createCell(conditionsText, "text-center");
    const $chance = createCell(`${encounter.chance}%`, "text-center");

    $row.append($method, $min, $max, $conds, $chance);
    return $row;
}