import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type CharacterType = 'boy' | 'girl' | null; 


interface UserState {
  id: string ;
  accountName: string ;
  username: string;
  token: string,
  selectedCharacter: CharacterType;
}

const initialState: UserState = {
  id: '',
  accountName: '',
  username: '',
  token: '',
  selectedCharacter: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    setCharacter: (state, action: PayloadAction<CharacterType>) => {
      state.selectedCharacter = action.payload;
    },
    logout: () => initialState,
  },
});

export const selectUser = (state: RootState) =>  state.user;
export const selectSelectedCharacter = (state: RootState) => state.user.selectedCharacter;

export const { 
  setUser, 
  setCharacter, 
  logout 
} = userSlice.actions;

export default userSlice.reducer;