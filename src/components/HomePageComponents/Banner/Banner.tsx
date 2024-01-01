import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import classes from './Banner.module.css';

const Banner: React.FC = () => {
    return (
        <Carousel>
            <Carousel.Item interval={1000} className={classes.carousel_item}>
                <img
                    className="d-block w-100"
                    src="https://i.pinimg.com/originals/37/12/e4/3712e4921086beef88529eccdd522a0a.png"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={500} className={classes.carousel_item}>
                <img
                    className="d-block w-100"
                    src="https://www.cartly.ca/cdn/shop/files/Everyday_Specials_-_Banner_2000x.jpg?v=1633107773"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item className={classes.carousel_item}>
                <img
                    className="d-block w-100"
                    src="https://i.pinimg.com/736x/22/3a/3a/223a3aef3c0de598ca156a313136200d.jpg"
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default Banner;