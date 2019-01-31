import React, { PureComponent } from 'react';
import { Avatar, Button, Typography, IconButton } from '@material-ui/core';
import ExitIcon from '@material-ui/icons/ExitToApp';
import { withRouter } from 'react-router-dom';
import Api from '../../resources/Api';
import './Layout.css';

export default class Layout extends PureComponent {
  render() {
    const { professional, user } = this.props;

    const IconButtonSignout = withRouter(({ history }) => (
      <IconButton
        onClick={() => {
          Api.signout(() => history.push('/'));
        }}
      >
        <ExitIcon />
      </IconButton>
    ));

    const ProfileIconButton = withRouter(({ history }) => (
      <IconButton
        onClick={event => {
          event.preventDefault();
          history.push('/profile');
        }}
      >
        <Avatar>{user.name.charAt(0)}</Avatar>
      </IconButton>
    ));

    const ServiceProviderButton = withRouter(({ history }) => (
      <Button
        onClick={event => {
          history.push('/');
        }}
        style={{ textTransform: 'none' }}
      >
        <Typography variant="h6">{professional.name}</Typography>
      </Button>
    ));

    return (
      <div className="layout">
        <header>
          <ProfileIconButton />
          <ServiceProviderButton />
          <div className="user-wrapper">
            <IconButtonSignout />
          </div>
        </header>

        <div className="flex flex-column align-items-center content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
