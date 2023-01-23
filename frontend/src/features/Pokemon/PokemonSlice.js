import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// pokemonSlice
// get all pokemon from api and display them
export const getAllPokemon = createAsyncThunk(
    "pokemon/getAllPokemon",
    async (thunkAPI) => {
        try {
            const access = localStorage.getItem("access")
            const response = await fetch(
                "http://localhost:8000/api/pokemon/allpokemon/",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "JWT " + access,
                    },
                }
            )
            let data = await response.json()
            // console.log(response.status)
            if (response.status === 200) {
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

export const getMyPokemon = createAsyncThunk(
    "pokemon/getMyPokemon",
    async (thunkAPI) => {
        try {
            const access = localStorage.getItem("access")
            const response = await fetch(
                "http://localhost:8000/api/pokemon/mypokemon/",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "JWT " + access,
                    },
                }
            )
            let data = await response.json()
            // console.log(response.status)
            if (response.status === 200) {
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


export const pokemonSlice = createSlice({
    name: "pokemon",
    initialState: {
        pokemon: [],
        loading: false,
        error: null,
    },
    reducers: {
        // Reducer comes here
        clearState: (state) => {
            state.loading = false;
            state.error = null;
            return state;
        }
    },
    extraReducers: {
        // Extra reducer comes here
        [getAllPokemon.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [getAllPokemon.fulfilled]: (state, action) => {
            state.pokemon = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getAllPokemon.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [getMyPokemon.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [getMyPokemon.fulfilled]: (state, action) => {
            state.pokemon = action.payload;
            state.loading = false;
            state.error = null;
        },
        [getMyPokemon.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const { clearState } = pokemonSlice.actions;

export const pokemonSelector = (state) => state.pokemon;