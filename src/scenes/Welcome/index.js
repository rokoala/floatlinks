import React, { PureComponent } from 'react';
import { Typography, IconButton } from '@material-ui/core';
import ExitIcon from '@material-ui/icons/ExitToApp';
import Scheduler from '../../components/Scheduler';
import './Welcome.css';

export default class Welcome extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Joao'
    };
  }
  render() {
    return (
      <div className="welcome-scene">
        <header>
          <Typography className="client-name" variant="h5">
            Lorem Ipsum
          </Typography>
          <IconButton>
            <ExitIcon />
          </IconButton>
        </header>
        <div className="flex flex-column align-items-center content">
          <Typography className="welcome" variant="h5">
            Bem vindo <br />
            <b>{this.state.name}</b>
          </Typography>
          <Typography style={{ margin: '15px 0' }} variant="h6">
            Disponibilidade
          </Typography>
          <Scheduler />
        </div>
      </div>
    );
  }
}
