import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import routes from '../../../routes';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = ({ match }) => (
  <StyledContent>
    <Switch>
      {routes.map(route => (
        <Route {...route} key={route.path} path={`${match.url}${route.path}`} />
      ))}
    </Switch>
  </StyledContent>
);

export default withRouter(Content);
