(function(){
  // Sticky bar shadow on scroll
  const topbar = document.querySelector('.topbar');
  const onScroll = () => {
    if(!topbar) return;
    if(window.scrollY > 6) topbar.classList.add('scrolled');
    else topbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Footer year
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // Scroll reveal
  const els = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if(e.isIntersecting){
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, {threshold: 0.12});
    els.forEach(el => io.observe(el));
  } else {
    els.forEach(el => el.classList.add('in'));
  }

  // Carousels (if present)
  const carousels = {};
  document.querySelectorAll('.carousel[data-carousel-id]').forEach(c => {
    const id = c.getAttribute('data-carousel-id');
    carousels[id] = {index:0, el:c};
  });

  function updateCarousel(id){
    const obj = carousels[id];
    if(!obj) return;
    const track = obj.el.querySelector('.track');
    const slides = obj.el.querySelectorAll('.slide');
    const count = slides.length;
    if(count === 0) return;
    if(obj.index < 0) obj.index = count - 1;
    if(obj.index >= count) obj.index = 0;
    track.style.transform = `translateX(${-obj.index * 100}%)`;
  }

  document.querySelectorAll('.cbtn[data-carousel]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-carousel');
      const dir = btn.getAttribute('data-dir');
      if(!carousels[id]) return;
      carousels[id].index += (dir === 'next' ? 1 : -1);
      updateCarousel(id);
    });
  });

  // Init all
  Object.keys(carousels).forEach(updateCarousel);

  // Swipe support
  function enableSwipe(id){
    const obj = carousels[id];
    if(!obj) return;
    const carousel = obj.el;
    let startX = 0;
    carousel.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].screenX;
    }, {passive:true});
    carousel.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].screenX;
      const dx = endX - startX;
      if(Math.abs(dx) < 40) return;
      obj.index += (dx < 0 ? 1 : -1);
      updateCarousel(id);
    }, {passive:true});
  }
  Object.keys(carousels).forEach(enableSwipe);
})();
