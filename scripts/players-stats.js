// const newkey = "ba2f872c6271439f95dc05a1cd5ce34e";

// const season = "2025";

// async function playGameDate() {
//     const api = `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/${season}?key=${newkey}`;

//     try {
//         const res = await fetch(api);

//         if (!res.ok) throw Error(await res.text());

//         const showResult = await res.json();
//         console.log(showResult);

//     } catch (error) {
//         console.log("API ERROR:", error);
//     }
// }

// playGameDate();


const newkey = "ba2f872c6271439f95dc05a1cd5ce34e";

// Set the season (NBA seasons start in October)
const season = 2026;

async function getPlayerSeasonStats() {
    const api = `https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/${season}?key=${newkey}`;

    try {
        const res = await fetch(api);
        if (!res.ok) throw Error(await res.text());

        const data = await res.json();
        // console.log(data); // Check the API response

        displayPlayerStats(data);
    } catch (error) {
        console.log("API ERROR:", error);
    }
}

function displayPlayerStats(players) {
    const tableBody = document.getElementById("stats-table");
    tableBody.innerHTML = ""; // Clear previous data

    players.sort((a, b) => {
        const nameA = a.Name.toUpperCase(); // ignore case
        const nameB = b.Name.toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    players.forEach(player => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${player.Name}</td>
            <td>${player.Team}</td>
            <td>${player.Points}</td>
            <td>${player.Rebounds}</td>
            <td>${player.Assists}</td>
            <td>${player.Steals}</td>
            <td>${player.BlockedShots}</td>
            <td>${player.Games}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Call the function
getPlayerSeasonStats();
