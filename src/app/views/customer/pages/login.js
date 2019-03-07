import React, { PureComponent } from 'react';
import { TextMaskCustom, parsePhone } from '../../../utils';
import { Typography, Button, Input } from '@material-ui/core';
import MsgBox, {
  msgBoxStatus
} from '../../../components/serviceProvider/msgBox';
import { loginOperations } from '../../../state/ducks/login';
import { Redirect } from 'react-router-dom';
// import Logo from '../../components/Logo/logo.svg';
import { serviceProviderOperations } from '../../../state/ducks/serviceProvider';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      customer: null,
      name: '',
      phone: '',
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
  componentDidMount() {
    const { getServiceProvider } = this.props;
    // @todo Obter outro REST que somente traz o nome do serviceProvider
    getServiceProvider();
  }
  login() {
    const { login } = this.props;
    const phone = parsePhone(this.state.phone);
    login(phone).then(response => {
      const data = response.data;
      if (data.newUser || !data.customer.name) {
        this.setState({
          showSetName: true,
          customer: data.customer,
          showMsgBox: false
        });
      } else {
        this.setState({ redirectToReferrer: true, showMsgBox: false });
      }
    });
  }
  handleChangeName(event) {
    this.setState({
      name: event.target.value
    });
  }
  handleSetName() {
    // Api.Customer.update(parsePhone(this.state.phone), {
    //   ...this.state.customer,
    //   name: this.state.name
    // }).then(response => {
    //   this.props.setCustomer(response.data);
    //   this.setState({ redirectToReferrer: true });
    // });
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
    const { classes, serviceProvider } = this.props;
    const { redirectToReferrer, phone } = this.state;

    if (redirectToReferrer) return <Redirect to={{ pathname: '/' }} />;

    return (
      <div className={classes.loginWrapper}>
        <header className={classes.header}>
          {/* <img src={Logo} alt="Floatlinks" /> */}
        </header>
        <div className={classes.loginContent}>
          <Typography className={classes.loginTitle} variant="h5">
            {serviceProvider.name}
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
              <form onSubmit={this.handleSetName} className={classes.loginForm}>
                <Input autoFocus onChange={this.handleChangeName} />
                {this.state.name.length > 0 && (
                  <Button
                    className={classes.button}
                    onClick={this.handleSetName}
                    variant="outlined"
                    color="primary"
                    size="medium"
                  >
                    Ok
                  </Button>
                )}
              </form>
            </React.Fragment>
          )}
          {this.state.showMsgBox &&
            MsgBox(this.state.msgBoxStatus, this.state.msgBoxText)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  serviceProvider: store.serviceProvider
});

const mapDispatchToProps = {
  getServiceProvider: serviceProviderOperations.get,
  login: loginOperations.login
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles({
    loginWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%'
    },
    loginTitle: {
      color: 'dodgerblue',
      marginBottom: 10,
      textAlign: 'center',
      textTransform: 'capitalize'
    },
    header: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '30px 0',
      flex: ' 0 0 50px'
    },
    loginContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    loginForm: {
      display: 'flex',
      flexDirection: 'column'
    },
    button: {
      margin: '15px'
    }
  })(Login)
);
