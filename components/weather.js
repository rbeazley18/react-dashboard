import { useEffect, useState } from "react";
// import WidgetSwitch from "./widgetSwitch";

export default function WeatherWidget() {
    const [weatherData, setWeatherData] = useState([]);
    const [switchStatus, setSwitchStatus] = useState(false);

    useEffect(() => {
        console.log(weatherData);
    }, [weatherData])

    useEffect(() => {
        console.log(switchStatus);
    }, [switchStatus])

    // console.log(weatherData);

    if (switchStatus) {
        return (
            <div className="card col-md-8 mx-auto p-5" >
                <h3>Weather</h3>
                <WeatherSwitch
                    setSwitchStatus={setSwitchStatus}
                    switchStatus={switchStatus}
                />
                <div>
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
        )
    }

    return (
        <>
            <p>Weather</p>
            <WeatherSwitch
                setSwitchStatus={setSwitchStatus}
                switchStatus={switchStatus}
            />
        </>
    )
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
            <h3>Search Weather</h3>
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

function WeatherSwitch({ switchStatus, setSwitchStatus }) {
    function handleToggle() {
        setSwitchStatus(!switchStatus);
        return switchStatus;
    }

    return (
        <div className="form-check form-switch">
            <input onChange={handleToggle} checked={switchStatus} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault"></label>
        </div>
    )
}
