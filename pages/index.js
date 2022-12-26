import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { items } from '../fake-data/data';
// import connectToClusterAndInsertDocument from './api/addToCart';
// import clientPromise from '../lib/mongodb';

// import { ViewCartButton } from '../components/navbar';


export default function Home() {
    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Your shopping items." />
            </Head>
            <main>
                <div className='text-center'>
                    <h1>Home</h1>
                </div>
                <div className='mt-5'>
                    <ProductCard items={items} />
                </div>
            </main>
        </>
    )
}



function ProductCard({ items }) {
    const [cart, setCart] = useState([]);
    // const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        console.log(cart);
        // async (cart) => {
        //     const client = await clientPromise;

        //     try {
        //         // Connect to the MongoDB cluster
        //         await client.connect();
        //         // Make the appropriate DB calls
        //         await client.db("Items").collection("Cart").insertMany(cart);

        //     }
        //     catch (err) {
        //         console.log(err);
        //         console.error("Error connecting to database.");
        //     } finally {
        //         // Close the connection to the MongoDB cluster
        //         await client.close();
        //     }
        // }
    }, [cart])


    return (
        items.map(item =>
            <div className="row row-cols-2 row-cols-md-3 g-4 justify-content-center" key={item.id}>
                <div className="col">
                    <div className="card m-2">
                        <Image src={item.img} className="card-img-top" width={100} height={100} quality={100} alt="default image" />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.description}</p>
                            <p className="card-text">{item.price}</p>
                            <Link className='btn btn-warning text-light' href={'#'}>View Item</Link>
                            <AddToCartButton
                                cart={cart}
                                setCart={setCart}
                                item={item}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

function AddToCartButton({ cart, setCart, itemCount, setItemCount, item }) {
    async function handleAddToCartClick(req, res) {
        setCart(cart => [...cart, item]);

        // const client = await clientPromise;

        // try {
        //     await client.connect();
        //     const result = await client.db("Items").collection("Cart").insertMany(cart);
        //     res.status(200).json({ result })
        // } catch (err) {
        //     res.status(500).json({ error: 'failed to load data' })
        // }
    }


    return (
        <div>
            <button onClick={handleAddToCartClick} className="btn btn-primary">Add to Cart <span class="badge text-bg-secondary">{itemCount}</span></button>
        </div>
    )
}

// function AddToCartAlert({ items }) {


// }