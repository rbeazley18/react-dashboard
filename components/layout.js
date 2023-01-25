import Navbar from './navbar'

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            {/* <StockWidget /> */}
            {/* <ViewWidgetsButton /> */}
            <main>{children}</main>
        </>
    )
}