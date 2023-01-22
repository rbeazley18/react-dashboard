import { loadStocks } from "../../lib/alphavantage";

export default async function getStockHandler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
    const searchedStock = body.stock

    // console.log('body: ', body)
  
    if (!body.stock) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: 'City not found' })
    }
  
    // Sends a HTTP success code
    // res.status(200).json({ data: `${searchedCity}` })

    // Send to openweather
    const data = await loadStocks(searchedStock);

    res.json(data);
  }

