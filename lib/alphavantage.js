export async function loadStocks(search) {
    const key = process.env.STOCK_API_KEY
    // console.log(key);

    try {
        const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${search}&apikey=${key}`)
        const stockData = await res.json()
        console.log(stockData);

        return stockData;

    } catch (e) {
        console.error(e);
    }
}
