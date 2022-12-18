import Link from "next/link";

export default function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link className="nav-link active" aria-current="page" href={'/'}>Home</Link>
                        <Link className="nav-link" href={'/cart'}>Cart</Link>
                        <a class="nav-link" href="#">Pricing</a>
                        <a class="nav-link disabled">Disabled</a>
                    </div>
                    <div class="navbar-nav">
                        <ViewCartButton />
                    </div>
                </div>
            </div>
        </nav>
    );
}


export function ViewCartButton() {
    // const [count, setCount] = useState(0);

    // function handleClick() {
    //     setCount(count + 1);
    //   }
    return (
        <Link href={'/cart'} passHref>
            <button className="btn btn-primary fw-bold">View Cart</button>
        </Link>
    )
}