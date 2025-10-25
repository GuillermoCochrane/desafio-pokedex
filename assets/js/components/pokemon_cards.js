import { $, createElement, createImage, createButton,  createBadge } from "../utilities/dom.js";

// Crea componente del header de la tarjeta del Pokemon
export function createCardHeader(id) {
    const $cardHeader = createElement("header", "card-header text-center");
    const $span = createElement("h5", "text-muted fw-semibold", `#${id}`);
    $cardHeader.append($span);
    return $cardHeader;
}

// Crea componente de los tipos del Pokemon
function createCardTypesBadges(types) {
    const $cardTypes = createElement("section", "d-flex justify-content-center flex-wrap gap-2 mb-3");
    for (const type of types) {
        const $badge = createBadge("", type.type.name, [type], true);
        $cardTypes.append($badge);
    }
    return $cardTypes;
}

// Crea componente de datos del Pokemon
function createCardInfo(nombre, id, tipos) {
    const $cardInfo = createElement("div", "card-body text-center");
    const $title = createElement("h5", "card-title product-card-title fw-bold text-capitalize fs-4",  nombre ? nombre : " Pokemon Generico", false);
    const $typeContainer = createCardTypesBadges(tipos);
    const $button = createButton("Ver Detalles", "btn btn-outline-light", null, "modal", "#detallesModal",  id ? id : "pokemon-generico");
    $cardInfo.append($title,$typeContainer, $button);
    return $cardInfo;
}

// Crea componente tarjeta de Pokemon
function createProductCard(pokemon) {
    const $productCard = createElement("article", "card product-card m-3", null, false, null, pokemon.types);
    const imageUrl = pokemon.sprites?.front_default || "./assets/img/default.png";
    const $image = createImage(imageUrl, pokemon.name ? pokemon.name : "Pokemon Génerico", "card-img-top");
    $image.style.viewTransitionName = `pokemon-image-${pokemon.id}`;
    const $cardInfo = createCardInfo(pokemon.name, pokemon.id, pokemon.types);
    $productCard.append($image, $cardInfo);
    return $productCard;
}

// Crea Seccion de tarjetas de Pokemon
export function createCardSection(pokemones) {
    const $section = $(`#pokemons`);
    for (const pokemon of pokemones) {
        const $productCard = createProductCard(pokemon);
        $section.append($productCard);
    };
}