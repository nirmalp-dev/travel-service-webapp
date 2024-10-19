import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to install axios with `npm install axios`
import { Link } from 'react-router-dom';
import ScrollAnimation from 'react-animate-on-scroll';
import SectionTitle from '../sectionTitle/SectionTitle';
import CourseTypeFour from '../../components/course/CourseTypeOne';

const HomeFourCourses = (props) => {
    const [travelPlans, setTravelPlans] = useState([]);

    useEffect(() => {
        // Fetch travel plans from an API endpoint using axios
        const fetchTravelPlans = async () => {
            try {
                const response = await axios.get('http://localhost:8000/packages'); // Your specified API endpoint
                // Assuming the response.data is an array of travel plans
                setTravelPlans(response.data.slice(0, 4)); // Get only the first 4 travel plans
            } catch (error) {
                console.error('Error fetching travel plans:', error);
            }
        };

        fetchTravelPlans();
    }, []);

    return (
        <div className={`eduvibe-home-four-courses edu-course-area edu-section-gap bg-image ${props.classes ? props.classes : ''}`}>
            <div className="container eduvibe-animated-shape">
                <div className="row">
                    <div className="col-lg-12">
                        <SectionTitle
                            classes="text-center"
                            slogan="Featured Travel Plans"
                            title="Explore Our Popular Travel Plans"
                        />
                    </div>
                </div>

                <div className="row g-5 mt--10">
                    {travelPlans.map((plan, index) => (
                        // <div key={index} className="col-lg-3 col-md-6">
                        //     <div className="course-item">
                        //         <img src={`${process.env.PUBLIC_URL}/images/travelplaces/${plan.image}`} alt={plan.title} />
                        //         <h5 className="course-title">{plan.title}</h5>
                        //         <p className="course-description">{plan.description}</p>
                        //         <Link className="edu-btn" to={`/travel-plans/${plan.id}`}>View Details<i className="icon-arrow-right-line-right"></i></Link>
                        //     </div>
                        // </div>
                        <ScrollAnimation 
                                animateIn="fadeInUp"
                                animateOut="fadeInOut"
                                className="col-12 col-sm-6 col-lg-6"
                                animateOnce={true}
                                key={ plan.id }
                            >
                                <CourseTypeFour data={plan} bgWhite="enable" />
                            </ScrollAnimation>
                    ))}
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="load-more-btn mt--60 text-center">
                            <Link className="edu-btn" to="/travel-plans">View All Travel Plans<i className="icon-arrow-right-line-right"></i></Link>
                        </div>
                    </div>
                </div>

                <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                    <div className="shape-image shape-image-1">
                        <img src="/images/shapes/shape-28.png" alt="Shape Thumb" />
                    </div>
                    <div className="shape-image shape-image-2">
                        <img src="/images/shapes/shape-15-03.png" alt="Shape Thumb" />
                    </div>
                    <div className="shape-image shape-image-3">
                        <img src="/images/shapes/shape-03-09.png" alt="Shape Thumb" />
                    </div>
                    <div className="shape-image shape-image-4">
                        <img src="/images/shapes/shape-04-06.png" alt="Shape Thumb" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeFourCourses;
