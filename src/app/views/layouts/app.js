import React from 'react';
import Header from './header';
import Content from './content';
import styled from 'styled-components';

const Layout = styled.div`
  width: 100%;
  height: 100%;
`;

const App = () => (
  <Layout>
    <Header />
    <Content />
  </Layout>
);

export default App;
