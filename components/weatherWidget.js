import { useEffect, useState, useContext } from "react";
import ClientPortal from "./clientPortal";
import { WeatherSwitchContext } from "../pages";

export default function WeatherWidget() {
    const [weatherData, setWeatherData] = useState([]);
    const { weatherSwitchStatus, setWeatherSwitchStatus } = useContext(WeatherSwitchContext);

    useEffect(() => {
        setWeatherSwitchStatus(JSON.parse(window.localStorage.getItem('weatherSwitchStatus')));
        console.log(weatherSwitchStatus);
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [])

    useEffect(() => {
        const serializedWeatherData = JSON.stringify(weatherData);
        window.localStorage.setItem('weatherData', serializedWeatherData);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weatherData])

    useEffect(() => {
        setWeatherData(JSON.parse(window.localStorage.getItem('weatherData')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        console.log(weatherData);
    }, [weatherData])


    if (weatherSwitchStatus) {
        return (
            <>
                <div className="">
                    <div className="card weather-card col-6 p-3 m-3 pt-1 m-3 shadow-lg">
                        <div className="row">
                            <button className="btn-close ms-auto btn-close-white p-0 close-button" type="button" onClick={() => setWeatherSwitchStatus(false)} aria-label="Close">
                            </button>
                        </div>
                        {weatherData.length > 0 ? (
                            <WeatherDisplay
                                weatherData={weatherData}
                                setWeatherData={setWeatherData}
                            />
                        ) : (
                            <WeatherSearch
                                weatherData={weatherData}
                                setWeatherData={setWeatherData}
                            />
                        )}
                    </div>
                </div>

            </>
        )
    }
}

function WeatherSearch({ weatherData, setWeatherData }) {
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

        // console.log(result);

        setWeatherData(weatherData => [...weatherData, result]);
    }

    return (
        <div>
            <p className="lead">Search Weather</p>
            <form onSubmit={handleSubmit} className="input-group">
                <input type="text" id="city" name="city" className="form-control" placeholder="City..." required />
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}

function WeatherDisplay({ weatherData, setWeatherData }) {
    let date = new Date().toLocaleDateString()

    function getCardinalDirection(angle) {
        const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
        return directions[Math.round(angle / 45) % 8];
    }

    // function formatDescription(description) {
    //     const capitalized =
    //         description.charAt(0).toUpperCase()
    //         + description.slice(1)
    //     const commasAdded = capitalized.replace(" ", ", ")
    //     return commasAdded;
    // }

    return (
        weatherData.map((weather) => (
            <div key={weather.id}>
                <div className="card-header">
                    <h1>{weather.name}, {weather.sys.country}</h1>
                    <p className="text-muted"></p>

                </div>
                <div className="card-body">
                    
                    <h1 className="card-text m-0"><b>{weather.main.temp}°F</b>  </h1>
                    <h2 className="mb-0">{weather.main.feels_like}°F</h2>
                    <p className="mb-4 m-0 fw-bold">Feels Like</p>
                    <h2 className="lead fw-bold card-text m-0">Conditions:</h2>
                    <p className="card-text ms-3 m-0">Humidity: <b>{weather.main.humidity}%</b></p>
                    <p className="card-text ms-3 m-0">{weather.weather[0].main}</p>

                    <div className="">
                        <h2 className="lead fw-bold mt-2 mb-0">Wind:</h2>
                        <div className="ms-3">
                            <p className="card-text m-0">Wind Direction: {getCardinalDirection(weather.wind.deg)} ({weather.wind.deg} degrees)</p>
                            <p className="card-text m-0">Wind Speed: {weather.wind.speed} mph</p>
                            {weather.wind.gust && (
                                <>
                                    <p className="card-text m-0">Wind Gust: {weather.wind.gust} mph</p>
                                </>
                            )}
                        </div>

                    </div>
                    <div className="mt-2">
                        <button onClick={() => setWeatherData([])} className="btn btn-sm btn-warning mx-auto">Reset</button>
                    </div>
                </div>
                <div className="card-footer text-muted">
                    {date}
                </div>
            </div>
        ))
    )
}