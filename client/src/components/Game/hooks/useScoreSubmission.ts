import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/userSlice';
import { saveScore } from '../services/scoreApi';

export const useScoreSubmission = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useSelector(selectUser);

  const submitScore = useCallback(async (score: number) => {
    if (!user.id) {
      setError('Utilisateur non authentifié');
      return;
    }

    setIsSaving(true);
    setError(null);
    
    try {
      return await saveScore(score, user.id);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erreur lors de la sauvegarde du score');
      throw error;
    } finally {
      setIsSaving(false);
    }
  }, [user.id]);

  return { submitScore, isSaving, error };
};