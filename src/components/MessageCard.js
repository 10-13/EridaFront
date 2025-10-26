import React from 'react';
import Card from './Card';

function MessageCard({ sender, text }) {
  return (
    <Card className="content-card">
      <h3 className="dark-text">{sender}</h3>
      <p className="dark-text" style={{ fontWeight: 'normal' }}>{text}</p>
    </Card>
  );
}

export default MessageCard;