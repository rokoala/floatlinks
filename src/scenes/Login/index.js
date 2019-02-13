import React, { PureComponent } from 'react';
import MaskedInput from 'react-text-mask';
import { Typography, Button, Input } from '@material-ui/core';
import { msgBox, msgBoxStatus } from '../../utils/MsgBox';
import { Redirect } from 'react-router-dom';
import Logo from '../../components/Logo/logo.svg';
import Api from '../../resources/Api';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCustomer, authenticate } from '../../actions';
import './Login.css';

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

const parsePhone = phone => phone.replace(/(\(|\)|-)/g, '');

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      customer: null,
      phone: '',
      serviceProviderName: 'consultório dra. yasmin',
      redirectToReferrer: false,
      showSetName: false,
      showMsgBox: false,
      msgBoxStatus: null,
      msgBoxText: ''
    };

    this.login = this.login.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSetName = this.handleSetName.bind(this);
  }
  login() {
    const phone = parsePhone(this.state.phone);
    Api.login(phone, data => {
      if (data.newUser || !data.customer.name) {
        this.setState({ showSetName: true, customer: data.customer });
      } else {
        this.props.setCustomer(data.customer);
        this.props.authenticate();
        this.setState({ redirectToReferrer: true });
      }
    });
  }
  handleChangeName(event) {
    this.setState({
      name: event.target.value
    });
  }
  handleSetName() {
    Api.Customer.update(parsePhone(this.state.phone), {
      ...this.state.customer,
      name: this.state.name
    }).then(response => {
      this.props.setCustomer(response.data);
      this.props.authenticate();
      this.setState({ redirectToReferrer: true });
    });
  }
  handleChange(event) {
    this.setState({
      phone: event.target.value
    });
  }
  handleLogin(event) {
    event.preventDefault();
    /[0-9]{11}/.test(parsePhone(this.state.phone))
      ? this.login()
      : this.setState({
          showMsgBox: true,
          msgBoxStatus: msgBoxStatus.ERROR,
          msgBoxText: 'Telefone inválido'
        });
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer, phone } = this.state;

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
          {!this.state.showSetName ? (
            <React.Fragment>
              <Typography style={{ margin: 25 }} variant="subtitle1">
                Digite seu telefone para continuar
              </Typography>
              <form
                onSubmit={this.handleLogin}
                className="login-form display-flex flex-column"
              >
                <Input
                  autoFocus
                  value={phone}
                  inputComponent={TextMaskCustom}
                  onChange={this.handleChange}
                  type="tel"
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
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography style={{ margin: 25 }} variant="subtitle1">
                Olá! Como podemos te chamar?
              </Typography>
              <form
                onSubmit={this.handleSetName}
                className="login-form display-flex flex-column"
              >
                <Input autoFocus onChange={this.handleChangeName} />
                <Button
                  onClick={this.handleSetName}
                  variant="outlined"
                  color="primary"
                  size="medium"
                >
                  Ok
                </Button>
              </form>
            </React.Fragment>
          )}
          {this.state.showMsgBox &&
            msgBox(this.state.msgBoxStatus, this.state.msgBoxText)}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCustomer,
      authenticate
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Login);
