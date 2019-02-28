import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { TimePicker } from '../../../../components/customer/timepicker';
import { withStyles } from '@material-ui/core/styles';

const ScheduleTime = ({ classes }) => (
  <React.Fragment>
    <Typography variant="h6">Horários disponíveis</Typography>
    <Button
      className={classes.button}
      component={Link}
      to="/schedule/day"
      variant="outlined"
      color="primary"
    >
      <ArrowDownIcon fontSize="small" className={classes.icon} />
    </Button>
    <TimePicker />
  </React.Fragment>
);

export default withStyles({
  button: {
    marginTop: 5
  },
  icon: {
    marginLeft: 12
  }
})(ScheduleTime);
