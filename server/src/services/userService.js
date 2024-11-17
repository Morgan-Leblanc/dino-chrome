import User from '../models/UserModel.js';

const findById = async (userId) => {
  if (!userId) {
    throw new Error('UserId est requis');
  }
  
  const user = await User.findById(userId).select('-password');
  
  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }
  
  return user;
};

const UserService = {
  findById
};

export default UserService;
