import { loadWeather } from "../lib/openweather";

export default function WeatherWidget({ weatherData }) {
    // console.log(weatherData);

    // if (weatherData) {
    return (
        <div>{weatherData}</div>
        // weatherData.map((weather) => (
        //     <>
        //         <div className="card text-center col-md-8 mx-auto" key={weather.lat}>
        //             <div className="card-header">
        //                 Weather
        //             </div>
        //             <div className="card-body">
        //                 <h5 className="card-title">{weather.current}</h5>
        //                 <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        //                 <a href="#" className="btn btn-primary">Expand Weather</a>
        //             </div>
        //             <div className="card-footer text-muted">
        //                 2 days ago
        //             </div>
        //         </div>
        //     </>
        // ))
    )
    // }
}


export async function getServerSideProps() {
    const weatherData = await loadWeather()
    console.log(weatherData)

    return {
        props: { weatherData: weatherData }
    };
}