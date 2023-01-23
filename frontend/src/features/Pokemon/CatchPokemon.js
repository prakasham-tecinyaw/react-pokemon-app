import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPokemon, pokemonSelector, clearState } from './PokemonSlice';
import { useNavigate  } from 'react-router-dom';
import toast from 'react-hot-toast';

const CatchPokemon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const pokemonData = useSelector(pokemonSelector);
    useEffect(() => {
        if (pokemonData.pokemon) {
            setPokemon(pokemonData.pokemon);
        }
        if (pokemonData.loading) {
            setLoading(pokemonData.loading);
        }
        if (pokemonData.error) {
            setError(pokemonData.error);
        }
    }, [pokemonData]);
    useEffect(() => {
        dispatch(getAllPokemon());
    }, [dispatch]);
    const handleClick = (id) => {
        navigate(`/pokemon/${id}`);
    }
    const handleClearState = () => {
        dispatch(clearState());
    }
    const handleError = () => {
        toast.error(error);
        handleClearState();
    }
    return (

        <section className='container flex flex-wrap justify-between items-center mx-auto'>
        <div class="px-6 py-8 mx-auto">
            <div class="sm:flex sm:items-center sm:justify-between">
                <div>
                    <h2 class="text-3xl font-bold ">Pokemon List</h2>
                </div>
            </div>

            <div class="grid gap-6 mt-16 -mx-6 sm:gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
             {pokemon.map(p => (
                <div class="px-6 py-4 transition-colors duration-200 transform bg-gray-500 rounded-lg dark:bg-gray-600">
                    <p class="text-lg font-medium text-gray-100 ">{p.name}</p>

                    <div class="mt-8 space-y-8">
                        <div class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" fill='' d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span class="mx-4 text-gray-300">{p.hp}</span>
                        </div>
                    </div>
                    <div class="mt-8 space-y-8">
                        <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                            <span class="mx-4 text-gray-300">{p.attack}</span>
                        </div>
                    </div>
                    <div class="mt-8 space-y-8">
                        <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                            <span class="mx-4 text-gray-300">{p.defense}</span>
                        </div>
                    </div>
                    <div class="mt-8 space-y-8">
                        <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                            <span class="mx-4 text-gray-300">{p.type}</span>
                        </div>
                    </div>
                    <button class="w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Get
                    </button>
                </div>
                ))}
            </div>
        </div>
    </section>
    );
}

export default CatchPokemon;