import React, { PureComponent } from 'react';
import { Avatar, Typography, IconButton } from '@material-ui/core';
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

    return (
      <div className="layout">
        <header>
          <ProfileIconButton />
          <Typography className="professional-name" variant="h6">
            {professional.name}
          </Typography>
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
