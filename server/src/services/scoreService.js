import { supabase } from '../lib/supabase.js';

const createScore = async ({ score, userId }) => {
  const [newScore] = await supabase.insert('scores', {
    score,
    user_id: userId
  });

  return {
    id: newScore.id,
    score: newScore.score,
    userId: newScore.user_id,
    createdAt: newScore.created_at
  };
};

const getTopThreeScores = async (userId) => {
  try {
    const topScores = await supabase.select('scores', {
      select: 'score,created_at',
      user_id: `eq.${userId}`,
      order: 'score.desc,created_at.asc',
      limit: '3'
    });

    return topScores.map((entry) => ({
      score: entry.score,
      createdAt: entry.created_at
    }));
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

const getLeaderboard = async () => {
  try {
    const topScores = await supabase.select('scores', {
      select: 'score,created_at,user_id',
      order: 'score.desc,created_at.asc',
      limit: '10'
    });

    const userIds = [...new Set(topScores.map((entry) => entry.user_id).filter(Boolean))];
    const users = userIds.length > 0
      ? await supabase.select('users', {
          select: 'id,username',
          id: `in.(${userIds.map((id) => `"${id}"`).join(',')})`
        })
      : [];

    const usernamesById = new Map(users.map((user) => [user.id, user.username]));

    return topScores.map((score) => ({
      score: score.score,
      createdAt: score.created_at,
      username: usernamesById.get(score.user_id) || 'Unknown Player'
    }));
  } catch (error) {
    console.error('Error in getLeaderboard:', error);
    throw new Error(`Error fetching leaderboard: ${error.message}`);
  }
};

const ScoreService = {
  createScore,
  getTopThreeScores,
  getLeaderboard
};

export default ScoreService; 
