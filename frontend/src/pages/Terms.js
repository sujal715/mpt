import React from 'react';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="container">
        <div className="terms-header">
          <h1>Movement Performance Training – Terms and Conditions</h1>
          <p className="terms-intro">
            These Terms and Conditions ("Terms") govern your participation in any online training programs offered by Movement Performance Training ("we", "us", "our"), owned and operated by Chloe Barrett, based in Australia. By purchasing or enrolling in a program, you agree to be bound by these Terms, in accordance with Australian Consumer Law (ACL).
          </p>
        </div>

        <div className="terms-content">
          <section className="terms-section">
            <h2>1. Program Types and Payment Terms</h2>
            
            <div className="terms-subsection">
              <h3>1.1. Pay Upfront Programs (Boardrider and Engine Programs):</h3>
              <ul>
                <li>Full payment is required upfront to gain access to the program.</li>
                <li>These programs include a 3-day trial period, beginning on the date of purchase.</li>
              </ul>
            </div>

            <div className="terms-subsection">
              <h3>1.2. Elite Program (Subscription Model):</h3>
              <ul>
                <li>Billed weekly on a recurring basis for 6 weeks.</li>
                <li>Includes a 7-day free trial starting from the date of registration.</li>
                <li>Payments commence immediately after the 7-day trial unless the program is cancelled within the trial period.</li>
              </ul>
            </div>
          </section>

          <section className="terms-section">
            <h2>2. Trial Periods and Cancellations</h2>
            
            <div className="terms-subsection">
              <h3>2.1. Trial Period Cancellation:</h3>
              <ul>
                <li>You may cancel your enrolment during the applicable trial period (3 days for pay upfront programs, 7 days for Elite) by emailing <a href="mailto:chloebarrettraining@icloud.com">chloebarrettraining@icloud.com</a> with your name and order number.</li>
                <li>If cancelled within the trial, you will not be charged.</li>
              </ul>
            </div>

            <div className="terms-subsection">
              <h3>2.2. Post-Trial Cancellation and Refunds:</h3>
              <ul>
                <li>No cancellations or refunds are available after the trial period has ended, except as required under Australian Consumer Law.</li>
                <li>By continuing beyond the trial, you acknowledge that you are committing to the full payment terms and waive your right to refund or cancellation based on change of mind or personal circumstances.</li>
              </ul>
            </div>
          </section>

          <section className="terms-section">
            <h2>3. Australian Consumer Law Compliance</h2>
            <p>Nothing in these Terms excludes or limits your rights under the Australian Consumer Law. You are entitled to a refund or replacement if a service:</p>
            <ul>
              <li>Is not delivered with acceptable care and skill,</li>
              <li>Is unfit for the purpose you asked for,</li>
              <li>Does not match the description provided.</li>
            </ul>
            <p>We are not required to provide a refund if you:</p>
            <ul>
              <li>Simply change your mind,</li>
              <li>Fail to use the program,</li>
              <li>Do not achieve your personal fitness goals.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>4. Program Access and Use</h2>
            <ul>
              <li>Access is granted via a secure member portal or digital delivery.</li>
              <li>All programs are for individual use only and must not be shared, resold, or distributed.</li>
              <li>You are responsible for ensuring you have suitable internet access and compatible devices.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>5. Health and Safety Disclaimer</h2>
            <p>By participating, you acknowledge:</p>
            <ul>
              <li>You are medically cleared to undertake physical exercise,</li>
              <li>You are responsible for modifying exercises based on your capacity,</li>
              <li>Movement Performance Training is not liable for any injury sustained due to misuse, poor form, or failure to follow guidance.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>6. Intellectual Property</h2>
            <p>All content, videos, written material, and programs are the intellectual property of Movement Performance Training. Reproduction, distribution, or unauthorised use is prohibited.</p>
          </section>

          <section className="terms-section">
            <h2>7. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. Any changes will be communicated via email and updated on our website. Continued access to the program constitutes acceptance of the updated Terms.</p>
          </section>

          <section className="terms-section">
            <h2>8. Contact</h2>
            <p>For questions, cancellations, or support, contact:</p>
            <div className="contact-info">
              <p>📧 <a href="mailto:chloebarrettraining@icloud.com">chloebarrettraining@icloud.com</a></p>
              <p>🌐 <a href="https://movementperformancetraining.com.au" target="_blank" rel="noopener noreferrer">movementperformancetraining.com.au</a></p>
            </div>
          </section>
        </div>

        <div className="terms-footer">
          <p className="last-updated">Last updated: {new Date().toLocaleDateString('en-AU')}</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
