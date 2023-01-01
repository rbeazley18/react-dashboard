export async function loadWeather() {
    const key = process.env.WEATHER_API_KEY
    console.log(key);

    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${key}`)
        const weatherData = await res.json()
        console.log(weatherData);

        return weatherData;

    } catch (e) {
        console.error(e);
    }
}