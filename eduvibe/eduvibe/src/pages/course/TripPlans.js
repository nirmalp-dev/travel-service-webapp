import React from 'react';
import SEO from '../../common/SEO';
import Layout from '../../common/Layout';
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne';
import CourseTypeFilter from '../../components/course/CourseTypeFilter';

const TripPlans = () => {
    return (
        <>
            <SEO title="Course Filter 1" />
            <Layout>
                <BreadcrumbOne 
                    title="Trip Plans"
                    rootUrl="/"
                    parentUrl="Home"
                    currentUrl="Trip Plans"
                />
                    <div className="edu-course-area course-three-wrapper bg-color-white position-relative">
                        <div className="container">
                            <CourseTypeFilter showLoadMore="enable" />
                        </div>
                    </div>
            </Layout>
        </>
    )
}

export default TripPlans;