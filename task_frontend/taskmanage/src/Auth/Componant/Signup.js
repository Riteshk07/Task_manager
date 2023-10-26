import {React, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
function Signup(setLoggedIn) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role:'student',
    name: '',
    email: '',
    password: '',
    conf_pw: '',
    tc:false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // If the input is a checkbox, set its value to 'checked' property
    

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.conf_pw) { // Correct the variable name
      console.error("Password and Confirm Password do not match.");
      return;
    }
    // Check if the user has accepted the terms
    if (!formData.tc) {
      alert('Please accept the Terms & Conditions');
      return;
    }
    try {
      console.log(formData)
      const response = await axios.post("/api/user/register", formData); // Correct the endpoint here
      console.log(response.data);
      const token = response.data.token; // Extract the token from the response

      localStorage.setItem('token', token); // Store the token in local storage
      // Clear form fields
      clearForm();
      setLoggedIn(true);
      // Redirect to login panel
      navigate("/home");
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };
  const clearForm = () => {
    setFormData({
      role: "",
      name: "",
      email: "",
      password: "",
      conf_pw: "",
      tc: false
    });
  };

  return (
    <form className="form_container" onSubmit={handleSubmit}>
      
      <div className="title_container">
        <p className="title">Create an Account</p>
        <span className="subtitle">Get started with our app, just create an account and enjoy the experience.</span>
      </div>
      <br />
      <div className="input_container">
        <label className="input_label" htmlFor="role_field">Role</label>
        <select
          name="role"
          id="role_field"
          className="input_field"
          onChange={handleChange}
          value={formData.role}
        >
          <option value="student">Student</option>
          <option value="professional">Professional</option>
        </select>
      </div>
      
      <div className="input_container">
        <label className="input_label" htmlFor="name_field">Name</label>
        <input
          type="text"
          name="name"
          id="name_field"
          placeholder="Your Name"
          title="Name"
          className="input_field"
          onChange={handleChange}
          value={formData.name}
        />
      </div>
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
      <div className="input_container">
        <label className="input_label" htmlFor="conf_pass">Confirm Password</label>
        <input
          type="password"
          name="conf_pw"
          id="conf_pass"
          placeholder="Confirm Password"
          title="Confirm Password"
          className="input_field"
          onChange={handleChange}
          value={formData.confirmPassword}
        />
      </div>
      <div className="input_container">
        <label className="input_label" htmlFor="accept_terms_checkbox">
          <input
            type="checkbox"
            name="tc"
            id="accept_terms_checkbox"
            onChange={handleChange}
            checked={formData.tc}
          />
          I accept the Terms & Conditions
        </label>
      </div>
      <button title="Sign Up" type="submit" className="sign-in_btn">
        <span>Sign Up</span>
      </button>
      <div className="separator">
        
        <span>If already have an account <Link to="/signin">Sign In</Link></span>

      </div>
      <p className="note">Terms of use & Conditions</p>
    </form>
  );
}

export default Signup;
