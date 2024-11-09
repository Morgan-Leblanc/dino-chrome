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
    setUser: (state, action: PayloadAction<{ 
      id: string; 
      accountName: string; 
      username: string;
      bestScores: number[];
    }>) => {
      state.id = action.payload.id;
      state.accountName = action.payload.accountName;
      state.username = action.payload.username;
      state.bestScores = action.payload.bestScores;
      state.isAuthenticated = true;
    },
    setBestScores: (state, action: PayloadAction<number[]>) => {
      state.bestScores = action.payload;
    },
    clearUser: () => {
      return initialState;
    }
  },
});

export const { setUser, setBestScores, clearUser } = userSlice.actions;
export default userSlice.reducer;
