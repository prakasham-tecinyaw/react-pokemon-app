import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// signup action
export const signupUser = createAsyncThunk(
  "users/signupUser",
  async ({ name, email, password, re_password }, thunkAPI) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/users/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            re_password,
          }),
        }
      )
      let data = await response.json()
      // console.log(response.status)
      if (response.status === 201) {
        localStorage.setItem("token", data.token)
        return { ...data, name: name, email: email }
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log("Error", e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)
// login action
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/jwt/create/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )
      let data = await response.json()
      // console.log(response.status)
      if (response.status === 200) {
        localStorage.setItem("access", data.access)
        localStorage.setItem("refresh", data.refresh)
        return data 
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (e) {
      console.log("Error", e.response.data)
      return thunkAPI.rejectWithValue(e.response.data)
    }
  }
)
// logout action
export const logoutUser = createAsyncThunk(
  "users/logoutUser",
  // remove token from local storage
    localStorage.removeItem("access"),
    localStorage.removeItem("refresh")
)

// userSlice
export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    errorMessage: "",
    access:localStorage.getItem("access"),
    refresh:localStorage.getItem("refresh"),
    isAuthenticated:false,
    isLoggedIn:false,
  },
  reducers: {
    // Reducer comes here
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
  },
  extraReducers: {
    // Extra reducer comes here

    // signup action fulfilled
    [signupUser.fulfilled]: (state, { payload }) => {

      state.email = payload.email;
      state.name = payload.name;
      state.isFetching = false;
      state.isSuccess = true;
    },
    // signup action pending
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    // signup action rejected
    [signupUser.rejected]: (state, { payload }) => 
    {
      state.access = null;
      state.refresh = null;
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    // login action fulfilled
    [loginUser.fulfilled]: (state, { payload }) => {
      state.access = payload.access;
      state.refresh = payload.refresh;
      state.isFetching = false;
      state.isSuccess = true;
      state.isAuthenticated = true;
      state.isLoggedIn = true;
      return state;
    },
    // login action pending
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    // login action rejected
    [loginUser.rejected]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    // logout action
    [logoutUser.fulfilled]: (state) => {
      state.isAuthenticated = false;
      state.isLoggedIn = false;
      state.access = null;
      state.refresh = null;
    },

  },
})

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;