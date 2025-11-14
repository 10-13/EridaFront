

import React, { useState } from 'react';
import Card from './Card';


function MessageInput({ onSend }) {
  
  const [text, setText] = useState('');

  const handleSendClick = () => {
    
    if (text.trim()) {
      onSend(text);
      setText(''); 
    }
  };

  const handleKeyPress = (event) => {
    
    if (event.key === 'Enter') {
      handleSendClick();
    }
  };

  return (
    <Card className="content-card fixed-bottom-card">
      <div className="control-block">
        <input
          type="text"
          placeholder="Напишите сообщение..."
          className="control-element"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress} 
        />
        <button
          className="control-element"
          style={{ width: '40px', height: '40px' }}
          onClick={handleSendClick} 
        >
          {'>'}
        </button>
      </div>
    </Card>
  );
}

export default MessageInput;