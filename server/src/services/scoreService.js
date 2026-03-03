import { supabase } from '../config/supabase.js';

const createScore = async ({ score, userId }) => {
  const { data, error } = await supabase
    .from('scores')
    .insert({ user_id: userId, score })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};

const getTopThreeScores = async (userId) => {
  const { data, error } = await supabase
    .from('scores')
    .select('score, created_at')
    .eq('user_id', userId)
    .order('score', { ascending: false })
    .limit(3);

  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => ({
    score: row.score,
    createdAt: row.created_at
  }));
};

const getLeaderboard = async () => {
  const { data: scores, error } = await supabase
    .from('scores')
    .select(`
      score,
      created_at,
      users ( username )
    `)
    .order('score', { ascending: false })
    .limit(10);

  if (error) throw new Error(error.message);

  return (scores ?? []).map((row) => ({
    score: row.score,
    createdAt: row.created_at,
    username: row.users?.username ?? 'Unknown Player'
  }));
};

const ScoreService = {
  createScore,
  getTopThreeScores,
  getLeaderboard
};

export default ScoreService;
