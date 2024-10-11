import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from 'react-router-dom';
import TripData from '../../data/TravelIternary/traveliternary.json';

const items = [
    {
        title: 'Graphics Design',
        info: 'Lorem Ipsum is simply for this dummy text of the printing.',
        numberOfCourses: '23 Courses',
        image: 'category-01.jpg',
        link: '#'
    },
    {
        title: 'Business Analysis',
        info: 'Lorem Ipsum is simply for this dummy text of the printing.',
        numberOfCourses: '18 Courses',
        image: 'category-02.jpg',
        link: '#'
    },
    {
        title: 'Data Science',
        info: 'Lorem Ipsum is simply for this dummy text of the printing.',
        numberOfCourses: '15 Courses',
        image: 'category-03.jpg',
        link: '#'
    },
    {
        title: 'Architecture',
        info: 'Lorem Ipsum is simply for this dummy text of the printing.',
        numberOfCourses: '20 Courses',
        image: 'category-04.jpg',
        link: '#'
    }
];

const CategoryOne = ( { wrapperClass, styleClass, buttonStatus } ) => {
    console.log(process.env.PUBLIC_URL)
    return (
        <>
            <div className={ `row ${ wrapperClass || 'g-5 mt--25' }` }>
                { TripData.slice( 0, 4 ).map( ( data , i ) => (
                    <ScrollAnimation 
                        animateIn="fadeInUp"
                        animateOut="fadeInOut"
                        className={ `col-lg-3 col-md-6 col-sm-6 col-12 ${ styleClass ? styleClass : '' }` }
                        animateOnce={ true }
                        key={ i }
                    >
                        <div className="service-card service-card-1 radius-small">
                            <div className="inner">
                                <div className="thumbnail">
                                    <a href={ '#' }>
                                        <img 
                                            src={`${process.env.PUBLIC_URL}/images/travelplaces/270by200/${ data.image }`} 
                                            alt={`${data.destination} Image`} 
                                        />
                                    </a>
                                </div>
                                <div className="content">
                                    <span className="course-total">{ `${data.tripdays} Days` }</span>
                                    <h6 className="title"><a href="#">{ data.destination }</a></h6>
                                    <p className="description">{ data.description }</p>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimation>
                ) ) }
            </div>
            { buttonStatus !== 'disable' &&
                <div className="row text-center mt--60">
                    <div className="col-lg-12">
                        <ScrollAnimation 
                            animateIn="fadeInUp"
                            animateOut="fadeInOut"
                            className="load-more-btn"
                            animateOnce={ true }
                        >
                            <Link className="edu-btn" to="/">All Categories<i
                            className="icon-arrow-right-line-right"></i></Link>
                        </ScrollAnimation>
                    </div>
                </div>
            }
        </>
    )
}

export default CategoryOne;