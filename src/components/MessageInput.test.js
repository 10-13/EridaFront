import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessageInput from './MessageInput';

describe('MessageInput Component', () => {

  
  test('renders input field and send button', () => {
    render(<MessageInput onSendMessage={() => {}} />);

    
    
    expect(screen.getByPlaceholderText(/Введите сообщение/i)).toBeInTheDocument();

    
    expect(screen.getByRole('button', { name: /отправить/i })).toBeInTheDocument();
  });

  
  test('allows user to type a message', () => {
    render(<MessageInput onSendMessage={() => {}} />);
    const inputElement = screen.getByPlaceholderText(/Введите сообщение/i);

    
    fireEvent.change(inputElement, { target: { value: 'Привет, мир!' } });

    
    expect(inputElement.value).toBe('Привет, мир!');
  });

  
  test('calls onSendMessage with the message when send button is clicked', () => {
    
    const handleSendMessage = jest.fn();

    render(<MessageInput onSendMessage={handleSendMessage} />);
    const inputElement = screen.getByPlaceholderText(/Введите сообщение/i);
    const sendButton = screen.getByRole('button', { name: /отправить/i });

    
    fireEvent.change(inputElement, { target: { value: 'Тестовое сообщение' } });
    
    fireEvent.click(sendButton);

    
    expect(handleSendMessage).toHaveBeenCalledTimes(1);
    
    expect(handleSendMessage).toHaveBeenCalledWith('Тестовое сообщение');
  });

  
  test('clears the input field after sending a message', () => {
    render(<MessageInput onSendMessage={() => {}} />);
    const inputElement = screen.getByPlaceholderText(/Введите сообщение/i);
    const sendButton = screen.getByRole('button', { name: /отправить/i });

    fireEvent.change(inputElement, { target: { value: 'Скоро исчезнет' } });
    fireEvent.click(sendButton);

    
    expect(inputElement.value).toBe('');
  });
});