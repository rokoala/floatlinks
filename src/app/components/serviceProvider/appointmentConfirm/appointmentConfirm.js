import React from 'react';
import {
  Button,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography
} from '@material-ui/core';
import { createHourLabel } from '../../../utils';
import EditIcon from '@material-ui/icons/Edit';
import StatusButton from './statusButton';
import moment from 'moment';

const AppointmentConfirm = ({ nextAppointments }) => (
  <React.Fragment>
    <Typography style={{ color: '#1e0c79de', margin: 15 }} variant="h6">
      Eventos Próximos
    </Typography>
    <Card style={{ width: '100%', padding: 10 }}>
      <List dense={true}>
        <ListItem>
          <ListItemText
            primary={
              <Typography component="span" variant="subtitle1">
                Horários
              </Typography>
            }
          />
        </ListItem>
        {nextAppointments.map(appointment => (
          <ListItem style={{ margin: '10px 0' }} key={appointment._id}>
            <Button
              style={{
                padding: '15px 3px',
                minWidth: '30px'
              }}
              size="small"
            >
              <EditIcon style={{ color: 'grey' }} />
            </Button>
            <ListItemText
              primary={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <b>{createHourLabel(appointment)}</b>
                </div>
              }
              secondary={
                <React.Fragment>
                  <Typography component="span" color="textPrimary">
                    {moment(appointment.date).calendar(null, {
                      sameDay: '[Hoje]',
                      nextDay: '[Amanhã]',
                      nextWeek: 'dddd',
                      lastDay: '[Ontem]',
                      lastWeek: '[Última] dddd',
                      sameElse: 'DD/MM/YYYY'
                    })}
                  </Typography>
                  Cliente {appointment.customer.name}
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction>
              <StatusButton status={appointment.isConfirmed} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Card>
  </React.Fragment>
);

export default AppointmentConfirm;
