import React from 'react';
import SEO from "../../common/SEO";
import HeaderOne from "../../common/header/HeaderOne";
import BreadcrumbOne from "../../common/breadcrumb/BreadcrumbOne";
import SupportTicketList from "../../components/SupportTicketList"; // Adjust the path as needed

const SupportPage = () => {
    return (
        <>
            <SEO title="Support Tickets" />

            <HeaderOne />

            <BreadcrumbOne
                title="Support Tickets"
                rootUrl="/"
                parentUrl="Home"
                currentUrl="Support"
            />

            <SupportTicketList/>

        </>
    )
}

export default SupportPage;