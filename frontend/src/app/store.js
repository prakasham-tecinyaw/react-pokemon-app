import { configureStore } from "@reduxjs/toolkit"
import { userSlice } from "../features/User/UserSlice"
import { pokemonSlice } from "../features/Pokemon/PokemonSlice"
export default configureStore({
  reducer: {
    user: userSlice.reducer,
    pokemon: pokemonSlice.reducer,
  },
})