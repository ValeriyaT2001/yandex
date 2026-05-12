// ============================================
// PARTICIPANTS CAROUSEL (Infinite, Auto 4s)
// ============================================
const partTrack = document.getElementById('partTrack');
const partPrev = document.getElementById('partPrev');
const partNext = document.getElementById('partNext');
const partCurrent = document.getElementById('partCurrent');

let partIndex = 2; // Start at 3rd (index 2) as shown in design
let autoSlideInterval;
let itemsPerView = getItemsPerView();
const totalParticipants = 6;

function getItemsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
}

function updateCarousel() {
    const effectiveIndex = ((partIndex % totalParticipants) + totalParticipants) % totalParticipants;
    let offset = -effectiveIndex * (100 / itemsPerView);
    partTrack.style.transform = `translateX(${offset}%)`;
    partCurrent.textContent = effectiveIndex + 1;
}

function nextSlide() {
    partIndex = (partIndex + 1) % totalParticipants;
    updateCarousel();
}

function prevSlide() {
    partIndex = (partIndex - 1 + totalParticipants) % totalParticipants;
    updateCarousel();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

partNext.addEventListener('click', () => {
    stopAutoSlide();
    nextSlide();
    startAutoSlide();
});

partPrev.addEventListener('click', () => {
    stopAutoSlide();
    prevSlide();
    startAutoSlide();
});

window.addEventListener('resize', () => {
    itemsPerView = getItemsPerView();
    updateCarousel();
});

// Initialize
updateCarousel();
startAutoSlide();

// Pause on hover
partTrack.addEventListener('mouseenter', stopAutoSlide);
partTrack.addEventListener('mouseleave', startAutoSlide);

// ============================================
// STAGES CAROUSEL (Non-loop, Manual)
// ============================================
const stagesItems = document.querySelectorAll('#stagesMobile .stages__item');
const stagesPrev = document.getElementById('stagesPrev');
const stagesNext = document.getElementById('stagesNext');
const stagesCurrent = document.getElementById('stagesCurrent');

let stagesIndex = 0;
const totalStages = stagesItems.length;

function updateStages() {
    stagesItems.forEach((item, i) => {
        item.classList.toggle('active', i === stagesIndex);
    });
    stagesCurrent.textContent = stagesIndex + 1;
    stagesPrev.disabled = stagesIndex === 0;
    stagesNext.disabled = stagesIndex === totalStages - 1;
}

stagesNext.addEventListener('click', () => {
    if (stagesIndex < totalStages - 1) {
        stagesIndex++;
        updateStages();
    }
});

stagesPrev.addEventListener('click', () => {
    if (stagesIndex > 0) {
        stagesIndex--;
        updateStages();
    }
});

updateStages();

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.lecture, .session, .stages, .participants').forEach(el => {
    observer.observe(el);
});

// ============================================
// SMOOTH SCROLL FOR ANCHORS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});