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

    let currentPage = 1;
    let searchQuery = "";

    const tableBody = document.querySelector("#viewPlayers table tbody");
    const searchInput = document.getElementById("searchInput");
    const pageNumber = document.getElementById("pageNumber");

    document.getElementById("prevBtn").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            playersFetch();
        }
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
        currentPage++;
        playersFetch();
    });

    searchInput.addEventListener("input", () => {
        searchQuery = searchInput.value.trim();
        currentPage = 1; // Reset to first page on new search
        playersFetch();
    });
    // API fetch for players
    const myKey = "f5274ffe-a315-419e-b35a-7dfd9e01dfb6";

    async function playersFetch() {
        const api = `https://api.balldontlie.io/v1/players?page=${currentPage}&per_page=25&search=${searchQuery}`;
        // const api = `https://v2.nba.api-sports.io/players`
        try {
            const res = await fetch(api, {
                headers: {
                    "Authorization": myKey
                }
            });
            if (res.ok) {
                const showResult = await res.json();
                // console.log("Players data:", showResult);
                // Process your players data here

                pageNumber.textContent = `Page ${currentPage}`;
                tableBody.innerHTML = ""; // Clear previous results

                showResult.data.forEach(player => {
                    const info = document.createElement("tr");
                    info.innerHTML = `
                        <td>${player.first_name}</td>
                        <td>${player.last_name}</td>
                        <td>${player.position}</td>
                        <td>${player.team.full_name}</td>
                        <td>${player.height}</td>
                        <td>${player.weight}</td>
                        <td>${player.jersey_number}</td>
                        <td>${player.country}</td> `;

                    tableBody.appendChild(info);


                    // console.log(`Player: ${player.first_name} ${player.last_name}, Team: ${player.team.full_name}`);
                });
            } else {
                throw Error(await res.text());
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    }

    playersFetch();
});
