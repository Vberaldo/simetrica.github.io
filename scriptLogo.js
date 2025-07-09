const btnVoltar = document.querySelector('.logo-voltar');
const btnAvancar = document.querySelector('.logo-avancar');
const listaLogos = document.querySelector('.projetos-imglogo');
let scrollIndex = 0;
const logosPorTela = 8;
const deslocamento = 5;

// Pega a largura de 1 logo + gap
const logo = listaLogos.querySelector('img');
const logoWidth = logo.offsetWidth;
const gap = parseInt(getComputedStyle(listaLogos).gap) || 0;
const totalWidthPorLogo = logoWidth + gap;

// Função de scroll suave
function atualizarScroll() {
  const scrollLeft = scrollIndex * totalWidthPorLogo;
  listaLogos.scrollTo({
    left: scrollLeft,
    behavior: 'smooth'
  });
}

// Botão VOLTAR
btnVoltar.addEventListener('click', () => {
  if (scrollIndex === 0) {
    // Volta para o final
    scrollIndex = listaLogos.children.length - logosPorTela;
  } else {
    scrollIndex = Math.max(scrollIndex - deslocamento, 0);
  }
  atualizarScroll();
});

// Botão AVANÇAR
btnAvancar.addEventListener('click', () => {
  const maxScrollIndex = listaLogos.children.length - logosPorTela;
  if (scrollIndex >= maxScrollIndex) {
    // Volta para o começo
    scrollIndex = 0;
  } else {
    scrollIndex = Math.min(scrollIndex + deslocamento, maxScrollIndex);
  }
  atualizarScroll();
});