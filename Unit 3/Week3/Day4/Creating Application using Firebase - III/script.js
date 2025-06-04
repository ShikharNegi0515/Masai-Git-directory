let currentPage = 1;
const itemsPerPage = 6;
let allCharacters = [];

function fetchCharacters() {
    fetch(`https://akabab.github.io/starwars-api/api/all.json`)
        .then(res => res.json())
        .then(data => {
            allCharacters = data;
            renderPage(currentPage);
        });
}

function renderPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const characters = allCharacters.slice(start, end);
    renderCharacters(characters);

    document.getElementById('prev').disabled = page === 1;
    document.getElementById('next').disabled = end >= allCharacters.length;
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
        <p><strong>Status:</strong> ${character.gender}</p>
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
        renderPage(currentPage);
    }
};

document.getElementById('next').onclick = () => {
    currentPage++;
    renderPage(currentPage);
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
fetchCharacters();
