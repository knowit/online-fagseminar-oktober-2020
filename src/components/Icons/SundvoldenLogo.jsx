import React from 'react';
import styled from '@emotion/styled';
import SundvoldenSvg from './svg/sundvolden.svg';

const StyledLogoContainer = styled.div`
  svg {
    width: 30%;
  }
`;

const SundvoldenLogo = () => {
  return (
    <StyledLogoContainer>
      <SundvoldenSvg />
    </StyledLogoContainer>
  );
};

export default SundvoldenLogo;
