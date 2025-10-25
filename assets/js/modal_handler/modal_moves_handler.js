import { $, $$ } from '../utilities/dom.js';
import { generateMoveTable } from '../components/modal/modal_moves.js';
import { games } from '../data/generationsData.js';
import { arraySorter } from '../utilities/formatData.js';

// Función que actualiza los movimientos de un juego
export function loadGameMoves(game, moves, sortBy='level', ascending=true) {
  // 1. Filtrar movimientos para el juego específico
  const filteredMoves = filterMovesByGame(moves, game.id);
  const orderedMoves = arraySorter(filteredMoves, sortBy, ascending);
  
  // 2. Actualizar header
  const $header = $('#generation-header');
  $header.textContent = game.name;
  $header.style.backgroundColor = game.color; // Color del juego
  $header.style.setProperty('--font-color', `var(${game.font})`);
  
  // 3. Generar tabla (SIN agrupación compleja)
  generateMoveTable(orderedMoves);
  
  // 4. Actualizar botón activo
  updateActiveGameButton(game.id);
}

// Función que filtra los movimientos por juego
function filterMovesByGame(moves, gameId) {
  //Instanciamos un Map (objeto literal con métodos especiales como has, set, get) para almacenar los movimientos, ya que no permite duplicados
  const movesMap = new Map();
  
  //Recorremos todos los movimientos del pokemon
  for (const move of moves) {
    //Recorremos todas las versiones del juego dentro de cada movimiento
    for (const detail of move.version_group_details) {
      // Filtramos por el juego específico 
      if (detail.version_group.name === gameId) {
        const moveName = move.move.name;
        
        //Si es la primera vez que se encuentra el movimiento...
        if (!movesMap.has(moveName)) {
          // Creamos entrada en el mapa con array de métodos vacío
          movesMap.set(moveName, {
            name: moveName,
            methods: [] // ← Aquí acumularemos todos los métodos de aprendizaje
          });
        }

        // Agregamos este método específico al movimiento
        movesMap.get(moveName).methods.push({
          method: detail.move_learn_method.name,
          level: detail.level_learned_at
        });
      }
    }
  }

  // Convertimos el Map a Array para facilitar su uso
  return Array.from(movesMap.values());
}

// Función que actualiza el botón activo en la tabla de movimientos
function updateActiveGameButton(activeId) {
  const $buttons = $$('#games-buttons button');
  for (const $button of $buttons) {
    $button.classList.remove('active');
  }
  
  const $activeBtn = $(`[data-game="${activeId}"]`);
  if ($activeBtn) $activeBtn.classList.add('active');
}

// Función que maneja el ordenamiento de las columnas de la tabla de movimientos
export function sortingHandler(currentPokemon) {
  const $movesHeader = $('#moves-table-header'); // capturamos el header de la tabla de movimientos
  
  // delegamos el evento click al header
  $movesHeader.addEventListener('click', (event) => {
    // capturamos la columna que se ha pulsado
    const $clickedHeader = event.target.closest('th[data-sort-target]');
    // Si no se ha pulsado sobre ninguna columna, no hacemos nada
    if (!$clickedHeader) return;
    
    const sortBy = $clickedHeader.getAttribute('data-sort-target'); // Obtenemos por que columna queremos ordenar
    const isAscending = $clickedHeader.getAttribute('data-ascending') === 'true'; // Obtenemos si está ordenado ascendente o descendente
    const newAscending = !isAscending;
    
    // Actualizar UI del header
    updateSortHeaders(sortBy, newAscending);
    
    // Re-ordenar y refrescar
    const $activeGame = $('#games-buttons .active'); // capturamos el botón activo
    const game = games.find(game => game.id === $activeGame.getAttribute('data-game')); // obtenemos los datos del juego activo
    loadGameMoves(game, currentPokemon.moves, sortBy, newAscending); // actualizamos la tabla de movimientos
  });
}

//Función que actualiza los headers de la tabla de movimientos
function updateSortHeaders(activeSort, newAscending) {
  const $allHeaders = $$('#moves-table-header th[data-sort-target]');// capturamos todos los headers de  las columnas de la tabla para reccorrrerlos

  for (const $header of $allHeaders) {
    const isActive = $header.getAttribute('data-sort-target') === activeSort; // buscamos el header que coincide
    $header.classList.remove('active-sort');
    if (isActive) {
      // Si es el header activo, actualizamos sus atributos
      $header.setAttribute('data-ascending', newAscending.toString());
      $header.classList.add('active-sort');
    }
  };
}
