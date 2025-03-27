let slides = document.querySelectorAll(".slide");
let currentIndex = 0;
let autoSlideTimeout;

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const quizContainer = document.querySelector(".quiz-container");
const progressIndicator = document.querySelector(".progress-indicator");

function updateProgress() {
    progressIndicator.textContent = `Tópico ${currentIndex + 1} de ${slides.length}`;
}

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });

    prevButton.style.display = index === 0 ? "none" : "inline-block";
    
    if (index === slides.length - 1) {
        nextButton.style.display = "none";
        quizContainer.style.display = "block";
    } else {
        nextButton.style.display = "inline-block";
        quizContainer.style.display = "none";
    }

    updateProgress();
    resetAutoSlide();
}

function nextSlide() {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
        showSlide(currentIndex);
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        showSlide(currentIndex);
    }
}

function resetAutoSlide() {
    clearTimeout(autoSlideTimeout);
    autoSlideTimeout = setTimeout(nextSlide, 4 * 60 * 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    showSlide(currentIndex);
    resetAutoSlide();
});
