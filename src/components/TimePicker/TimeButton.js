import React, { PureComponent } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  selected: {
    color: 'blue',
    borderColor: 'blue',
    cursor: 'default'
  }
};

class TimeButton extends PureComponent {
  constructor(props) {
    super(props);

    this.handleOnClick = this.handleOnClick.bind(this);
  }
  handleOnClick(time) {
    this.props.onClick(time);
  }
  render() {
    const { time, selected, classes } = this.props;

    return (
      <Button
        onClick={this.handleOnClick.bind(this, time)}
        key={time.id}
        disabled={!time.available}
        classes={selected && { root: classes.selected }}
        style={{ margin: 5 }}
        variant="outlined"
        size="small"
      >
        {time.label}
      </Button>
    );
  }
}

export default withStyles(styles)(TimeButton);
