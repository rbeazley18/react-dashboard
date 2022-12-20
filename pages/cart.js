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
        <div class="card mb-3 col-6 mx-auto">
            <div class="row g-0">
                <div class="col-md-4">
                    <Image src="/images/default-placeholder.png" className="card-img-top" width={100} height={100} quality={100} alt="default image" />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div>
    )
}