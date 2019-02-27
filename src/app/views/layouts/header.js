import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  background-color: white;
  box-shadow: 1px 1px 1px lightgray;
`;

const UserWrapper = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

const Header = () => (
  <StyledHeader>
    {/* <ProfileIconButton />
    <ServiceProviderButton /> */}
    <UserWrapper>{/* <IconButtonSignout /> */}</UserWrapper>
  </StyledHeader>
);

export default Header;
