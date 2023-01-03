import Navbar from './navbar'
import WeatherWidget from './weather'
import StockWidget from '../pages/stocks'

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <WeatherWidget />
            {/* <StockWidget /> */}
            <main>{children}</main>
        </>
    )
}