import clientPromise from "../../lib/mongodb";

export default async function addToWatchlistHandler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
    
    console.log('body: ', body)
  
    if (!body) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: 'Stock not found' })
    }
  
    // Found the item.
    // Sends a HTTP success code
    res.status(200).json({ data: `${body}` })

    // Send to mongodb doc
    addItemToWatchlist(body);
  }

async function addItemToWatchlist(stock) {
    try {
        const client = await clientPromise;
        const db = client.db("widgets");

        const cartItems = await db
            .collection("stock_watchlist")
            .updateOne({stockName: stock}, {$set: stock}, {upsert: true})

    } catch (e) {
        console.error(e);
    }
}