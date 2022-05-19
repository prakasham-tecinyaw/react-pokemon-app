import { createSlice } from '@reduxjs/toolkit'

// create loginslice with jwt token
const loginSlice = createSlice({
    name: 'login',
    initialState: {
        access: localStorage.getItem('access'),
        refresh: localStorage.getItem('refresh'),
        isAuthenticated: null,
        loading: false,
        error: null,
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
            state.user = action.payload.user;
        },
        logout: (state, action) => {
            state.access = null;
            state.refresh = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            state.user = null;
        }
    }
});


export const { login, logout } = loginSlice.actions;

export const selectUser = state => state.login.user;

export default loginSlice.reducer;