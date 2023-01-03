import { loadWeather } from "../lib/openweather";

export default function WeatherWidget() {
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
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        // alert(`Your item: ${JSON.stringify(result.data)}`);
        console.log(result);
    }

    // const weatherData = loadWeather();

    if (weatherData) {
        return (
            weatherData.map((weather) => (
                <>
                    <div className="card text-center col-md-8 mx-auto" key={weather.lat}>
                        <div className="card-header">
                            Weather
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{weather.current}</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" className="btn btn-primary">Expand Weather</a>
                        </div>
                        <div className="card-footer text-muted">
                            2 days ago
                        </div>
                    </div>
                </>
            ))
        )
    }

    return (
        <>
            <div className="card p-5 text-center m-5">
                <h3>Search Weather</h3>
                <form onSubmit={handleSubmit}>
                    <label for="city">City: </label>
                    <input type="text" id="city" name="city" />
                    <button className="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}


// export async function getServerSideProps() {
//     const weatherData = await loadWeather()
//     console.log(weatherData)

//     return {
//         props: { weatherData: weatherData }
//     };
// }