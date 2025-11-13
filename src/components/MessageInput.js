// --- START OF FILE MessageInput.js ---

import React, { useState } from 'react';
import Card from './Card';

// Получаем onSend как prop для отправки сообщения родителю
function MessageInput({ onSend }) {
  // Состояние для хранения текста в поле ввода
  const [text, setText] = useState('');

  const handleSendClick = () => {
    // Не отправляем пустое сообщение
    if (text.trim()) {
      onSend(text);
      setText(''); // Очищаем поле ввода после отправки
    }
  };

  const handleKeyPress = (event) => {
    // Отправка по нажатию Enter
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
          onKeyPress={handleKeyPress} // Добавляем обработчик нажатия клавиш
        />
        <button
          className="control-element"
          style={{ width: '40px', height: '40px' }}
          onClick={handleSendClick} // Добавляем обработчик клика
        >
          {'>'}
        </button>
      </div>
    </Card>
  );
}

export default MessageInput;