import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
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