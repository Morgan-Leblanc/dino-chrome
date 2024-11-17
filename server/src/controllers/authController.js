import AuthService from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const { accountName, username, password } = req.body;

    if (!accountName || !username || !password) {
      return res.status(400).json({ 
        error: 'Tous les champs sont requis' 
      });
    }

    const result = await AuthService.register({ 
      accountName, 
      username, 
      password 
    });

    return res.status(201).json({
      success: true,
      data: result
    });

  } catch (error) {
    return res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
};

export const login = async (req, res) => {
  try {
    const { accountName, password } = req.body;

    if (!accountName || !password) {
      return res.status(400).json({ 
        error: 'Nom de compte et mot de passe requis' 
      });
    }

    const result = await AuthService.login(accountName, password);

    return res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    return res.status(401).json({ 
      success: false,
      error: error.message 
    });
  }
};