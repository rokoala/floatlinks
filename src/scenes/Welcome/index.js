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
import Layout from '../Layout';
import './Welcome.css';

export default class Welcome extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      schedule: []
    };
  }
  componentDidMount() {
    // chamada API REST: getSchedule
    this.schedule = [
      { _id: '1', nome: 'agendamento1' },
      { _id: 2, nome: 'agendamento2' }
    ];
    this.setState({
      schedule: this.schedule
    });
  }

  render() {
    const scheduleList = this.state.schedule.map(item => (
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
      <Layout {...this.props}>
        <Button
          style={{ marginTop: 5 }}
          component={Link}
          to="/schedule/day"
          variant="outlined"
          color="primary"
          size="large"
        >
          <AlarmIcon style={{ marginRight: 5 }} />
          Agendar
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
