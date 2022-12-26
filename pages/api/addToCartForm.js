import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
  
    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body)
  
    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.itemToAdd) {
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: 'Item not found' })
    }
  
    // Found the item.
    // Sends a HTTP success code
    res.status(200).json({ data: `${body.itemToAdd}` })

    // Send to mongodb doc
    addItemToCart(body.itemToAdd);


    // const client = await clientPromise;

    // try {
    //     await client.connect();
    //     const result = await client.db("Items").collection("Cart").insertOne(body.item);
    //     res.status(200).json({ result })
    // } catch (err) {
    //     res.status(500).json({ error: 'failed to load data' })
    // }
  }

// export default async function connectToClusterAndInsertDocument() {
//     const client = await clientPromise;

//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();
//         // Make the appropriate DB calls
//         await addItemToCart(client);

//     }
//     catch (err) {
//         console.log(err);
//         console.error("Error connecting to database.");
//     } finally {
//         // Close the connection to the MongoDB cluster
//         await client.close();
//     }
// }

// // connectToClusterAndInsertDocument().catch(console.error);

// // Add functions that make DB calls here
// async function addItemToCart(client, newItem) {
//     const result = await client.db("Items").collection("Cart").insertMany(newItem);
//     console.log(`New item added to cart with the following id: ${result.insertedId}`);
//     console.log(result);
// }

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