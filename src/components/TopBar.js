import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DropdownMenu = ({ onClose }) => {
  return (
    <div className="dropdown-menu">
      <ul className="dropdown-menu__list">
        <li>
          <Link to="/login" className="dropdown-menu__link" onClick={onClose}>
            Вход
          </Link>
        </li>
        <li>
          <Link to="/tables" className="dropdown-menu__link" onClick={onClose}>
            Таблицы
          </Link>
        </li>
        <li>
          <Link to="/chat" className="dropdown-menu__link" onClick={onClose}>
            Чаты
          </Link>
        </li>
      </ul>
    </div>
  );
};

function TopBar({ title }) {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="top-bar">
      <div className="top-bar__left">
        <div className="menu-container" ref={menuRef}>
          <div className="menu-icon" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          {isMenuOpen && <DropdownMenu onClose={() => setIsMenuOpen(false)} />}
        </div>
        <span>{title}</span>
      </div>

      {user ? (
        <div className="control-element" style={{ width: 'auto', padding: '8px 20px', cursor: 'default' }}>
          {user.email.substring(0, 4)}
        </div>
      ) : (
        <Link to="/login" className="control-element" style={{ width: 'auto', padding: '8px 20px', textDecoration: 'none' }}>
          Войти
        </Link>
      )}
    </header>
  );
}

export default TopBar;