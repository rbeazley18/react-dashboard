import Link from "next/link";
import { useState } from "react";
import ClientPortal from "./clientPortal";

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
    const [menuOpen, setMenuOpen] = useState()

    return (
        <>
            <button type="button" onClick={(setMenuOpen(true))} className="btn btn-primary fw-bold">Select Widgets</button>
            {menuOpen && (
                <ClientPortal selector="#widget-menu">
                    <div className="">
                        <div className="widget-menu">
                            <p>
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
                            <button type="button" onClick={() => setMenuOpen(false)}>
                                Close Menu
                            </button>
                        </div>
                        <style jsx>{`
              :global(body) {
                overflow: hidden;
              }
              .backdrop {
                position: fixed;
                background-color: rgba(0, 0, 0, 0.7);
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
              }
              .modal {
                background-color: white;
                position: absolute;
                top: 10%;
                right: 10%;
                bottom: 10%;
                left: 10%;
                padding: 1em;
              }
            `}</style>
                    </div>
                </ClientPortal>
            )}
        </>
    )
}