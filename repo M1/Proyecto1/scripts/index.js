document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carouselExampleIndicators');
  const bsCarousel = new bootstrap.Carousel(carousel);
  let currentIframe = null;
  let playTimeout = null;
  let nextTimeout = null;

  // ---reproducir slides ---
  function playActiveVideo() {
    clearTimeout(playTimeout);
    clearTimeout(nextTimeout);

    playTimeout = setTimeout(() => {
      const activeItem = carousel.querySelector('.carousel-item.active');
      const iframe = activeItem?.querySelector('iframe');
      if (iframe) {
        const src = iframe.src;
        if (!src.includes('autoplay=1')) {
          iframe.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1&mute=1';
        }
        currentIframe = iframe;
      }

      nextTimeout = setTimeout(() => {
        bsCarousel.next();
      }, 25000);

    }, 3000);
  }

  function stopCurrentVideo() {
    if (currentIframe) {
      const src = currentIframe.src.replace('&autoplay=1', '').replace('autoplay=1', '');
      currentIframe.src = src;
      currentIframe = null;
    }
    clearTimeout(playTimeout);
    clearTimeout(nextTimeout);
  }

  carousel.addEventListener('slide.bs.carousel', stopCurrentVideo);
  carousel.addEventListener('slid.bs.carousel', playActiveVideo);

  playActiveVideo();

  // --- Agregar pelicula o Serie ---
  const form = document.getElementById('addForm');
  const peliculasContainer = document.querySelector('.card-pelicula');
  const seriesContainer = document.querySelector('.card-serie');

  function createCard(title, imgUrl, type) {
    const wrapper = document.createElement('div');
    wrapper.className = type === 'pelicula' ? 'movie' : 'serie';

    const img = document.createElement('img');
    img.src = imgUrl || 'img/placeholder.png';
    img.alt = title;
    img.onerror = () => { img.src = 'img/placeholder.png'; };

    const p = document.createElement('p');
    p.textContent = title;

    wrapper.appendChild(img);
    wrapper.appendChild(p);
    return wrapper;
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('titleInput')?.value.trim();
      const type = document.getElementById('typeInput')?.value;
      const urlImg = document.getElementById('urlImageInput')?.value.trim();

      if (!title || !urlImg || !type) {
        alert('Completa título, tipo y URL de imagen.');
        return;
      }

      const card = createCard(title, urlImg, type);

      if (type === 'pelicula') {
        if (peliculasContainer) peliculasContainer.appendChild(card);
        else console.warn('No se encontró .card-pelicula para agregar la tarjeta.');
      } else {
        if (seriesContainer) seriesContainer.appendChild(card);
        else console.warn('No se encontró .card-serie para agregar la tarjeta.');
      }

      form.reset();
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
});
