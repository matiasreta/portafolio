import React from 'react';
import ReactMarkdown from 'react-markdown';
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
    <div className="w-full">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="space-y-4">
            {/* User Message */}
            <div className="flex justify-end pb-4">
              <div className="bg-blue-700 text-white rounded-lg px-4 py-2 max-w-[70%]">
                <p className="text-sm">{message.user_message}</p>
                <p className="text-xs opacity-75 mt-1"> {formatTime(message.timestamp)}</p>
              </div>
            </div>
            
            {/* Bot Response */}
            <div className="flex justify-start">
              <div className="text-gray-800 rounded-lg py-0 max-w-[70%] font-medium">
                {message.bot_response ? (
                  <>
                  
                    <div className="text-sm prose prose-slate max-w-none whitespace-pre-line 
                [&_ul]:my-[-1rem] [&_ul_li]:mb-[-1rem] [&_ul_li]:mt-[0rem]">
                    <ReactMarkdown>{message.bot_response}</ReactMarkdown>
                    </div>
                    
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