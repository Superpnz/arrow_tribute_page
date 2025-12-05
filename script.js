const images = [
    "Image/Оливер_с_Сарой.webp",
    "Image/Оливер_с_Слейдом.webp",
    "Image/Оливер_с_Флешем.webp",
    "Image/Arrow_(cast).webp",
    "Image/новая_команда.webp",
    "Image/лорел_оливер_рой.webp"
];

const slider = document.querySelector("[data-slider]");
const prevBtn = document.querySelector("[data-btn-prev]");
const nextBtn = document.querySelector("[data-btn-next]");

let currentIndex = 0;
const ANIMATION_TIME = 0.5;

const setupSlides = () => {
    images.forEach((imageUrl, index) => {
        const img = document.createElement("img");
        img.classList.add('image')
        img.src = imageUrl;
        img.dataset.index = index;
        img.alt = `slide ${index + 1}`;
        slider.appendChild(img);
    })
    const firstClone = slider.firstElementChild.cloneNode(true);
    const lastClone = slider.lastElementChild.cloneNode(true);
    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slider.firstChild);
}
const initSlider = () => {
    const slideWidth = slider.firstElementChild.offsetWidth;
    slider.style.transition = `none`;
    slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
}
const goToPrevSlide = () => {
    const slideWidth = slider.firstElementChild.offsetWidth;
    currentIndex--;
    slider.style.transition = `translate ${ANIMATION_TIME}s ease-in-out`;
    slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
    slider.addEventListener(
        "transitionend",
        () => {
            if (currentIndex < 0) {
                currentIndex = images.length - 1;
                slider.style.transition = "none";
                slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
            }
        },
        { once: true }
    )
}
const goToNextSlide = () => {
    const slideWidth = slider.firstElementChild.offsetWidth;
    currentIndex++;
    slider.style.transition = `translate ${ANIMATION_TIME}s ease-in-out`;
    slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
    if (currentIndex >= images.length) {
        nextBtn.disabled = true;
    }
    slider.addEventListener(
        "transitionend",
        () => {
            if (currentIndex >= images.length) {
                currentIndex = 0;
                slider.style.transition = "none";
                slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
                nextBtn.disabled = false;
            }
        },
        { once: true }
    )
}

prevBtn.addEventListener("click", goToPrevSlide);
nextBtn.addEventListener("click", goToNextSlide);
setupSlides();
initSlider();
window.addEventListener("resize", initSlider);