import React, { useEffect, useState } from 'react';
import ProductDetailsBox from '../components/ProductDetailsPageComponents/ProductDetails/ProductDetails';

function ProductDetails() {
    const [title, setTitle] = useState();
    useEffect(() => {
        document.title = 'Product Details - '+title;
    }, [title])

    const handleDocumentTitle = (dtitle) => {
        setTitle(dtitle)
    }

    return (
        <div>
            <ProductDetailsBox getDocTitle={handleDocumentTitle}/>
        </div>
    );
}

export default ProductDetails;