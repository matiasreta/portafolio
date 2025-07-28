import React, { memo, useState } from 'react';
import { ArrowUp, ChevronUp } from 'lucide-react';

interface ToolbarProps {
  onArrowUp?: () => void;
  onActionSelect?: (action: string) => void;
}

interface ActionButton {
  id: string;
  label: string;
}

const actionButtons: ActionButton[] = [
  { id: '1', label: 'Github' },
  { id: '3', label: 'Tecnologias' },
  { id: '4', label: 'Sobre mi' },
  { id: '5', label: "Contacto" },
];

const models = [
  { id: 'gemma-3', name: 'Gemini-Gemma3-B1' },
  { id: 'opus-4', name: 'Claude-Opus-4' },
  { id: 'gpt-4', name: 'GPT-4o-Mini' },
];

const Toolbar = memo<ToolbarProps>(({
  onArrowUp,
  onActionSelect
}) => {
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [inputText, setInputText] = useState('');

  const handleActionClick = (actionId: string) => {
    onActionSelect?.(actionId);
  };

  const handleModelSelect = () => {
    setIsModelDropdownOpen(false);
  };

  const handleSendMessage = () => {
    if (inputText.trim()) {
      console.log('Mensaje enviado:', inputText);
      setInputText(''); // Limpiar el input después de enviar
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

  return (<div>
    <div className="flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow-sm p-4 w-full max-w-4xl h-[140px] mx-auto ">
      {/* Top section with input */}
      <div className="">
        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What would you like to know about me?"
            className="w-full text-gray-600 text-sm border-0 outline-none bg-transparent placeholder-gray-600"
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
            GPT-4o-Mini
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
                  className="w-full text-left px-3 py-2 text-sm transition-colors hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg text-gray-700"
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
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg p-2 transition-colors"
            aria-label="Send message"
          >
            <ArrowUp className="w-4 h-4" />
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
            className="bg-white hover:bg-gray-200 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            {action.label}
          </button>
        ))}
        </div>
  </div>);
});

Toolbar.displayName = 'Toolbar';

export default Toolbar;