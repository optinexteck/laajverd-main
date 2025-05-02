// // // assets/js/carousel.js

// // let isScrolling = false; // Prevent multiple scroll events from firing

// // window.addEventListener("wheel", function (event) {
// //   if (isScrolling) return; // If already scrolling, ignore further scrolls

// //   isScrolling = true; // Set scrolling state to true

// //   // Determine the scroll direction
// //   if (event.deltaY > 0) {
// //     // Scrolling down
// //     window.scrollBy({
// //       top: window.innerHeight * 1.2, // Scroll down by 120vh
// //       behavior: "smooth", // Smooth scroll
// //     });
// //   } else {
// //     // Scrolling up
// //     window.scrollBy({
// //       top: -window.innerHeight * 0.8, // Scroll up by 80vh
// //       behavior: "smooth", // Smooth scroll
// //     });
// //   }

// //   // Reset scrolling state after the scroll animation is complete
// //   setTimeout(() => {
// //     isScrolling = false; // Allow scrolling again
// //   }, 1000); // Adjust timeout duration to match the scroll duration
// // });

// const sections = [
//   "header",
//   "hero",
//   "about",
//   "service",
//   "call-to-action",
//   "services",
//   "footer",
// ];

// let currentSectionIndex = 0; // To track the current section index
// let isScrolling = false; // To prevent multiple rapid events

// document.addEventListener("wheel", (event) => {
//   if (isScrolling) return; // Prevent simultaneous scrolling actions

//   const direction = event.deltaY > 0 ? "down" : "up"; // Determine scroll direction
//   isScrolling = true; // Lock scrolling during execution

//   if (direction === "down" && currentSectionIndex < sections.length - 1) {
//     currentSectionIndex++; // Move to the next section
//   } else if (direction === "up" && currentSectionIndex > 0) {
//     currentSectionIndex--; // Move to the previous section
//   }

//   const targetSection = document.getElementById(sections[currentSectionIndex]);
//   if (targetSection) {
//     targetSection.scrollIntoView({ behavior: "smooth" }); // Scroll to the section
//   }

//   // Allow scrolling again after the transition
//   setTimeout(() => {
//     isScrolling = false;
//   }, 1000); // Adjust timeout based on scroll animation duration
// });

// class PhotoCarousel {
//   constructor() {
//     this.container = document.querySelector(".carousel-track");
//     this.slides = document.querySelectorAll(".carousel-slide");
//     this.dots = document.querySelectorAll(".dot");
//     this.currentIndex = 0;
//     this.slideCount = this.slides.length;

//     this.init();
//   }

//   init() {
//     // Set initial state
//     this.updateSlides();

//     // Add event listeners
//     document
//       .querySelector(".prev")
//       .addEventListener("click", () => this.prevSlide());
//     document
//       .querySelector(".next")
//       .addEventListener("click", () => this.nextSlide());

//     this.dots.forEach((dot, index) => {
//       dot.addEventListener("click", () => this.goToSlide(index));
//     });

//     // Add touch support
//     this.addTouchSupport();

//     // Start autoplay
//     this.startAutoplay();
//   }

//   updateSlides() {
//     const offset = -this.currentIndex * 220; // Reduced from 270 to account for more overlap
//     this.container.style.transform = `translateX(${offset}px)`;

//     // Update active states
//     this.slides.forEach((slide, index) => {
//       const distance = Math.abs(index - this.currentIndex);
//       slide.classList.toggle("active", distance === 0);
//       slide.style.opacity = 1 - distance * 0.3;
//       slide.style.transform = `scale(${1 - distance * 0.1})`;
//       slide.style.zIndex = this.slideCount - distance;
//     });

//     // Update dots
//     this.dots.forEach((dot, index) => {
//       dot.classList.toggle("active", index === this.currentIndex);
//     });
//   }

//   prevSlide() {
//     this.currentIndex =
//       (this.currentIndex - 1 + this.slideCount) % this.slideCount;
//     this.updateSlides();
//   }

//   nextSlide() {
//     this.currentIndex = (this.currentIndex + 1) % this.slideCount;
//     this.updateSlides();
//   }

//   goToSlide(index) {
//     this.currentIndex = index;
//     this.updateSlides();
//   }

//   addTouchSupport() {
//     let startX, moveX;

//     this.container.addEventListener("touchstart", (e) => {
//       startX = e.touches[0].clientX;
//     });

//     this.container.addEventListener("touchmove", (e) => {
//       moveX = e.touches[0].clientX;
//       const diff = moveX - startX;

//       if (Math.abs(diff) > 50) {
//         if (diff > 0) this.prevSlide();
//         else this.nextSlide();
//         startX = moveX;
//       }
//     });
//   }

