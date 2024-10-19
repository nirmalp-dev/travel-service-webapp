import React from 'react';
import SEO from '../../common/SEO';
import Layout from '../../common/Layout';
import BannerFour from '../../components/banner/BannerFour';
import HomeFourAbout from '../../components/home-four/HomeFourAbout';
import Chatbot from "../chatbot/chatbot";

const HomeFour = () => {
    return (
        <>
            <SEO title="Home" />
            
            <Layout>
                <BannerFour />
                <Chatbot/>
                <HomeFourAbout />
            </Layout>
        </>
    )
}

export default HomeFour;