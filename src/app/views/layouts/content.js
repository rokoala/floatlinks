import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import routes from '../../routes';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = () => (
  <StyledContent>
    <Switch>
      {routes.map(route => (
        <Route key={route.path} {...route} />
      ))}
    </Switch>
  </StyledContent>
);

export default Content;
