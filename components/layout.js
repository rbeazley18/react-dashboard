import Navbar from './navbar'
import WeatherWidget from './weather'
import StockWidget from '../pages/stocks'
import { useState } from 'react'

export default function Layout({ children }) {
    const [switchStatus, setSwitchStatus] = useState(false);

    return (
        <>
            <Navbar />
            <WeatherWidget
                setSwitchStatus={setSwitchStatus}
                switchStatus={switchStatus}
            />
            {/* <StockWidget /> */}
            <main>{children}</main>
        </>
    )
}