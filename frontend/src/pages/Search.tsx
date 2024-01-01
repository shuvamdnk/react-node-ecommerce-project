import React, {useEffect} from 'react';
import SearchResult from '../components/MainNavigation/SearchResult';

const Search:React.FC = () => {
    useEffect(() => {
        document.title = 'Search';
    },[])
    return (
        <>
            <SearchResult />
        </>
    );
}

export default Search;