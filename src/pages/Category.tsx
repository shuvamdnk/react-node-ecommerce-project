import React,{useEffect} from 'react';
import CatrgoryDetails from '../components/CategoryPageComponents/CategoryDetails/CategoryDetails';
const Category:React.FC = () => {
    useEffect(() => {
        document.title = 'Category';
    },[])
    return (
        <>
            <CatrgoryDetails/>
        </>
    );
}

export default Category;