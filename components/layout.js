import Navbar from './navbar'
import Widgets from './widgets'
import { useState } from 'react'
import { DynamicWidgetMenu } from '../pages'
import StockWidget from './stocks'
export default function Layout({ children }) {
// import ViewWidgetsButton from './widgetMenu';

    return (
        <>
            <Navbar />
            {/* <StockWidget /> */}
            {/* <ViewWidgetsButton /> */}
            <main>{children}</main>
        </>
    )
}