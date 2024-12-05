
let isPaused = false;

const slider = document.querySelector('.slider-frame');
const images = document.querySelectorAll('.img-container');
const totalImages = images.length;

let currentImage = 0;

const interval = 3000;

function animateSlider() {
    if (!isPaused) {
        const translateX = -currentImage * slider.offsetWidth;
        slider.querySelector('.slide-images').style.transform = `translateX(${translateX}px)`;
        currentImage = (currentImage + 1) % totalImages;
    }
}

setInterval(animateSlider, interval);

images.forEach((image) => {
    image.addEventListener('mouseover', () => {
        isPaused = true;
    });

    image.addEventListener('mouseout', () => {
        isPaused = false;
    });
});


document.getElementById('categoria').addEventListener('change', function () {
    const categoria = this.value;
    const receitas = document.querySelectorAll('.receita-item');

    receitas.forEach(function (receita) {
        if (categoria === 'todas' || receita.getAttribute('data-categoria') === categoria) {
            receita.style.display = 'block';
        } else {
            receita.style.display = 'none';
        }
    });
});

document.getElementById('form-receita').addEventListener('submit', function (e) {
    e.preventDefault();

    const nomeAutor = document.getElementById('nome-autor').value;
    const nomeReceita = document.getElementById('nome-receita').value;
    const categoriaReceita = document.getElementById('categoria-receita').value;
    const descricaoReceita = document.getElementById('descricao-receita').value;
    const imagemReceita = document.getElementById('imagem-receita').files[0];
    const linkReceita = document.getElementById('link-receita').value; 

    if (imagemReceita) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const fileType = imagemReceita.type;
            const fileSize = imagemReceita.size;

            if (fileType !== 'image/jpeg' && fileType !== 'image/png') {
                alert('Apenas imagens JPG ou PNG');
                return;
            }

            if (fileSize > 1024 * 1024 * 2) { 
                alert('Adicione uma imagem com menos de 2MB');
                return;
            }

            const novaReceita = document.createElement('div');
            novaReceita.classList.add('receita-item');
            novaReceita.setAttribute('data-categoria', categoriaReceita);
            novaReceita.innerHTML = 
                `<a href="${linkReceita}" target="_blank">
                    <img src="${e.target.result}" alt="${nomeReceita}">
                </a>
                <h3>${nomeReceita}</h3>
                <p>${descricaoReceita}</p>
                <p><strong>Autor:</strong> ${nomeAutor}</p>
            `;

            document.querySelector('.receitas-lista').appendChild(novaReceita);

            document.getElementById('form-receita').reset();
        };
        reader.readAsDataURL(imagemReceita);
    }
});


let currentSlide = 0;
const slides = document.querySelectorAll('.receita-item');
const totalSlides = slides.length;

const sliderReceitas = document.querySelector('.slider-receitas');
const receitas = document.querySelectorAll('.receita-item');
const btnAnterior = document.getElementById('btn-anterior');
const btnProximo = document.getElementById('btn-proximo');

const maxSlide = Math.floor(sliderReceitas.offsetWidth / receitas[0].offsetWidth); 

btnAnterior.disabled = true; 

function updateSlider() {
    const slideWidth = sliderReceitas.offsetWidth / maxSlide; 
    sliderReceitas.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

function updateButtons() {
    btnAnterior.disabled = currentSlide === 0;
    btnProximo.disabled = currentSlide >= maxSlide; 
}

btnProximo.addEventListener('click', () => {
    if (currentSlide < maxSlide) {
        currentSlide++;
        updateSlider();
    }
    updateButtons();
});

btnAnterior.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
    }
    updateButtons();
});


window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    const headerPosition = header.offsetTop;

    if (window.pageYOffset > headerPosition) {
        header.classList.add('header-fixo');
    } else {
        header.classList.remove('header-fixo');
    }
});