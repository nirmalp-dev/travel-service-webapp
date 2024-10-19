import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import CourseTypeOne from './CourseTypeOne';
import axios from 'axios';

const TravelPlanFilter = ({ itemToShow, showLoadMore, incrementPerClick }) => {
    const [tripData, setTripData] = useState([]);
    const [filterControls, setFilterControls] = useState(['All']);
    const numberOfCourses = itemToShow || 6;
    const dataIncrement = incrementPerClick || 3;
    const [noMorePost, setNoMorePost] = useState(false);
    const [dataVisibleCount, setDataVisibleCount] = useState(numberOfCourses);
    const [activeFilter, setActiveFilter] = useState('');
    const [visibleItems, setVisibleItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPackages();
    }, []);

    const fetchPackages = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('http://localhost:8000/packages');
            setTripData(response.data);
            const filters = ['All', ...new Set(response.data.map(item => item.filterParam))];
            setFilterControls(filters);
            setActiveFilter('all');
            setVisibleItems(response.data.slice(0, dataVisibleCount));
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch packages. Please try again later.');
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        const filter = e.target.textContent.toLowerCase();
        setActiveFilter(filter);
        let tempData;
        if (filter === 'all') {
            tempData = tripData.slice(0, dataVisibleCount);
        } else {
            tempData = tripData.filter((data) =>
                data.filterParam.toLowerCase() === filter &&
                tripData.indexOf(data) < dataVisibleCount
            );
        }
        setVisibleItems(tempData);
    };

    const handleLoadMoreBtn = (e) => {
        e.preventDefault();
        let tempCount = dataVisibleCount + dataIncrement;
        if (tempCount >= tripData.length) {
            setNoMorePost(true);
            tempCount = tripData.length;
        }
        setDataVisibleCount(tempCount);
        if (activeFilter === 'all') {
            setVisibleItems(tripData.slice(0, tempCount));
        } else {
            setVisibleItems(tripData.filter((data) =>
                data.filterParam.toLowerCase() === activeFilter &&
                tripData.indexOf(data) < tempCount
            ));
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <div className="row g-5 align-items-center mb--45 mb--30 mt_md--30 mt_sm--30">
                <div className="col-lg-6">
                    <div className="section-title text-start">
                        <span className="pre-title">Who We Are</span>
                        <h3 className="title">We Offer The Best Service</h3>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="button-group isotop-filter filters-button-group d-flex justify-content-start justify-content-lg-end">
                        {filterControls.map( ( filter, i ) => (
                            <button
                                onClick={handleChange}
                                key={i}
                                className={
                                    filter.toLowerCase() === activeFilter
                                    ? "is-checked"
                                    : " "
                                }
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="row g-5">
                {
                    visibleItems.map((item) => (
                        <div className="col-12 col-sm-12 col-xl-4 col-md-6" key={item.itinerary_id }>
                            <CourseTypeOne data={item} />
                        </div>
                    ) )
                }
            </div>

            { showLoadMore === 'enable' &&
                <div className="row text-center mt--60">
                    <div className="col-lg-12">
                        <button
                            className="edu-btn"
                            onClick={ handleLoadMoreBtn }
                            disabled={ noMorePost ? 'disabled' : null }
                        >
                            { 
                                noMorePost ? (
                                    'All Courses Displayed'
                                ) : (
                                    <span>
                                        Load More 
                                        <span className="eduvibe-spin-icon">
                                            <FaSpinner />
                                        </span>
                                    </span>
                                )
                            }
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default TravelPlanFilter;