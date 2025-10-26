import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import Card from './components/Card';

import { login as apiLogin } from './api/authService';
import { useAuth } from './context/AuthContext';

function EnterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Пожалуйста, введите email и пароль.');
      return;
    }
    setError('');

    try {
      const data = await apiLogin(email, password);

      auth.login({ token: data.token, email: email });
      
      navigate('/tables');

    } catch (err) {
      setError('Неверный email или пароль. Попробуйте снова.');
    }
  };

  return (
    <>
      <TopBar title="Вход" />
      <div className="main-block">
        <Card className="content-card">
          <h3 className="dark-text">Введите ваши данные:</h3>
          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
          <input
            type="email"
            placeholder="Email"
            className="control-element"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            className="control-element"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Card>

        <Card className="header-card">
          <h1 className="bright-text" style={{ fontSize: '28px' }}>Вход</h1>
          <p className="bright-text">Для входа введите ваши данные, либо зарегестрируйтесь.</p>
        </Card>

        <Card className="content-card">
          <div className="control-block">
            <button onClick={handleSubmit} className="control-element">Войти</button>
            {/*<button className="control-element">Регистрация</button>*/}
          </div>
        </Card>
      </div>
    </>
  );
}

export default EnterPage;
