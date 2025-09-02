import React from 'react';
import './Privacy.css';

const Privacy = () => {
  return (
    <div className="privacy-page">
      <div className="container">
        <h1>Privacy Policy</h1>
        
        <section className="privacy-section">
          <h2>Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you book a consultation, sign up for our newsletter, or contact us for support.</p>
          <p>This may include:</p>
          <ul>
            <li>Name and contact information</li>
            <li>Booking preferences and requirements</li>
            <li>Communication history</li>
            <li>Payment information</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Process bookings and payments</li>
            <li>Communicate with you about your sessions</li>
            <li>Send you updates and marketing materials (with your consent)</li>
            <li>Respond to your inquiries and support requests</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Information Sharing</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
          <p>We may share your information with:</p>
          <ul>
            <li>Service providers who assist in our operations</li>
            <li>Legal authorities when required by law</li>
            <li>Other parties with your explicit consent</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        </section>

        <section className="privacy-section">
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications</li>
            <li>Withdraw consent for data processing</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
          <p>Email: info@goldcoastwatersports.com.au</p>
          <p>Phone: 0404 445 000</p>
        </section>

        <section className="privacy-section">
          <h2>Updates to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.</p>
          <p>Last Updated: December 2024</p>
        </section>
      </div>
    </div>
  );
};

export default Privacy; 