import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import { createAppointmentLabel } from '../../../../utils';
import DeleteRounded from '@material-ui/icons/DeleteRounded';

const AppointmentItem = ({ onClick }) => (
  <ListItem>
    <ListItemText primary={createAppointmentLabel(item)} />
    <ListItemSecondaryAction>
      <IconButton onClick={onClick} aria-label="Delete">
        <DeleteRounded />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default AppointmentItem;
