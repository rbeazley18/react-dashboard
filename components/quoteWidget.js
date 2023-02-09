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
                        {/* {quoteData.length > 0 && ( */}
                        <QuoteDisplay
                            quoteData={quoteData}
                            setQuoteData={setQuoteData}
                        />
                        {/* )} */}
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
    async function fetchQuote() {
        try {
            const response = await fetch('https://favqs.com/api/qotd', {
                method: 'GET',
                // mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            })
            console.log(response);

            const result = await response.json();
            
            setQuoteData(result);
        } catch (err) {
            console.log(err);
        }
    }
    
    useEffect(() => {
        fetchQuote()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    

    let date = new Date().toLocaleDateString()

    return (
        <>
            <h3 className="card-header">
                Quote of the Day
            </h3>
            {quoteData && quoteData.map((quote) => (
                <div className="text-light" key={quote.id}>

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