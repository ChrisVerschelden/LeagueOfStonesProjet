
const API_URL = `http://localhost:3001`;

export const getMatchmakingAvailablePlayers = async (session) => {

  const response = await fetch(`${API_URL}/matchmaking/getAll`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      "www-authenticate": session
    }
  });
  return response;
};

export const connect = async (email, password) => {

  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"email" :email, "password" : password})
  });
  return response;
};

export const register = async (name, email, password) => {

  const response = await fetch(`${API_URL}/user`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"name" :name, "email" : email, "password" : password})
  });
  return response;
};
