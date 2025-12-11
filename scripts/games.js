const myKey = "f5274ffe-a315-419e-b35a-7dfd9e01dfb6";

async function gameFetch() {
    const today = new Date().toISOString().split("T")[0];
    const API = `https://api.balldontlie.io/v1/games?start_date=${today}`;

    try {
        const res = await fetch(API, {
            headers: { "Authorization": myKey }
        });

        if (!res.ok) throw Error(await res.text());

        const showResult = await res.json();
        // console.log(showResult);

        displayGames(showResult.data);   // 🔥 MUST CALL THIS
    } catch (error) {
        console.log(error);
    }
}

function displayGames(games) {
    const gamesTable = document.getElementById('games-table');
    gamesTable.innerHTML = '';

    games.forEach((game) => {
        const row = document.createElement('tr');
        const gameDate = new Date(game.date);

        // Convert UTC → Lagos time
        const localTime = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Africa/Lagos',
            hour12: true
        }).format(gameDate);

        row.innerHTML = `
            <td>${gameDate.toLocaleDateString('en-US', { weekday: 'short' })}</td>
            <td>${gameDate.toLocaleDateString('en-US', {
            year: "numeric",
            month: "short",
            day: "numeric"
        })}</td>
            <td>${game.visitor_team.name}</td>
            <td>${game.home_team.name}</td>
            <td>${localTime} WAT</td>
        `;

        gamesTable.appendChild(row);
    });
}


gameFetch();
