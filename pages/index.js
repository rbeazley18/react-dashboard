import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { useState } from 'react';


export default function Home() {
    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Your shopping items." />
            </Head>
            <main>
                <div className='text-center'>
                        <h1>Home</h1>
                </div>
                <div className='mt-5'>
                    <ProductCard />
                </div>
            </main>
        </>
    )
}



function ProductCard() {

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
            <div className="col">
                <div className="card">
                    <Image src="/images/default-placeholder.png" className="card-img-top" width={100} height={200} quality={100} alt="default image" />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Tempor quod commodo ut vulputate justo justo magna accusam eu nulla molestie augue accumsan vel dolore ipsum.</p>
                        <Link className='btn btn-warning text-light' href={'#'}>View Item</Link>
                        <AddToCartButton />
                    </div>
                </div>
            </div>
        </div>
    )
}

function AddToCartButton() {
    function handleClick() {
        alert('Item added to cart.');
    }
    return (
        <button onClick={handleClick} className="btn btn-primary">Add To Cart</button>
    )
}