//   startAutoplay() {
//     setInterval(() => this.nextSlide(), 5000);
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   new PhotoCarousel();
// });

// // Add this class to your existing carousel.js file

// class EpochsCarousel extends PhotoCarousel {
//   constructor() {
//     super();
//     this.updateCounter();
//   }

//   updateSlides() {
//     super.updateSlides();
//     this.updateCounter();
//   }

//   updateCounter() {
//     const current = document.querySelector(".slide-counter .current");
//     const total = document.querySelector(".slide-counter .total");
//     if (current && total) {
//       current.textContent = (this.currentIndex + 1).toString().padStart(2, "0");
//       total.textContent = this.slideCount.toString().padStart(2, "0");
//     }
//   }
// }

// // Initialize both carousels
// document.addEventListener("DOMContentLoaded", () => {
//   new PhotoCarousel();
//   new EpochsCarousel();
// });

// // Add this to your main.js or carousel.js
// document.addEventListener('DOMContentLoaded', function() {
//   const heroCarousel = new bootstrap.Carousel(document.querySelector('#hero-carousel'), {
//     interval: false,  // Disable automatic cycling
//     wrap: true        // Allow continuous loop
//   });

//   // Add event listeners for the custom controls
//   document.querySelector('.carousel-control-prev').addEventListener('click', () => {
//     heroCarousel.prev(); // Move to the previous slide
//   });

//   document.querySelector('.carousel-control-next').addEventListener('click', () => {
//     heroCarousel.next(); // Move to the next slide
//   });
// });

// Carousel data array with placeholder images
const carouselData = [
  {
    image: "./assets/img/Story panel for website/Iwan story/IMG_4238.png",
    placeholder:
      "./assets/img/Story panel for website/Iwan story/IMG_4238_thumb.jpg", // Add low-res versions
    title: "Iwan Story 2",
  },
  // ... rest of your carousel data with placeholder images ...
];

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("hero1-carousel");
  if (!carousel) return;

  const container = carousel.querySelector(".carousel-container");
  const prevButton = carousel.querySelector(".carousel-button.prev");
  const nextButton = carousel.querySelector(".carousel-button.next");

  let currentSlide = 0;
  let isTransitioning = false;
  let autoPlayInterval;
  let loadedImages = new Set();

  // Preload next and previous images
  function preloadAdjacentImages() {
    const nextIndex = (currentSlide + 1) % carouselData.length;
    const prevIndex =
      (currentSlide - 1 + carouselData.length) % carouselData.length;

    [nextIndex, prevIndex].forEach((index) => {
      if (!loadedImages.has(index)) {
        const img = new Image();
        img.src = carouselData[index].image;
        loadedImages.add(index);
      }
    });
  }

  // Create slides with lazy loading and progressive enhancement
  function createSlides() {
    carouselData.forEach((item, index) => {
      const slide = document.createElement("div");
      slide.className = "carousel-slide";
      slide.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        margin: 0;
        padding: 0;
        background-color: #254365;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        opacity: ${index === 0 ? 1 : 0};
        transition: opacity 0.5s ease;
        z-index: ${index === 0 ? 1 : 0};
        display: flex;
        justify-content: center;
        align-items: center;
      `;

      // Load placeholder first
      if (item.placeholder) {
        slide.style.backgroundImage = `url('${item.placeholder}')`;
      }

      // Only load the first image immediately
      if (index === 0) {
        const img = new Image();
        img.onload = () => {
          slide.style.backgroundImage = `url('${item.image}')`;
        };
        img.src = item.image;
        loadedImages.add(0);
      }

      slide.setAttribute("data-index", index);
      container.appendChild(slide);
    });
  }

  // Handle slide transitions with progressive loading
  function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    const slides = container.querySelectorAll(".carousel-slide");
    const currentSlideElement = slides[currentSlide];
    const nextSlideElement = slides[index];

    if (currentSlideElement && nextSlideElement) {
      // Load the image if not already loaded
      if (!loadedImages.has(index)) {
        const img = new Image();
        img.onload = () => {
          nextSlideElement.style.backgroundImage = `url('${carouselData[index].image}')`;
        };
        img.src = carouselData[index].image;
        loadedImages.add(index);
      }

      currentSlideElement.style.opacity = "0";
      currentSlideElement.style.zIndex = "1";
      nextSlideElement.style.opacity = "1";
      nextSlideElement.style.zIndex = "2";

      setTimeout(() => {
        currentSlide = index;
        isTransitioning = false;
        preloadAdjacentImages();
      }, 500);
    }
  }

  // Rest of your existing functions (nextSlide, prevSlide, etc.)
  // ... existing code ...

  // Initialize carousel
  createSlides();
  startAutoplay();
});
