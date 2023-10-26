import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signin({ setLoggedIn }) {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/login', formData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        setLoggedIn(true);
        history('/home');
      } else {
        // Handle error, e.g., show an error message
        console.log('Signin failed');
      }
    } catch (error) {
      console.error('Error during signin:', error);
    }
  };

  return (
    <form className="form_container" onSubmit={handleSubmit}>
      <div className="title_container">
        <p className="title">Login to your Account</p>
        <span className="subtitle">Get started with our app, just create an account and enjoy the experience.</span>
      </div>
      <br />
      <div className="input_container">
        <label className="input_label" htmlFor="email_field">Email</label>
        <input
          type="text"
          name="email"
          id="email_field"
          placeholder="name@mail.com"
          title="Email"
          className="input_field"
          onChange={handleChange}
          value={formData.email}
        />
      </div>
      <div className="input_container">
        <label className="input_label" htmlFor="password_field">Password</label>
        <input
          type="password"
          name="password"
          id="password_field"
          placeholder="Password"
          title="Password"
          className="input_field"
          onChange={handleChange}
          value={formData.password}
        />
      </div>
      <button title="Sign In" type="submit" className="sign-in_btn">
        <span>Sign In</span>
      </button>
      <div className="separator">
        <span>Dont have any Account? <Link to="/signup">Sign Up</Link></span> 
      </div>
      <p className="note">Terms of use & Conditions</p>
    </form>
  );
}

export default Signin;
