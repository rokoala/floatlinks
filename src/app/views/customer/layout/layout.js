import React from 'react';
import Header from './header';
import styled from 'styled-components';

const Layout = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default ({ children }) => (
  <Layout>
    <Header />
    <StyledContent>{children}</StyledContent>
  </Layout>
);
