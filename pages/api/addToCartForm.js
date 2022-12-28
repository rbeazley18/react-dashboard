import clientPromise from "../../lib/mongodb";

export default async function addToCartHandler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
  
    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body)
  
    if (!body.itemToAdd) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: 'Item not found' })
    }
  
    // Found the item.
    // Sends a HTTP success code
    res.status(200).json({ data: `${body.itemToAdd}` })

    // Send to mongodb doc
    addItemToCart(body.itemToAdd);
  }

async function addItemToCart(item) {
    try {
        const client = await clientPromise;
        const db = client.db("Items");

        const cartItems = await db
            .collection("Cart")
            .insertOne(item)


    } catch (e) {
        console.error(e);
    }
}