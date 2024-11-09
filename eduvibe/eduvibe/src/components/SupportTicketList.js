import React, { useEffect, useState } from 'react';
import SectionTitle from '../components/sectionTitle/SectionTitle';
import axiosClient from '../utils/axiosClient';
import '../../src/assets/css/support.css';

const SupportTicketList = (props) => {
    const [tickets, setTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            setIsLoading(true);
            const response = await axiosClient.get('/ticket/list');
            setTickets(response.data);
            setIsLoading(false);
        } catch (err) {
            setError('Failed to fetch tickets. Please try again later.');
            setIsLoading(false);
        }
    };

    const TicketItem = ({ ticket }) => {
        return (
            <div className="support-ticket bg-white">
                <div className="inner">
                    <div className="content">
                        <h6 className="title">Ticket ID: {ticket.id}</h6>
                        <ul className="ticket-meta">
                            <li><i className="icon-user-2"></i>Subject: {ticket.subject}</li>
                            <li><i className="icon-user-2"></i>Description: {ticket.description}</li>
                            <li><i
                                className="icon-calendar-2-line"></i>Date: {new Date(ticket.created_at).toLocaleDateString()}
                            </li>
                        </ul>
                        <p>Status:
                            <span className={`status-label ${ticket.status === 'Open' ? 'status-pending' : 
                                    ticket.status === 'Closed' ? 'status-confirmed' : 
                                        ticket.status === 'Esclated' ? 'status-rescheduled' : 'status-closed'}`
                                }>
                              {ticket.status}
                           </span>
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    if (isLoading) return <div>Loading tickets...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className={`support-ticket-area edu-section-gap bg-image ${props.classes ? props.classes : ''}`}>
            <div className="container">
                <div className="row">
                <div className="col-lg-12">
                        <SectionTitle
                            classes="text-center"
                            slogan="Your Support Tickets"
                            title="Support History"
                        />
                    </div>
                </div>

                <div className="row g-5 mt--10">
                    {tickets.length > 0 ? (
                        tickets.map((ticket) => (
                            <TicketItem key={ticket.id} ticket={ticket} />
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p>No support tickets found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SupportTicketList;