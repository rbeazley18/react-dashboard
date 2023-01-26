import '../styles/globals.css'
import Head from "next/head";
import Script from "next/script";
import Layout from '../components/layout';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous" strategy='lazyOnload'
            />
            <Layout>
                <div id='widget-menu' />
                {/* <div id='widget' /> */}
                {/* <div id='preview'/> */}
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
