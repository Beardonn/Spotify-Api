import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  userName: string;
  accessToken: string;
}
const initialState: UserState = {
  userName: sessionStorage.getItem("userName") || "",
  accessToken: sessionStorage.getItem("tokenSet") || "",
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName =
        action.payload.charAt(0).toUpperCase() + action.payload.slice(1);
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setUserName, setAccessToken } = userReducer.actions;
export const selectUser = (state: RootState) => state.user.userName;

export default userReducer.reducer;
