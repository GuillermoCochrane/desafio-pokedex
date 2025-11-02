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