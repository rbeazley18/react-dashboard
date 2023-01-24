import { useEffect, useState } from "react";
// import WidgetSwitch from "./widgetSwitch";
import ClientPortal from "./clientPortal";

export default function WeatherWidget() {
    const [weatherData, setWeatherData] = useState([]);
    const [widgetStatus, setWidgetStatus] = useState(false);

    useEffect(() => {
        setWidgetStatus(JSON.parse(window.localStorage.getItem('weatherSwitchStatus')));
        console.log(widgetStatus);
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [])

    useEffect(() => {
        console.log(widgetStatus);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        console.log(weatherData);
    }, [weatherData])


    if (widgetStatus) {
        return (
            <>
                <div className="row justify-content-center">
                    <div className="card col-6 p-3 m-3">
                        <button className="btn-close ms-auto p-0 m-0 close-button" type="button" onClick={() => setWidgetStatus(false)} aria-label="Close">
                        </button>
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

    return (
        weatherData.map((weather) => (
            <div key={weather.id}>
                <div className="card-header">
                    <h1>City: {weather.name}</h1>
                </div>
                <div className="card-body">

                    <p className="card-text">ID: {weather.id}</p>
                    <p className="card-text">Wind: {weather.wind.speed}</p>
                    <button onClick={() => setWeatherData([])} className="btn btn-danger">Reset Weather</button>
                </div>
                <div className="card-footer text-muted">
                    {date}
                </div>
            </div>
        ))
    )
}