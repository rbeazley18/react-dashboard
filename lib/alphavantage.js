export async function loadStocks() {
    const key = process.env.STOCK_API_KEY
    // console.log(key);

    try {
        const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=${key}`)
        const stockData = await res.json()
        console.log(stockData);

        return stockData;

    } catch (e) {
        console.error(e);
    }
}

// export default async function handler(req, res) {
//     const stockData = await loadStocks()
//     res.status(200).json(stockData)
// }