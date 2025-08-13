'use client';

import React from "react";
import { FiMessageSquare, FiSearch, FiPlus } from "react-icons/fi";
import { useState, useRef, useEffect } from 'react';
import { motion } from "framer-motion";


type Message = {
  text: string;
  sender: 'user' | 'bot';
};


export default function Interviewbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [jobRole, setJobRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!jobRole.trim() || !jobDescription.trim()) return;
    
    setIsSubmitting(true);
    
    // Add initial message to start chat
    const initialMessage: Message = { 
      text: `Hello! I'm here to help you with career guidance for the role of ${jobRole}. Based on the job description: "${jobDescription}", feel free to ask me any questions about this career path, required skills, interview preparation, or anything else related to this role.`, 
      sender: 'bot' 
    };
    setMessages([initialMessage]);
    
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await response.json();
      
      if (response.ok) {
        const botMessage: Message = { text: data.message, sender: 'bot' };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const errorMessage: Message = { text: `Error: ${data.error}`, sender: 'bot' };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = { text: 'Sorry, there was an error connecting to the AI service.', sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  return (
    <div className="relative min-h-screen pt-[10vh] flex">
      <div className="w-72 bg-[#121212] text-white p-4 flex flex-col m-2 rounded-lg">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 bg-[#1e1e1e] text-white rounded-md pl-10"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {["Plan a 3-day trip", "Ideas for a customer loyalty program", "Help me pick", "Write simple JS code"].map((chat) => (
            <div key={chat} className="px-3 py-2 bg-[#1e1e1e] rounded-md cursor-pointer hover:bg-[#292929] flex items-center gap-2">
              <FiMessageSquare className="text-gray-400" />
              <span>{chat}</span>
            </div>
          ))}
        </div>

        <button className="mt-auto flex items-center justify-center gap-2 bg-[#7d47ea] hover:bg-violet-700 text-white py-2 rounded-lg">
          <FiPlus /> New Chat
        </button>
      </div>

      <div className="flex flex-col justify-center items-center h-[90vh] w-full max-w-6xl text-white p-4 pb-2">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#121212] p-6 rounded-lg shadow-lg w-96"
          >
            <h2 className="text-xl font-bold mb-4 text-center">Enter Job Details</h2>

            <label className="block mb-2">Job Role:</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              className="w-full p-2 rounded bg-[#1e1e1e] text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              placeholder="e.g., Data Scientist, UI/UX Designer..."
            />

            <label className="block mt-4 mb-2">Job Description:</label>
            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full p-2 rounded bg-[#1e1e1e] text-white outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              placeholder="Describe the role, responsibilities, and expectations in detail..."
              rows={4}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-4 bg-[#7d47ea] hover:bg-violet-700 p-2 rounded text-white font-semibold flex justify-center items-center gap-2 transition-all duration-200"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                "Submit"
              )}
            </motion.button>
          </motion.div>
        ) : (
          <div className="flex flex-col justify-end items-center h-full w-full max-w-3xl">
            <div className="w-full flex flex-col space-y-2 overflow-y-auto h-[65vh] p-2 no-scrollbar">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-lg max-w-md ${msg.sender === 'user' ? 'bg-[#7d47ea]/70' : 'bg-gray-700'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="w-full flex items-center space-x-2 mt-4">
              <input
                type="text"
                className="flex-1 bg-[#1e1e1e] text-white p-3 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button 
                onClick={sendMessage} 
                className="bg-[#7d47ea] hover:bg-violet-700 p-3 rounded-lg text-white font-semibold"
                disabled={!input.trim()}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
