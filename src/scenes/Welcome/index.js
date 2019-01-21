import React, { PureComponent } from 'react';
import { Typography, IconButton } from '@material-ui/core';
import ExitIcon from '@material-ui/icons/ExitToApp';
import Scheduler from '../../components/Scheduler';
import './Welcome.css';

export default class Welcome extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      client: {
        name: 'Consultório Dra. Yasmin'
      },
      user: {
        name: 'Joao'
      },
      schedule: null
    };
  }
  handleSelect({ date, time }) {}
  render() {
    return (
      <div className="welcome-scene">
        <header>
          <Typography className="client-name" variant="h6">
            {this.state.client.name}
          </Typography>
          <div className="user-wrapper">
            <Typography variant="subtitle1">{this.state.user.name}</Typography>
            <IconButton>
              <ExitIcon />
            </IconButton>
          </div>
        </header>
        <div className="flex flex-column align-items-center content">
          <Typography style={{ margin: '35px 0' }} variant="h5">
            Agende sua consulta
          </Typography>
          <Scheduler onSelect={this.handleSelect} />
        </div>
      </div>
    );
  }
}
