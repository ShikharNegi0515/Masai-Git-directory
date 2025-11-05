const API_KEY = "6af18a1a";
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const moviesContainer = document.getElementById("moviesContainer");
const searchInput = document.getElementById("searchInput");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const loading = document.getElementById("loading");
const errorMsg = document.getElementById("error");

let currentPage = 1;
let currentQuery = "popular";
let totalResults = 0;
let isThrottled = false;

// ================== FETCH MOVIES ==================
async function fetchMovies(query = "popular", page = 1) {
    loading.classList.remove("hidden");
    errorMsg.classList.add("hidden");
    moviesContainer.innerHTML = "";

    try {
        const res = await fetch(`${BASE_URL}&s=${query}&page=${page}`);
        const data = await res.json();

        loading.classList.add("hidden");

        if (data.Response === "True") {
            totalResults = Number(data.totalResults);
            renderMovies(data.Search);
        } else {
            errorMsg.textContent = "No movies found!";
            errorMsg.classList.remove("hidden");
        }
    } catch (err) {
        loading.classList.add("hidden");
        errorMsg.textContent = "Something went wrong. Please try again!";
        errorMsg.classList.remove("hidden");
    }
}

// ================== RENDER MOVIES ==================
function renderMovies(movies) {
    moviesContainer.innerHTML = movies
        .map(
            (m) => `
      <div class="movie-card">
        <img src="${m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/300x400"}" alt="${m.Title}">
        <div class="movie-info">
          <h3>${m.Title}</h3>
          <p>${m.Year} | ${m.Type}</p>
        </div>
      </div>
    `
        )
        .join("");

    pageInfo.textContent = `Page ${currentPage}`;
}

// ================== DEBOUNCING ==================
let debounceTimer;
searchInput.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim();

    debounceTimer = setTimeout(() => {
        currentQuery = query || "popular";
        currentPage = 1;
        fetchMovies(currentQuery, currentPage);
    }, 500); // 500ms debounce delay
});

// ================== THROTTLING FOR PAGINATION ==================
function throttlePagination(action) {
    if (isThrottled) return;

    isThrottled = true;
    action();
    setTimeout(() => {
        isThrottled = false;
    }, 1000); // 1 second throttle
}

prevBtn.addEventListener("click", () =>
    throttlePagination(() => {
        if (currentPage > 1) {
            currentPage--;
            fetchMovies(currentQuery, currentPage);
        }
    })
);

nextBtn.addEventListener("click", () =>
    throttlePagination(() => {
        currentPage++;
        fetchMovies(currentQuery, currentPage);
    })
);

fetchMovies();
