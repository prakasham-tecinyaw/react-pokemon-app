import React, { useEffect,useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { signupUser, userSelector, clearState } from './UserSlice';
import { useNavigate  } from 'react-router-dom';
import toast from 'react-hot-toast';
const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    re_password: ""
  });

  const { email, name, password, re_password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // dispatch action
  const dispatch = useDispatch();
  const navigate = useNavigate ();
  // const { register, errors, handleSubmit } = useForm();
  const { isFetching, isSuccess, isError, errorMessage } = useSelector(
    userSelector
  );
  // console.log(errorMessage);
    
  const onSubmit = e => {
    e.preventDefault();
    // console.log(formData);
    dispatch(signupUser(formData));
    // dispatch(signupUser(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      // redirect to login page
      navigate('/');
    }

    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
      <div className="flex flex-col items-center justify-center w-full ">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={e => onSubmit(e)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="john@gmail.com"
              name="email"
              value={email}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="John"
              name="name"
              value={name}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline
              -none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******"
              name="password"
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="re_password">
              Re-Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="re_password"
              type="password"
              placeholder="******"
              name="re_password"
              value={re_password}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button className="dark:bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Signup
            </button>
          </div>
        </form>
      </div>
  );
};

export default Signup;
