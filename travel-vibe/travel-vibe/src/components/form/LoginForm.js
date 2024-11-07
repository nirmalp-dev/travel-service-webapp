import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/auth/login',
                new URLSearchParams({
                    username: formData.email,
                    password: formData.password
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );

            // Store the token in localStorage
            localStorage.setItem('token', response.data.access_token);

            // Optionally, store the "remember me" preference
            if (formData.rememberMe) {
                localStorage.setItem('rememberMe', 'true');
            } else {
                localStorage.removeItem('rememberMe');
            }

            // Redirect or update app state to reflect logged-in status
            console.log('Login successful');
            navigate('/');

            // You might want to redirect the user or update your app's state here
        } catch (err) {
            setError(err.response?.data?.detail || 'An error occurred during login.');
        }
    };

    return (
        <div className="login-form-box">
            <h3 className="mb-30">Login</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-box mb--30">
                    <input
                        type="text"
                        placeholder="Username or Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-box mb--30">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="comment-form-consent input-box mb--30">
                    <input
                        id="checkbox-1"
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                    />
                    <label htmlFor="checkbox-1">Remember Me</label>
                </div>
                <button className="rn-btn edu-btn w-100 mb--30" type="submit">
                    <span>Login</span>
                </button>
                <div className="input-box">
                    <a href="#" className="lost-password">Lost your password?</a>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;