import React from 'react'
import {Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import { logoutUser, userSelector, clearState } from '../features/User/UserSlice';
const Navbar = () => {
  const user = useSelector(userSelector);

  // check if user is authenticated
  const isAuthenticated = user.access && user.refresh ? true : false;
  return (
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-800 w-full ">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
        {isAuthenticated ? (
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Pokemon</span>
          ) : (
            <Link to="/">
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Pokemon</span>
            </Link>
            )}
        <button data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
          <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        {isAuthenticated ? (
          <>
          <li>
            <Link to="/all_pokemon" className="block md:inline-block text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-700 dark:focus:ring-2 dark:focus:ring-gray-600 focus:ring-2 focus:ring-gray-600 focus:outline-none">
              Catch Pokemon
            </Link>
          </li>
          <li>
            <Link to="/my_pokemon" className="block md:inline-block text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-700 dark:focus:ring-2 dark:focus:ring-gray-600 focus:ring-2 focus:ring-gray-600 focus:outline-none">
              My Pokemon
            </Link>
          </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup" className="block md:inline-block text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-700 dark:focus:ring-2 dark:focus:ring-gray-600 focus:ring-2 focus:ring-gray-600 focus:outline-none">
                Signup
              </Link>
            </li>
          </>
        )}
        </ul>
        </div>
        </div>
      </nav>
  )
}

export default Navbar