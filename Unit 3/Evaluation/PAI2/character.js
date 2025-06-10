const params = new URLSearchParams(window.location.search);
const id = params.get('id');

function fetchCharacter(id) {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => res.json())
        .then(data => renderCharacter(data));
}

function renderCharacter(c) {
    const container = document.getElementById('character-details');
    container.innerHTML = `
    <img src="${c.image}" alt="${c.name}">
    <h2>${c.name}</h2>
    <p><strong>Status:</strong> ${c.status}</p>
    <p><strong>Species:</strong> ${c.species}</p>
    <p><strong>Type:</strong> ${c.type || "N/A"}</p>
    <p><strong>Gender:</strong> ${c.gender}</p>
    <p><strong>Origin:</strong> ${c.origin.name}</p>
    <p><strong>Location:</strong> ${c.location.name}</p>
    <p><strong>Episode Appearances:</strong> ${c.episode.length}</p>
  `;
}


fetchCharacter(id);
