import React, { useState } from 'react';
import FsLightbox from 'fslightbox-react';
import axiosClient from '../../utils/axiosClient'; // Adjust the path as needed
import '../../assets/css/modal.css';

const CourseInfo = ( { data }) => {
    const [toggler, setToggler] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        creditCard: '',
        passportNumber: '',
        address: '',
        id: data._id || ''
    });


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const orderCreate = {
                name: formData.name,
                age: parseInt(formData.age),
                passport_number: formData.passportNumber,
                credit_card_number: formData.creditCard,
                address: formData.address
            };
            try {
                const addToCartResponse = await axiosClient.post('http://localhost:8000/cart/add', {'package_id': data._id});
            } catch (error){
                console.log(error);
            }
            const response = await axiosClient.post('http://localhost:8000/order/checkout', orderCreate);
            console.log('Order created:', response.data);
            alert("Your trip has been booked !!")
            // Handle successful order creation (e.g., show a success message, redirect to order confirmation page)
            closeModal();
        } catch (error) {
            console.error('Error creating order:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <div className="eduvibe-sidebar course-details-sidebar">
            <div className="inner">
                <div className="eduvibe-widget">
                    <div className="video-area">
                        <div className="thumbnail video-popup-wrapper">
                            <img className="radius-small w-100" src={`${process.env.PUBLIC_URL}/images/travelplaces/${data.image}`} alt="Course Video Thumb" />
                            <button onClick={ () => setToggler( ! toggler ) } className="video-play-btn position-to-top video-popup-activation">
                                <span className="play-icon"></span>
                            </button>
                            <FsLightbox toggler={ toggler } sources={ data.videoLink } />
                        </div>
                    </div>
                    <div className="eduvibe-widget-details mt--35">
                        <div className="widget-content">
                            <ul>
                                { data.tripdays && <li><span><i className="icon-time-line"></i> Duration</span><span>{data.tripdays} Days</span></li> }
                                { data.numberOfSale && <li><span><i className="icon-user-2"></i> Experienced</span><span>{data.numberOfSale}</span></li> }
                                {/*{ data.lesson && <li><span><i className="icon-draft-line"></i> Lectures</span><span>{data.lesson}</span></li> }*/}
                                {/*{ data.level && <li><span><i className="icon-bar-chart-2-line"></i> Skill Level</span><span>{data.level}</span></li> }*/}
                                {/*{ data.language && <li><span><i className="icon-translate"></i> Language</span><span>{data.language}</span></li> }*/}
                                {/*{ data.quizzes && <li><span><i className="icon-artboard-line"></i> Quizzes</span><span>{data.quizzes}</span></li> }*/}
                                {/*{ data.certificate && <li><span><i className="icon-award-line"></i> Certificate</span><span>{data.certificate === 'available' ? 'Yes' : 'No'}</span></li> }*/}
                                {/*{ data.passPercentage && <li><span><img className="eduvibe-course-sidebar-img-icon" src="/images/icons/percent.svg" alt="icon Thumb" />Pass Percentage</span><span>{data.passPercentage}%</span></li> }*/}
                                {/*{ data.deadline && <li><span><i className="icon-calendar-2-line"></i> Deadline</span><span>{data.deadline}</span></li> }*/}
                                {/*{ data.instructor && <li><span><i className="icon-user-2-line_tie"></i> Instructor</span><span>{data.instructor}</span></li> }*/}
                            </ul>
                            <div className="read-more-btn mt--45">
                                <a href="#" className="edu-btn btn-bg-alt w-100 text-center">
                                    Price: { data.cost === '0' ? 'Free' : data.cost } USD
                                </a>
                            </div>
                            <div className="read-more-btn mt--15">
                                <button onClick={openModal} className="edu-btn w-100 text-center">Buy Now</button>
                                {/*<a href="#" className="edu-btn w-100 text-center">Buy Now</a>*/}
                            </div>
                            <div className="read-more-btn mt--30 text-center">
                                <div className="eduvibe-post-share">
                                    <span>Share: </span>
                                    <a className="linkedin" href="#"><i className="icon-linkedin"></i></a>
                                    <a className="facebook" href="#"><i className="icon-Fb"></i></a>
                                    <a className="twitter" href="#"><i className="icon-Twitter"></i></a>
                                    <a className="youtube" href="#"><i className="icon-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <div className="custom-modal-overlay">
                    <div className="custom-modal-content bg-color-white edu-section-gap">
                        <div className="container">
                            <div className="row g-5">
                                <div className="col-lg-12">
                                    <h4>Enter Your Details</h4>
                                </div>
                            </div>
                            <div className="row g-5">
                                <div className="col-lg-12">
                                    <form onSubmit={handleSubmit} className="checkout-page-style">
                                        {/* Hidden field for data._id */}
                                        <input
                                            type="hidden"
                                            name="id"
                                            value={formData.id}
                                            onChange={handleChange}
                                        />

                                        {/* Name and Age on one row */}
                                        <div className="row g-3">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>Name:</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>Age:</label>
                                                    <input
                                                        type="number"
                                                        name="age"
                                                        value={formData.age}
                                                        onChange={handleChange}
                                                        required
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Credit Card Number and Passport Number on another row */}
                                        <div className="row g-3">
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>Credit Card Number:</label>
                                                    <input
                                                        type="number"
                                                        name="creditCard"
                                                        value={formData.creditCard}
                                                        onChange={handleChange}
                                                        required
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>Passport Number:</label>
                                                    <input
                                                        type="text"
                                                        name="passportNumber"
                                                        value={formData.passportNumber}
                                                        onChange={handleChange}
                                                        required
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Address field */}
                                        <div className="form-group">
                                            <label>Address:</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                required
                                                className="form-control"
                                            />
                                        </div>

                                        {/* Modal buttons */}
                                        <div className="modal-buttons mt--30 text-center">
                                            <button onClick={closeModal} type="button" className="edu-btn btn-bg-alt w-100 text-center">Cancel</button>
                                            <button type="submit" className="edu-btn w-100 ml--10 text-center">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            
        </div>
    )
}

export default CourseInfo;