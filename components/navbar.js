import Link from "next/link";
import { useState } from "react";
import ClientPortal from "./clientPortal";
import { useEffect } from "react";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <div>
                    <ViewWidgetsButton />
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" href={'/'}>Home</Link>
                        <Link className="nav-link" href={'/cart'}>Cart</Link>
                        <a className="nav-link" href="#">Pricing</a>
                        <a className="nav-link disabled">Disabled</a>
                    </div>
                    <div className="navbar-nav">
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

export function ViewWidgetsButton() {
    const [menuOpen, setMenuOpen] = useState(false)

    // useEffect(() => {

    // }, [])

    return (
        <>
            <button type="button" onClick={() => setMenuOpen(true)} className="btn btn-primary fw-bold">Select Widgets</button>
            {menuOpen && (
                <ClientPortal selector="#widget-menu">
                    <div className="widget-menu border">
                        <div className="row justify-content-start">
                            <p className="col-4">
                                This modal is rendered using{' '}
                                <a
                                    href="https://reactjs.org/docs/portals.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    portals
                                </a>
                                .
                            </p>
                            <button className="btn btn-primary" type="button" onClick={() => setMenuOpen(false)}>
                                Close Menu
                            </button>
                        </div>
                    </div>
                </ClientPortal>
            )}
        </>
    )
}