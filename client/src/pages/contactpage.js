import React from 'react';
import './contactpage.css'; // Ensure the file name matches the CSS file

const ContactPage = () => {
    return (
        <div className="contact-container">
            <h1>Hakkımızda</h1>
            <p>Web sitemize hoş geldiniz! Topluluğumuza en iyi hizmeti sunmaya adadık.</p>
            <h2>İletişim</h2>
            <p>Herhangi bir sorunuz varsa, lütfen bizimle iletişime geçmekten çekinmeyin:</p>
            <ul>
                <li>Email: mustafavardan@gmail.com</li>
                <li>Phone: +90 543 210 0123</li>
                <li>Address: Bostanlı/İzmir</li>
            </ul>
        </div>
    );
}

export default ContactPage;
