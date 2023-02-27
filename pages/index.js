import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { useState, useEffect, createContext } from 'react';
import { createPortal } from 'react-dom';
import { items } from '../fake-data/data';
import WidgetMenu from '../components/widgetMenu';
import dynamic from "next/dynamic";
import ViewWidgetsButton from '../components/widgetMenu';
import StockWidget from '../components/stockWidget';
import WeatherWidget from '../components/weatherWidget';
import Widgets from '../components/allWidgets';

export const StockSwitchContext = createContext(false);
export const WeatherSwitchContext = createContext(false);
export const QuoteSwitchContext = createContext(false);
export const NewsSwitchContext = createContext(false);

export default function Home() {
    const [stockSwitchStatus, setStockSwitchStatus] = useState(false);
    const [weatherSwitchStatus, setWeatherSwitchStatus] = useState(false);
    const [quoteSwitchStatus, setQuoteSwitchStatus] = useState(false);
    const [newsSwitchStatus, setNewsSwitchStatus] = useState(false);

    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="Your shopping items." />
            </Head>
            <main>
                <div className="widget-components">
                    <StockSwitchContext.Provider value={{ stockSwitchStatus, setStockSwitchStatus }} >
                        <WeatherSwitchContext.Provider value={{ weatherSwitchStatus, setWeatherSwitchStatus }}>
                            <QuoteSwitchContext.Provider value={{ quoteSwitchStatus, setQuoteSwitchStatus }}>
                                <NewsSwitchContext.Provider value={{ newsSwitchStatus, setNewsSwitchStatus }}>
                                    <div className='ms-2'>
                                        <ViewWidgetsButton />
                                    </div>
                                    <Widgets />
                                </NewsSwitchContext.Provider>
                            </QuoteSwitchContext.Provider>
                        </WeatherSwitchContext.Provider>
                    </StockSwitchContext.Provider>
                </div>
            </main>
        </>
    )
}