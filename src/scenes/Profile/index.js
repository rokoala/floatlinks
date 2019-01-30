import React, { PureComponent } from 'react';
import Api from '../../resources/Api';
import { Avatar, Button, Card, TextField, Typography } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../Layout';

const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px'
  },
  avatar: {
    margin: 20,
    width: 250,
    height: 250,
    fontSize: 100
  }
});

const formatPhone = phone =>
  phone.toString().replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1)$2-$3');

class Profile extends PureComponent {
  state = {
    name: this.props.user.name,
    showSaveButton: false
  };
  handleChangeName = event => {
    this.setState({
      name: event.target.value,
      showSaveButton: true
    });
  };
  onSave = event => {
    Api.Customer.update(this.props.user.phone, {
      ...this.props.user,
      name: this.state.name
    });
  };
  render() {
    const { classes } = this.props;

    return (
      <Layout {...this.props}>
        <Card className={classes.card}>
          <Avatar className={classes.avatar}>
            {this.props.user.name.charAt(0)}
          </Avatar>
          <form
            onSubmit={e => e.preventDefault()}
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: '15px 0'
            }}
          >
            <TextField
              label="Nome"
              value={this.state.name}
              onChange={this.handleChangeName}
              margin="normal"
            />
            {this.state.showSaveButton && (
              <Button onClick={this.onSave} variant="contained" color="primary">
                Save
              </Button>
            )}
          </form>
          <div style={{ display: 'flex' }}>
            <PhoneIcon style={{ margin: 5, color: 'green' }} />
            <Typography variant="h6">
              {formatPhone(this.props.user.phone)}
            </Typography>
          </div>
        </Card>
      </Layout>
    );
  }
}

export default withStyles(styles)(Profile);