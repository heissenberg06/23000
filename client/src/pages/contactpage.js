import React from 'react';
import './contactpage.css'; // Ensure the file name matches the CSS file

const ContactPage = () => {
    return (
        <div className="contact-container">
            <h1>About Us</h1>
            <p>Welcome to our website! We are dedicated to providing the best services to our community.</p>
            <h2>Contact Us</h2>
            <p>If you have any questions, please don't hesitate to contact us:</p>
            <ul>
                <li>Email: contact@example.com</li>
                <li>Phone: (123) 456-7890</li>
                <li>Address: 123 Main St, City, State, 90001</li>
            </ul>
        </div>
    );
}

export default ContactPage;
