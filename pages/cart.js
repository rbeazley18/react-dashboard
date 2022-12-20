import Head from 'next/head';
import Image from 'next/image';

export default function Cart() {
    return (
        <>
            <Head>
                <title>Cart</title>
            </Head>
            <main>
                <h1 className='text-center m-5'>Shopping Cart</h1>
                <div>
                    <CartItem />
                </div>
            </main>
        </>
    );
}

function CartItem() {
    return (
        <div className="card mb-3 col-6 mx-auto">
            <div className="row g-0">
                <div className="col-md-4">
                    <Image src="/images/default-placeholder.png" className="card-img-top" width={100} height={100} quality={100} alt="default image" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div>
    )
}