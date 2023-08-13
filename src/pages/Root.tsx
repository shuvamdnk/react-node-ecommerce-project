import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import MainNavigationBar from '../components/MainNavigation/MainNavigationBar';
import Footer from '../components/Footer/Footer';
const Root: React.FC = () => {
    return (
        <>
            <MainNavigationBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default Root;