import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <ul className="mainmenu">
            <li >
                <Link to="/">Home</Link>
            </li>

            <li >
                <Link to="/about-us-1">About Us</Link>
            </li>
            
            <li className="">
                <Link to="/trip-plans">Trip Plans</Link>
            </li>
            
            {/* <li className="has-droupdown">
                <Link to="#">Pages</Link>
                <ul className="submenu">
                    <li className="has-droupdown">
                        <Link to="#">Event</Link>
                        <ul className="submenu">
                            <li><Link to="/event-grid">Event Grid</Link></li>
                            <li><Link to="/event-list">Event List</Link></li>
                            <li><Link to="/event-load-more">Event( Load More )</Link></li>
                            <li><Link to="/event-carousel">Event Carousel</Link></li>
                            <li><Link to="/event-details/1">Event Details</Link></li>
                        </ul>
                    </li>
                    <li className="has-droupdown">
                        <Link to="#">Gallery</Link>
                        <ul className="submenu">
                            <li><Link to="/gallery-grid">Gallery Grid</Link></li>
                            <li><Link to="/gallery-masonry">Gallery Masonry</Link></li>
                            <li><Link to="/gallery-load-more">Gallery( Load More )</Link></li>
                        </ul>
                    </li>
                    <li className="has-droupdown">
                        <Link to="#">Instructor</Link>
                        <ul className="submenu">
                            <li><Link to="/instructor-one">Instructor 1</Link></li>
                            <li><Link to="/instructor-two">Instructor 2</Link></li>
                            <li><Link to="/instructor-three">Instructor 3</Link></li>
                            <li><Link to="/instructor-details/james-carlson">Instructor Profile</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/faq">FAQ</Link></li>
                    <li><Link to="/pricing">Pricing</Link></li>
                    <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                    <li><Link to="/purchase-guide">Purchase Guide</Link></li>
                    <li><Link to="/testimonial">Testimonial</Link></li>
                    <li><Link to="/coming-soon">Coming Soon</Link></li>
                    <li><Link to="/login-register">Login/Register</Link></li>
                    <li><Link to="/404">404</Link></li>
                </ul>
            </li> */}
            
            {/* <li className="has-droupdown"><Link to="#">Blog</Link>
                <ul className="submenu">
                    <li><Link to="/blog-grid-1">Blog Grid 1</Link></li>
                    <li><Link to="/blog-grid-2">Blog Grid 2</Link></li>
                    <li><Link to="/blog-grid-3">Blog Grid 3</Link></li>
                    <li><Link to="/blog-carousel">Blog Carousel</Link></li>
                    <li><Link to="/blog-standard">Blog Standard</Link></li>
                    <li><Link to="/blog-grid-right-sidebar">Blog( Right Sidebar )</Link></li>
                    <li><Link to="/blog-grid-left-sidebar">Blog( Left Sidebar )</Link></li>
                    <li><Link to="/blog-load-more">Blog( Load More )</Link></li>
                    <li><Link to="/blog-details/1">Blog Details 1</Link></li>
                    <li><Link to="/blog-details-left-sidebar/1">Blog Details 2</Link></li>
                    <li><Link to="/blog-details-right-sidebar/1">Blog Details 3</Link></li>
                    <li><Link to="/category/education">Category Archive</Link></li>
                    <li><Link to="/tag/finance">Tag Archive</Link></li>
                    <li><Link to="/author/hazel-thomas">Author Archive</Link></li>
                </ul>
            </li> */}

            <li className="">
                <Link to="/contact-us">Contact Us</Link>
                {/* <ul className="submenu">
                    <li><Link to="/contact-me">Contact Me</Link></li>
                    <li><Link to="/contact-us">Contact Us</Link></li>
                </ul> */}
            </li>
        </ul>
    )
}
export default Nav;
