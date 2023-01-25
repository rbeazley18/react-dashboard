import { useEffect, useState, useContext } from "react";
// import WidgetSwitch from "./widgetSwitch";
import ClientPortal from "./clientPortal";
import { StockSwitchContext } from "../pages";

export default function StockWidget() {
    const [stockData, setStockData] = useState([]);
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
            <>
                <div className="row justify-content-center">
                    <div className="card col-6 p-3 pt-1 m-3 bg-dark shadow-lg">
                        <div className="row">
                            <button className="btn-close ms-auto btn-close-white p-0 close-button" type="button" onClick={() => setStockSwitchStatus(false)} aria-label="Close">
                            </button>
                        </div>
                        {stockData.length > 0 ? (
                            <StockDisplay
                                stockData={stockData}
                                setStockData={setStockData}
                            />
                        ) : (
                            <StockSearch
                                stockData={stockData}
                                setStockData={setStockData}
                            />
                        )}
                    </div>
                </div>

            </>
        )
    }
}

function StockSearch({ stockData, setStockData }) {
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
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }
        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)
        // Get the response data from server as JSON.
        const result = await response.json()

        console.log(result);

        setStockData(stockData => [...stockData, result]);
    }

    return (
        <div className="text-light">
            <p className="lead">Search Stocks</p>
            <form onSubmit={handleSubmit} className="input-group">
                <input type="text" id="stock" name="stock" className="form-control" placeholder="Stock..." required />
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}

function StockDisplay({ stockData, setStockData }) {
    let date = new Date().toLocaleDateString()

    return (
        stockData.map((stock) => (
            <div className="text-light" key={stock["Global Quote"]["01. symbol"]}>
                <h3 className="card-header">
                    Your Stocks
                </h3>
                <div className="card-body">
                    <h5 className="card-title">{stock["Global Quote"]["01. symbol"]}</h5>
                    <p className="card-text"></p>
                    <p className="card-text"></p>
                    <button onClick={() => setStockData([])} className="btn btn-warning">Reset</button>
                </div>
                <div className="card-footer text-muted">
                    {date}
                </div>
            </div>
        ))
    )
}