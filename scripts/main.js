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


//Fetch API

const myKey = "f5274ffe-a315-419e-b35a-7dfd9e01dfb6";
const game = document.getElementById("games");
const preview = document.getElementById("preview");
const highlight = document.getElementById("highlight");


async function apiFectch(currentYear) {
    const BalldontlieAPI = `https://api.balldontlie.io/v1/games/${currentYear}`;

    try {
        const response = await fetch(BalldontlieAPI, {
            headers: {
                "Authorization": myKey
            }
        });
        if (response.ok) {
            const info = await response.json();
            console.log(info);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFectch(2025);



