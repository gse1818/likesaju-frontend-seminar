import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
    nickname: null,
    profilepic_id: null,
    remaining_points: null,
  },
  reducers: {
    setLoginState: (state, action) => {
      state.isLogin = action.payload;
    },
    setUserProfile: (state, action) => {
      const { nickname, profilepic_id, remaining_points } = action.payload;
      state.nickname = nickname;
      state.profilepic_id = profilepic_id;
      state.remaining_points = remaining_points;
    },
  },
});

export const { setLoginState, setUserProfile } = userSlice.actions;
export default userSlice.reducer;
