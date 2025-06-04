const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function fetchCharacter(id) {
    fetch(`https://akabab.github.io/starwars-api/api/id/${id}.json`)
        .then(res => res.json())
        .then(c => {
            const container = document.getElementById('character-details');
            container.innerHTML = `
        <img src="${c.image}" alt="${c.name}">
        <h2>${c.name}</h2>
        <p><strong>Gender:</strong> ${c.gender}</p>
        <p><strong>Species:</strong> ${c.species || 'Unknown'}</p>
        <p><strong>Homeworld:</strong> ${c.homeworld || 'Unknown'}</p>
        <p><strong>Affiliations:</strong> ${c.affiliations?.join(', ') || 'None'}</p>
        <p><strong>Height:</strong> ${c.height || 'Unknown'} cm</p>
        <p><strong>Mass:</strong> ${c.mass || 'Unknown'} kg</p>
        <p><strong>Eye Color:</strong> ${c.eyeColor || 'Unknown'}</p>
        <p><strong>Hair Color:</strong> ${c.hairColor || 'Unknown'}</p>
        <p><strong>Skin Color:</strong> ${c.skinColor || 'Unknown'}</p>
      `;
        });
}

function updateClock() {
    const now = new Date();
    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    };
    const time = now.toLocaleTimeString('en-GB');
    const date = now.toLocaleDateString('en-GB', options);
    document.getElementById('clock').textContent = `${time} ${date}`;
}

setInterval(updateClock, 1000);
updateClock();
fetchCharacter(id);
