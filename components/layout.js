import Navbar from './navbar'
import Widgets from './widgets'
import { useState } from 'react'

export default function Layout({ children }) {

    return (
        <>
            <Navbar />
            <Widgets />
            <main>{children}</main>
        </>
    )
}