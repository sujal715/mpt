import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your Movement Performance Training assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedQuestions = [
    "What services do you offer?",
    "How do I book a lesson?",
    "What equipment do I need?",
    "What are your prices?",
    "Do you offer group lessons?"
  ];

  const botResponses = {
    "what services do you offer": "We offer comprehensive water sports training including kitesurfing, hydrofoil, and wing foil lessons. We also provide specialized programs for youth development and competition training. All lessons include equipment and safety gear!",
    "how do i book a lesson": "You can easily book your free 15-minute consultation through our website! Just click any 'Book Now' button or visit our booking page. During the consultation, we'll discuss your goals and create a personalized training plan.",
    "what equipment do i need": "For your first lesson, you only need to bring swimwear, a towel, and sunscreen. We provide all the necessary equipment including kites, boards, harnesses, and safety gear. We'll make sure you have everything you need!",
    "what are your prices": "Our lesson packages start from $299 for beginners and go up to $799 for advanced training. We also offer hydrofoil lessons from $399 and wing foil training from $349. All packages include equipment and safety gear. Book a consultation to get a personalized quote!",
    "do you offer group lessons": "Yes! We offer both group and private lessons. Group lessons are great for learning with friends and are more cost-effective. Private lessons provide one-on-one instruction and can help you progress faster. We can discuss which option is best for you during your consultation."
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = getBotResponse(text.toLowerCase());
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (userInput) => {
    for (const [key, response] of Object.entries(botResponses)) {
      if (userInput.includes(key)) {
        return response;
      }
    }
    return "That's a great question! I'd be happy to help you with that. You can book a free consultation with our team to get detailed information, or feel free to ask me about our services, booking process, equipment, or pricing.";
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        <span className="chatbot-icon">💬</span>
        <span className="chatbot-label">Chat with us</span>
      </button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="chatbot-overlay" onClick={() => setIsOpen(false)}>
          <div className="chatbot-container" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="chatbot-avatar">🌊</div>
                <div>
                  <h3>Movement Performance Training</h3>
                  <p>Online Assistant</p>
                </div>
              </div>
              <button className="chatbot-close" onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.sender}`}>
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="message bot">
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="quick-questions">
              {predefinedQuestions.map((question, index) => (
                <button
                  key={index}
                  className="quick-question-btn"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>

            {/* Input */}
            <form className="chatbot-input" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isTyping}
              />
              <button type="submit" disabled={!inputValue.trim() || isTyping}>
                <span>➤</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot; 