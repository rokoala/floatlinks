import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import { createAppointmentLabel } from '../../../../utils';
import DeleteRounded from '@material-ui/icons/DeleteRounded';

const AppointmentItem = ({ onClick, startTime, slotDuration, date }) => (
  <ListItem>
    <ListItemText
      primary={createAppointmentLabel(date, startTime, slotDuration)}
    />
    <ListItemSecondaryAction>
      <IconButton onClick={onClick} aria-label="Delete">
        <DeleteRounded />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default AppointmentItem;
