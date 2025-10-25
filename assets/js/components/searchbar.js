import { createElement } from '../utilities/dom.js';
import { formatText } from '../utilities/formatData.js';

// Función que crea los items de lista del la barra de búsqueda
export function createListItem(text = null, className = null, dataPokemon = null) {
    const $li = createElement('li', `list-group-item ${className}`, text);
    if (!text){
        $li.type = 'button';
        $li.setAttribute('data-pokemon', dataPokemon.name);
        $li.textContent = formatText(dataPokemon.name);
        const $number = createElement('small', `text-muted`, `#${dataPokemon.id}`);
        $li.appendChild($number);
    }
    return $li;
}