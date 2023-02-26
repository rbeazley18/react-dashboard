import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { useState, useEffect, createContext } from 'react';
import { createPortal } from 'react-dom';
import { items } from '../fake-data/data';
import WidgetMenu from '../components/widgetMenu';
import dynamic from "next/dynamic";
import ViewWidgetsButton from '../components/widgetMenu';
import StockWidget from '../components/stockWidget';
import WeatherWidget from '../components/weatherWidget';
import Widgets from '../components/allWidgets';

export const StockSwitchContext = createContext(false);
export const WeatherSwitchContext = createContext(false);
export const QuoteSwitchContext = createContext(false);
export const NewsSwitchContext = createContext(false);

export default function Home() {
    const [stockSwitchStatus, setStockSwitchStatus] = useState(false);
    const [weatherSwitchStatus, setWeatherSwitchStatus] = useState(false);
    const [quoteSwitchStatus, setQuoteSwitchStatus] = useState(false);
    const [newsSwitchStatus, setNewsSwitchStatus] = useState(false);

    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Your shopping items." />
            </Head>
            <main>
                <div className="widget-components">
                    <StockSwitchContext.Provider value={{ stockSwitchStatus, setStockSwitchStatus }} >
                        <WeatherSwitchContext.Provider value={{ weatherSwitchStatus, setWeatherSwitchStatus }}>
                            <QuoteSwitchContext.Provider value={{ quoteSwitchStatus, setQuoteSwitchStatus }}>
                                <NewsSwitchContext.Provider value={{ newsSwitchStatus, setNewsSwitchStatus }}>
                                    <div className='ms-2'>
                                        <ViewWidgetsButton />
                                    </div>
                                    <Widgets />
                                </NewsSwitchContext.Provider>
                            </QuoteSwitchContext.Provider>
                        </WeatherSwitchContext.Provider>
                    </StockSwitchContext.Provider>
                </div>
                <div className='text-center home text-light'>
                    <h1>Home</h1>
                </div>
                <div className='container-fluid'>
                    <div id='preview' />
                    <ProductCard items={items} />
                </div>
            </main>
        </>
    )
}

function ProductCard({ items }) {
    const [cart, setCart] = useState([]);
    // const [itemCount, setItemCount] = useState(0);

    return (
        items.map(item =>
            <div className="row mx-auto row-cols-2 row-cols-md-3 g-4 justify-content-center product-card" key={item.name}>
                <div className="col">
                    <div className="card m-2">
                        <Image src={item.img} className="card-img-top" width={100} height={100} quality={100} alt="default image" priority />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.description}</p>
                            <p className="card-text">{item.price}</p>
                            <PreviewButton item={item} />
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

function AddToCartButton({ cart, setCart, item }) {
    // useEffect((item) => {
    //     alert(`${item} added to cart`)
    // }, [cart])

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
        // console.log(JSONdata);
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
        // console.log(`Result: ${result}`);
    }

    return (
        <div>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary" name="addToCartBtn">Add to Cart</button>
        </div>
    )
}

function PreviewButton({ item }) {
    const [preview, setPreview] = useState(false);

    if (preview) {
        const previewDiv = document.getElementById('preview');

        return (
            <>
                {createPortal(
                    <div className='d-flex justify-content-center position-relative'>
                        <div className='itemPreview col-6 position-fixed bg-warning shadow-lg text-dark lead m-5 p-0 rounded'
                        // style={{width: '1000px', height: '500px'}}
                        >
                            <div className='text-end'>
                                <button className="btn-close btn-close-white p-0 m-1 preview-close-button" type="button" onClick={() => setPreview(false)} aria-label="Close">
                                </button>
                            </div>
                            <div className='text-center m-5'>
                                <h5 className="card-title fw-bold">{item.name}</h5>
                                <p className="card-text">{item.description}</p>
                                <p className="card-text">{item.price}</p>
                                <button onClick={() => setPreview(false)} className="btn btn-secondary text-light" name="hideBtn">Hide</button>
                            </div>
                        </div>
                    </div>, previewDiv)}
            </>
        )
    }

    return (
        <button onClick={() => setPreview(true)} className="btn btn-warning text-light mb-2" name="hideBtn">Preview</button>
    )
}