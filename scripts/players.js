// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Button click handler
    const playersBtn = document.getElementById("playersbtn");

    if (playersBtn) {
        playersBtn.addEventListener("click", () => {
            window.location.href = "player.html";
        });
        console.log("Button event listener added successfully!");
    } else {
        console.warn("playersbtn element not found. Skipping button setup.");
    }

    // API fetch for players
    const myKey = "f5274ffe-a315-419e-b35a-7dfd9e01dfb6";

    async function playersFetch() {
        const api = `https://api.balldontlie.io/v1/players`;
        try {
            const res = await fetch(api, {
                headers: {
                    "Authorization": myKey
                }
            });
            if (res.ok) {
                const showResult = await res.json();
                console.log("Players data:", showResult);
                // Process your players data here
            } else {
                throw Error(await res.text());
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    playersFetch();
});