import React from 'react';
import SEO from '../../common/SEO';
import Layout from '../../common/Layout';
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne';
import TravelPlanFilter from '../../components/course/TravelPlanFilter';

const TripPlans = () => {
    return (
        <>
            <SEO title="Trip Plans" />
            <Layout>
                <BreadcrumbOne 
                    title="Trip Plans"
                    rootUrl="/"
                    parentUrl="Home"
                    currentUrl="Trip Plans"
                />
                    <div className="edu-course-area course-three-wrapper edu-section-gap bg-color-white position-relative">
                        <div className="container">
                            <TravelPlanFilter showLoadMore="enable" />
                        </div>
                    </div>
            </Layout>
        </>
    )
}

export default TripPlans;