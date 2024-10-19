import React, { useState, useEffect } from 'react';
import imagesource from '../../assets/images/chatbot/bot.jpg';
import '../../assets/css/chatbot/chatbot.css';
// import '../../assets/css/chatbot/style.css'
import { MdMoreVert } from 'react-icons/md';
import { FaPaperPlane } from 'react-icons/fa';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);


    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.type = 'text/javascript';
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };

        Promise.all([
            loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'),
            loadScript('static/js/lib/materialize.min.js'),
            loadScript('static/js/lib/uuid.min.js'),
            loadScript('static/js/script.js'),
            loadScript('static/js/lib/chart.min.js'),
            loadScript('static/js/lib/showdown.min.js'),
        ])
            .then(() => {
                console.log('All scripts loaded successfully');
            })
            .catch((error) => {
                console.error('Error loading scripts:', error);
            });

        return () => {
        };
    }, []);


    const handleToggle = () => {
        setIsOpen(!isOpen);
        if (isDropdownOpen) setIsDropdownOpen(false);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="chatbot-container">
            <div className={`widget ${isOpen ? 'open' : 'closed'}`} style={{ display: isOpen ? 'block' : 'none' }}>
                <div className="chat_header">
                    <span className="chat_header_title">Sara</span>
                    {!isDropdownOpen && (
                        <span className="dropdown-trigger" data-target="dropdown1" onClick={handleDropdownToggle}>
                            <MdMoreVert />
                        </span>
                    )}
                    {isDropdownOpen && (
                        <div className="dropdown-container">
                            <ul id="dropdown1" className="dropdown-content">
                                <li><a href="#" id="clear">Clear</a></li>
                                <li><a id="close" onClick={handleToggle}>Close</a></li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="chats" id="chats">
                    <div className="clearfix"></div>
                </div>

                <div className="keypad">
                    <textarea
                        id="userInput"
                        placeholder="Type a message..."
                        className="usrInput"
                    ></textarea>
                    <div id="sendButton">
                        <FaPaperPlane />
                    </div>
                </div>
            </div>

            {!isOpen && (
                <div className="profile_div" id="profile_div" onClick={handleToggle}>
                    <img className="imgProfile" src={imagesource} alt="Bot Avatar" />
                </div>
            )}
        </div>
    );
};

export default Chatbot;
