

// ...

// const search = document.querySelector(".search-box input");
// const images = document.querySelectorAll(".image-box");
//
// search.addEventListener("keyup", e =>{
//     if(e.key == "Enter"){
//         let searcValue = search.value,
//             value = searcValue.toLowerCase();
//             images.forEach(image =>{
//                 if(value === image.dataset.name){ //matching value with getting attribute of images
//                     return image.style.display = "block";
//                 }
//                 image.style.display = "none";
//             });
//     }
// });
//                                                                 clear value bi--function error may be..., sort tomorrow
//     if(search.value != "") return;
//
//     images.forEach(image =>{
//         image.style.display = "block";
//     })
// })

// ...
// stop to sort
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);


// stop to sort
// gallery
const allImages = document.querySelectorAll(".imagess .imgs");
const lightbox = document.querySelector(".lightbox");
const closeImgBtn = lightbox.querySelector(".close-icon");
const previewImage = document.getElementById("previewImage");

allImages.forEach(img => {
    img.addEventListener("click", () => showLightbox(img.querySelector("img").src));
});

const showLightbox = (img) => {
    previewImage.src = img;
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
};

closeImgBtn.addEventListener("click", () => {
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";
});
// stop to sort
// ....
// slow_motion_video
// Get the video element
var video = document.getElementById('mainVideo');

// Options for the Intersection Observer
var options = {
  root: null, // Use the viewport as the root
  rootMargin: '0px', // No margin around the root
  threshold: 0.5 // Trigger when 50% of the video is in the viewport
};

// Callback function to handle intersection changes
var callback = function(entries, observer) {
  entries.forEach(function(entry) {
    // If the video is in the viewport
    if (entry.isIntersecting) {
      video.muted = false; // Unmute the video
      video.play(); // Autoplay the video
    } else {
      video.pause(); // Pause the video if not in the viewport
    }
  });
};

// Create the Intersection Observer with the callback and options
var observer = new IntersectionObserver(callback, options);

// Start observing the video element
observer.observe(video);
// stop to sort
