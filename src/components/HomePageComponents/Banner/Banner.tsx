import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import classes from './Banner.module.css';

const Banner: React.FC = () => {
    return (
        <Carousel>
            <Carousel.Item interval={1000} className={classes.carousel_item}>
                <img
                    className="d-block w-100"
                    src="https://www.samsungindiamarketing.com/SES/images/SES/14902_S23_Digital-banner-1440x760_new-text638136971618701663.jpg"
                    alt="First slide"
                />
            </Carousel.Item>
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
    );
}

export default Banner;