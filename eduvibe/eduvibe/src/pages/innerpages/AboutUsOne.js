import React from 'react';
import SEO from '../../common/SEO';
import HeaderOne from '../../common/header/HeaderOne';
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne';
import AboutSeven from '../../components/about/AboutSeven';
import AboutUsOneService from '../../components/about-us-one/AboutUsOneService';
import AboutSix from '../../components/about/AboutSix';
import AboutOne from '../../components/about/AboutThree';
import AboutUsOneTeam from '../../components/about-us-one/AboutUsOneTeam';
import HomeTwoTestimonial from '../../components/home-two/HomeTwoTestimonial';
// import FooterTwo from '../../common/footer/FooterTwo';
import FooterOne from '../../common/footer/FooterOne';
import HomeOneInstructor from '../../components/home-one/HomeOneInstructor';

const AboutUsOne = () => {
    return (
        <>
            <SEO title="About Us 1" />

            <HeaderOne />

            <BreadcrumbOne 
                title="Who We Are"
                rootUrl="/"
                parentUrl="Home"
                currentUrl="About Us"
            />

            <AboutSeven />
            
            <AboutUsOneService />

            {/* <AboutSix /> */}

            {/* <AboutOne /> */}

            <HomeOneInstructor />

            {/* <AboutUsOneTeam /> */}

            {/* <HomeTwoTestimonial /> */}

            <FooterOne />
        </>
    )
}

export default AboutUsOne;