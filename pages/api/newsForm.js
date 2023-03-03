import loadNews from "../../lib/newsAPI";

export default async function getNewsHandler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
    const newsQuery = body.newsQuery

    // console.log('body: ', body)
  
    if (!body.newsQuery) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: 'News not found' })
    }
  
    // Sends a HTTP success code
    // res.status(200).json({ data: `${searchedCity}` })

    // Send to openweather
    const data = await loadNews(newsQuery);

    res.json(data);
  }

