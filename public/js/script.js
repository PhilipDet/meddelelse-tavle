const mins = [0, 10, 20, 30, 40, 50];
let hasUpdated = false;
const updateTime = 5 * 1000; // 3s

let env = {};

fetchConfig();
fetchEvents();

setInterval(async () => {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    //console.log(`Time: ${hours}:${minutes}:${seconds}`);

    if (mins.includes(minutes) && !hasUpdated) {
        fetchEvents();
        hasUpdated = true;
    } else if (!mins.includes(minutes)) {
        hasUpdated = false;
    }
}, updateTime);

setInterval(() => {
    nextSlide();
}, 7.5 * 1000); // 5s

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

function fetchEvents() {
    fetch("/api/events")
        .then((response) => response.json())
        .then((events) => {
            const eventList = document.getElementById("slider-content");
            eventList.innerHTML = "";
            console.log(events);

            events.forEach((event, index) => {
                const eventElement = document.createElement("div");
                eventElement.classList.add("event");
                if (index === 0) {
                    eventElement.classList.add("active");
                }
                eventElement.innerHTML = `
                    <div class="event-info">
                        <h1>${event.title}</h1>
                        <p>${event.description}</p>
                    </div>
                    <img src="${env.SUPABASE_URL}/storage/v1/object/public/images/${event.image}" alt="${event.title}">
                `;
                eventList.appendChild(eventElement);
            });
        });
}

function fetchConfig() {
    fetch("/config")
        .then((response) => response.json())
        .then((config) => {
            env = config.env;
        });
}
