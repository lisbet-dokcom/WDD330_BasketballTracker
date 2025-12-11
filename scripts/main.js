const currentYear = new Date().getFullYear();
document.getElementById("currentyear").innerHTML = currentYear;

const hamButton = document.querySelector("#menu");
const nav = document.querySelector("nav");
hamButton.addEventListener("click", () => {
    nav.classList.toggle('open');
    hamButton.classList.toggle('open');
});

document.querySelectorAll("nav").forEach(n => n.addEventListener("click", () => {
    nav.classList.remove('open');
    hamButton.classList.remove('open');
}));