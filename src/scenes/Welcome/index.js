import React, { PureComponent } from 'react';
import {
  Typography,
  Card,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import DeleteRounded from '@material-ui/icons/DeleteRounded';
import AlarmIcon from '@material-ui/icons/Alarm';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from '../Layout';
import './Welcome.css';

class Welcome extends PureComponent {
  componentDidMount() {
    // chamada API REST: getSchedule
  }
  render() {
    const scheduleList = this.props.schedules.map(item => (
      <ListItem key={item._id}>
        <ListItemText primary={item.nome} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete">
            <DeleteRounded />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));
    return (
      <Layout>
        <Button
          style={{ marginTop: 5 }}
          component={Link}
          to="/schedule/day"
          variant="outlined"
          color="primary"
          size="large"
        >
          <AlarmIcon style={{ marginRight: 5 }} />
          agendar
        </Button>
        <Card style={{ margin: 15, padding: 25 }}>
          <Typography variant="subtitle1">
            <List dense={false}>{scheduleList}</List>
          </Typography>
        </Card>
      </Layout>
    );
  }
}

const mapStateToProps = store => ({
  schedules: store.schedule.list
});

export default connect(mapStateToProps)(Welcome);
