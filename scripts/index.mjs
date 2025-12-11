//Fetch API

const myKey = "f5274ffe-a315-419e-b35a-7dfd9e01dfb6";

async function apiFectch() {
    const today = new Date().toISOString().split("T")[0];
    const BalldontlieAPI = `https://api.balldontlie.io/v1/games?start_date=${today}&end_date=${today}`;

    try {
        const response = await fetch(BalldontlieAPI, {
            headers: {
                "Authorization": myKey
            }
        });
        if (response.ok) {
            const info = await response.json();
            // console.log(info);

            const shuffled = info.data.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 4);

            const table = document.querySelector("#games table");

            selected.forEach(game => {
                const row = document.createElement("tr");
                const gameDate = new Date(game.date);

                row.innerHTML = `
                    <td>${new Date(game.date).toLocaleDateString('en-US', { weekday: 'short' })}</td>
                    <td>${new Date(game.date).toLocaleDateString('en-US', {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                })}</td>
                    <td>${game.visitor_team.name}</td>
                    <td>${game.home_team.name}</td>
                <td>${gameDate.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Africa/Lagos',
                    hour12: true
                })} WAT</td>
                    
                `;
                table.appendChild(row);
            });
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// YOuTube

// async function youTubeFetch() {
//     const YouTubeAPI = `AIzaSyDU-bfCgQaafDprKYScSNi4VCOx6OcdwoY`;

//     try {
//         const response = await fetch()
//     }
// }

// const YOUTUBE_API_KEY = "AIzaSyDU-bfCgQaafDprKYScSNi4VCOx6OcdwoY";
const YOUTUBE_API_KEY = "AIzaSyDsHcXEv72DOL5AlpXzxhvcfRM2TNF3MJE";
const highlightContainer = document.getElementById("highlight");


async function loadHighlights() {
    const query = "NBA highlights";
    const apiURL =
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=${query}&key=${YOUTUBE_API_KEY}`;

    try {
        const res = await fetch(apiURL);
        if (!res.ok) throw new Error("YouTube API error");

        const data = await res.json();
        // console.log(data);

        highlightContainer.innerHTML = ""; // clear old results

        data.items.forEach(item => {
            const videoId = item.id.videoId;
            const title = item.snippet.title;

            const videoCard = document.createElement("div");
            videoCard.classList.add("video-card");

            videoCard.innerHTML = `
            
                <iframe 
                    src="https://www.youtube.com/embed/${videoId}"
                    frameborder="0"
                    allowfullscreen
                ></iframe>
                <p>${title}</p>
            `;

            highlightContainer.appendChild(videoCard);
        });

    } catch (error) {
        console.error("Failed to load highlights:", error);
        highlightContainer.innerHTML = "<p>Unable to load highlights right now.</p>";
    }
}


const newkey = "ba2f872c6271439f95dc05a1cd5ce34e";

// Format date as YYYY-MM-DD for the API
function getYesterdayDate() {
    const today = new Date();
    today.setDate(today.getDate() - 1); // subtract 1 day
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // months start at 0
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

const yesterday = getYesterdayDate();

async function getPlayerGameStats() {
    const api = `https://api.sportsdata.io/v3/nba/stats/json/PlayerGameStatsByDate/${yesterday}?key=${newkey}`;

    try {
        const res = await fetch(api);
        if (!res.ok) throw Error(await res.text());

        const data = await res.json();
        // console.log(data); // Check API response

        displayPlayerGameStats(data);
    } catch (error) {
        console.log("API ERROR:", error);
    }
}

function displayPlayerGameStats(players) {
    const tableBody = document.getElementById("game-stats-table");
    tableBody.innerHTML = ""; // Clear previous data


    if (players.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7">No games played yesterday</td></tr>';
        return;
    }

    // Sort players alphabetically
    players.sort((a, b) => a.Name.localeCompare(b.Name));

    // Take only top 10 players
    const topTen = players.slice(0, 10);


    topTen.forEach(player => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${player.Name}</td>
            <td>${player.Team}</td>
            <td>${player.Points}</td>
            <td>${player.Rebounds}</td>
            <td>${player.Assists}</td>
            <td>${player.Turnovers}</td>
            <td>${player.Minutes}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Call the function


apiFectch();
loadHighlights();
getPlayerGameStats();




