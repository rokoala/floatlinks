import React from 'react';
import { Button } from '@material-ui/core';

const TimeButton = ({ onClick, label, ...hour }) => (
  <Button
    onClick={() => onClick(hour)}
    style={{ margin: 5 }}
    variant="outlined"
    size="small"
  >
    {label}
  </Button>
);

export default TimeButton;
