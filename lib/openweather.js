export default async function loadWeather(search) {
    const key = process.env.WEATHER_API_KEY

    try {
        const cityResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${key}`)

        const cityData = await cityResponse.json()
        // console.log(cityData);

        // const cityDataMap = cityData.map((city) => {

        // })
        if (cityData.length > 0) {
            const latitude = cityData[0].lat
            const longitude = cityData[0].lon

            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=imperial`)
            const weatherData = await weatherResponse.json()
            console.log(weatherData);

            return weatherData;
        }

    } catch (e) {
        console.error(e);
    }
}
