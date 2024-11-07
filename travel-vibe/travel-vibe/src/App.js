import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ScrollToTop from './components/scrolltotop/ScrollToTop';
import AboutUsOne from './pages/innerpages/AboutUsOne';
import ContactUs from './pages/innerpages/ContactUs';
import TripPlans from './pages/course/TripPlans';
import PackageDetails from './pages/detailspages/PackageDetails';
import HomeFour from './pages/homepages/HomeFour';
import LoginRegister from './pages/innerpages/LoginRegister';
import './assets/scss/style.scss';
import OrderPage from "./pages/innerpages/OrderPage";

function App() {
    return (
        <Router>
            <ScrollToTop>
                <Routes>
                    <Route exact path='/' element={<HomeFour />} />
                    <Route exact path={`${process.env.PUBLIC_URL + '/about-us'}`} element={<AboutUsOne/>}/>
                    <Route exact path={`${process.env.PUBLIC_URL + '/contact-us'}`} element={<ContactUs/>}/>
                    <Route exact path={`${process.env.PUBLIC_URL + '/order'}`} element={<OrderPage/>}/>
                    <Route exact path={`${process.env.PUBLIC_URL + '/trip-plans'}`} element={<TripPlans/>}/>
                    <Route exact path={`${process.env.PUBLIC_URL + '/package-details/:id'}`} element={<PackageDetails/>}/>
                    <Route exact path={`${process.env.PUBLIC_URL + '/login-register'}`} element={<LoginRegister/>}/>
                </Routes>
            </ScrollToTop>
        </Router>
    );
}

export default App;
