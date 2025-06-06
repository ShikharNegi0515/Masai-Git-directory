// Generate 500 dummy names
const names = Array.from({ length: 500 }, (_, i) => `User${i + 1}`);

const searchInput = document.getElementById("search");
const resultsContainer = document.getElementById("results");
const backToTop = document.getElementById("backToTop");

let keystrokes = 0;
let searchCount = 0;

const updateStats = () => {
    document.getElementById("keystrokes").textContent = keystrokes;
    document.getElementById("debounced").textContent = searchCount;
};

const highlightMatch = (name, query) => {
    const regex = new RegExp(`(${query})`, "gi");
    return name.replace(regex, `<span class="highlight">$1</span>`);
};

const renderResults = (query) => {
    const filtered = names.filter((name) => name.toLowerCase().includes(query.toLowerCase()));
    resultsContainer.innerHTML = filtered
        .map(name => `<li>${highlightMatch(name, query)}</li>`)
        .join('');
};

const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
};

const debouncedSearch = debounce((query) => {
    searchCount++;
    renderResults(query);
    updateStats();
}, 1000);

searchInput.addEventListener("input", (e) => {
    keystrokes++;
    updateStats();
    debouncedSearch(e.target.value);
});

const throttle = (fn, limit) => {
    let lastCall = 0;
    return (...args) => {
        const now = new Date().getTime();
        if (now - lastCall >= limit) {
            lastCall = now;
            fn(...args);
        }
    };
};

window.addEventListener("scroll", throttle(() => {
    if (window.scrollY >= 200) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
}, 500));

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
