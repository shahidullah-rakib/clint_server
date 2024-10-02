import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/authActions';

const Registration = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      console.log('Registration Successful', userInfo);
    }
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log('password miss match');
    } else {
      dispatch(register(userName, password));
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}

      <form onSubmit={submitHandler}>
        <input
          type="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="UserName"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
