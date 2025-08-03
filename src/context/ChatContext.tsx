"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Message {
  user_message: string;
  bot_response: string;
  timestamp: string;
  chat_id: string;
}

interface ChatContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
  updateMessage: (chatId: string, updates: Partial<Message>) => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const updateMessage = (chatId: string, updates: Partial<Message>) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.chat_id === chatId 
          ? { ...msg, ...updates }
          : msg
      )
    );
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const value = {
    messages,
    addMessage,
    updateMessage,
    clearMessages,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}; 