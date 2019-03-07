import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import ExitIcon from '@material-ui/icons/ExitToApp';

const Logout = ({ onClick }) => (
  <IconButton onClick={onClick}>
    <ExitIcon />
  </IconButton>
);

Logout.propTypes = {
  onClick: PropTypes.func
};

export default Logout;
