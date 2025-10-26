// src/TablesPage.js

import React from 'react';
import TopBar from './components/TopBar';
import Card from './components/Card';
import TableChoiceCard from './components/TableChoiceCard'; // Импортируем наш новый компонент

function TablesPage() {
  const tableNames = ["Организации", "Банки", "Счета", "Услуги", "Договора"];

  return (
    <>
      {}
      <TopBar title="Таблицы" />

      <div className="main-block">
        
        {}
        <Card className="header-card">
          <h1 className="bright-text" style={{ fontSize: '28px' }}>Выберите таблицу</h1>
          <p className="bright-text" style={{ opacity: 0.8, fontSize: '16px' }}>
            Данные из таблиц впоследствии используются для формирования договоров. Модифицируя их вы можете добавлять новые пункты в редактор.
          </p>
        </Card>

        {}
        {tableNames.map(name => (
          <TableChoiceCard key={name} title={name} />
        ))}

      </div>
    </>
  );
}

export default TablesPage;