import React, { PureComponent } from 'react';
import { TextMaskCustom, parsePhone } from '../../utils';
import Input from '@material-ui/core/Input';
import { connect } from 'react-redux';
import { Avatar, Button, TextField, withStyles } from '@material-ui/core';
import { customerOperations } from '../../state/ducks/customer';
import MsgBox, { msgBoxStatus } from './msgBox';

const style = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    fontSize: 100,
    width: 200,
    height: 200
  }
};

class AddCustomerForm extends PureComponent {
  state = {
    name: '',
    phone: '',
    showMsgBox: false,
    msgBoxStatus: null,
    msgBoxText: ''
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  handleClick = () => {
    const { addCustomer } = this.props;
    const phone = parsePhone(this.state.phone);

    /[0-9]{11}/.test(phone)
      ? addCustomer({ name: this.state.name, phone: phone })
          .then(response => {
            this.setState({
              name: '',
              phone: '',
              showMsgBox: true,
              msgBoxStatus: msgBoxStatus.SUCCESS,
              msgBoxText: 'Adicionado cliente'
            });
          })
          .catch(err => {
            this.setState({
              showMsgBox: true,
              msgBoxStatus: msgBoxStatus.ERROR,
              msgBoxText: 'Erro ao cadastrar'
            });
          })
      : this.setState({
          showMsgBox: true,
          msgBoxStatus: msgBoxStatus.ERROR,
          msgBoxText: 'Telefone inválido'
        });
  };
  render() {
    const { classes } = this.props;

    return (
      <form className={classes.form}>
        <Avatar className={classes.avatar}>{this.state.name.charAt(0)}</Avatar>
        <TextField
          label="Nome"
          value={this.state.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <Input
          type="tel"
          label="Telefone"
          value={this.state.phone}
          onChange={this.handleChange('phone')}
          margin="dense"
          inputComponent={TextMaskCustom}
        />
        <br />
        {this.state.phone.length > 0 && (
          <Button
            onClick={this.handleClick}
            variant="contained"
            color="primary"
          >
            Adicionar
          </Button>
        )}
        {this.state.showMsgBox &&
          MsgBox(this.state.msgBoxStatus, this.state.msgBoxText)}
      </form>
    );
  }
}

const mapDispatchToProps = {
  addCustomer: customerOperations.addCustomer
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(style)(AddCustomerForm));
