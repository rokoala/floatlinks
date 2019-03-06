import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Tooltip, ListItemText, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fab, faWhatsapp);

const StatusButton = ({ classes, status }) => {
  if (status) {
    return (
      <React.Fragment>
        <Button
          className={classes.confirmedButton}
          size="small"
          variant="outlined"
        >
          confirmado
        </Button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <ListItemText className={classes.notificationTitle}>
          Notificar via
        </ListItemText>
        <Tooltip title="Notificar via whatsapp">
          <IconButton onClick={() => {}}>
            <FontAwesomeIcon color="#25d366" icon={['fab', 'whatsapp']} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
};

export default withStyles({
  confirmedButton: {
    color: '#4cb97c',
    borderColor: '#54FF9F'
  },
  pendingButton: {
    color: '#e0b721',
    borderColor: '#e8e85a'
  },
  excludeButton: {
    color: 'red',
    borderColor: 'red'
  },
  notificationTitle: {
    textAlign: 'center',
    padding: 0
  }
})(StatusButton);
