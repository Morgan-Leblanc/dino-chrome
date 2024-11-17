import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const saveScore = async (score: number, userId: string) => {
  try {
    const { data } = await api.post('/scores/savescore', { score, userId });
    return data;
  } catch (error) {
    console.error('Erreur sauvegarde score:', error);
    throw error;
  }
};