async function getWeather() {
    const city = document.getElementById('input').value.trim() || 'London';
    const errorEl = document.getElementById('error');
    errorEl.textContent = '';
    try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        const geoData = await geoRes.json();
        if (!geoData.results || geoData.results.length === 0) {
            document.getElementById('city').innerText = 'Weather';
            document.getElementById('temp').innerText = '--°C';
            document.getElementById('desc').innerText = 'No data';
            errorEl.textContent = '❌ Location not found!';
            return;
        }
        const { latitude, longitude, name } = geoData.results[0];
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherRes.json();
        const w = weatherData.current_weather;
        document.getElementById('city').innerText = name;
        document.getElementById('temp').innerText = w.temperature + "°C";
        document.getElementById('desc').innerText = "Wind " + w.windspeed + " m/s";
    } catch (err) {
        errorEl.textContent = '⚠️ Error fetching data!';
        console.error(err);
    }
}
getWeather();

























