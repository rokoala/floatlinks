import React, { PureComponent } from 'react';
import { Avatar, Button, TextField, withStyles } from '@material-ui/core';

const style = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column'
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
    phone: ''
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
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
          <Button variant="contained" color="primary">
            Adicionar
          </Button>
        )}
      </form>
    );
  }
}

export default withStyles(style)(CustomerForm);
