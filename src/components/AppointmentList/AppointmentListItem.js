import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeAppointment } from '../../actions';
import { withRouter } from 'react-router-dom';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import { createAppointmentLabel } from '../../resources/utils';
import DeleteRounded from '@material-ui/icons/DeleteRounded';

const AppointmentListItem = ({
  serviceProviderId,
  item,
  removeAppointment,
  customerId
}) => (
  <ListItem>
    <ListItemText primary={createAppointmentLabel(item)} />
    <ListItemSecondaryAction>
      <IconButton
        onClick={evt => {
          removeAppointment(customerId, serviceProviderId, item.slotId);
        }}
        aria-label="Delete"
      >
        <DeleteRounded />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

const mapStateToProps = store => ({
  customerId: store.customer._id,
  serviceProviderId: store.serviceProvider._id
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeAppointment
    },
    dispatch
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppointmentListItem)
);
