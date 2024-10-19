import React, {useState} from 'react';
import SEO from '../../common/SEO';
import Layout from '../../common/Layout';
import BreadcrumbOne from '../../common/breadcrumb/BreadcrumbOne';
import LoginForm from '../../components/form/LoginForm';
import RegisterForm from '../../components/form/RegisterForm';

const LoginRegister = () => {
    const [showLogin, setShowLogin] = useState(true);

    const toggleForm = () => {
        setShowLogin(!showLogin);
    };

    return (
        <>
            <SEO title={showLogin ? "Login" : "Register"}/>
            <Layout>
                <BreadcrumbOne
                    title={showLogin ? "Login" : "Register"}
                    rootUrl="/"
                    parentUrl="Home"
                    currentUrl={showLogin ? "Login" : "Register"}
                />

                <div className="login-register-page-wrapper edu-section-gap bg-color-white">
                    <div className="container checkout-page-style">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                {showLogin ? (
                                    <>
                                        <LoginForm/>
                                        <p className="text-center mt-4">
                                            Don't have an account?{' '}
                                            <button
                                                onClick={toggleForm}
                                                className="btn btn-link p-0">
                                                Register here
                                            </button>
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <RegisterForm/>
                                        <p className="text-center mt-4">
                                            Already have an account?{' '}
                                            <button
                                                onClick={toggleForm}
                                                className="btn btn-link p-0">
                                                Login here
                                            </button>
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default LoginRegister;