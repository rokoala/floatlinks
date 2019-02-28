import React from 'react';
import styled from 'styled-components';
import { LetterAvatar, Logout, Title } from '../../../components/customer';
import { onClickGo } from '../../../utils';

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  background-color: white;
  box-shadow: 1px 1px 1px lightgray;
`;

const UserHeader = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

const Header = () => (
  <StyledHeader>
    <LetterAvatar onClick={onClickGo('/profile')} word="Hello" />
    <Title onClick={onClickGo('/')}>Hello world</Title>
    <UserHeader>
      <Logout />
    </UserHeader>
  </StyledHeader>
);

export default Header;
