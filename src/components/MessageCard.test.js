import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessageCard from './MessageCard';

describe('MessageCard Component', () => {

  
  test('renders message author and text correctly', () => {
    const testMessage = {
      author: 'Алекс',
      text: 'Это тестовое сообщение.',
    };

    render(<MessageCard message={testMessage} />);

    
    expect(screen.getByText('Алекс')).toBeInTheDocument();

    
    expect(screen.getByText('Это тестовое сообщение.')).toBeInTheDocument();
  });

  
  test('renders another message correctly', () => {
    const anotherMessage = {
      author: 'Мария',
      text: 'Всем привет!',
    };

    render(<MessageCard message={anotherMessage} />);

    expect(screen.getByText('Мария')).toBeInTheDocument();
    expect(screen.getByText('Всем привет!')).toBeInTheDocument();
  });
});