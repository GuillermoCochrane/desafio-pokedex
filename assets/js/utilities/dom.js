// Funciones para manipular el DOM

// Obtener elemento DOM
export function $(selector) {
    return document.querySelector(selector);
}

// Obtener todos los elementos DOM
export function $$(selector) {
    return document.querySelectorAll(selector);
}

// Crea elemento DOM con su clase
export function createElement(tagName, className = null, content = null, isHTML = false, id = null, background = null, solid = false) {
    const element = document.createElement(tagName);
    className && (element.className = className);
    id && (element.id = id);
    if (content !== null) {
        isHTML ? (element.innerHTML = content) : (element.textContent = content);
    }
    if (background) {
        applyBackgroundColor(element, background, solid);
    }
    return element;
}

export function createImage(url = null , nombre = null, className = null, id = null) {
    const image = createElement('img', className, null, false, id);
    image.src = url;
    image.alt = nombre;
    return image;
}

export function createButton(text = null, className = null, id = null, toggle = null, target = null, dataPokemon = null) {
    const button = createElement('button', className, text, false, id);
    button.setAttribute('data-bs-toggle', toggle);
    button.setAttribute('data-bs-target', target);
    button.setAttribute('data-pokemon', dataPokemon);
    return button;
}

export function createCell(text, className = null) {
    const $cell = createElement('td', className, text);
    className && ($cell.className = className);
    return $cell;
}

export function createBadge(customStyle = null, content = null, background = null, solid = false) {
    const style = `badge p-2 mx-1 text-center ${customStyle}`
    const $badge = createElement('span', style, content, false, null, background, solid);
    return $badge;
}

// Función para aplicar color a un elemento
export function applyBackgroundColor(element, background, solid = false, gradientAngle = 145) {
    if (background.length === 1) {
        const color = solid ? `solid_${background[0].type.name}` : `transparent_${background[0].type.name}`;
        element.style.background = `var(--${color})`;
        element.style.setProperty('--card-color', `var(--solid_${background[0].type.name})`);
    } else {
        // Gradiente lineal entre los colores de los tipos
        const colores = background.map(colores => `var(--${solid ? "solid":"transparent"}_${colores.type.name})`).join(', ');
        element.style.background = `linear-gradient(${gradientAngle}deg, ${colores})`;
        element.style.setProperty('--card-color', `var(--solid_${background[0].type.name})`);
    }
}

// Handler para visualización de elementos
export function hiddenToggle(id) {
    const $element = $(`#${id}`);
    $element.hidden = !$element.hidden;
    /* 
        agregar al css la siguiente rergla por prevención:
        [hidden] {
            display: none !important;
        }
     */
}

// Función para resetear la UI durante busquedas o reset de la misma
export function uiReset() {
        // Ocultar resultados de autocomplete y limpiar input
        $('#search-results').innerHTML = '';
        $('#pokemon-search').value = '';
        $(`#pokemons`).innerHTML = '';
}

// Función para modificar el contenido de un elemento
export function changeContent(id, text, isHTML = false) {
    const $element = $(`#${id}`);
    isHTML ? ($element.innerHTML = text) : ($element.textContent = text)
}