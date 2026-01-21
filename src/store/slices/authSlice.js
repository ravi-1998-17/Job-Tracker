import { createSlice } from "@reduxjs/toolkit";

const savedAuth = JSON.parse(localStorage.getItem("auth"));

const initialState = savedAuth || {
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.user = action.payload;
            state.isAuthenticated = true;
        },

        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("auth");
        }
    }
})

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;