import React, { useState } from 'react';
import FsLightbox from 'fslightbox-react';
import { FaPlay } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import SectionTitle from '../sectionTitle/SectionTitle';

const TravelVideoSection = () => {
    const [toggler, setToggler] = useState(false);
    const videoLink = ['https://www.youtube.com/watch?v=0hj9xOLcLMY']; // Replace with your travel video link
    return (
        <>
            <div className="eduvibe-home-four-video edu-video-area edu-section-gap video-style-2">
                <div className="container eduvibe-animated-shape">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="pr--75 pr_lg--30 pr_md--0 pr_sm--0">
                                <div className="thumbnail video-popup-wrapper">
                                    <img className="radius-small" src={`${process.env.PUBLIC_URL}./images/travelplaces/yt-image.png`} alt="Video PopUp Thumb" />
                                    <button className="video-play-btn with-animation position-to-top video-popup-activation color-secondary size-80" onClick={() => setToggler(!toggler)}>
                                        <span><FaPlay className="play-icon" /></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="content mt_md--40 mt_sm--40">
                                <SectionTitle
                                    classes="text-start"
                                    slogan="Discover New Adventures"
                                    title="Explore the World Through Travel"
                                />
                                <ScrollAnimation 
                                    animateIn="fadeInUp"
                                    animateOut="fadeInOut"
                                    animateOnce={true}
                                >
                                    <p className="description mt--40 mb--40 mt_md--20 mt_sm--20">Join us as we embark on incredible journeys around the globe. Experience vibrant cultures, breathtaking landscapes, and unforgettable memories that await you.</p>
                                </ScrollAnimation>
                                <div className="read-more-btn text-start">
                                    <Link className="edu-btn" to="#">See Travel Plans<i className="icon-arrow-right-line-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                        <div className="shape-image shape-image-1">
                            <img src="/images/shapes/shape-03-10.png" alt="Shape Thumb" />
                        </div>
                        <div className="shape-image shape-image-2">
                            <img src="/images/shapes/shape-19-03.png" alt="Shape Thumb" />
                        </div>
                    </div>
                </div>

                <div className="side-shape-image d-lg-block d-none">
                    <img src="/images/videopopup/video-infinite-rotate.png" alt="Shape Images" />
                </div>
            </div>

            <FsLightbox 
                toggler={toggler} 
                sources={videoLink}
                maxYoutubeVideoDimensions={{ width: 900, height: 550 }}
            />
        </>
    )
}

export default TravelVideoSection;
