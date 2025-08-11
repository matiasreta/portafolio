import React, { memo, useState } from 'react';
import { ArrowUp, ChevronUp } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import { useApi } from '@/hooks/useApi';
import Notification from './Notification';

interface Message {
  user_message: string;
  bot_response: string;
  timestamp: string;
  chat_id: string;
}

interface ToolbarProps {
  onArrowUp?: () => void;
}

interface ActionButton {
  id: string;
  label: string;
  query: string;
}

const actionButtons: ActionButton[] = [
  { id: '1', label: 'Github', query: '¿Cuál es su link de Github?' },
  { id: '2', label: 'Tecnologias', query: '¿Cuáles son las tecnologías que maneja?' },
  { id: '3', label: 'Sobre mi', query: '¿Puedes contarme sobre el perfil de Matías como desarrollador?' },
  { id: '4', label: "Contacto", query: '¿Cómo puedo contactar a Matías?' },
];

const models = [
  { id: 'gemma-3', name: 'Gemini-Gemma3-B1' },
  { id: 'openai-4', name: 'GPT-4o-Mini' },
];

const Toolbar = memo<ToolbarProps>(({
  onArrowUp,
}) => {
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [notification, setNotification] = useState<{
    message: string;
    type: 'error' | 'success' | 'warning';
  } | null>(null);
  const { addMessage, updateMessage } = useChat();
  const { callApi, isLoading } = useApi({
    retries: 2,
    retryDelay: 2000,
    timeout: 45000 // 45 segundos para respuestas más largas
  });

  const showNotification = (message: string, type: 'error' | 'success' | 'warning') => {
    setNotification({ message, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const callBackendAPI = async (message: string, chatId: string) => {
    try {
      const data = await callApi<Message>('post', '/api/chat', {
        message: message,
        user_id: "user_123",
        chat_id: chatId
      });

      if (data) {
        console.log('Respuesta del backend:', data);
        
        // Actualizar el mensaje con la respuesta del bot
        updateMessage(chatId, {
          bot_response: data.bot_response,
          timestamp: data.timestamp
        });
      }
      
      return data;
    } catch (error: unknown) {
      console.error('Error al llamar al backend:', error);
      
      // Actualizar el mensaje con el error
      const errorMessage = error instanceof Error ? error.message : 'Error inesperado';
      updateMessage(chatId, {
        bot_response: `Error: ${errorMessage}`,
        timestamp: new Date().toISOString()
      });

      // Mostrar notificación de error
      showNotification(errorMessage, 'error');
      
      throw error;
    }
  };

  const handleActionClick = (actionId: string) => {
    // Find the action button by ID
    const action = actionButtons.find(btn => btn.id === actionId);
    if (!action || isLoading) return;
    
    // Send the action query directly without touching the input
    sendMessage(action.query);
  };

  const handleModelSelect = () => {
    setIsModelDropdownOpen(false);
  };

  const sendMessage = async (messageText: string) => {
    if (messageText.trim() && !isLoading) {
      const userMessage = messageText.trim();
      console.log('Mensaje enviado:', userMessage);
      
      // Generar un chat_id único para este intercambio
      const chatId = `chat_${Date.now()}`;
      
      // Crear mensaje temporal del usuario para mostrar inmediatamente
      const tempUserMessage: Message = {
        user_message: userMessage,
        bot_response: "", // Vacío por ahora
        timestamp: new Date().toISOString(),
        chat_id: chatId
      };
      
      // Agregar mensaje del usuario inmediatamente
      addMessage(tempUserMessage);
      
      // Llamar a la API para obtener la respuesta
      try {
        await callBackendAPI(userMessage, chatId);
      } catch (error) {
        console.error('Error en sendMessage:', error);
      }
    }
  };

  const handleSendMessage = async () => {
    if (inputText.trim() && !isLoading) {
      const userMessage = inputText.trim();
      
      // Limpiar el input inmediatamente
      setInputText('');
      
      // Enviar el mensaje
      await sendMessage(userMessage);
    }
  };

  const handleArrowUpClick = () => {
    handleSendMessage();
    onArrowUp?.();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={hideNotification}
          duration={8000}
        />
      )}
      
      <div>
        <div className="flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow-sm p-4 w-full max-w-4xl h-[140px] mx-auto ">
          {/* Top section with input */}
          <div className="">
            <div className="relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                placeholder={isLoading ? " " : "Escribí tu consulta, contacto, proyectos, experiencia, etc..."}
                className={`w-full text-sm border-0 outline-none bg-transparent ${
                  isLoading 
                    ? 'text-gray-400 placeholder-gray-400 cursor-not-allowed' 
                    : 'text-gray-600 placeholder-gray-600'
                }`}
              />
            </div>
          </div>

          {/* Top controls section */}
          <div className="flex items-center justify-between ">
            {/* Left side - Model selector */}
            <div className="relative">
              <button
                onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                className="bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg px-3 py-2 text-sm transition-colors flex items-center gap-2 text-gray-700"
              >
                gemini-2.5-flash
                <ChevronUp 
                  className={`w-4 h-4 transition-transform ${isModelDropdownOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Dropdown menu */}
              {isModelDropdownOpen && (
                <div className="absolute left-0 bottom-full mb-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] z-50">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => handleModelSelect()}
                      className="w-full text-left px-3 py-2 text-sm transition-colors hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg text-gray-400"
                    >
                      {model.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right side - Arrow up button (Send) */}
            <div className="flex items-center gap-2">
              {/* Arrow up button for sending */}
              <button
                onClick={handleArrowUpClick}
                disabled={isLoading}
                className={`rounded-lg cursor-pointer p-2 transition-colors ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
                aria-label="Send message"
              >
                <ArrowUp className={`w-4 h-4  ${isLoading ? 'animate-pulse' : ''}`} />
              </button>
            </div>
          </div>
        </div>
        {/* Bottom section - Action buttons without icons */}
        <div className="flex items-center justify-center pt-2 gap-2">
          {actionButtons.map((action) => (
            <button
              key={action.id}
              onClick={() => handleActionClick(action.id)}
              disabled={isLoading}
              className={`border border-gray-200 rounded-lg px-3 py-2 text-sm transition-colors ${
                isLoading 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white hover:bg-gray-200 text-gray-700 hover:text-gray-900'
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
});

Toolbar.displayName = 'Toolbar';

export default Toolbar;