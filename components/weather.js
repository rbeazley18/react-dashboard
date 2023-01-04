import { useEffect, useState } from "react";

export default function WeatherWidget() {
    const [weatherData, setWeatherData] = useState([]);

    useEffect(() => {
        console.log(weatherData);
    }, [weatherData])

    // console.log(weatherData);
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            city: event.target.city.value
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);
        // console.log(JSONdata);
        // API endpoint where we send form data.
        const endpoint = '/api/weatherForm'

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        const result = await response.json()

        console.log(result);

        setWeatherData(weatherData => [...weatherData, result]);
    }

    return (
        <div>
            {weatherData.length > 0 ? (weatherData.map((weather) => (
                <div className="card text-center col-md-8 mx-auto" key={weather.id}>
                    <div className="card-header">
                        Weather
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">City: {weather.name}</h5>
                        <p className="card-text">ID: {weather.id}</p>
                        <p className="card-text">Wind: {weather.wind.speed}</p>
                        <button onClick={() => setWeatherData([])} className="btn btn-danger">Reset Weather</button>
                    </div>
                    <div className="card-footer text-muted">
                        2 days ago
                    </div>
                </div>
            ))) : (
                <div className="card p-5 text-center m-5">
                    <h3>Search Weather</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="city">City: </label>
                        <input type="text" id="city" name="city" required />
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    )
}