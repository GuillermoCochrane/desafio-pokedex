// Handler de notificaciones
import { $ } from '../utilities/dom.js';
let notificationQueue = []; // Cola de notificaciones
let isShowingNotification = false; // Flag para mostrar notificaciones

// Muestra una notificación, o agrega una a la cola
export function showNotification(message, type = 'info') {
  notificationQueue.push({ message, type }); //Agregarmos la notificación a la cola
  if (!isShowingNotification) {
    showNextNotification(); // si no está mostrando una notificación, la mostramos
  }
}

// Handler de la cola de notificaciones
function showNextNotification() {
  if (notificationQueue.length === 0) { // Si la cola está vacía, no mostramos nada
    isShowingNotification = false; //Seteamos el flag de mostrar notificación a falso y salimos
    return;
  }
  
  isShowingNotification = true; //Seteamos el flag de mostrar notificación a verdadero
  const { message, type } = notificationQueue.shift(); //Tomamos la primera notificación de la cola
  const $notification = $('#notification');

  $notification.textContent = message;
  $notification.style.borderLeftColor = `var(--bs-${type})`;
  $notification.classList.add('show'); // ← Mostramos la notificación
  
  setTimeout(() => {
    $notification.classList.remove('show'); // ← Ocultamos la notificación despues de 3 segundos
    
    setTimeout(() => {
      showNextNotification(); // Volvemos a ejecutarla, por si queda alguna notificación en la cola
    }, 300); 
  }, 3000);
}