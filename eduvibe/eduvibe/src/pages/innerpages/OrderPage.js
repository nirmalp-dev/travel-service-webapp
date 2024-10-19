import React from 'react';
import SEO from "../../common/SEO";
import HeaderOne from "../../common/header/HeaderOne";
import BreadcrumbOne from "../../common/breadcrumb/BreadcrumbOne";
import OrderHistory from "../../components/OrderHistory"; // Adjust the path as needed

const OrderPage = () => {
    return (
        <>
            <SEO title="Order History" />

            <HeaderOne />

            <BreadcrumbOne
                title="Order History"
                rootUrl="/"
                parentUrl="Home"
                currentUrl="Orders"
            />

            <OrderHistory/>

        </>
    )
}


export default OrderPage;