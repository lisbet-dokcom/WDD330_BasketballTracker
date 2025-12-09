const myKey = "f5274ffe-a315-419e-b35a-7dfd9e01dfb6";

async function gameFetch() {
    const api = `https://api.balldontlie.io/v1/games`;
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