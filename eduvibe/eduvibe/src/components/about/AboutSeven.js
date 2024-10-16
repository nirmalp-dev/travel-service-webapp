
import React from 'react';
import { Link } from 'react-router-dom';

const AboutSeven = () => {
    return (
        <div className=" eduvibe-home-four-about edu-about-area about-style-2 edu-section-gap bg-color-white">
            <div className="container eduvibe-animated-shape">
                <div className="row row--50">
                    <div className="col-lg-6">
                        <div className="about-image-gallery">
                            <div className="eduvibe-about-1-img-wrapper">
                                <img className="image-1" src="/images/about/about-07/about-image-01.png" alt="About Images" />
                                <span className="eduvibe-about-blur">
                                    <img src="/images/about/about-07/about-blur.png" alt="About Blur" />
                                </span>
                            </div>
                            <div className="circle-image-wrapper">
                                <img className="image-2" src="/images/about/about-07/about-image-02.png" alt="About Images" />
                                <div className="circle-image">
                                    <span></span>
                                </div>
                            </div>
                            <div className="finished-session">
                                <div className="inner">
                                    <div className="text">500B+</div>
                                    <span className="finished-title">AI predictions</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="inner mt_md--40 mt_sm--40">
                            <div className="section-title text-start">
                                <span className="pre-title">About Us</span>
                                <h3 className="title">We believe in a world where everyone can be Well-Traveled</h3>
                            </div>
                            <p className="description mt--40 mt_md--20 mt_sm--20">At TravelVibe, we believe in the power of travel to bring people together. Our mission is to make global travel accessible for everyone, everywhere. We are dedicated to creating an inclusive travel experience for all, ensuring every traveler has the opportunity to explore the world and broaden their horizons.</p>
                            <p className="description mt--40 mt_md--20 mt_sm--20">Whether it’s a family vacation, business trip, or the adventure of a lifetime, TravelVibe unlocks endless possibilities for every kind of traveler. Through our platform, we aim to champion equal access to travel and foster meaningful connections across the globe</p>
                                <h6 className="subtitle mb--20">Why People Love Us</h6>

                            <div className="about-feature-list">
                                <div className="row g-5">
                                    <div className="col-lg-6">
                                        <div className="feature-style-3">
                                            <div className="feature-content">
                                                <h6 className="feature-title">75+</h6>
                                                <p className="feature-description">We have travel locations across 75+ countries.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="feature-style-3">
                                            <div className="feature-content">
                                                <h6 className="feature-title">10Gb+ Data</h6>
                                                <p className="feature-description">Powered by more than 10+ GigaByte of data, TravelVibe is one of the world’s largest travel platforms. </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="read-more-btn mt--40">
                                <Link className="edu-btn" to="#">Learn More<i className="icon-arrow-right-line-right"></i></Link>
                            </div>

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

export default AboutSeven;