import React from 'react';
import { Typography } from '@material-ui/core';

export const msgBoxStatus = {
  SUCCESS: 0,
  ERROR: 1
};

const MsgBox = (status, text) => {
  switch (status) {
    case msgBoxStatus.SUCCESS:
      return (
        <div
          style={{
            margin: '15px',
            border: '1px solid #97b997',
            padding: '10px',
            borderRadius: '5px'
          }}
        >
          <Typography style={{ color: '#21ad21' }} variant="h6">
            {text}
          </Typography>
        </div>
      );
    case msgBoxStatus.ERROR:
      return (
        <div
          style={{
            margin: '15px',
            border: '1px solid red',
            padding: '10px',
            borderRadius: '5px'
          }}
        >
          <Typography style={{ color: 'red' }} variant="h6">
            {text}
          </Typography>
        </div>
      );
    default:
      return <span />;
  }
};

export default MsgBox;
