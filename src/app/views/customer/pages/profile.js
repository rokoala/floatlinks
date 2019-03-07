import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { customerOperations } from '../../../state/ducks/customer';
import { Avatar, Button, Card, TextField, Typography } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import { withStyles } from '@material-ui/core/styles';

const formatPhone = phone =>
  phone.toString().replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1)$2-$3');

class CustomerProfile extends PureComponent {
  state = {
    name: this.props.customer.name,
    showSaveButton: false
  };
  handleChangeName = event => {
    this.setState({
      name: event.target.value,
      showSaveButton: true
    });
  };
  onSave = () => {
    const { updateCustomer, customer } = this.props;
    updateCustomer(customer.phone, {
      ...customer,
      name: this.state.name
    });
  };
  render() {
    const { classes, customer } = this.props;

    return (
      <Card className={classes.card}>
        <Avatar className={classes.avatar}>{customer.name.charAt(0)}</Avatar>
        <form className={classes.form} onSubmit={e => e.preventDefault()}>
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
        <div className={classes.phoneWrapper}>
          <PhoneIcon className={classes.phoneIcon} />
          <Typography variant="h6">{formatPhone(customer.phone)}</Typography>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = store => ({
  customer: store.customer
});

const mapDispatchToProps = {
  updateCustomer: customerOperations.updateCustomer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles({
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
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      margin: '15px 0'
    },
    phoneWrapper: {
      display: 'flex'
    },
    phoneIcon: { margin: 5, color: 'green' }
  })(CustomerProfile)
);
