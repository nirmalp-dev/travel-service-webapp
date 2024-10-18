import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        agreeTerms: false
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
        setSuccess('');

        if (!formData.agreeTerms) {
            setError('Please agree to the terms and conditions.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/auth/signup', {
                username: formData.fullName,
                email: formData.email,
                password: formData.password
            });

            setSuccess('Registration successful! You can now log in.');
            // You might want to store the token or redirect the user
            console.log(response.data);
        } catch (err) {
            setError(err.response?.data?.detail || 'An error occurred during registration.');
        }
    };

    return (
        <div className="login-form-box">
            <h3 className="mb-30">Register</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-box mb--30">
                    <input
                        type="text"
                        placeholder="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-box mb--30">
                    <input
                        type="email"
                        placeholder="Email"
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
                <button className="rn-btn edu-btn w-100 mb--30" type="submit">
                    <span>Register</span>
                </button>
                <div className="input-box">
                    <input
                        id="checkbox-2"
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                    />
                    <label htmlFor="checkbox-2">I read & agree the terms & conditions.</label>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm;