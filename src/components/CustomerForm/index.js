import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Avatar, Button, TextField, withStyles } from '@material-ui/core';
import { msgBox, msgBoxStatus } from './MsgBox';
import Api from '../../resources/Api';
import { bindActionCreators } from 'redux';

const style = theme => ({
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
});

class CustomerForm extends PureComponent {
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
  handleClick = event => {
    Api.Customer.add({ name: this.state.name, phone: this.state.phone })
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
        <TextField
          label="Telefone"
          value={this.state.phone}
          type="number"
          onChange={this.handleChange('phone')}
          margin="normal"
        />
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
          msgBox(this.state.msgBoxStatus, this.state.msgBoxText)}
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(withStyles(style)(CustomerForm));
