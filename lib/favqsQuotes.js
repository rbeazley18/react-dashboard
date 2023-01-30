export async function loadQuote() {
    try {
        const res = await fetch('https://favqs.com/api/qotd')
        const quoteData = await res.json()
        console.log(quoteData);

        return quoteData;

    } catch (e) {
        console.error(e);
    }
}
