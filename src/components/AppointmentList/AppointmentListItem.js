import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeSchedule } from '../../actions';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { createAppointmentLabel } from '../../resources/utils';
import DeleteRounded from '@material-ui/icons/DeleteRounded';

const AppointmentListItem = ({ item, removeSchedule }) => (
  <ListItem>
    <ListItemText primary={createAppointmentLabel(item)} />
    <ListItemSecondaryAction>
      <IconButton
        onClick={evt => {
          removeSchedule(item);
        }}
        aria-label="Delete"
      >
        <DeleteRounded />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeSchedule,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(AppointmentListItem);
