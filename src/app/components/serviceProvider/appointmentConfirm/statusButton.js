import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Button, Tooltip, ListItemText, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { createHourLabel } from '../../../utils';
import moment from 'moment';

library.add(fab, faWhatsapp);

const StatusButton = ({
  appointment,
  classes,
  serviceProviderName,
  status
}) => {
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
          <IconButton
            onClick={() => {
              const url = `https://api.whatsapp.com/send?phone=55${
                appointment.customer.phone
              }&text=Ol%C3%A1%20aqui%20%C3%A9%20do%20consult%C3%B3rio%20*${serviceProviderName}*%2C%0ADeseja%20confirmar%20seu%20agendamento%20%3F%0A%0A*${moment(
                appointment.date
              )
                .format('LL')
                .toString()}*%0A*${createHourLabel(
                appointment
              )}*%0A%0AAcesse%20o%20link%20abaixo%20para%20confirmar:%0A%0Ahttp://www.google.com%0A%0AObrigado!`;
              window.open(url, '_blank');
            }}
          >
            <FontAwesomeIcon color="#25d366" icon={['fab', 'whatsapp']} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
};

const mapStateToProps = store => ({
  serviceProviderName: store.serviceProvider.name
});

export default connect(mapStateToProps)(
  withStyles({
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
  })(StatusButton)
);
