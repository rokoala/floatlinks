import React, { PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Login.css';

export default class Login extends PureComponent {
  render() {
    return (
      <div className="full-w full-h display-flex flex-column flex-center">
        <form className="login-form display-flex flex-column">
          <TextField
            id="outlined-name"
            label="Nome"
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="outlined-name"
            label="Phone number"
            margin="normal"
            variant="outlined"
          />
          <Button variant="outlined" color="primary" size="medium">
            Ok
          </Button>
        </form>
      </div>
    );
  }
}
