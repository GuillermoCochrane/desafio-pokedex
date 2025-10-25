import { createModalAbilitiesList } from '../components/modal/modal_abilities.js';
import { fetchAbilityDetails } from '../core/dataFetcher.js';

// Función que carga las habilidades del modal
export function modalAbilitiesData(abilities) {
  createModalAbilitiesList(abilities, fetchAbilityDetails);
}
