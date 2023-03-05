import { useEffect, useState, useContext } from "react";
import { StockSwitchContext } from "../pages";

export default function StockWidget() {
    const [stockData, setStockData] = useState([]);
    const [stockWatchlist, setStockWatchlist] = useState([]);
    // const [widgetStatus, setWidgetStatus] = useState(false);
    const { stockSwitchStatus, setStockSwitchStatus } = useContext(StockSwitchContext);

    useEffect(() => {
        setStockSwitchStatus(JSON.parse(window.localStorage.getItem('stockSwitchStatus')));
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [])

    useEffect(() => {
        console.log(stockSwitchStatus);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        console.log(stockData);
    }, [stockData])

    if (stockSwitchStatus) {
        return (
            <div className="col-12 col-sm-10 col-md-6 p-0">
                <div className="row justify-content-center m-2">
                    <div className="card w-100 widget-card mx-auto bg-dark shadow-lg border">
                        <div className="row justify-content-end">
                            <button style={{ position: 'absolute' }} className="btn-close btn-close-white close-button ms-auto" type="button" onClick={() => setStockSwitchStatus(false)} aria-label="Close">
                            </button>
                        </div>
                        <div className="p-4">
                            {stockData.length > 0 ? (
                                <StockDisplay
                                    stockData={stockData}
                                    setStockData={setStockData}
                                    setStockWatchlist={setStockWatchlist}
                                    stockWatchlist={stockWatchlist}
                                />
                            ) : (
                                <StockSearch
                                    stockData={stockData}
                                    setStockData={setStockData}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function StockSearch({ setStockData }) {
    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
        // Get data from the form.
        const data = {
            stock: event.target.stock.value
        }
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);
        // console.log(JSONdata);
        // API endpoint where we send form data.
        const endpoint = '/api/stockForm'
        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'origin',
                'Content-Type': 'application/json',
                'Origin': 'https://react-dashboard-ivory-five.vercel.app/',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }
        // Send the form data to our forms API and get a response.
        const response = await fetch(endpoint, options)
        // Get the response data from server as JSON.
        const result = await response.json()

        console.log(result);

        setStockData(stockData => [...stockData, result]);
    }

    return (
        <div className="text-light">
            <h1 className="lead p-2">Search Stocks</h1>
            <form onSubmit={handleSubmit} className="input-group">
                <input type="text" id="stock" name="stock" className="form-control" placeholder="Stock..." required />
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}

function StockDisplay({ stockData, setStockData, stockWatchlist, setStockWatchlist }) {
    let date = new Date().toLocaleDateString()

    useEffect(() => {
        console.log(stockWatchlist);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stockWatchlist])

    const handleSubmit = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault()
        // Get data from the form.
        const data = {
            stockName: event.target.name
        }
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);
        // console.log(JSONdata);
        // API endpoint where we send form data.
        const endpoint = '/api/addToWatchlistForm'
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

        setStockWatchlist(stockWatchlist => [...stockWatchlist, result.data]);
        // alert(`Stock added: ${JSON.stringify(result.data)}`);
        // console.log(`Result: ${result}`);
    }

    return (
        stockData.map((stock) => (
            <div className="text-light" key={stock["Global Quote"]["01. symbol"]}>
                <h3 className="card-header">
                    Your Stocks
                </h3>
                <div className="card-body">
                    <h1 className="card-title fw-bold">{stock["Global Quote"]["01. symbol"]}</h1>
                    <p className="card-text m-0">Open: <b>{stock["Global Quote"]["02. open"]}</b></p>
                    <p className="card-text m-0">High: <b>{stock["Global Quote"]["03. high"]}</b></p>
                    <p className="card-text m-0">Low: <b>{stock["Global Quote"]["04. low"]}</b></p>
                    <p className="card-text m-0">Price: <b>{stock["Global Quote"]["05. price"]}</b></p>
                    <p className="card-text m-0">Volume: <b>{stock["Global Quote"]["06. volume"]}</b></p>
                    <p className="card-text m-0">Latest Trading Day: <b>{stock["Global Quote"]["07. latest trading day"]}</b></p>
                    <p className="card-text m-0">Previous Close: <b>{stock["Global Quote"]["08. previous close"]}</b></p>
                    <p className="card-text m-0">Change: <b>{stock["Global Quote"]["09. change"]}</b></p>
                    <p className="card-text m-0">Change Percent: <b>{stock["Global Quote"]["10. change percent"]}</b></p>
                    <button onClick={() => setStockData([])} className="btn btn-sm btn-warning me-2">Reset</button>
                    <button onClick={handleSubmit} className="btn btn-sm btn-success my-2" name={stock["Global Quote"]["01. symbol"]}>Add to Watchlist</button>
                </div>
                <div className="card-footer text-muted">
                    {date}
                </div>
            </div>
        ))
    )
}