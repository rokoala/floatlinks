import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AlarmIcon from '@material-ui/icons/Alarm';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const ScheduleButton = ({ classes, redirect }) => (
  <Button
    className={classes.button}
    component={Link}
    to={redirect}
    variant="outlined"
    color="primary"
    size="large"
  >
    <AlarmIcon className={classes.icon} />
    agendar
  </Button>
);

ScheduleButton.propTypes = {
  redirect: PropTypes.string.isRequired
};

export default withStyles({
  button: {
    margin: 5
  },
  icon: {
    marginRight: 10
  }
})(ScheduleButton);
