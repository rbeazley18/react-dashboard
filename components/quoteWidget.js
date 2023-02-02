import { useEffect, useState, useContext } from "react";
import { QuoteSwitchContext } from "../pages";
import { loadQuote } from "../lib/favqsQuotes";

export default function QuoteWidget() {
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

                        <QuoteDisplay
                            quoteData={quoteData}
                            setQuoteData={setQuoteData}
                        />

                    </div>
                </div>

            </>
        )
    }
}

// function getQuote({ quoteData, setQuoteData }) {
//     const handleSubmit = async (event) => {


//     }

// return (
//     <div className="text-light">
//         <p className="lead">Quote of the Day</p>
//         <form onSubmit={handleSubmit} className="input-group">
//             <input type="text" id="stock" name="stock" className="form-control" placeholder="Stock..." required />
//             <button className="btn btn-primary" type="submit">Submit</button>
//         </form>
//     </div>
// )
// }

function QuoteDisplay({ quoteData, setQuoteData }) {
    useEffect(() => {
        // const endpoint = 'https://favqs.com/api/qotd'
        // // Form the request for sending data to the server.
        // const options = {
        //     // The method is GET because we are requesting data.
        //     method: 'GET',
        //     // Tell the server we're sending JSON.
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     // Body of the request is the JSON data we created above.
        //     // body: JSONdata,
        // }
        // // Send the form data to our forms API on Vercel and get a response.
        // const response = fetch(endpoint, options)
        // // Get the response data from server as JSON.
        // const result = loadQuote()

        // console.log(result);

        // setQuoteData(quoteData => [...quoteData, result]);
        fetchQuote()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function fetchQuote() {
        const response = await fetch('https://favqs.com/api/qotd', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin' : '*'
            },
        })
        const data = await response.json()
        setQuoteData(data);
    }

    let date = new Date().toLocaleDateString()

    return (
        <>
            {quoteData && quoteData.map((quote) => (
                <div className="text-light" key={quote.quote.id}>
                    <h3 className="card-header">
                        Quote of the Day
                    </h3>
                    <div className="card-body">
                        <h5 className="card-title">{quote.body}</h5>
                        <p className="card-text">{quote.author}</p>
                        <p className="card-text"></p>
                        {/* <button onClick={() => setQuoteData([])} className="btn btn-warning">Reset</button> */}
                    </div>
                    <div className="card-footer text-muted">
                        {date}
                    </div>
                </div>
            ))}
        </>
    )
}