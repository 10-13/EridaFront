import React from 'react';

// Принимаем 'className' и 'children' как свойства (props)
function Card({ className, children }) {
  // Собираем классы: всегда будет 'card', плюс любые дополнительные, переданные извне
  const cardClassName = `card ${className || ''}`;

  return (
    <div className={cardClassName}>
      {children} {/* Здесь будет отображаться вложенное содержимое */}
    </div>
  );
}

export default Card;