import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MainNavigationBar from '../components/MainNavigation/MainNavigationBar';
import Footer from '../components/Footer/Footer';
const Root: React.FC = () => {
    const {pathname} = useLocation();
    console.log(pathname);

    useEffect(() => {
        window.scrollTo({
            top:0,
            left:0,
            behavior:'instant'
        });
    },[pathname])
    
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