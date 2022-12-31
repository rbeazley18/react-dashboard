import Navbar from './navbar'
import WeatherWidget from '../pages/api/weather'

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <WeatherWidget />
            <main>{children}</main>
        </>
    )
}