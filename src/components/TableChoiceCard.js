import React from 'react';
import Card from './Card';

function TableChoiceCard({ title }) {
  return (
    <Card className="content-card">
      <h3 className="dark-text">{title}</h3>
      <button className="control-element">Просмотр</button>
    </Card>
  );
}

export default TableChoiceCard;