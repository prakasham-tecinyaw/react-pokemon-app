import React from "react";
import { useSelector } from 'react-redux';
import { userSelector } from '../features/User/UserSlice';

const Menu = () => {
  const user = useSelector(userSelector);

  // check if user is authenticated
  const isAuthenticated = user.access && user.refresh ? true : false;
  return (
    <div>
      <h1>Home</h1>
      <p>{isAuthenticated ? "User is logged in" : "User is not logged in"}</p>
    </div>
  );
};
export default Menu;
