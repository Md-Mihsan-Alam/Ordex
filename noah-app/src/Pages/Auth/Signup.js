import React, { useState } from 'react';
import './Auth.css';
import { saveSignupData, verifyLoginData } from '../../utils/api'; // Import your API functions
import logo from "../Auth/Screenshot_2024-12-25_164147-removebg-preview.png";
import { ImTruck } from "react-icons/im";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaLinkedinIn, FaGooglePlusG } from "react-icons/fa";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [isSigningUp, setIsSigningUp] = useState(true);  // Track if we're signing up or signing in

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await saveSignupData({
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            if (response.status === 201) {
                alert('User signed up successfully!');
                setFormData({ username: '', email: '', password: '', confirmPassword: '' });
            } else {
                alert('Failed to sign up. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const response = await verifyLoginData({
                username: formData.username,
                password: formData.password
            });

            if (response.status === 200) {
                alert(`${formData.username}, successfully logged in!`);
                setFormData({ username: '', email: '', password: '', confirmPassword: '' });
            } else {
                alert('Invalid username or password!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login. Please try again later.');
        }
    };

    return (
        <div className="container">
            <div className="left">
                <ImTruck />
                <h1>OrderX</h1>
                <p>BOOST YOUR SALES</p>
                <img src={logo} alt="OrderX Logo" />
            </div>

            <div className="right">
                <h2>{isSigningUp ? 'Create an Account' : 'Sign In'}</h2>
                <h2>Welcome</h2>
                <form onSubmit={isSigningUp ? handleSubmit : handleSignIn} className='SignupForm'>
                    <input
                        type="text"
                        name="username"
                        placeholder="Full Name"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    {isSigningUp && (
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {isSigningUp && (
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    )}
                    <button type="submit">
                        {isSigningUp ? 'Create Account' : 'Sign In'}
                    </button>

                    <button
                        type="submit"
                        onClick={() => setIsSigningUp(!isSigningUp)}
                    >
                        {isSigningUp ? 'Already have an account? Sign In' : 'Create a new account'}
                    </button>

                    <small>Help & Support</small>
                </form>
                <div className="social-links">
                    <a href="https://www.facebook.com/" target='blank'><CiFacebook /></a>
                    <a href="https://www.instagram.com/" target='blank'><FaInstagram /></a>
                    <a href="https://www.twitter.com/" target='blank'><FaXTwitter /></a>
                    <a href="https://www.google.com/" target='blank'><FaGooglePlusG /></a>
                    <a href="https://www.linkedin.com/" target='blank'><FaLinkedinIn /></a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
