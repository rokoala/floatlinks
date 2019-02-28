import React from 'react';
import Header from './header';
import Content from './content';
import styled from 'styled-components';
import { history } from '../../../../store';

const Layout = styled.div`
  width: 100%;
  height: 100%;
`;

export default () => (
  <Layout>
    <Header />
    <Content />
  </Layout>
);
