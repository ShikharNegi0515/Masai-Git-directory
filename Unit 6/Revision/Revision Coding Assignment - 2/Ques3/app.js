var OPENWEATHER_API_KEY = AIzaSyBOA4VEsMsZTKGTV5uGEzFm6H3LS0Q0KIw


let map;


async function fetchWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=${units}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('City not found');
    return await resp.json();
}


function updateMap(lat, lon, name) {
    currentCoords = { lat, lon };
    if (!map) return;
    map.setCenter({ lat, lng: lon });
    map.setZoom(9);
    if (marker) marker.setMap(null);
    marker = new google.maps.Marker({ position: { lat, lng: lon }, map, title: name });
}


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: currentCoords.lat, lng: currentCoords.lon },
        zoom: 5,
    });
}


function renderCurrentWeather(data) {
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    const tz = data.timezone;
    const now = new Date();
    const nowLocal = new Date(now.getTime() + (tz * 1000) - (now.getTimezoneOffset() * 60000));
    document.getElementById('localTime').textContent = nowLocal.toLocaleString();


    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°${units === 'metric' ? 'C' : 'F'}`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind').textContent = data.wind.speed;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('sunrise').textContent = formatTime(data.sys.sunrise, data.timezone);
    document.getElementById('sunset').textContent = formatTime(data.sys.sunset, data.timezone);


    setBackgroundByWeather(data.weather[0].main);
    updateMap(data.coord.lat, data.coord.lon, data.name);
}


async function showWeatherForCity(city) {
    try {
        const data = await fetchWeatherByCity(city);
        renderCurrentWeather(data);
    } catch (err) {
        alert('City not found');
    }
}


function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const q = e.target.value.trim();
            if (q) showWeatherForCity(q);
        }
    });
    document.getElementById('forecastBtn').addEventListener('click', () => {
        const { lat, lon } = currentCoords;
        window.location.href = `forecast.html?lat=${lat}&lon=${lon}&units=${units}`;
    });
    document.getElementById('unitToggle').addEventListener('change', (e) => {
        units = e.target.checked ? 'imperial' : 'metric';
        showWeatherForCity(document.getElementById('cityName').textContent.split(',')[0] || 'New York');
    });
}


window.addEventListener('load', async () => {
    setupEventListeners();
    await showWeatherForCity('New York'); // default city
});