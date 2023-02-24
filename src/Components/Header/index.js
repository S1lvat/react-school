import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaCircle,
  FaPowerOff,
} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';

import { Nav } from './styled';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(actions.loginFailure());
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>

      {isLoggedIn ? (
        <>
          <Link to="/" onClick={handleLogout}>
            <FaPowerOff size={24} />
          </Link>
          <FaCircle size={24} display="flex" color="#6bfc03" />
        </>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} />
        </Link>
      )}
    </Nav>
  );
}
