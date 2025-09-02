import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: "What equipment do I need to bring for my first lesson?",
      answer: "For your first lesson, you only need to bring swimwear, a towel, and sunscreen. We provide all the necessary equipment including kites, boards, harnesses, and safety gear. If you have your own equipment and would prefer to use it, please let us know in advance."
    },
    {
      question: "How long does it take to learn kitesurfing?",
      answer: "The time to learn kitesurfing varies depending on individual ability and conditions. Most students can ride independently after 8-12 hours of instruction. However, becoming proficient and comfortable in various conditions typically takes 20-30 hours of practice. We offer packages designed to get you from beginner to independent rider."
    },
    {
      question: "What are the age requirements for lessons?",
      answer: "We offer lessons for students aged 12 and above. For students under 18, we require parental consent. Younger students (12-16) typically do well in our youth development programs which are designed specifically for their needs and safety."
    },
    {
      question: "Do I need to be a strong swimmer?",
      answer: "Yes, you should be a confident swimmer and comfortable in water over your head. While we always prioritize safety and provide life jackets, being able to swim well is essential for water sports. If you're unsure about your swimming ability, we can assess this during your first lesson."
    },
    {
      question: "What happens if the weather is bad on my lesson day?",
      answer: "We closely monitor weather conditions and will reschedule lessons if conditions are unsafe or unsuitable for learning. This includes strong winds, storms, or poor visibility. We'll contact you as early as possible to reschedule, and there are no cancellation fees for weather-related changes."
    },
    {
      question: "Can I book private lessons?",
      answer: "Yes, we offer both group and private lessons. Private lessons provide one-on-one instruction and can be more intensive, allowing you to progress faster. They're particularly recommended for beginners or if you have specific goals you'd like to focus on."
    },
    {
      question: "What should I wear for my lesson?",
      answer: "Wear comfortable swimwear that you can move freely in. Avoid loose clothing that could get caught in equipment. We recommend rash guards or wetsuits for sun protection and comfort. We'll provide safety equipment including helmets and life jackets."
    },
    {
      question: "How do I book a consultation?",
      answer: "You can book your free 15-minute consultation through our website. Simply click on any 'Book Now' button or visit our booking page. During the consultation, we'll discuss your goals, assess your current fitness level, and create a personalized training plan for you."
    },
    {
      question: "Do you offer gift certificates?",
      answer: "Yes, we offer gift certificates for all our lesson packages and training programs. They make perfect gifts for birthdays, holidays, or special occasions. Gift certificates can be purchased online or by contacting us directly."
    },
    {
      question: "What is your cancellation policy?",
      answer: "We understand that sometimes you need to reschedule. We allow cancellations up to 24 hours before your scheduled lesson without any fees. Cancellations within 24 hours may incur a cancellation fee. Weather-related cancellations are always free of charge."
    }
  ];

  return (
    <div className="faq-page">
      <div className="container">
        <h1>Frequently Asked Questions</h1>
        
        <div className="faq-intro">
          <p>Find answers to the most common questions about our services, lessons, and training programs. If you don't see what you're looking for, feel free to contact us directly.</p>
        </div>

        <div className="faq-list">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <button 
                className={`faq-question ${openItems[index] ? 'open' : ''}`}
                onClick={() => toggleItem(index)}
              >
                <span>{item.question}</span>
                <span className="faq-icon">{openItems[index] ? '−' : '+'}</span>
              </button>
              <div className={`faq-answer ${openItems[index] ? 'open' : ''}`}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-cta">
          <h2>Still Have Questions?</h2>
          <p>If you couldn't find the answer you're looking for, we're here to help. Contact us directly or book a free consultation to discuss your specific needs.</p>
          <div className="faq-cta-buttons">
            <a href="/contact" className="contact-btn">Contact Us</a>
            <a href="/booking" className="booking-btn">Book Consultation</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 