import React from "react";
import { useSelector } from 'react-redux';
import { userSelector } from '../features/User/UserSlice';

// check user is authenticated or not
const Home = () => {
  const user = useSelector(userSelector);

  // check local storage for access and refresh token
  const access = localStorage.getItem("access");
  const refresh = localStorage.getItem("refresh");

  // check if user is authenticated
  const isAuthenticated = access && refresh ? true : false;


return (
  <div>
    <h1>Home</h1>
    <p>{isAuthenticated ? "User is logged in" : "User is not logged in"}</p>
  </div>
);
};
export default Home;
