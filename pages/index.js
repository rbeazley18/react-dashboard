import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { items } from '../fake-data/data';


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
        // console.log(cart);
    }, [cart])


    return (
        items.map(item =>
            <div className="row row-cols-2 row-cols-md-3 g-4 justify-content-center" key={item.name}>
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

    const handleSubmit = async (event) => {
        setCart(cart => [...cart, item]);
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            itemToAdd: item
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);
        console.log(JSONdata);
        // API endpoint where we send form data.
        const endpoint = '/api/addToCartForm'

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
        console.log(`Result: ${result}`);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <button type="submit" className="btn btn-primary" name="addToCartBtn">Add to Cart</button>
            </form>
        </div>
    )
}

// function AddToCartAlert({ items }) {


// }