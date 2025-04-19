const links = document.querySelectorAll('a[href^="#"]');

links.forEach(scroll => {
  scroll.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = scroll.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
      behavior: 'smooth',  
      block: 'start',
    });
  });
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

  function expandImage(img) {
    const fullscreen = document.createElement('div');
    fullscreen.style.position = 'fixed';
    fullscreen.style.top = '0';
    fullscreen.style.left = '0';
    fullscreen.style.width = '100vw';
    fullscreen.style.height = '100vh';
    fullscreen.style.background = 'rgba(0, 0, 0, 0.9)';
    fullscreen.style.display = 'flex';
    fullscreen.style.justifyContent = 'center';
    fullscreen.style.alignItems = 'center';
    fullscreen.style.zIndex = '9999';
    fullscreen.style.cursor = 'zoom-out';
    fullscreen.style.animation = 'fadeIn 0.3s ease';
    fullscreen.style.flexDirection = 'column';  // Para colocar botões
  
    // O container de imagens
    const images = img.parentElement.children;  // Todas as imagens do carrossel
    let currentImage = img;  // A imagem que foi clicada inicialmente
  
    // Função para mudar a imagem no fullscreen
    function changeImage(newImage) {
      const imgElement = fullscreen.querySelector('img');
      imgElement.src = newImage.src;
      currentImage = newImage; // Atualiza a imagem atual
    }
  
    // Botão de Navegação para a Imagem Anterior
    const prevButton = document.createElement('button');
    prevButton.textContent = '❮';
    prevButton.style.position = 'absolute';
    prevButton.style.left = '20px';
    prevButton.style.top = '50%';
    prevButton.style.transform = 'translateY(-50%)';
    prevButton.style.fontSize = '2em';
    prevButton.style.background = 'none';
    prevButton.style.border = 'none';
    prevButton.style.color = '#fff';
    prevButton.style.cursor = 'pointer';
    prevButton.addEventListener('click', () => {
      const prevImage = currentImage.previousElementSibling || images[images.length - 1];
      changeImage(prevImage);
    });
  
    // Botão de Navegação para a Imagem Seguinte
    const nextButton = document.createElement('button');
    nextButton.textContent = '❯';
    nextButton.style.position = 'absolute';
    nextButton.style.right = '20px';
    nextButton.style.top = '50%';
    nextButton.style.transform = 'translateY(-50%)';
    nextButton.style.fontSize = '2em';
    nextButton.style.background = 'none';
    nextButton.style.border = 'none';
    nextButton.style.color = '#fff';
    nextButton.style.cursor = 'pointer';
    nextButton.addEventListener('click', () => {
      const nextImage = currentImage.nextElementSibling || images[0];
      changeImage(nextImage);
    });
  
    // Elemento da imagem expandida
    fullscreen.innerHTML = `
      <img src="${img.src}" 
           style="max-width: 90vw; max-height: 90vh; width: auto; height: auto; 
           border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.6); object-fit: contain; 
           animation: zoomIn 0.3s ease;">
    `;
  
    fullscreen.appendChild(prevButton);
    fullscreen.appendChild(nextButton);
  
    // Fecha o fullscreen se clicar fora da imagem
    fullscreen.addEventListener('click', (e) => {
      if (e.target === fullscreen) {
        document.body.removeChild(fullscreen);
      }
    });
  
    // Adiciona o fullscreen ao body
    document.body.appendChild(fullscreen);
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



  const tabMenu = document.querySelectorAll(".js-tabmenu img");
  const tabContent = document.querySelectorAll(".tab-item");

  tabMenu.forEach((item, index) => {
    item.addEventListener("click", () => {
      
      tabContent.forEach(content => content.classList.remove("active"));
      tabMenu.forEach(img => img.classList.remove("active"));

      
      tabContent[index].classList.add("active");
      item.classList.add("active");
    });
  });