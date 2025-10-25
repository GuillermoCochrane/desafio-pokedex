import { $, createElement, createCell, createBadge  } from "../../utilities/dom.js";
import { formatText } from "../../utilities/formatData.js"
// Crea la tabla de movimientos
export function generateMoveTable(filteredMoves) {
    const $tableBody = $('#moves-table-body');
    $tableBody.innerHTML = '';

    let counter = 0;
    let $currentRow = createElement('tr');
    for (const move of filteredMoves) {
        counter++;
        const $row = createMoveRow(move.name, move.methods);
        $currentRow.append($row.name, $row.method);
        if (counter % 2 === 0 || counter === filteredMoves.length) {
            // Solo agregar celdas vacías si es la ÚLTIMA fila y es IMPAR
            if (counter === filteredMoves.length && counter % 2 !== 0) {
                $currentRow.append(createCell(''), createCell(''));
            }

            $tableBody.appendChild($currentRow);
            $currentRow = createElement('tr');
        }
    }
}

// Crea los elementos de una movimiento de la fila de movimientos
function createMoveRow(name, methods) {
    const $name = createCell(formatText(name), 'text-capitalize');
    const $method = createCell("", 'd-flex flex-wrap justify-content-center');

    const methodReference = {
        'level-up': { 
            text: 'Level Up',
            style: 'bg-primary'
        },
        'machine': {
            text: 'Machine',
            style: 'bg-dark text-white'
        },
        'egg': {
            text: 'Egg',
            style: 'bg-warning text-dark'
        },
        'tutor': {
            text: 'Tutor',
            style: 'bg-info text-dark'
        },
        'stadium-surfing': {
            text: 'Stadium',
            style: 'bg-success text-white'
        }
    } // candidato a la DB auxiliar

    for (const method of methods) {
        const dataReference = methodReference[method.method];
        const text = `${dataReference.text}${method.level > 0 ? ` [LVL ${method.level}]` : ''}`;
        const $badge = createBadge(dataReference.style, text);
        $method.append($badge);
    }

    return {
        name: $name,
        method: $method
    };
}

//Crea los botones de filtrado por juego
export function generateGameButtons(games, loadGameMoves) {
    const $container = $('#games-buttons');
    $container.innerHTML = '';

        for (const game of games) {
            const $button = createElement('button', 'btn btn-outline-primary btn-sm', game.name);
            $button.setAttribute('data-game', game.id);
            $button.style.borderColor = game.color;
            $button.style.setProperty('--games-button', `${game.color}`);
            $button.style.setProperty('--font-color', `var(${game.font})`);
            
            $button.addEventListener('click', () => loadGameMoves(game));
            $container.appendChild($button);
        }
}

// Crea botones de filtrado por versiones
export function generateVersionButtons(versions, filterVersions, allButtonColor) {
    const $container = $("#version-buttons")
    $container.innerHTML = "";

    for (const version of versions) {
        const $button = createElement("button", "btn btn-sm mb-2 text-center", version.name);
        $button.setAttribute("data-game", version.id);
        $button.style.borderColor = version.color !== null ? version.color : allButtonColor;
        $button.style.setProperty("--games-button", `${version.color !== null ? version.color : allButtonColor}`);
        $button.style.setProperty("--font-color", `var(${version.font})`);

        // Al hacer clic, aplica el filtro
        $button.addEventListener("click", () => filterVersions(version));
        $container.appendChild($button);
    }
}