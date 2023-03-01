export default async function fetchNews(category) {
    const key = process.env.NEXT_PUBLIC_NEWS_API_KEY

    try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`,
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
        console.log(response);

        const newsData = await response.json();

        return newsData

    } catch (err) {
        console.log(err);
    }
}