

import React, { useState, useEffect, useCallback, useRef } from 'react';
import TopBar from './components/TopBar';
import Card from './components/Card';
import MessageCard from './components/MessageCard';
import MessageInput from './components/MessageInput';
import { getMessages, sendMessage } from './api/authService'; 

function ChatPage() {
  
  const [messages, setMessages] = useState([]);
  
  const [error, setError] = useState(null);
  
  
  const lastMessageId = useRef(0);

  
  const fetchNewMessages = useCallback(async () => {
    try {
      const newMessages = await getMessages(lastMessageId.current);
      if (newMessages && newMessages.length > 0) {
        
        const maxId = Math.max(...newMessages.map(m => m.id));
        lastMessageId.current = maxId;
        
        
        setMessages(prevMessages => [...prevMessages, ...newMessages]);
      }
    } catch (err) {
      setError('Не удалось загрузить сообщения. Попробуйте обновить страницу.');
      console.error(err);
    }
  }, []);

  
  useEffect(() => {
    
    fetchNewMessages();

    
    const intervalId = setInterval(fetchNewMessages, 3000);

    
    return () => clearInterval(intervalId);
  }, [fetchNewMessages]);


  
  const handleSendMessage = async (text) => {
    try {
      await sendMessage(text);
      
      
      await fetchNewMessages();
    } catch (err) {
      setError('Не удалось отправить сообщение.');
      console.error(err);
    }
  };

  return (
    <>
      <TopBar title="Чат" />
      
      <div className="main-block" style={{ gridTemplateColumns: 'auto' }}>
        
        <Card className="header-card">
          <h1 className="bright-text" style={{ fontSize: '28px' }}>Общий чат</h1>
          <p className="bright-text" style={{ opacity: 0.8, fontSize: '16px' }}>
            Онлайн
          </p>
        </Card>

        {/* Отображение ошибки, если она есть */}
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        {/* Отображаем сообщения из состояния */}
        {messages.map(msg => (
          
          <MessageCard key={msg.id} sender={msg.author} text={msg.text} />
        ))}

        {/* Передаем функцию отправки в компонент ввода */}
        <MessageInput onSend={handleSendMessage} />

      </div>
    </>
  );
}

export default ChatPage;