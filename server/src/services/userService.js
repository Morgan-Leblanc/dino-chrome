import { supabase } from '../lib/supabase.js';

const findById = async (userId) => {
  if (!userId) {
    throw new Error('UserId est requis');
  }

  const [user] = await supabase.select('users', {
    select: 'id,account_name,username,created_at',
    id: `eq.${userId}`,
    limit: '1'
  });

  if (!user) {
    throw new Error('Utilisateur non trouvé');
  }

  return {
    id: user.id,
    _id: user.id,
    accountName: user.account_name,
    username: user.username,
    createdAt: user.created_at
  };
};

const UserService = {
  findById
};

export default UserService;
