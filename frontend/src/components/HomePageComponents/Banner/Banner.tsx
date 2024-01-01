import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import classes from './Banner.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const Banner: React.FC = () => {

    const [banners, setBanner] = useState([]);
    useEffect(() => {
        async function getBanners() {
            const response = await fetch(`https://mobileadmin.nybizz.es/api/customer/home?language=English`);
            const data = await response.json();
            console.log(data);
            setBanner(data.data.banners)
        }
        getBanners();
    }, [])

    return (
        <div className='mt-2'>
            <Carousel>
                {/* {
                    banners.map(banner => (
                        <Carousel.Item key={banner.image} interval={1000} className={classes.carousel_item}>
                            <img
                                className="d-block w-100"
                                src={banner.image}
                                alt={banner.id}
                                loading='lezy'
                            />
                        </Carousel.Item>
                    ))
                } */}

                <Carousel.Item interval={500} className={classes.carousel_item}>
                <img
                    className="d-block w-100"
                    src="https://i.pinimg.com/originals/ea/bd/aa/eabdaadef69a169117a2900e77bfde9f.jpg"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item className={classes.carousel_item}>
                <img
                    className="d-block w-100"
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/d80af4118883485.6092425f50c79.jpg"
                    alt="Third slide"
                />
            </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default Banner;