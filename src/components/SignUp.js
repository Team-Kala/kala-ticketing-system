import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div>
      <form className='signupForm'>
        <div>
          <label className='signupLabel'> First Name: </label>
          <input className='signupInput' type="text" name="name" placeholder="Enter your first name" />
        </div>
        <div>
          <label className='signupLabel'> Last Name: </label>
          <input className='signupInput' type="text" name="name" placeholder="Enter your last name" />
        </div>
        <div>
          <label className='signupLabel'> Your Email: </label>
          <input className='signupInput' type="text" name="name" placeholder="Enter your email" />
        </div>
        <div>
          <label className='signupLabel'> Password: </label>
          <input className='signupInput' type="password" name="name" placeholder="Enter your password" />
        </div>
        <div className = 'doubleBtn'>
          <Link to={'/'}>
            <button className='signupBtn'> Go Back </button>
          </Link>
          <Link to={'/feed'}>
            <button className='signupBtn'> Submit </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;