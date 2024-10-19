import React, {useEffect, useState} from 'react';
import SectionTitle from '../components/sectionTitle/SectionTitle';
import axiosClient from '../utils/axiosClient';

const OrderHistory = (props) => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setIsLoading(true);
            const response = await axiosClient.get('/order/list');
            setOrders(response.data);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch orders. Please try again later.');
            setIsLoading(false);
        }
    };

    const OrderItem = ({ order }) => (
        <div className="edu-course course-style-4 course-style-8 bg-white">
            <div className="inner">
                <div className="content">
                    <h6 className="title">Order ID: {order.id}</h6>
                    <ul className="course-meta">
                        <li><i className="icon-user-2"></i>Name: {order.name}</li>
                        <li><i className="icon-calendar-2-line"></i>Date: {new Date(order.created_at).toLocaleDateString()}</li>
                    </ul>
                    <p>Total Amount: ${order.total_amount}</p>
                    <p>Status: {order.status}</p>
                </div>
            </div>
        </div>
    );

    if (isLoading) return <div>Loading orders...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={`eduvibe-home-four-courses edu-course-area edu-section-gap bg-image ${props.classes ? props.classes : ''}`}>
            <div className="container eduvibe-animated-shape">
                <div className="row">
                    <div className="col-lg-12">
                        <SectionTitle
                            classes="text-center"
                            slogan="Your Orders"
                            title="Order History"
                        />
                    </div>
                </div>

                <div className="row g-5 mt--10">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <OrderItem key={order.id} order={order} />
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p>No orders found.</p>
                        </div>
                    )}
                </div>

                <div className="shape-dot-wrapper shape-wrapper d-xl-block d-none">
                    <div className="shape-image shape-image-1">
                        <img src="/images/shapes/shape-28.png" alt="Shape Thumb"/>
                    </div>
                    <div className="shape-image shape-image-2">
                        <img src="/images/shapes/shape-15-03.png" alt="Shape Thumb"/>
                    </div>
                    <div className="shape-image shape-image-3">
                        <img src="/images/shapes/shape-03-09.png" alt="Shape Thumb"/>
                    </div>
                    <div className="shape-image shape-image-4">
                        <img src="/images/shapes/shape-04-06.png" alt="Shape Thumb"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderHistory;