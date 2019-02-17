import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  state,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuthenticated ? (
          <Component {...props} {...state} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default connect(store => ({
  isAuthenticated: store.app.isAuthenticated,
}))(PrivateRoute);
