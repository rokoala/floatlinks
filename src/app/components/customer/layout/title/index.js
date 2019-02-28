import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const Title = ({ classes, children, onClick }) => (
  <Button onClick={onClick}>
    <Typography className={classes.text} variant="h6">
      {children}
    </Typography>
  </Button>
);

Title.propTypes = {
  onClick: PropTypes.func
};

export default withStyles({
  text: {
    textTransform: 'capitalize'
  }
})(Title);
