let currentPage = 1;
let baseUrl = 'https://rickandmortyapi.com/api/character';
let searchQuery = '';
let statusFilter = '';
let speciesFilter = '';
let debounceTimeout;

function fetchCharacters() {
  let url = `${baseUrl}?page=${currentPage}`;

  if (searchQuery) url += `&name=${searchQuery}`;
  if (statusFilter) url += `&status=${statusFilter}`;
  if (speciesFilter) url += `&species=${speciesFilter}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      renderCharacters(data.results);
      document.getElementById('prev').disabled = !data.info.prev;
      document.getElementById('next').disabled = !data.info.next;
    })
    .catch(() => {
      document.getElementById('gallery').innerHTML = "<p style='text-align:center;'>No characters found.</p>";
      document.getElementById('prev').disabled = true;
      document.getElementById('next').disabled = true;
    });
}

function renderCharacters(characters) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  characters.forEach(character => {
    const card = document.createElement('div');
    card.className = `card ${character.status}`;

    card.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <div class="card-body">
        <h2>${character.name}</h2>
        <p><strong>Species:</strong> ${character.species}</p>
        <p><strong>Status:</strong> ${character.status}</p>
        ${character.episode.length > 30 ? '<span class="veteran-badge">Veteran</span>' : ''}
      </div>
    `;

    card.onclick = () => {
      window.open(`character.html?id=${character.id}`, '_blank');
    };

    gallery.appendChild(card);
  });
}

document.getElementById('prev').onclick = () => {
  currentPage--;
  fetchCharacters();
};

document.getElementById('next').onclick = () => {
  currentPage++;
  fetchCharacters();
};

document.getElementById('search').addEventListener('input', (e) => {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    searchQuery = e.target.value.trim().toLowerCase();
    currentPage = 1;
    fetchCharacters();
  }, 300);
});

document.getElementById('status-filter').addEventListener('change', (e) => {
  statusFilter = e.target.value.toLowerCase();
  currentPage = 1;
  fetchCharacters();
});

document.getElementById('species-filter').addEventListener('change', (e) => {
  speciesFilter = e.target.value.toLowerCase();
  currentPage = 1;
  fetchCharacters();
});

fetchCharacters();
