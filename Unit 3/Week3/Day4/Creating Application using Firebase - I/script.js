let currentPage = 1;

function fetchCharacters(page = 1) {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        .then(res => res.json())
        .then(data => {
            renderCharacters(data.results);
            document.getElementById('prev').disabled = data.info.prev === null;
            document.getElementById('next').disabled = data.info.next === null;
        });
}

function renderCharacters(characters) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <div class="card-body">
        <h2>${character.name}</h2>
        <p><strong>Species:</strong> ${character.species}</p>
        <p><strong>Status:</strong> ${character.status}</p>
      </div>
    `;
        card.onclick = () => {
            window.open(`character.html?id=${character.id}`, '_blank');
        };
        gallery.appendChild(card);
    });
}

document.getElementById('prev').onclick = () => {
    if (currentPage > 1) {
        currentPage--;
        fetchCharacters(currentPage);
    }
};

document.getElementById('next').onclick = () => {
    currentPage++;
    fetchCharacters(currentPage);
};

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
fetchCharacters(currentPage);
