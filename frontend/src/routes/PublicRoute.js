// /frontend/src/routes/PublicRoute.js

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={props =>
        currentUser && restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
