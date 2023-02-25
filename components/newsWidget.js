import { useEffect, useState, useContext } from "react";
import { NewsSwitchContext } from "../pages";
import Link from "next/link";

export default function NewsWidget() {
    const [newsData, setNewsData] = useState([]);
    const [showMore, setShowMore] = useState([]);

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
                    <div className="card col-10 p-3 pt-1 m-3 bg-dark shadow-lg">
                        <div className="row">
                            <button className="btn-close ms-auto btn-close-white p-0 close-button" type="button" onClick={() => setNewsSwitchStatus(false)} aria-label="Close">
                            </button>
                        </div>
                        <h1 className="card-header">News</h1>
                        <NewsDisplay
                            newsData={newsData}
                            setNewsData={setNewsData}
                            newsSwitchStatus={newsSwitchStatus}
                            showMore={showMore}
                            setShowMore={setShowMore}
                        />
                        {!showMore ? (
                            <button onClick={() => setShowMore(true)} className="btn btn-warning">Show More</button>
                        ) : (
                            <button onClick={() => setShowMore(false)} className="btn btn-warning">Hide</button>
                        )}
                        <div className="card-footer text-muted">{date}</div>
                    </div>
                </div>

            </>
        )
    }
}

function NewsDisplay({ newsData, setNewsData, newsSwitchStatus, setShowMore, showMore }) {


    const key = process.env.NEXT_PUBLIC_NEWS_API_KEY

    async function fetchNews() {
        try {
            const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`, {
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

            setNewsData([result]);
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

    const tenArticles = newsData.map(news => (
        <>
            {news.articles.map((article, i) =>
                i < 5 ?
                    (<div className="text-light m-0" key={article.url}>
                        <div className="card-body">
                            <h2 style={{ fontSize: '24px' }}><a className="text-decoration-none link-success" data-bs-toggle="tooltip" title={article.url} href={article.url}>{article.title}</a></h2>
                            <p className="card-text m-0">{article.author}</p>
                            <p className="card-text text-muted">{article.source.name}</p>
                            <p className="card-text">{article.description}</p>
                            <p className="card-text">{article.content}</p>
                            {/* <button onClick={() => setShowMore(true)} className="btn btn-warning">Show More</button> */}
                            <hr />
                        </div>
                    </div>) : null)
            }
        </>
    ))

    const allArticles = newsData.map(news => (
        <>
            {news.articles.map((article) =>
            (<div className="text-light m-0" key={article.url}>
                <div className="card-body">
                    <h2 style={{ fontSize: '24px' }}><a className="text-decoration-none link-success" data-bs-toggle="tooltip" title={article.url} href={article.url}>{article.title}</a></h2>
                    <p className="card-text m-0">{article.author}</p>
                    <p className="card-text text-muted">{article.source.name}</p>
                    <p className="card-text">{article.description}</p>
                    <p className="card-text">{article.content}</p>
                    {/* <button onClick={() => setShowMore(false)} className="btn btn-warning">Hide</button> */}
                    <hr />
                </div>
            </div>)
            )}
        </>
    ))

    return (
        !showMore ?
            (
                <div>{tenArticles}</div>
            ) : (
                <div>{allArticles}</div>
            )
    )
}