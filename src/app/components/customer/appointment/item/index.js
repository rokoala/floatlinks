import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import { createAppointmentLabel } from '../../../../utils';
import DeleteRounded from '@material-ui/icons/DeleteRounded';

const AppointmentItem = ({
  slotId,
  onClick,
  startTime,
  slotDuration,
  date
}) => (
  <ListItem>
    <ListItemText
      primary={createAppointmentLabel(date, startTime, slotDuration)}
    />
    <ListItemSecondaryAction>
      <IconButton onClick={() => onClick(slotId)} aria-label="Delete">
        <DeleteRounded />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default AppointmentItem;
