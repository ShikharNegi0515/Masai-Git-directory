const mealList = document.getElementById("mealList");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

let mealsData = [];

async function fetchMeals(query = "a") {
    try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await res.json();
        mealsData = data.meals || [];
        displayMeals(mealsData);
    } catch (error) {
        console.error("Error fetching data:", error);
        mealList.innerHTML = "<p>Failed to load meals. Please try again.</p>";
    }
}

function displayMeals(meals) {
    mealList.innerHTML = "";
    if (meals.length === 0) {
        mealList.innerHTML = "<p>No meals found.</p>";
        return;
    }

    meals.forEach(meal => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <div class="card-content">
        <h3>${meal.strMeal}</h3>
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
      </div>
    `;
        mealList.appendChild(card);
    });
}

searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    if (query.length === 0) {
        fetchMeals("a");
    } else {
        fetchMeals(query);
    }
});

sortSelect.addEventListener("change", () => {
    const value = sortSelect.value;
    let sortedMeals = [...mealsData];

    if (value === "name-asc") sortedMeals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
    if (value === "name-desc") sortedMeals.sort((a, b) => b.strMeal.localeCompare(a.strMeal));
    if (value === "area-asc") sortedMeals.sort((a, b) => a.strArea.localeCompare(b.strArea));
    if (value === "area-desc") sortedMeals.sort((a, b) => b.strArea.localeCompare(a.strArea));

    displayMeals(sortedMeals);
});

// Initialize app
fetchMeals();
