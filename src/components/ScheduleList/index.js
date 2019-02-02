import React from 'react';
import { connect } from 'react-redux';
import { Card, List, Typography } from '@material-ui/core';
import ScheduleListItem from './ScheduleListItem';

const ScheduleList = ({ schedules = [] }) => (
  <React.Fragment>
    <Typography style={{ margin: 15 }} variant="h6">
      Horários Agendados
    </Typography>
    <Card style={{ margin: 5, padding: 10 }}>
      <List dense={false}>
        {schedules.map(schedule => (
          <ScheduleListItem key={schedule._id} item={schedule} />
        ))}
      </List>
    </Card>
  </React.Fragment>
);

const mapStateToProps = state => ({
  schedules: state.schedule.list
});

export default connect(mapStateToProps)(ScheduleList);
