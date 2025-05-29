class ImageSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dotsContainer = document.querySelector('.dots');
        this.counter = document.querySelector('.counter');
        this.progress = document.querySelector('.progress');
        this.playPauseBtn = document.querySelector('.play-pause');
        this.currentIndex = 0;
        this.interval = null;
        this.isPlaying = false;

        this.initDots();
        this.updateSlider();
        this.addEvents();
    }

    initDots() {
        this.dotsContainer.innerHTML = '';
        this.slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        });
    }

    updateSlider() {
        const offset = -this.currentIndex * 100;
        document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
        document.querySelectorAll('.dots span').forEach(dot => dot.classList.remove('active'));
        if (this.dotsContainer.children[this.currentIndex])
            this.dotsContainer.children[this.currentIndex].classList.add('active');

        this.counter.textContent = `${this.currentIndex + 1} / ${this.slides.length}`;
        this.progress.style.width = `${((this.currentIndex + 1) / this.slides.length) * 100}%`;
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlider();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
    }

    toggleAutoplay() {
        if (this.isPlaying) {
            clearInterval(this.interval);
            this.playPauseBtn.textContent = '▶';
        } else {
            this.interval = setInterval(() => this.nextSlide(), 2000);
            this.playPauseBtn.textContent = '⏸';
        }
        this.isPlaying = !this.isPlaying;
    }

    addEvents() {
        document.querySelector('.next').addEventListener('click', () => this.nextSlide());
        document.querySelector('.prev').addEventListener('click', () => this.prevSlide());
        this.playPauseBtn.addEventListener('click', () => this.toggleAutoplay());

        // Swipe support
        let startX = 0;
        const slider = document.querySelector('.slides');

        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        slider.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (diff > 50) this.nextSlide();
            else if (diff < -50) this.prevSlide();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new ImageSlider());
