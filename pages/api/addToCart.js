// import clientPromise from "./mongodb";

export default async function connectToClusterAndInsertDocument(cart) {
    const client = await clientPromise;

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate DB calls
        await addItemToCart(client, cart);

    }
    catch (err) {
        console.log(err);
        console.error("Error connecting to database.");
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

// connectToClusterAndInsertDocument().catch(console.error);

// Add functions that make DB calls here
async function addItemToCart(client, newItem) {
    const result = await client.db("Items").collection("Cart").insertMany(newItem);
    console.log(`New item added to cart with the following id: ${result.insertedId}`);
    console.log(result);
}

// export async function addItemToCart(cart) {
//     try {
//         const client = await clientPromise;
//         const db = client.db("Items");

//         const cartItems = await db
//             .collection("Cart")
//             .insertMany(cart)


//     } catch (e) {
//         console.error(e);
//     }
// }