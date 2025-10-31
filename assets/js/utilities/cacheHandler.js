// Manejo de errores
function cacheErrorHandler(type= "GENERIC_ERROR", message= "Ha ocurrido un error inesperado", key= null, data= null) {
  const error = new Error(message);
  error.type = type;
  error.timestamp = new Date().toISOString();
  if (key) error.key = key;
  if (data) error.dataType = typeof data;
  return error;
}