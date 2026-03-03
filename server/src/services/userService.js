import { supabase } from '../config/supabase.js';

const findById = async (userId) => {
  if (!userId) {
    throw new Error('UserId est requis');
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('id, account_name, username, created_at, updated_at')
    .eq('id', userId)
    .single();

  if (error || !user) {
    throw new Error('Utilisateur non trouvé');
  }

  return {
    id: user.id,
    accountName: user.account_name,
    username: user.username,
    createdAt: user.created_at,
    updatedAt: user.updated_at
  };
};

const UserService = {
  findById
};

export default UserService;
