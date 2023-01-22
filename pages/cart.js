import Head from 'next/head';
import Image from 'next/image';
import clientPromise from '../lib/mongodb';

export default function Cart({ cartItems }) {
    const allCartItems = cartItems.map((item) => (
        <>
            <div className="card mb-3 col-4 mx-auto" key={item.id}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <Image src="/images/default-placeholder.png" className="card-img-top" width={100} height={100} quality={100} alt="default image" priority />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.brand}</p>
                            <p>ID: {item._id}</p>
                            <p className="card-text"><small className="text-muted">{item.price}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ))

    return (
        <>
            <Head>
                <title>Cart</title>
            </Head>
            <main>
                <h1 className='text-center m-5'>Shopping Cart</h1>
                <div>{allCartItems}</div>


            </main>
        </>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("Items");

        const cartItems = await db
            .collection("Cart")
            .find({})
            .limit(20)
            .toArray();

        // console.log(cartItems)

        return {
            props: { cartItems: JSON.parse(JSON.stringify(cartItems)) },

        };

    } catch (e) {
        console.error(e);
    }
}