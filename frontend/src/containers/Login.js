import React from "react";
// import { connect } from "react-redux";
// import {Link, Redirect} from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/loginSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const dispatch = useDispatch();


  const onSubmit = async e => {
    e.preventDefault();
    dispatch(login({ email, password }));
    // console.log("Login");
    //login(email, password);
  };

  // Is the user authenticated?
  // redirect to home if yes

  return (
    // tailwindcss form
    <div className="flex flex-col items-center justify-center w-full ">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={e => onSubmit(e)}>
        <div className="mb-4">
          <label 
            className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email" type="email" placeholder="John" name="email" value={email} onChange={e => onChange(e)} />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="password" placeholder="******" name="password" value={password} onChange={e => onChange(e)} />

        </div>
        <div className="flex items-center justify-center">
          <button className="dark:bg-gray-800 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Login
          </button>
          {/* <Link className="inline-block align-baseline font-bold text-sm hover:text-gray-500" to="/register">
            Register
          </Link> */}
        </div>
      </form>
    </div>

    
  );
};
export default Login;
