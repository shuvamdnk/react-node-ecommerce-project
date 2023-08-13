import React,{useEffect} from 'react';

// Components
import Banner from '../components/HomePageComponents/Banner/Banner';
import Category from '../components/HomePageComponents/Category/Category';

const Home: React.FC = () => {
    useEffect(() => {
        document.title = 'Home';
    },[])
    return (
        <>
            <Banner />
            <Category />
            <Category />
        </>
    );
}

export default Home;