// Scroll suave para âncoras
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(scroll => {
  scroll.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = scroll.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  if (mobileMenu.style.display === "flex") {
    mobileMenu.style.display = "none";
  } else {
    mobileMenu.style.display = "flex";
  }
});



// Ativa carrossel para todos os blocos
document.querySelectorAll('.carrossel').forEach(carrossel => {
  let index = 0;
  const slides = carrossel.querySelectorAll('.slide img');
  const prevBtn = carrossel.querySelector('.prev');
  const nextBtn = carrossel.querySelector('.next');

  function showSlide(i) {
    slides.forEach((img, idx) => {
      img.classList.toggle('active', idx === i);
    });
  }

  showSlide(index);

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  });
});

// Expansão de imagem em fullscreen (com drag e teclado)
function expandImage(img) {
  const fullscreen = document.createElement('div');
  fullscreen.style = `
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    display: flex; justify-content: center; align-items: center;
    z-index: 9999;
    cursor: zoom-out;
    animation: fadeIn 0.3s ease;
    flex-direction: column;
  `;

  const images = img.parentElement.children;
  let currentImage = img;

  function changeImage(newImage) {
    const imgElement = fullscreen.querySelector('img');
    imgElement.src = newImage.src;
    currentImage = newImage;
  }

  const prevButton = document.createElement('button');
  prevButton.textContent = '❮';
  prevButton.style = `
    position: absolute; left: 20px; top: 50%;
    transform: translateY(-50%);
    font-size: 2em; background: none; border: none;
    color: #fff; cursor: pointer;
  `;
  prevButton.addEventListener('click', showPrevImage);

  const nextButton = document.createElement('button');
  nextButton.textContent = '❯';
  nextButton.style = `
    position: absolute; right: 20px; top: 50%;
    transform: translateY(-50%);
    font-size: 2em; background: none; border: none;
    color: #fff; cursor: pointer;
  `;
  nextButton.addEventListener('click', showNextImage);

  function showPrevImage() {
    const prevImage = currentImage.previousElementSibling || images[images.length - 1];
    changeImage(prevImage);
  }

  function showNextImage() {
    const nextImage = currentImage.nextElementSibling || images[0];
    changeImage(nextImage);
  }

  fullscreen.innerHTML = `
    <img src="${img.src}" 
         style="max-width: 90vw; max-height: 90vh; border-radius: 10px; 
         box-shadow: 0 0 20px rgba(0,0,0,0.6); object-fit: contain;
         animation: zoomIn 0.3s ease;">
  `;

  fullscreen.appendChild(prevButton);
  fullscreen.appendChild(nextButton);

  fullscreen.addEventListener('click', (e) => {
    if (e.target === fullscreen) {
      closeFullscreen();
    }
  });

  document.body.appendChild(fullscreen);

  function closeFullscreen() {
    document.body.removeChild(fullscreen);
    document.removeEventListener('keydown', handleKey);
  }

  // Navegação com teclado
  function handleKey(e) {
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'Escape') closeFullscreen();
  }
  document.addEventListener('keydown', handleKey);

  // Drag com mouse
  let startX = 0;
  let isDragging = false;

  fullscreen.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
  });

  fullscreen.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    const diffX = e.clientX - startX;
    if (diffX > 50) showPrevImage();
    if (diffX < -50) showNextImage();
    isDragging = false;
  });

  fullscreen.addEventListener('mousemove', (e) => {
    if (isDragging) e.preventDefault();
  });
}

// Animações
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes zoomIn {
    from { transform: scale(0.95); opacity: 0.5; }
    to { transform: scale(1); opacity: 1; }
  }
`;
document.head.appendChild(style);

// Tabs de projetos
const tabMenu = document.querySelectorAll(".js-tabmenu img");
const tabContent = document.querySelectorAll(".tab-item");

tabMenu.forEach((item, index) => {
  item.addEventListener("click", () => {
    tabContent.forEach(content => content.classList.remove("active"));
    tabMenu.forEach(img => img.classList.remove("active"));

    tabContent[index].classList.add("active");
    item.classList.add("active");

    initializeSwipes(); // Reativa o touch quando muda de projeto
  });
});

// Swipe touch para mobile
function setupTouchSwipe(slideContainer) {
  if (!slideContainer || slideContainer.dataset.touchInitialized === 'true') return;

  let touchStartX = 0;
  let touchEndX = 0;

  slideContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slideContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;

    if (touchEndX < touchStartX - 30) {
      slideContainer.closest('.container').querySelector('.next').click();
    }
    if (touchEndX > touchStartX + 30) {
      slideContainer.closest('.container').querySelector('.prev').click();
    }
  });

  slideContainer.dataset.touchInitialized = 'true';
}

// Inicializa o touch swipe para carrossel ativo
function initializeSwipes() {
  const activeTabs = document.querySelectorAll('.tab-item.active');
  activeTabs.forEach(tab => {
    const slideContainer = tab.querySelector('.slide');
    setupTouchSwipe(slideContainer);
  });
}

// Inicialização inicial
initializeSwipes();