export default async function loadNews(query) {
    const key = process.env.NEWS_API_KEY

    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${key}`,
            // {
            // method: 'GET',
            // // mode: 'cors',
            // headers: {
            //     'Access-Control-Request-Method': 'GET',
            //     'Access-Control-Request-Headers': 'origin',
            //     'Origin': 'http://localhost:3000/',
            // },
            // }
        )
        

        const newsData = await response.json();
        console.log(newsData);
        return newsData

    } catch (err) {
        console.log(err);
    }
}