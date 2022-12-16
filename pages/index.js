import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Your shopping cart." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Home</h1>
        <Link href={'/cart'}>Cart</Link>
      </main>
    </>
  )
}
