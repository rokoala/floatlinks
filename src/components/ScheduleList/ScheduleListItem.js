import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeSchedule } from '../../actions';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import DeleteRounded from '@material-ui/icons/DeleteRounded';

const ScheduleListItem = ({ item, removeSchedule }) => (
  <ListItem>
    <ListItemText primary={'12 Fevereiro 2019 - 15:00 -> 16:00'} />
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
      removeSchedule
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(ScheduleListItem);
