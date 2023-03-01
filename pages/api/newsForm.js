import fetchNews from "../../lib/news";

export default async function getNewsHandler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
    const category = body.category

    // console.log('body: ', body)

    if (!body.category) {
        const data = await fetchNews();
        return res.json(data)
    } else {
        const data = await fetchNews(category);
        return res.json(data);
    }
}

