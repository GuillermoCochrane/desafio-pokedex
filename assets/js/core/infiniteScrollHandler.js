import { showNotification } from './notificationHandler.js';
import { hiddenToggle } from '../utilities/dom.js';

export  function infiniteScrollHandler(loadMorePokemons) {
  let isLoading = false;

  window.addEventListener('scroll', async () => {
    if (isLoading) return;
    
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight - 800) {
      isLoading = true;
      hiddenToggle("spinner");
      try {
        await loadMorePokemons()
      } catch(error){
        showNotification('❌ Error cargando más Pokemons', 'danger');
        console.error('❌ Error al cargar más Pokemons:', error);
      } finally{
          hiddenToggle("spinner")
          isLoading = false;
        };
    }
  });
}