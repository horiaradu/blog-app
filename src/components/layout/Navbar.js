import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to="/">Blog App</Link>
        <ul>
          <li>Login</li>
          <li>Logout</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
