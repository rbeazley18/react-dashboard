import { loadWeather } from "../../lib/openweather"

export default async function getWeatherHandler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
    const searchedCity = body.city
  
    if (!body.city) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: 'City not found' })
    }
  
    // Sends a HTTP success code
    // res.status(200).json({ data: `${searchedCity}` })

    // Send to openweather
    const data = await loadWeather(searchedCity)

    return res.json(data);
  }

