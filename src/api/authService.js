// --- START OF FILE apiService.js ---

const API_BASE_URL = 'http://localhost:8000';

// --- Функции аутентификации ---

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

    return await response.json();
    
  } catch (error) {
    console.error("Ошибка при выполнении запроса на вход:", error);
    throw error;
  }
}

// --- Функции чата ---

/**
 * Вспомогательная функция для получения токена из localStorage.
 * @returns {string|null}
 */
function getAuthToken() {
  return localStorage.getItem('authToken');
}

/**
 * Функция для получения сообщений с сервера.
 * @param {number} fromId - ID сообщения, начиная с которого нужно получить новые.
 * @returns {Promise<Array<object>>} - Массив сообщений.
 */
export async function getMessages(fromId = 0) {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Токен аутентификации не найден.');
    }

    const response = await fetch(`${API_BASE_URL}/chat?from_id=${fromId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при загрузке сообщений');
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка при выполнении запроса на получение сообщений:", error);
    throw error;
  }
}

/**
 * Функция для отправки нового сообщения.
 * @param {string} text - Текст сообщения.
 * @returns {Promise<object>} - Ответ сервера с id нового сообщения.
 */
export async function sendMessage(text) {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Токен аутентификации не найден.');
    }

    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Ошибка при отправке сообщения');
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка при выполнении запроса на отправку сообщения:", error);
    throw error;
  }
}