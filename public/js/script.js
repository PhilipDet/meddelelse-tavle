const mins = [0, 10, 20, 30, 40, 50];

const updateTime = 3 * 1000; // 3s

setInterval(() => {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    console.log(`Time: ${hours}:${minutes}:${seconds}`);

    if (mins.includes(minutes)) {
        console.log("Time is divisible by 10");
    }
}, updateTime); // 1000ms = 1s

//randomSlide();

setInterval(() => {
    nextSlide();
}, 5 * 1000); // 10s

async function nextSlide() {
    const slides = document.querySelectorAll(".event");
    let currentSlide = document.querySelector(".event.active");
    let nextSlide = "";
    let next = 0;

    slides.forEach((slide, index) => {
        if (slide === currentSlide) {
            next = index + 1;
        }
    });

    if (next >= slides.length) {
        next = 0;
    }

    //await waitForRemoveTransition(currentSlide);
    currentSlide.classList.add("removeTransition");
    setTimeout(() => {
        currentSlide.classList.remove("removeTransition");
        currentSlide.classList.remove("active");
    }, 1000);

    nextSlide = slides[next];
    nextSlide.classList.add("active");

    await waitForShowTransition(nextSlide);
}

function waitForRemoveTransition(element) {
    return new Promise((resolve) => {
        element.classList.add("removeTransition");
        setTimeout(() => {
            element.classList.remove("removeTransition");
            resolve();
        }, 1000);
    });
}

function waitForShowTransition(element) {
    return new Promise((resolve) => {
        element.classList.add("showTransition");
        setTimeout(() => {
            element.classList.remove("showTransition");
            resolve();
        }, 1000);
    });
}
