// Handler de notificaciones
import { $ } from '../utilities/dom.js';

export function showNotification(message, type = 'info') {
  const $notification = $('#notification');

  $notification.textContent = message;
  $notification.style.borderLeftColor = `var(--bs-${type})`;
  $notification.classList.add('show');
  
  setTimeout(() => {
    $notification.classList.remove('show');
  }, 3000);
}