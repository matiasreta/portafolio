import React from 'react';
import { useChat } from '@/context/ChatContext';

const Chat: React.FC = () => {
  const { messages } = useChat();

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-AR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-4">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="space-y-2">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-orange-500 text-white rounded-lg px-4 py-2 max-w-[70%]">
                <p className="text-sm">{message.user_message}</p>
                <p className="text-xs opacity-75 mt-1">• {formatTime(message.timestamp)}</p>
              </div>
            </div>
            
            {/* Bot Response */}
            <div className="flex justify-start">
              <div className=" text-gray-800 rounded-lg  py-2 max-w-[70%] font-bold ">
                {message.bot_response ? (
                  <>
                    <p className="text-sm whitespace-pre-line">{message.bot_response}</p>
                    <p className="text-xs text-gray-500 mt-1">• {formatTime(message.timestamp)}</p>
                  </>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-500"></span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {messages.length === 0 && (
          <div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat; 