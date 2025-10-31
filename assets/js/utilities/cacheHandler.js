// Manejo de errores
function cacheErrorHandler(type= "GENERIC_ERROR", message= "Ha ocurrido un error inesperado", key= null, data= null) {
  const error = new Error(message);
  error.type = type;
  error.timestamp = new Date().toISOString();
  if (key) error.key = key;
  if (data) error.dataType = typeof data;
  return error;
}

//? Como el throw funciona como return, no implementamos el try / catch, ya que el manejo lo hacemos en la funcion que consume los helpers (DRY logic)

// Recupera datos guardados en localStorage
export function loadCacheData(key = null) {
  if (!key) throw cacheErrorHandler("VALIDATION_ERROR", "Se requiere una clave para recuperar los datos", key);
  
  const savedData = localStorage.getItem(key);
  if (!savedData) throw cacheErrorHandler("MISSING_CACHE", `No hay datos almacenados en: ${key}`, key);
  
  return JSON.parse(savedData);
}

// Guarda datos en localStorage
export function saveCacheData(data = null, key = null) {
  if (!data) throw cacheErrorHandler("VALIDATION_ERROR", "Se requieren los datos a guardar", null, data);
  if (!key) throw cacheErrorHandler("VALIDATION_ERROR", "Se requiere una clave para guardar los datos", key);

  localStorage.setItem(key, JSON.stringify(data));
  return true;
}

// Elimina datos de localStorage
export function removeCacheData(key = null) {
  if (!key) throw cacheErrorHandler("VALIDATION_ERROR", "Se requiere una clave para eliminar los datos", key);
  
  localStorage.removeItem(key);
  return true;
}