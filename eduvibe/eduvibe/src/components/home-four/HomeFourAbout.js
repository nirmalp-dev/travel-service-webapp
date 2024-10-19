import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import SectionTitle from '../sectionTitle/SectionTitle';

const HomeFourAbout = () => {
    return (
        <div className="eduvibe-home-four-about edu-about-area about-style-2 edu-section-gap bg-color-white">
            <div className="container eduvibe-animated-shape">
                <div className="row row--50">
                    <div className="col-lg-6">
                        <div className="about-image-gallery">
                            <div className="eduvibe-about-1-img-wrapper">
                                <img className="image-1" src={`${process.env.PUBLIC_URL}/images/travel-details/Japan.jpg`} alt="About Travel" />
                                <span className="eduvibe-about-blur">
                                    <img src="/images/about/about-07/about-blur.png" alt="About Blur" />
                                </span>
                            </div>
                            <div className="circle-image-wrapper">
                                <img className="image-2" src={`${process.env.PUBLIC_URL}/images/travelplaces/270by200/image.png`} alt="About Travel" />
                                <div className="circle-image">
                                    <span></span>
                                </div>
                            </div>
                            <div className="finished-session">
                                <div className="inner">
                                    <div className="text">1,200+</div>
                                    <span className="finished-title">Successful <br /> Trips</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="inner mt_md--40 mt_sm--40">
                            <SectionTitle
                                classes="text-start"
                                slogan="About Us"
                                title="Travel is the only thing you buy that makes you richer."
                            />
                            <ScrollAnimation 
                                animateIn="fadeInUp"
                                animateOut="fadeInOut"
                                animateOnce={true}
                            >
                                <p className="description mt--40 mt_md--20 mt_sm--20">At Travel Vibe, we offer customized travel plans that cater to your unique preferences, helping you explore the world with ease.</p>
                                <h6 className="subtitle mb--20">Join the Journey with Us</h6>
                            </ScrollAnimation>

                            <ScrollAnimation 
                                animateIn="fadeInUp"
                                animateOut="fadeInOut"
                                className="about-feature-list"
                                animateOnce={true}
                            >
                                <div className="row g-5">
                                    <div className="col-lg-6">
                                        <div className="feature-style-3">
                                            <div className="feature-content">
                                                <h6 className="feature-title">95%</h6>
                                                <p className="feature-description">95% of our travelers recommend us for their next adventure.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="feature-style-3">
                                            <div className="feature-content">
                                                <h6 className="feature-title">4.8/5</h6>
                                                <p className="feature-description">4.8/5 average rating from our satisfied customers.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollAnimation>

                            <ScrollAnimation 
                                animateIn="fadeInUp"
                                animateOut="fadeInOut"
                                className="read-more-btn mt--40"
                                animateOnce={true}
                            >
                                <Link className="edu-btn" to="#">Explore More <i className="icon-arrow-right-line-right"></i></Link>
                            </ScrollAnimation>
                        </div>
                    </div>
                </div>

                <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                    <div className="shape-image shape-image-1">
                        <img src="/images/shapes/shape-11-05.png" alt="Shape Thumb" />
                    </div>
                    <div className="shape-image shape-image-2">
                        <img src="/images/shapes/shape-08-01.png" alt="Shape Thumb" />
                    </div>
                    <div className="shape-image shape-image-3">
                        <img src="/images/shapes/shape-30.png" alt="Shape Thumb" />
                    </div>
                    <div className="shape shape-1">
                        <span className="shape-dot"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeFourAbout;
