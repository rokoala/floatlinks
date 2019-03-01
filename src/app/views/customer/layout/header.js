import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
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

const Header = ({ customerName, serviceProviderName }) => (
  <StyledHeader>
    <LetterAvatar onClick={onClickGo('/profile')} word={customerName} />
    <Title onClick={onClickGo('/')}>{serviceProviderName}</Title>
    <UserHeader>
      <Logout />
    </UserHeader>
  </StyledHeader>
);

const mapStateToProps = store => ({
  customerName: store.customer.name,
  serviceProviderName: store.serviceProvider.name
});

export default connect(mapStateToProps)(Header);
