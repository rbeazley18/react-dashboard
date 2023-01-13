import Navbar from './navbar'
import Widgets from './widgets'
import { useState } from 'react'
import { DynamicWidgetMenu } from '../pages'
export default function Layout({ children }) {
// import ViewWidgetsButton from './widgetMenu';

    return (
        <>
            <Navbar />
            {/* <ViewWidgetsButton /> */}
            <main>{children}</main>
        </>
    )
}