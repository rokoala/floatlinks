import React from 'react';
import { Typography } from '@material-ui/core';

import './style.css';

const Legend = () => (
  <ul className="legend">
    <li>
      <div className="circle available" />
      <Typography variant="caption">Disponível</Typography>
    </li>
    <li>
      <div className="circle unavailable" />
      <Typography variant="caption">Indisponível</Typography>
    </li>
  </ul>
);

export default Legend;
