import React, { useState } from 'react';
import Slider from 'react-slick';
import { TestimonialTwoParams } from '../../utils/script';
import { TestimonialTwoThumDots } from '../../utils/script';

const data = [
    {
        name: "Geraldine D. Anspach",
        details: "Traveling with this service was a life-changing experience. The guides were knowledgeable, and every destination was well-planned. Highly recommend!",
        designation: "Travel Blogger",
        image: "client-01.png"
    },
    {
        name: "Lorraine D. Raines",
        details: "I had the best trip of my life! The accommodations were fantastic, and the local experiences were unforgettable. This is the way to travel.",
        designation: "Adventure Enthusiast",
        image: "client-02.png"
    },
    {
        name: "David M. Bard",
        details: "Every detail was taken care of, allowing me to focus on making memories. From booking to the final destination, everything was seamless.",
        designation: "Frequent Traveler",
        image: "client-03.png"
    },
    {
        name: "Julia H. Smith",
        details: "I loved the variety of destinations and activities! It was a perfect mix of relaxation and adventure. Can't wait to book my next trip!",
        designation: "Travel Journalist",
        image: "client-04.png"
    },
];

const TestimonialTwo = ({ classes }) => {
    const [testimonialNav, setTestimonialNav] = useState();
    const [testimonialThumb, setTestimonialThumb] = useState();

    return (
        <div className={classes}>
            <Slider
                className="testimonial-nav-activation"
                asNavFor={testimonialThumb}
                ref={(slider1) => setTestimonialNav(slider1)}
                {...TestimonialTwoParams}
            >
                {data.map((item, i) => (
                    <div className="testimonial-nav-content" key={i}>
                        <p className="description">“ {item.details} ”</p>
                        <div className="client-info">
                            <h6 className="title">{item.name}</h6>
                            <span className="designation">{item.designation}</span>
                        </div>
                    </div>
                ))}
            </Slider>

            <div className="testimonial-nav-wrapper">
                <Slider
                    className="testimonial-nav-button"
                    {...TestimonialTwoThumDots}
                    asNavFor={testimonialNav}
                    ref={(slider2) => setTestimonialThumb(slider2)}
                >
                    {data.map((item, i) => (
                        <div className="single-thumbnail" key={i}>
                            <img src={`${process.env.PUBLIC_URL}./images/testimonial/testimonial-02/${item.image}`} alt="Client Thumb" />
                            <div className="loader-container">
                                <div className="circle-loader-wrap">
                                    <div className="left-wrap">
                                        <div className="loader"></div>
                                    </div>
                                    <div className="right-wrap">
                                        <div className="loader"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default TestimonialTwo;
