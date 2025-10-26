// src/App.js
import React from 'react';
// Добавляем импорт Navigate
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// ... импорты ваших страниц ...
import EnterPage from './EnterPage';
import TablesPage from './TablesPage';
import ChatPage from './ChatPage';
import ErrorPage from './ErrorPage';

import './styles.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<EnterPage />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/chat" element={<ChatPage />} />
          
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;