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
            <Category skip={0} limit={30} title={'Features Products'} />
            <Category skip={30} limit={30} title={'Best Selling Products'}/>
            <Category skip={60} limit={30} title={'New Collection'}/>
        </>
    );
}

export default Home;