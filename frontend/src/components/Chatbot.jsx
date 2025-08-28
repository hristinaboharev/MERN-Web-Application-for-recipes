import React, { useState } from "react";
import axios from "axios";
import '../styles/Chatbot.css';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Zdravo! Kako mogu da pomognem?" },
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Dodaj korisničku poruku
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    try {
      // Poziv backend-a
      const res = await axios.post("http://localhost:5000/api/chat", {
        question: input,
      });

      setMessages([...newMessages, { sender: "bot", text: res.data.answer }]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Greška u vezi. Pokušaj ponovo." },
      ]);
    }

    setInput("");
  };

  return (
    <>
      {/* Ikonica robota */}
      <div className="chat-icon" onClick={toggleChat}>
        <img src="/images/Chatbot.jpg" alt="Chat Bot" />
      </div>

      {/* Chat prozor */}
      {isOpen && (
        <div className="chatbot">
          <div className="chat-header">Chat Bot</div>
          <div className="messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pitaj nešto o kuvanju..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Pošalji</button>
          </div>
        </div>
      )}
    </>
  );
}
