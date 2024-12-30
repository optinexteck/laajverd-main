document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.rail-park-track');
    const slides = document.querySelectorAll('.rail-park-slide');
    
    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth + 20;
    
    function updateSlider() {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    
    // Optional: Auto-play
    setInterval(() => {
        currentIndex = (currentIndex + 1) % (slides.length - 2);
        updateSlider();
    }, 5000);
});