import UserService from '../services/userService.js';
import ScoreService from '../services/scoreService.js';

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserService.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Erreur lors de la récupération du profil", 
      error: error.message 
    });
  }
};