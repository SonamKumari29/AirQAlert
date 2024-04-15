import React, { useState } from 'react';
import './Consult.css';

const Consult = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() === '') return;
    const newMessage = { text: inputText, sender: "user" };
    setMessages([...messages, newMessage]);
    setInputText('');
    // Here you can implement the logic to handle the user input and generate bot responses
    // For demonstration purposes, let's add a simple bot response
    setTimeout(() => {
      const botResponse = { text: "Thanks for your message!", sender: "bot" };
      setMessages([...messages, botResponse]);
    }, 500);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chatbot-input">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Consult;


