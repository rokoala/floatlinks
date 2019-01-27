import React, { PureComponent } from 'react';
import MaskedInput from 'react-text-mask';
import { Button, Input } from '@material-ui/core';
import User from '../../resources/User';
import './Login.css';
import { Redirect } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Logo from '../../components/Logo/logo.svg';

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '(',
        /[1-9]/,
        /\d/,
        ')',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

export default class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      textmask: '',
      serviceProviderName: 'consultório dra. yasmin',
      redirectToReferrer: false
    };

    this.login = this.login.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  login() {
    const phone = this.state.textmask.replace(/(\(|\)|-)/g, '');
    User.authenticate(phone, () => {
      this.setState({ redirectToReferrer: true });
    });
  }
  handleChange(event) {
    this.setState({
      textmask: event.target.value
    });
  }
  handleLogin(event) {
    event.preventDefault();
    this.login();
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer, textmask } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div className="display-flex flex-column full-w full-h">
        <header
          style={{ margin: '30px 0', flex: '0 0 50px' }}
          className="full-w display-flex flex-center"
        >
          <img src={Logo} alt="Floatlinks" />
        </header>
        <div
          style={{ flex: 1 }}
          className="display-flex flex-column align-center flex-center"
        >
          <Typography
            style={{
              color: 'dodgerblue',
              marginBottom: 10,
              textAlign: 'center',
              textTransform: 'capitalize'
            }}
            variant="h5"
          >
            {this.state.serviceProviderName}
          </Typography>
          <Typography style={{ margin: 25 }} variant="subtitle1">
            Digite seu telefone para continuar
          </Typography>
          <form
            onSubmit={this.handleLogin}
            className="login-form display-flex flex-column"
          >
            <Input
              autoFocus
              value={textmask}
              inputComponent={TextMaskCustom}
              onChange={this.handleChange}
            />
            <Button
              onClick={this.handleLogin}
              variant="outlined"
              color="primary"
              size="medium"
            >
              Ok
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
