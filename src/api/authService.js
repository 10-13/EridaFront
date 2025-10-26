const API_BASE_URL = 'http://localhost:8000';

/**
 * Функция для входа пользователя в систему.
 * @param {string} username - Email пользователя
 * @param {string} password - Пароль пользователя
 * @returns {Promise<object>} - Данные от сервера (токен и т.д.)
 */
export async function login(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Ошибка аутентификации');
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error("Ошибка при выполнении запроса на вход:", error);
    throw error;
  }
}