import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import React, { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown';
import './ChatWidget.css'
import axios from 'axios'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! I'm VitaMeal's Virtual assistant. Ask me about our menu, prices, or delivery!" }
  ])
  const { url } = useContext(StoreContext)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  
  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    const token = localStorage.getItem("token"); // Get token for authMiddleware
    
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMessage }])
    setLoading(true)

    try {
      // pass the token in headers so backend can find userId/email
      const response = await axios.post(`${url}/api/chat/message`, 
        { message: userMessage },
        { headers: { token: token } } 
      )

      if (response.data.success) {
        setMessages(prev => [...prev, { role: 'bot', text: response.data.reply }])
      } else {
        // Show specific error message from backend if available (e.g., "Please login")
        const errorMsg = response.data.message || "Sorry, I couldn't process that. Please try again."
        setMessages(prev => [...prev, { role: 'bot', text: errorMsg }])
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting. Please check your login status and try again." }])
    } finally {
      setLoading(false)
    }
  }

  const quickQuestions = [
    "What soups do you have?",
    "Show me rice dishes",
    "How much is delivery?",
    "What are Nigerian Specials?"
  ]

  const handleQuickQuestion = (question) => {
    setInput(question)
  }

  return (
    <>
      {/* Chat Bubble Button */}
      <div 
        className={`chat-bubble ${isOpen ? 'hidden' : ''}`}
        onClick={() => { setIsOpen(true); document.body.style.overflow = 'hidden'; }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="white" strokeWidth="2"/>
        </svg>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-status-dot"></div>
              <div>
                <h3>VitaMeal Assistant</h3>
                <p>Online</p>
              </div>
            </div>
            <button 
            onClick={() => { setIsOpen(false); document.body.style.overflow = ''; }}>✕</button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.role}`}>
                <div className="message-bubble">
                    {msg.role === 'bot' ? (
                        <ReactMarkdown>
                          {msg.text.replace(/(https?:\/\/[^\s]+)/g, '[$1]($1)')}
                        </ReactMarkdown>
                    ) : (
                        msg.text
                    )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="chat-message bot">
                <div className="message-bubble typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="quick-questions">
              {quickQuestions.map((q, i) => (
                <button key={i} onClick={() => handleQuickQuestion(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={sendMessage} className="chat-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default ChatWidget