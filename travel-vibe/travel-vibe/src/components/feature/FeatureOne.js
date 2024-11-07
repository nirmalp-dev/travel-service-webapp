import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const FeatureItems = [
    {
        title: 'Travel with Us',
        info: 'No matter who you are, or where you are going, our travel brands help every type of traveler not only find the trip that’s right for them, but get the best value every time.',
        image: 'feature-image-01.png',
        bgColor: 'card-bg-1',
        link: '#'
    },
    {
        title: 'Partner with Us',
        info: 'We connect partners big and small to the universe of travelers, giving access to data, tools and technology that empowers, maximizes potential and builds their business.',
        image: 'feature-image-02.png',
        bgColor: 'card-bg-2',
        link: '#'
    },
    {
        title: 'Explore the World with Us',
        info: 'Wherever your journey takes you, we help you discover, book, and enjoy the perfect trip with unbeatable value.',
        image: 'feature-image-03.png',
        bgColor: 'card-bg-3',
        link: '#'
    },
    {
        title: 'Grow Your Business with Us',
        info: 'Partner with us to unlock the power of travel insights, cutting-edge tools, and technology to expand your reach and boost success.',
        image: 'feature-image-04.png',
        bgColor: 'card-bg-4',
        link: '#'
    }
];

const FeatureOne = ( { wrapperClass, alignment, style } ) => {
    return (
        <div className={ `row ${ wrapperClass || 'g-5 mt--20' }` }>
            { FeatureItems.map( ( data , i ) => (
                <ScrollAnimation 
                    animateIn="fadeInUp"
                    animateOut="fadeInOut"
                    className={ `col-lg-3 col-md-6 col-12 ${ alignment ? alignment : '' } ${ style ? style : '' }` }
                    animateOnce={ true }
                    key={ i }
                >
                    <div className={ `service-card service-card-2 ${ data.bgColor }` }>
                        <div className="inner">
                            <div className="icon">
                                <a href={ data.link }>
                                    <img src={`${process.env.PUBLIC_URL}/images/feature/feature-01/${ data.image }`} alt="Feature Thumb" />
                                </a>
                                <div className="shape-list">
                                    <img className="shape shape-1" src="/images/feature/feature-01/feature-icon-01.png" alt="Shape Particle" />
                                    <img className="shape shape-2" src="/images/feature/feature-01/feature-icon-02.png" alt="Shape Particle" />
                                    <img className="shape shape-3" src="/images/feature/feature-01/feature-icon-03.png" alt="Shape Particle" />
                                </div>
                            </div>
                            <div className="content">
                                <h6 className="title"><a href={ data.link }>{ data.title }</a></h6>
                                <p className="description">{ data.info }</p>
                            </div>
                        </div>
                    </div>
                </ScrollAnimation>
            ) ) }
        </div>
    )
}

export default FeatureOne;