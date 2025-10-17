

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carouselExampleIndicators');
  const bsCarousel = new bootstrap.Carousel(carousel);
  let currentIframe = null;
  let playTimeout = null;
  let nextTimeout = null;

  // Reproduce el video del slide activo después de 3 segundos
  function playActiveVideo() {
    clearTimeout(playTimeout);
    clearTimeout(nextTimeout);

    playTimeout = setTimeout(() => {
      const activeItem = carousel.querySelector('.carousel-item.active');
      const iframe = activeItem.querySelector('iframe');
      if (iframe) {
        const src = iframe.src;
        if (!src.includes('autoplay=1')) {
          iframe.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1&mute=1';
        }
        currentIframe = iframe;
      }

      // Cambiar de slide a los 15 segundos
      nextTimeout = setTimeout(() => {
        bsCarousel.next();
      }, 25000);

    }, 3000); // Espera 3 segundos antes de reproducir
  }

  // Pausa el video actual
  function stopCurrentVideo() {
    if (currentIframe) {
      const src = currentIframe.src.replace('&autoplay=1', '').replace('autoplay=1', '');
      currentIframe.src = src; // Recarga el iframe sin reproducir
      currentIframe = null;
    }
    clearTimeout(playTimeout);
    clearTimeout(nextTimeout);
  }

  // Detectar cambio de slide
  carousel.addEventListener('slide.bs.carousel', stopCurrentVideo);
  carousel.addEventListener('slid.bs.carousel', playActiveVideo);

  // Iniciar con el primer video después de 3 seg
  playActiveVideo();
})
