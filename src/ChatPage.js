import React from 'react';
import TopBar from './components/TopBar';
import Card from './components/Card';
import MessageCard from './components/MessageCard';
import MessageInput from './components/MessageInput';

function ChatPage() {
  const messages = [
    { id: 1, sender: 'Алиса', text: 'Всем привет! Как дела?' },
    { id: 2, sender: 'Иван', text: 'Привет! Всё отлично, работаем.' },
    { id: 3, sender: 'Алиса', text: 'Есть какие-нибудь новости по проекту?' },
    { id: 4, sender: 'Сергей', text: 'Да, сегодня будет совещание в 15:00.' },
    { id: 5, sender: 'Иван', text: 'Понял, спасибо!' },
    { id: 6, sender: 'Алиса', text: 'Отлично, буду на месте.' },
  ];

  return (
    <>
      <TopBar title="Чат" />
      
      {}
      <div className="main-block" style={{ gridTemplateColumns: 'auto' }}>
        
        {}
        <Card className="header-card">
          <h1 className="bright-text" style={{ fontSize: '28px' }}>Название чата</h1>
          <p className="bright-text" style={{ opacity: 0.8, fontSize: '16px' }}>
            Дополнительные сведения
          </p>
        </Card>

        {}
        {messages.map(msg => (
          <MessageCard key={msg.id} sender={msg.sender} text={msg.text} />
        ))}

        {}
        <MessageInput />

      </div>
    </>
  );
}

export default ChatPage;