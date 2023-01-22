// import loadStocks from "../lib/alphavantage";

// export default function StockWidget({ stockData }) {
//     const date = new Date().toLocaleString()

//     if (stockData) {
//         return (
//             [stockData].map((stock) => (
//                 <>
//                     <div className="card text-center col-md-8 mx-auto" key={stock["Global Quote"]["01. symbol"]}>
//                         <div className="card-header">
//                             Stocks
//                         </div>
//                         <div className="card-body">
//                             <h5 className="card-title">{stock["Global Quote"]["02. open"]}</h5>
//                             <p className="card-text">{stock["Global Quote"]["01. symbol"]}</p>
//                             <a href="#" className="btn btn-primary">Expand Stocks</a>
//                         </div>
//                         <div className="card-footer text-muted">
//                             {date}
//                         </div>
//                     </div>
//                 </>
//             ))
//         )
//     }
// }


// export async function getStaticProps() {
//     const key = process.env.STOCK_API_KEY
//     // console.log(key);

//     try {
//         const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=${key}`)
//         const stockData = await res.json()
//         console.log(stockData);

//         // return stockData;
//         return {
//             props: { stockData: JSON.parse(JSON.stringify(stockData)) }
//         };

//     } catch (e) {
//         console.error(e);
//     }
// }