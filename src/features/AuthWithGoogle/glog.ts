// from login slice draamatics

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { signInAPI } from "../api/api";

// type UserProfile = {
//   uid: string;
//   email: string;
//   displayName: string;
//   photoURL: string;
// };

// type authInitialState = {
//   isLogged: boolean;
//   account: UserProfile;
// };

// const initialState: authInitialState = {
//   isLogged: false,
//   account: {} as UserProfile,
// };

// type LoginResponse = {
//   status: number;
//   message: string;
//   profile: { providerId: string; uid: string; accessToken: string } | null;
// };

// export const loginWithGoogle = createAsyncThunk(
//   "login/loginWithGoogle",
//   async () => {
//     const result = await signInAPI();
//     console.log(result);
//     return result;
//   }
// );

// export const loginSlice = createSlice({
//   name: "login",
//   initialState,
//   reducers: {
//     get: (state, action) => {},
//   },
//   extraReducers: (builder) => {
//     builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
//       const profile = {
//         uid: action.payload.profile?.uid,
//         email: action.payload.profile?.email,
//         displayName: action.payload.profile?.displayName,
//         photoURL: action.payload.profile?.photoURL,
//       };

//       //@ts-ignore
//       state.account = profile;
//       state.isLogged = true;
//     });
//   },
// });

// export const { get } = loginSlice.actions;

// export default loginSlice.reducer;
