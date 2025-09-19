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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedQuestions = [
    "What services do you offer?",
    "I'm a complete beginner - can you help?",
    "How much does training cost?",
    "What should I bring to my first lesson?",
    "Do you offer group or private lessons?",
    "Is it safe for beginners?",
    "What's the best time to train?",
    "How do I get started?"
  ];

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    // Context-aware conversation patterns
    const responses = {
      // Greetings and social
      greetings: {
        patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings'],
        response: "Hello! Welcome to Movement Performance Training! I'm here to help you with anything about our training programs, booking, equipment, or any questions you might have. What would you like to know today?"
      },
      
      // Affirmative responses
      yes: {
        patterns: ['yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'alright', 'definitely', 'absolutely'],
        response: "Excellent! You can book your free consultation by clicking any 'Book Now' button on our website. During the consultation, we'll discuss your goals and create a personalized training plan. What type of training interests you most?"
      },
      
      // Negative responses
      no: {
        patterns: ['no', 'not', 'nope', 'maybe', 'later', 'not now', 'not yet'],
        response: "No problem at all! Take your time to think about it. Feel free to ask me any other questions about our training programs, pricing, equipment, or anything else. I'm here whenever you're ready!"
      },
      
      // Thanks and appreciation
      thanks: {
        patterns: ['thank', 'thanks', 'appreciate', 'grateful'],
        response: "You're very welcome! I'm glad I could help. If you have any more questions or would like to book a consultation, just let me know!"
      },
      
      // Goodbyes
      goodbye: {
        patterns: ['bye', 'goodbye', 'see you', 'farewell', 'take care'],
        response: "Goodbye! Thanks for chatting with us. Don't forget to book your free consultation when you're ready to start your training journey. Have a great day!"
      },
      
      // Interest and enthusiasm
      interest: {
        patterns: ['interested', 'sounds good', 'cool', 'awesome', 'amazing', 'fantastic', 'love it', 'perfect'],
        response: "That's fantastic! We'd love to help you get started. You can book your free consultation to discuss your goals and create a personalized training plan. What type of training interests you most?"
      },
      
      // Concerns and fears
      concerns: {
        patterns: ['worried', 'scared', 'nervous', 'afraid', 'concerned', 'fear', 'anxious', 'intimidated'],
        response: "I completely understand your concerns! Many beginners feel exactly the same way. Our certified instructors specialize in beginner training and will make sure you feel safe and comfortable every step of the way. We start with the basics and progress at your pace. Would you like to learn more about our safety measures?"
      },
      
      // Questions and curiosity
      questions: {
        patterns: ['who', 'what', 'where', 'when', 'why', 'how', 'tell me', 'explain', 'describe'],
        response: "Great question! We're Movement Performance Training, specializing in water sports. We offer kitesurfing, hydrofoil, and wing foil training with certified instructors. What would you like to know more about?"
      },
      
      // Urgency and immediate action
      urgent: {
        patterns: ['now', 'today', 'asap', 'immediately', 'right away', 'quickly'],
        response: "Perfect! You can book your consultation right now by clicking any 'Book Now' button on our website. We often have same-day availability. What's your preferred time?"
      },
      
      // Budget and cost concerns
      budget: {
        patterns: ['expensive', 'cheap', 'affordable', 'budget', 'money', 'cost', 'price', 'worth it'],
        response: "I understand budget is important! Our packages start from $299 and include all equipment and safety gear. We also offer payment plans and group discounts. During your consultation, we can discuss options that fit your budget. What's your budget range?"
      },
      
      // Experience levels
      experience: {
        patterns: ['beginner', 'new', 'never done', 'experience', 'skill', 'level', 'first time', 'never tried'],
        response: "Perfect! We specialize in beginner training. Many of our students had never tried these sports before and now they absolutely love it! We'll start with the basics and progress at your pace. What's your current experience level?"
      },
      
      // Equipment and gear
      equipment: {
        patterns: ['equipment', 'gear', 'bring', 'need', 'supplies', 'what should i bring', 'what do i need'],
        response: "Great question! Just bring swimwear, a towel, and sunscreen. We provide all the professional equipment including kites, boards, harnesses, and safety gear. Any specific equipment questions?"
      },
      
      // Safety and insurance
      safety: {
        patterns: ['safe', 'safety', 'insurance', 'dangerous', 'risk', 'hurt', 'injured', 'accident'],
        response: "Safety is our absolute top priority! We have comprehensive insurance and certified instructors. All safety equipment is provided and we follow strict safety protocols. We've trained thousands of students with an excellent safety record. Any specific safety concerns?"
      },
      
      // Services and programs
      services: {
        patterns: ['services', 'offer', 'training', 'programs', 'what do you do', 'classes', 'lessons'],
        response: "We offer kitesurfing, hydrofoil, and wing foil training programs. All include professional instruction and safety gear. What interests you most?"
      },
      
      // Booking and scheduling
      booking: {
        patterns: ['book', 'lesson', 'appointment', 'consultation', 'schedule', 'how to start', 'get started'],
        response: "Book your free 30-minute consultation! Click any 'Book Now' button on our website. We'll discuss your goals and create a personalized plan."
      },
      
      // Pricing and costs
      pricing: {
        patterns: ['prices', 'cost', 'how much', 'expensive', 'affordable', 'budget'],
        response: "Packages start from $299 for beginners up to $799 for advanced. All include equipment and safety gear. Which program interests you?"
      },
      
      // Group vs private
      groupPrivate: {
        patterns: ['group', 'private', 'individual', 'alone', 'friends', 'together', 'solo'],
        response: "We offer both group and private lessons! Group lessons are more cost-effective. Private lessons provide one-on-one instruction."
      },
      
      // Weather and timing
      weather: {
        patterns: ['weather', 'wind', 'conditions', 'when', 'best time', 'season', 'summer', 'winter'],
        response: "We train in mornings and afternoons when conditions are optimal. We monitor weather and reschedule if needed."
      },
      
      // Location
      location: {
        patterns: ['where', 'location', 'place', 'address', 'meet', 'venue'],
        response: "We train at various locations depending on conditions. We'll discuss the best spots during your consultation."
      },
      
      // Age and fitness
      ageFitness: {
        patterns: ['age', 'old', 'young', 'fitness', 'fit', 'physical', 'athletic', 'out of shape'],
        response: "Our programs suit various ages and fitness levels. We'll assess your level during consultation."
      },
      
      // Duration and time
      duration: {
        patterns: ['how long', 'duration', 'time', 'hours', 'minutes', 'session length'],
        response: "Beginner sessions are typically 2-3 hours, advanced can be longer."
      }
    };
    
    // Check for pattern matches with priority order
    for (const [category, data] of Object.entries(responses)) {
      if (data.patterns.some(pattern => input.includes(pattern))) {
        return data.response;
      }
    }
    
    // Advanced LLM-like contextual responses
    // Handle complex sentences and multiple concepts
    const words = input.split(/\s+/);
    const hasMultipleConcepts = words.filter(word => 
      ['services', 'price', 'book', 'equipment', 'safety', 'beginner', 'group', 'private'].includes(word)
    ).length > 1;
    
    if (hasMultipleConcepts) {
      return "That's a great multi-part question! Let me address each part: We offer kitesurfing, hydrofoil, and wing foil training starting from $299. You can book a free consultation to discuss your specific needs, equipment requirements, and whether group or private lessons work better for you. What aspect would you like to focus on first?";
    }
    
    // Handle emotional and personal responses
    if (input.includes('feel') || input.includes('think') || input.includes('believe') || input.includes('opinion')) {
      return "I appreciate you sharing your thoughts! At Movement Performance Training, we understand that everyone has different feelings and concerns about trying new sports. That's exactly why we offer personalized consultations - to address your specific thoughts and create a plan that feels right for you. What are you thinking about most?";
    }
    
    // Handle comparisons and alternatives
    if (input.includes('vs') || input.includes('versus') || input.includes('or') || input.includes('better') || input.includes('compare')) {
      return "Great question about comparisons! We offer kitesurfing, hydrofoil, and wing foil - each has unique benefits. Kitesurfing is great for wind power, hydrofoil for speed and efficiency, and wing foil for versatility. During your consultation, we can discuss which sport matches your goals and preferences best. What interests you most?";
    }
    
    // Handle future planning and goals
    if (input.includes('goal') || input.includes('plan') || input.includes('future') || input.includes('want to') || input.includes('hope to')) {
      return "I love that you're thinking about your goals! That's exactly what we focus on during consultations. Whether you want to learn for fun, competition, fitness, or adventure, we'll create a personalized training plan to help you achieve your specific goals. What's your main goal with water sports?";
    }
    
    // Handle personal stories and experiences
    if (input.includes('tried') || input.includes('did') || input.includes('experience') || input.includes('before') || input.includes('used to')) {
      return "That's interesting! Your previous experience will definitely help. Whether you're completely new or have some background, we'll build on what you know and help you progress safely. During your consultation, we'll discuss your experience level and create a plan that's perfect for where you're starting from. What's your background with water sports?";
    }
    
    // Handle technical questions
    if (input.includes('how does') || input.includes('what is') || input.includes('explain') || input.includes('technical') || input.includes('work')) {
      return "Great technical question! Each sport works differently - kitesurfing uses wind power, hydrofoil uses a foil for lift, and wing foil combines both. The technical aspects are fascinating, but the best way to understand them is through hands-on experience. During your consultation, our instructors can explain the technical details and show you how everything works. What technical aspect interests you most?";
    }
    
    // Intelligent fallback that feels more conversational
    const fallbackResponses = [
      "That's an interesting question! I'd love to help you with that. We offer comprehensive water sports training including kitesurfing, hydrofoil, and wing foil. Would you like to book a free consultation to get detailed, personalized information about this topic?",
      "I appreciate your question! At Movement Performance Training, we specialize in helping people discover water sports. We offer kitesurfing, hydrofoil, and wing foil training with certified instructors. A free consultation would be perfect to discuss your specific needs. Interested?",
      "That's a great question! We're here to help with all aspects of water sports training. We offer kitesurfing, hydrofoil, and wing foil programs. The best way to get detailed information is through our free consultation where we can address your specific needs. Would you like to schedule one?"
    ];
    
    // Return a random fallback response for variety
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Get smart bot response
    const botResponse = getBotResponse(text);

      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

    // Add bot message after a short delay
    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputValue);
    setInputValue('');
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
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