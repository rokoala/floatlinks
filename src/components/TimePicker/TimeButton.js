import React, { PureComponent } from 'react';
import { Button } from '@material-ui/core';

export default class TimeButton extends PureComponent {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick(time) {
    this.props.onClick(time);
  }
  render() {
    const { time, selected } = this.props;

    return (
      <Button
        onClick={this.handleOnClick.bind(this, time)}
        key={time.id}
        disabled={!time.available}
        color={selected ? 'primary' : 'default'}
        style={{ margin: 5 }}
        variant="outlined"
        size="small"
      >
        {time.label}
      </Button>
    );
  }
}
