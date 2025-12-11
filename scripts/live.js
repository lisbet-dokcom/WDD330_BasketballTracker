document.addEventListener('DOMContentLoaded', () => {
    const lisCard = document.getElementById('live-card');

    async function fetchLiveGames() {
        try {
            const response = await fetch('data/live.json');
            const data = await response.json();
            displayLiveGames(data);
        } catch (error) {
            console.log(error);
        }
    }

    function displayLiveGames(display) {
        lisCard.innerHTML = '';
        display.forEach((live) => {
            const card = document.createElement('div');
            card.classList.add('live-game-card');
            const devices = live.device_support.map(d => `<span>${d}</span>`).join("");

            card.innerHTML = `
                <h2>${live.name}</h2>
                <p><strong>Subscription:</strong> ${live.subscription}</p>
                <p><strong>Country:</strong> ${live.country}</p>
                <p class="devices"><strong>Devices:</strong> ${devices}</p>
                <p><strong>Quality:</strong> ${live.quality}</p>
                <p><strong>Free Trial:</strong> ${live.free_trial}</p>
                <p><strong>Notes:</strong> ${live.notes}</p>
                <p><a href="${live.url}" target="_blank">Watch Here</a></p>
            `;
            lisCard.appendChild(card);
        });
    }

    fetchLiveGames();
});
