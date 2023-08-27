import React,{useEffect} from 'react';
import ProductDetailsBox from '../components/ProductDetailsPageComponents/ProductDetails/ProductDetails';
import RelatedProduct from '../components/ProductDetailsPageComponents/RelatedProducts/RelatedProduct';

function ProductDetails() {
    useEffect(() => {
        document.title = 'Product Details';
    },[])
    return (
        <div>
            <ProductDetailsBox/>
            <RelatedProduct />
        </div>
    );
}

export default ProductDetails;