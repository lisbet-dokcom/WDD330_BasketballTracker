const seasonYear = new Date().getFullYear(); // 2025
const myKey = "f5274ffe-a315-419e-b35a-7dfd9e01dfb6";
async function gameFetch() {
    const api = `https://api.balldontlie.io/v1/games?season=${seasonYear}&per_page=100`;

    // const api = `https://api.balldontlie.io/v1/games?start_season=${today}&end_season=${today}`;
    try {
        const res = await fetch(api, {
            headers: {
                "Authorization": myKey
            }
        })
        if (res.ok) {
            const showResult = await res.json();
            console.log(showResult);
        } else {
            throw Error(await res.text());
        }
    } catch (error) {
        console.log(error);
    }
}

gameFetch();