import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, IconButton } from '@material-ui/core';

const LetterAvattar = ({ onClick, word }) => (
  <IconButton onClick={onClick}>
    <Avatar>{word.charAt(0)}</Avatar>
  </IconButton>
);

LetterAvattar.propTypes = {
  onClick: PropTypes.func,
  word: PropTypes.string.isRequired
};

export default LetterAvattar;
