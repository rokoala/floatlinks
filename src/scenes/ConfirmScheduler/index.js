import React, { PureComponent } from 'react';
import { Typography, Button, Card } from '@material-ui/core';
import Layout from '../Layout';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/Formatter';
import { connect } from 'react-redux';

class ConfirmScheduler extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <Layout>
        <Typography variant="h6">Confirmar agendamento</Typography>
        <Card style={{ margin: 5, padding: 35, textAlign: 'center' }}>
          <Typography variant="h5">{formatDate(this.props.date)}</Typography>
          <Typography variant="h5">
            {this.props.hour && this.props.hour.label}
          </Typography>
        </Card>
        <div style={{ marginTop: 15 }}>
          <Button
            style={{ margin: 5 }}
            component={Link}
            to="/"
            variant="contained"
            color="primary"
          >
            confirmo
          </Button>
          <Button
            style={{ margin: 5 }}
            component={Link}
            to="/"
            variant="outlined"
          >
            cancelar
          </Button>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = store => ({
  date: store.schedule.current.date,
  hour: store.schedule.current.hour
});

export default connect(mapStateToProps)(ConfirmScheduler);
