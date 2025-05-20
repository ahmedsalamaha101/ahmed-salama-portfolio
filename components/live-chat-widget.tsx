"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { MessageSquare, X, Send } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

interface Message {
  id: string
  text: string
  sender: "user" | "agent"
  timestamp: Date
}

export default function LiveChatWidget() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          text: t("chat_welcome_message"),
          sender: "agent",
          timestamp: new Date(),
        },
      ])
    }
  }, [messages.length, t])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const toggleChat = () => {
    setIsOpen((prev) => !prev)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate agent typing
    setIsTyping(true)
    setTimeout(() => {
      // Add agent response
      const agentMessage: Message = {
        id: `agent-${Date.now()}`,
        text: getAutoResponse(inputValue),
        sender: "agent",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, agentMessage])
      setIsTyping(false)
    }, 1500)
  }

  // Simple auto-response function
  const getAutoResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase()

    if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
      return t("chat_greeting_response")
    } else if (lowerInput.includes("book") || lowerInput.includes("reservation")) {
      return t("chat_booking_response")
    } else if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("fee")) {
      return t("chat_pricing_response")
    } else if (lowerInput.includes("contact") || lowerInput.includes("phone") || lowerInput.includes("email")) {
      return t("chat_contact_response")
    } else {
      return t("chat_default_response")
    }
  }

  // Format timestamp
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all"
        aria-label={isOpen ? t("close_chat") : t("open_chat")}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-20 right-6 z-40 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-all duration-300 transform ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        {/* Chat Header */}
        <div className="bg-primary text-white p-4">
          <h3 className="font-bold">{t("chat_with_us")}</h3>
          <p className="text-sm opacity-80">{t("chat_subtitle")}</p>
        </div>

        {/* Chat Messages */}
        <div className="h-80 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-primary text-white rounded-tr-none"
                    : "bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-tl-none"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1 opacity-70 text-right">{formatTime(message.timestamp)}</p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg rounded-tl-none p-3 max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-700 flex">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={t("type_message")}
            className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors"
            disabled={!inputValue.trim()}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  )
}
