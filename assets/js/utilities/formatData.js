import { versionDisplayNames } from '../data/generationsData.js';

export function formatText(name, separator = ' ') {
  return name.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(separator);
}

export function formatMoveLevel(level) {
  return level > 0 ? level : '-';
}

// Función mejorada para formatear versiones
export function formatVersionName(version) {
  // Si existe en el mapeo, usar ese nombre
  if (versionDisplayNames[version]) {
    return versionDisplayNames[version];
  }
  
  // Si no, usar formatText normal
  return formatText(version, ' / ');
}

// Función para ordenar un array de objetos
export function arraySorter(array, column, ascending = true) {
  const sortedArray = array.sort((a, b) => {
    let valueA = a[column];
    let valueb = b[column];
    
    // CASO ESPECIAL: Si orderamos por nivel
    if (column === 'level') {
      valueA = getLowerLevel(a.methods);
      valueb = getLowerLevel(b.methods);
    }
    
    if (ascending === true) {
      return valueA < valueb ? -1 : 1;
    } else {
      return valueA > valueb ? -1 : 1;
    }
  });
  return sortedArray;
}

// Función helper para sacar el nivel más bajo
function getLowerLevel(methods) {
  // 1. Extraer TODOS los niveles
  const levels = methods.map(m => m.level);
  
  // 2. Filtrar solo niveles > 0 (quitamos machine/tutor/egg)
  const positiveLevels = levels.filter(l => l > 0);
  
  // 3. Si hay niveles positivos, devolver el MÁS BAJO
  if (positiveLevels.length > 0) {
    return Math.min(...positiveLevels);
  } else {
    return 0; // Si no, devolver 0 (machine/tutor/egg)
  }
}