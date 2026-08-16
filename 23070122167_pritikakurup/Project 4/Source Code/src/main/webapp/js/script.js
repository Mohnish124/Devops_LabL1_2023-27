const words = [
    "AI Engineer",
    "Full Stack Developer",
    "DevOps Enthusiast",
    "Software Developer"
];

let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function type() {
    currentWord = words[i];

    if (!isDeleting) {
        document.getElementById("typing").textContent =
            currentWord.substring(0, j++);
    } else {
        document.getElementById("typing").textContent =
            currentWord.substring(0, j--);
    }

    let speed = isDeleting ? 60 : 120;

    if (!isDeleting && j === currentWord.length + 1) {
        speed = 1500;
        isDeleting = true;
    }

    if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
    }

    setTimeout(type, speed);
}

type();