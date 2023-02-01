import React from 'react'
import Navbar from './navbar';
import Footer from './footer';
import Home from './home';

const Layout = () => {
    return (
        <React.Fragment>
            <Navbar />
            <Home />
            <Footer />
        </React.Fragment>
    )
}

export default Layout;