import React from 'react';
import Card from './Card';

function MessageInput() {
  return (
    <Card className="content-card fixed-bottom-card">
      <div className="control-block">
        <input type="text" placeholder="TypeMessage" className="control-element" />
        <button className="control-element" style={{ width: '40px', height: '40px' }}>
          {'>'}
        </button>
      </div>
    </Card>
  );
}

export default MessageInput;