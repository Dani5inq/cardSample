const carousel = document.querySelector(".carousel");
const wrapper = document.querySelector(".wrapper");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = document.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false,
  startX,
  startScrollLeft,
  timeoutId;
// Gets the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  });
});
const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};
const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const autoPlay = () => {
  if (window.innerWidth < 800) return;
  //Autoplay after 2500ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

const infiniteScroll = () => {
  //IF THE CAROUSEL IS AT THE BEGINNING, SCROLL TO THE END
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  //if the carousel is at the end scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  //this will clear the existing tiemout & start autoplay if the mouse is not hovering ou=ver the carousel
  if (!wrapper.matches(":hover")) autoPlay();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

/*comments:
console.log(e.pageX);  e.pageX returns the horizontal coordinate of the mouse pointer
"scrollLeft sets or returns the number of pixel an element's content is scrolled
horizontally"
adding the classList  carousel.classList.add("dragging"); and also updateing the css 
prevents the text and images from being selected when being dragged , also update the html add draggable="false"
startX = e.pageX;
  startScrollLeft = carousel.scrollLeft; they both record the initial cursor and scroll POSITION OF THE carousel
  
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX) this line  updates the scroll
  position of the carousel based on the cursor movement*/
