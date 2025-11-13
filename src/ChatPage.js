// --- START OF FILE ChatPage.js ---

import React, { useState, useEffect, useCallback, useRef } from 'react';
import TopBar from './components/TopBar';
import Card from './components/Card';
import MessageCard from './components/MessageCard';
import MessageInput from './components/MessageInput';
import { getMessages, sendMessage } from './api/authService'; // Укажите правильный путь к сервису

function ChatPage() {
  // Состояние для хранения сообщений
  const [messages, setMessages] = useState([]);
  // Состояние для отслеживания ошибок
  const [error, setError] = useState(null);
  
  // useRef для хранения ID последнего сообщения, чтобы не вызывать лишних перерисовок
  const lastMessageId = useRef(0);

  // Функция для загрузки НОВЫХ сообщений
  const fetchNewMessages = useCallback(async () => {
    try {
      const newMessages = await getMessages(lastMessageId.current);
      if (newMessages && newMessages.length > 0) {
        // Находим максимальный ID среди новых сообщений
        const maxId = Math.max(...newMessages.map(m => m.id));
        lastMessageId.current = maxId;
        
        // Добавляем новые сообщения к существующим
        setMessages(prevMessages => [...prevMessages, ...newMessages]);
      }
    } catch (err) {
      setError('Не удалось загрузить сообщения. Попробуйте обновить страницу.');
      console.error(err);
    }
  }, []);

  // Первичная загрузка и установка интервала для опроса
  useEffect(() => {
    // Загружаем сообщения в первый раз
    fetchNewMessages();

    // Устанавливаем интервал для опроса сервера каждые 3 секунды
    const intervalId = setInterval(fetchNewMessages, 3000);

    // Очищаем интервал при размонтировании компонента, чтобы избежать утечек памяти
    return () => clearInterval(intervalId);
  }, [fetchNewMessages]);


  // Функция для отправки сообщения
  const handleSendMessage = async (text) => {
    try {
      await sendMessage(text);
      // После успешной отправки сразу же запрашиваем новые сообщения,
      // чтобы увидеть отправленное сообщение и другие возможные обновления
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
          // Важно: передаем msg.author в prop `sender`, как и договаривались
          <MessageCard key={msg.id} sender={msg.author} text={msg.text} />
        ))}

        {/* Передаем функцию отправки в компонент ввода */}
        <MessageInput onSend={handleSendMessage} />

      </div>
    </>
  );
}

export default ChatPage;