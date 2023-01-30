import { useEffect, useState, useContext } from "react";
import { StockSwitchContext } from "../pages";

export default function QuotesWidget() {
    const [quoteData, setQuoteData] = useState([]);
    const { quoteSwitchStatus, setQuoteSwitchStatus } = useContext(QuoteSwitchContext);

    useEffect(() => {
        setQuoteSwitchStatus(JSON.parse(window.localStorage.getItem('quoteSwitchStatus')));
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [])

    useEffect(() => {
        console.log(quoteSwitchStatus);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        console.log(quoteData);
    }, [quoteData])

    if (quoteSwitchStatus) {
        return (
            <>
                <div className="row justify-content-center">
                    <div className="card col-6 p-3 pt-1 m-3 bg-dark shadow-lg">
                        <div className="row">
                            <button className="btn-close ms-auto btn-close-white p-0 close-button" type="button" onClick={() => setQuoteSwitchStatus(false)} aria-label="Close">
                            </button>
                        </div>
                        {quoteData.length > 0 && (
                            <QuoteDisplay
                                quoteData={quoteData}
                                setQuoteData={setQuoteData}
                            />
                        )}
                    </div>
                </div>

            </>
        )
    }
}

function getQuote({ quoteData, setQuoteData }) {
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
        const endpoint = '/api/quoteForm'
        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'GET',
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

        setQuoteData(quoteData => [...quoteData, result]);
    }

    // return (
    //     <div className="text-light">
    //         <p className="lead">Quote of the Day</p>
    //         <form onSubmit={handleSubmit} className="input-group">
    //             <input type="text" id="stock" name="stock" className="form-control" placeholder="Stock..." required />
    //             <button className="btn btn-primary" type="submit">Submit</button>
    //         </form>
    //     </div>
    // )
}

function QuoteDisplay({ quoteData, setQuoteData }) {
    let date = new Date().toLocaleDateString()

    return (
        quoteData.map((quote) => (
            <div className="text-light" key={quote.quote.id}>
                <h3 className="card-header">
                    Quote of the Day
                </h3>
                <div className="card-body">
                    <h5 className="card-title">{quote.quote.body}</h5>
                    <p className="card-text">{quote.quote.author}</p>
                    <p className="card-text"></p>
                    {/* <button onClick={() => setQuoteData([])} className="btn btn-warning">Reset</button> */}
                </div>
                <div className="card-footer text-muted">
                    {date}
                </div>
            </div>
        ))
    )
}