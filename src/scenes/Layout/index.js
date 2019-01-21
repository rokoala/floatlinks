import React, { PureComponent } from 'react';
import { Typography, IconButton } from '@material-ui/core';
import ExitIcon from '@material-ui/icons/ExitToApp';
import './Layout.css';

export default class WelcomeLayout extends PureComponent {
  render() {
    const { professional, user } = this.props;
    return (
      <div className="layout">
        <header>
          <Typography className="professional-name" variant="h6">
            {professional.name}
          </Typography>
          <div className="user-wrapper">
            <Typography variant="subtitle1">{user.name}</Typography>
            <IconButton>
              <ExitIcon />
            </IconButton>
          </div>
        </header>

        <div className="flex flex-column align-items-center content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
