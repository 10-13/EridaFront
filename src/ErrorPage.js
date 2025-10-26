import React from 'react';
import TopBar from './components/TopBar';
import Card from './components/Card';

function ErrorPage() {
  return (
    <>
      {/* Используем TopBar с заголовком "Меню" */}
      <TopBar title="Меню" />

      <div className="main-block">
        
        {/* Используем Card для отображения текста ошибки */}
        <Card className="header-card">
          <h1 className="bright-text" style={{ fontSize: '60px' }}>404</h1>
          <p className="bright-text">Ваша страница не найдена</p>
        </Card>
        
      </div>
    </>
  );
}

export default ErrorPage;