import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeAppointment } from '../../actions';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { createAppointmentLabel } from '../../resources/utils';
import DeleteRounded from '@material-ui/icons/DeleteRounded';

const AppointmentListItem = ({
  serviceProviderId,
  item,
  removeAppointment,
}) => (
  <ListItem>
    <ListItemText primary={createAppointmentLabel(item)} />
    <ListItemSecondaryAction>
      <IconButton
        onClick={evt => {
          removeAppointment(serviceProviderId, item._id);
        }}
        aria-label="Delete"
      >
        <DeleteRounded />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

const mapStateToProps = store => ({
  serviceProviderId: store.serviceProvider._id,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeAppointment,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppointmentListItem);
