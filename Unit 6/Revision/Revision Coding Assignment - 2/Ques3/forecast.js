
var OPENWEATHER_API_KEY = AIzaSyBOA4VEsMsZTKGTV5uGEzFm6H3LS0Q0KIw
function byDayFrom3Hourly(list, tzOffset) {
    const days = {};
    for (const item of list) {
        const localTs = item.dt + tzOffset;
        const dayKey = new Date(localTs * 1000).toISOString().slice(0, 10);
        if (!days[dayKey]) days[dayKey] = { min: Infinity, max: -Infinity, weather: [] };
        days[dayKey].min = Math.min(days[dayKey].min, item.main.temp_min);
        days[dayKey].max = Math.max(days[dayKey].max, item.main.temp_max);
        days[dayKey].weather.push(item.weather[0]);
    }
    const out = [];
    for (const [date, info] of Object.entries(days)) {
        const counts = {};
        for (const w of info.weather) {
            const key = w.main + '|' + w.icon + '|' + w.description;
            counts[key] = (counts[key] || 0) + 1;
        }
        const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
        const [main, icon, desc] = top.split('|');
        out.push({ date, min: Math.round(info.min), max: Math.round(info.max), main, icon, desc });
    }
    return out;
}


async function loadForecast() {
    const params = new URLSearchParams(location.search);
    const lat = params.get('lat');
    const lon = params.get('lon');
    const units = params.get('units') || 'metric';
    if (!lat || !lon) {
        document.getElementById('forecastContainer').textContent = 'No location provided.';
        return;
    }


    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${OPENWEATHER_API_KEY}`;
    const resp = await fetch(url);
    if (!resp.ok) { document.getElementById('forecastContainer').textContent = 'Failed to load forecast.'; return; }
    const data = await resp.json();
    const tz = data.city.timezone;
    const days = byDayFrom3Hourly(data.list, tz);
    const container = document.getElementById('forecastContainer');
    container.innerHTML = '';
    let shown = 0;
    for (const d of days) {
        if (shown >= 5) break;
        const card = document.createElement('div');
        card.className = 'weather-card';
        card.innerHTML = `
<h3>${d.date}</h3>
<img src="https://openweathermap.org/img/wn/${d.icon}@2x.png" alt="${d.desc}" />
<p>${d.desc}</p>
<p>Min: ${d.min}°, Max: ${d.max}°</p>
`;
        container.appendChild(card);
        shown++;
    }
}


window.addEventListener('load', loadForecast);