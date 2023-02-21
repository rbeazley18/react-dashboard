import { useEffect, useState, useContext } from "react";
import { NewsSwitchContext } from "../pages";

export default function NewsWidget() {
    const [newsData, setNewsData] = useState([]);
    const { newsSwitchStatus, setNewsSwitchStatus } = useContext(NewsSwitchContext);

    let date = new Date().toLocaleDateString()

    useEffect(() => {
        setNewsSwitchStatus(JSON.parse(window.localStorage.getItem('newsSwitchStatus')));
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [])

    useEffect(() => {
        console.log(newsSwitchStatus);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        console.log(newsData);
    }, [newsData])

    if (newsSwitchStatus) {
        return (
            <>
                <div className="row justify-content-center">
                    <div className="card col-6 p-3 pt-1 m-3 bg-dark shadow-lg">
                        <div className="row">
                            <button className="btn-close ms-auto btn-close-white p-0 close-button" type="button" onClick={() => setNewsSwitchStatus(false)} aria-label="Close">
                            </button>
                        </div>
                        <h3 className="card-header">News</h3>
                        <NewsDisplay
                            newsData={newsData}
                            setNewsData={setNewsData}
                            newsSwitchStatus={newsSwitchStatus}
                        />
                        <div className="card-footer text-muted">{date}</div>
                    </div>
                </div>

            </>
        )
    }
}

function NewsDisplay({ newsData, setNewsData, newsSwitchStatus }) {
    const key = process.env.NEXT_PUBLIC_NEWS_API_KEY

    async function fetchNews() {
        try {
            const response = await fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${key}`, {
                method: 'GET',
                // mode: 'cors',
                headers: {
                    'Access-Control-Request-Method': 'GET',
                    'Access-Control-Request-Headers': 'origin',
                    'Origin': 'http://localhost:3000/',
                },
            })
            console.log(response);

            const result = await response.json();

            setNewsData(newsData => [...newsData, result]);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchNews()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newsSwitchStatus])

    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])





    // function tenArticles(data) {
    //     let values = [];
    //     for (let i = 0; i < 10; i++) {
    //         let newsArticles = data.articles[i];
    //         values.push(newsArticles);
    //     }
    //     return values;
    // }





    return (
        <>
            {newsData.length > 0 && newsData.map((news, i) => (
                i < 5 ?
                    (<div className="text-light" key={i}>
                        <div className="card-body">
                            <h5 className="card-title">{news.articles[i].title}</h5>
                            <p className="lead">(Key: {i})</p>
                            <p className="card-text">{news.articles[i].author}</p>
                            <p className="card-text">{news.articles[i].description}</p>
                            <hr />
                            {/* <h5 className="card-title">{news.articles[1].title} (Key: {i})</h5>
                    <p className="card-text">{news.articles[1].author}</p>
                    <p className="card-text">{news.articles[1].description}</p> */}
                            {/* <button onClick={() => setNewsData([])} className="btn btn-warning">Reset</button> */}
                        </div>
                    </div>) : null
            ))}
        </>
    )
}