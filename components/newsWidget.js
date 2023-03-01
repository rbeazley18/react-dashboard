import { useEffect, useState, useContext } from "react";
import { NewsSwitchContext } from "../pages";
import Link from "next/link";
import fetchNews from "../lib/news";

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

    const handleSubmit = async (event) => {
        //     // Stop the form from submitting and refreshing the page.
        event.preventDefault()
        //     // Get data from the form.
        const data = {
            category: event.target.name.value
        }
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);
        // console.log(JSONdata);
        // API endpoint where we send form data.
        const endpoint = '/api/newsForm'
        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }
            // Send the form data to our forms API on Vercel and get a response.
            const response = await fetch(endpoint, options)

            // Get the response data from server as JSON.
            // If server returns the name submitted, that means the form works.
            const result = await response.json()
            // alert(`Your item: ${JSON.stringify(result.data)}`);
            // console.log(`Result: ${result}`);

            setNewsData([result]);
    }

    if (newsSwitchStatus) {
        return (
            <div className="col-11 mx-auto">
                <div className="row justify-content-center">
                    <div className="card p-3 pt-1 m-3 bg-dark shadow-lg border">
                        <div className="row justify-content-end">
                            <button style={{ position: 'absolute' }} className="btn-close btn-close-white close-button ms-auto" type="button" onClick={() => setNewsSwitchStatus(false)} aria-label="Close">
                            </button>
                        </div>
                        <h1 className="card-header border border-secondary m-3 rounded">News</h1>
                        <nav className="navbar navbar-expand-lg navbar-dark text-light">
                            <div className="container-fluid">
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                                    <div className="navbar-nav">
                                        <button type="submit" onClick={handleSubmit} className="nav-link btn" name="business">
                                            Business
                                        </button>
                                        <button type="submit" onClick={handleSubmit} className="nav-link btn" name="technology">
                                            Technology
                                        </button>
                                        <button type="submit" onClick={handleSubmit} className="nav-link btn" name="sports">
                                            Sports
                                        </button>
                                        <button type="submit" onClick={handleSubmit} className="nav-link btn" name="entertainment">
                                            Entertainment
                                        </button>
                                        <button type="submit" onClick={handleSubmit} className="nav-link btn" name="general">
                                            General
                                        </button>
                                        <button type="submit" onClick={handleSubmit} className="nav-link btn" name="health">
                                            Health
                                        </button>
                                        <button type="submit" onClick={handleSubmit} className="nav-link btn" name="science">
                                            Science
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <NewsDisplay
                            newsData={newsData}
                            setNewsData={setNewsData}
                            newsSwitchStatus={newsSwitchStatus}
                            showMore={showMore}
                            setShowMore={setShowMore}
                        />
                        <div className="p-2">
                            {!showMore ? (
                                <button onClick={() => setShowMore(true)} className="btn btn-warning">Show More</button>
                            ) : (
                                <button onClick={() => setShowMore(false)} className="btn btn-warning">Hide</button>
                            )}
                        </div>
                        <div className="card-footer text-muted">{date}</div>
                    </div>
                </div>

            </div>
        )
    }
}

function NewsDisplay({ newsData, setNewsData, newsSwitchStatus, setShowMore, showMore }) {

    const renderNews = async (event) => {
        //     // Stop the form from submitting and refreshing the page.
        event.preventDefault()
        //     // Get data from the form.
        const data = {
            category: event.target.name.value
        }
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);
        // console.log(JSONdata);
        // API endpoint where we send form data.
        const endpoint = '/api/newsForm'
        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }
            // Send the form data to our forms API on Vercel and get a response.
            const response = await fetch(endpoint, options)

            // Get the response data from server as JSON.
            // If server returns the name submitted, that means the form works.
            const result = await response.json()
            // alert(`Your item: ${JSON.stringify(result.data)}`);
            console.log(`Result: ${result}`);

            setNewsData([result]);
    }
    // const key = process.env.NEXT_PUBLIC_NEWS_API_KEY

    // async function fetchNews() {
    //     try {
    //         const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`, {
    //             method: 'GET',
    //             // mode: 'cors',
    //             headers: {
    //                 'Access-Control-Request-Method': 'GET',
    //                 'Access-Control-Request-Headers': 'origin',
    //                 'Origin': 'http://localhost:3000/',
    //             },
    //         })
    //         console.log(response);

    //         const result = await response.json();

    //         setNewsData([result]);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    useEffect(() => {
        fetchNews()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newsSwitchStatus])

    useEffect(() => {
        setShowMore(false);
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