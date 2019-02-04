import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import DeleteRounded from '@material-ui/icons/DeleteRounded';

const ScheduleConfirmList = ({ confirmSchedules = [] }) => (
  <React.Fragment>
    <Typography style={{ margin: 15 }} variant="h6">
      Horários Agendados
    </Typography>
    <Card style={{ margin: 5, padding: 10 }}>
      <List dense={true}>
        {confirmSchedules.map(confirmSchedule => (
          <ListItem>
            <ListItemText primary={confirmSchedule.label} />
            <ListItemSecondaryAction>
              <IconButton onClick={evt => {}} aria-label="Send Whatsapp">
                <DeleteRounded />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Card>
  </React.Fragment>
);

const mapStateToProps = store => ({
  confirmSchedules: store.confirmSchedules
});

export default connect(mapStateToProps)(ScheduleConfirmList);
