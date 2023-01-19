import { useEffect, useState } from "react";
// import WidgetSwitch from "./widgetSwitch";
import ClientPortal from "./clientPortal";

export default function StockWidget() {
    const [stockData, setStockData] = useState([]);
    const [switchStatus, setSwitchStatus] = useState(false);

    useEffect(() => {
        console.log(stockData);
    }, [stockData])

    useEffect(() => {
        console.log(switchStatus);
    }, [switchStatus])


    if (switchStatus) {
        return (
            <div className="">
                <StockSwitch
                    switchStatus={switchStatus}
                    setSwitchStatus={setSwitchStatus}
                />
                <ClientPortal selector='#widget'>
                    <div className="row justify-content-center">
                        <div className="card col-6 p-3 m-3">
                            <button className="btn-close ms-auto p-0 m-0 close-button" type="button" onClick={() => setSwitchStatus(false)} aria-label="Close">
                            </button>
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
                </ClientPortal>
            </div>
        )
    }

    return (
        <StockSwitch
            switchStatus={switchStatus}
            setSwitchStatus={setSwitchStatus}
        />
    )
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
        <div>
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
            <div key={stock["Global Quote"]["01. symbol"]}>
                <div className="card-header">
                    Stocks
                </div>
                <div className="card-body">
                    <h5 className="card-title">{stock["Global Quote"]["01. symbol"]}</h5>
                    <p className="card-text"></p>
                    <p className="card-text"></p>
                    <button onClick={() => setStockData([])} className="btn btn-danger">Reset</button>
                </div>
                <div className="card-footer text-muted">
                    {date}
                </div>
            </div>
        ))
    )
}

function StockSwitch({ switchStatus, setSwitchStatus }) {


    function handleToggle() {
        setSwitchStatus(!switchStatus);
        return switchStatus;
    }

    return (
        <div className="form-check form-switch m-3">
            <input onChange={handleToggle} checked={switchStatus} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Stocks</label>
        </div>
    )
}