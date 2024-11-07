import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  accountName: string | null;
  username: string | null;
  bestScores: number[];
  isAuthenticated: boolean;
}

const initialState: UserState = {
  id: null,
  accountName: null,
  username: null,
  bestScores: [],
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ id: string; accountName: string; username: string }>) => {
      state.id = action.payload.id;
      state.accountName = action.payload.accountName;
      state.username = action.payload.username;
      state.isAuthenticated = true;
    },
    updateBestScores: (state, action: PayloadAction<number>) => {
      state.bestScores.push(action.payload);
      state.bestScores.sort((a, b) => b - a); 
      state.bestScores = state.bestScores.slice(0, 3); 
    },
    clearUser: (state) => {
      state.id = null;
      state.accountName = null;
      state.username = null;
      state.bestScores = [];
      state.isAuthenticated = false;
    }
  },
});

export const { setUser, updateBestScores, clearUser } = userSlice.actions;
export default userSlice.reducer;
