// Screen size snippet
const reportWindowSize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    document.getElementById('windowSize').innerHTML = `${width}px by ${height}px`;
}

/*
 * Navigation Interactions
 * Toggle the mobile icon to show and hide the main navigation
 * Toggle the dropdown button to show and hide the dropdown content
*/
document.addEventListener('DOMContentLoaded', () => {
    const mobileToggler = document.querySelector('.navbar-toggler');
    const navigation = document.querySelector(mobileToggler.getAttribute('data-target'));

    let dropdownToggle = document.querySelectorAll('.dropdown-toggle');
    
    mobileToggler.addEventListener('click', () => navigation.classList.toggle('collapse'))

    dropdownToggle.forEach((dropdown) => {
        dropdown.addEventListener('click', (toggler) => {
            let dropdownElement = dropdown.parentElement;
            dropdownElement.classList.toggle('collapse');
        })
    })
});

const setCarouselEventListeners = (carousel) => {
    // The code below helps us know if there are more than just one carousel on the page
    let keys = Object.keys(carousel);

        // run through each of the keys available, this is similar to a for loop
        keys.forEach((key) => {

            // get the value of the id for the carousel that we are working on
            const current = carousel[key].getAttribute('id');

            // get all the slides that are available using the .carousel-item class selector
            const slides = document.getElementById(current).querySelectorAll('.carousel-item');
            
            // the reason why we are counting the number of slides and then subtracting 1 is because
            // JavaScript starts enumerating with zero. If we use the actual lenght, then it will
            // expect a fourth slide to be present later on
            const slidesCount = slides.length - 1;

            // select the previous and next button
            const prev = document.getElementById(current).querySelector('.carousel-control-prev');
            const next = document.getElementById(current).querySelector('.carousel-control-next');
            
            // function to get the current slide that we are in
            const currentSlide = () => {
                // go through each one of the slides and find the slide that has a class of
                // "active". Once that's found then find the position of that slide and return that value
                return [...slides].map(n => n.classList.contains('active')).findIndex(e => e === true);
            };

            // handles the actual switch between one slide to the next
            const switchSlides = (current, nextSlide) => {
                // removes the class of "active" for the current slide
                // adds the class of "active" to the next slide
                [current, nextSlide].forEach(n => slides[n].classList.toggle('active'))
            }
            
            // handles how the slide moves
            const manageSlides = (direction) => {
                let current = currentSlide();
                let setDirection = direction === 'prev' ? -1 : 1;
                let nextSlide = current + setDirection;

                // check if the slide direction is lower than the first or greater than the last slide
                // if so, handle it gracefully
                if(nextSlide < 0 || nextSlide > slidesCount){
                    nextSlide = nextSlide < 0 ? slidesCount : 0;
                }

                // actually switch the slides
                switchSlides(current, nextSlide);
            }

            // added event listeners for the previous and next buttons
            prev.addEventListener('click', () => manageSlides('prev'));
            next.addEventListener('click', () => manageSlides('next'));
        }
    )
}

document.addEventListener('DOMContentLoaded', () => {

    let carousel = document.getElementsByClassName('carousel') || null;

    // check to see if a carousel exists on the page before trying to run this code
    if(carousel){

        // if the carousel exists then start getting all the elements for the carousel
        setCarouselEventListeners(carousel);
    }
})

/* 
    * Ensure that the DOM is loaded before running
    * the functions inside
*/
document.addEventListener('DOMContentLoaded', () => {
    reportWindowSize();
    window.onresize = reportWindowSize;
});