import ScoreService from '../services/scoreService.js';

export const saveScore = async (req, res) => {
  try {
    const { score, userId } = req.body;
    
    if (!score || !userId) {
      return res.status(400).json({ 
        message: 'Données manquantes',
        received: { score, userId }
      });
    }

    const savedScore = await ScoreService.createScore({ score, userId });
    res.status(201).json({
      message: 'Score enregistré avec succès',
      data: savedScore
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la sauvegarde du score',
      error: error.message 
    });
  }
};

export const getTopThreeScores = async (req, res) => {
  try {
    const { userId } = req.params;
    const topScores = await ScoreService.getTopThreeScores(userId);
    res.status(200).json(topScores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await ScoreService.getLeaderboard();
    res.status(200).json({
      data: leaderboard
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Erreur lors de la récupération du leaderboard',
      error: error.message 
    });
  }
};
