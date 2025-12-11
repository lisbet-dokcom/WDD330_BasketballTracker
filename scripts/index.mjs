


//Fetch API

export const myKey = "f5274ffe-a315-419e-b35a-7dfd9e01dfb6";
const preview = document.getElementById("preview");
const showGames = document.querySelector("#games");


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
            console.log(info);

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
        console.log(data);

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

apiFectch();
loadHighlights();



