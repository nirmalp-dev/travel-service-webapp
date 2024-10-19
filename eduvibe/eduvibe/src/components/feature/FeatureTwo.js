import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const FeatureItems = [
    {
        title: 'Expert Guides',
        info: 'Our experienced guides will help you explore the best destinations.',
        icon: 'icon-Destination', // You might want to update the icon to a travel-related icon
        shape: 'shape-bg-1',
        link: '#'
    },
    {
        title: 'Personalized Itineraries',
        info: 'Tailor-made travel plans to fit your unique needs and preferences.',
        icon: 'icon-Browser', // Update the icon accordingly
        shape: 'shape-bg-2',
        link: '#'
    },
    {
        title: '24/7 Support',
        info: 'We are here to assist you at any time during your journey.',
        icon: 'icon-Support', // Update the icon accordingly
        shape: 'shape-bg-3',
        link: '#'
    },
    {
        title: 'Flexible Bookings',
        info: 'Enjoy the flexibility to change your plans without hassle.',
        icon: 'icon-Setting', // Update the icon accordingly
        shape: 'shape-bg-4',
        link: '#'
    }
];

const FeatureTwo = ({ wrapperClass, bgColor, alignment, style }) => {
    return (
        <div className={`row eduvibe-about-one-service ${wrapperClass || 'g-5 mt--20'}`}>
            {FeatureItems.map((data, i) => (
                <ScrollAnimation 
                    animateIn="fadeInUp"
                    animateOut="fadeInOut"
                    className={`col-lg-3 col-md-6 col-12${style ? ' ' + style : ''}`}
                    animateOnce={true}
                    key={i}
                >
                    <div className={`service-card service-card-3 ${alignment ? ' ' + alignment : 'text-left'} ${data.shape} ${bgColor || ''}`}>
                        <div className="inner">
                            <div className="icon">
                                <a href={data.link}>
                                    <i className={data.icon}></i>
                                </a>
                            </div>
                            <div className="content">
                                <h6 className="title"><a href={data.link}>{data.title}</a></h6>
                                <p className="description">{data.info}</p>
                                <div className="read-more-btn">
                                    <a className="btn-transparent sm-size heading-color" href={data.link}>Learn More<i className="icon-arrow-right-line-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollAnimation>
            ))}
        </div>
    );
}

export default FeatureTwo;
