import React from 'react';
import styled from '@emotion/styled';
import OnlineSvg from './svg/online_fagseminar.svg';

const StyledLogoContainer = styled.div`
  img {
    width: 30%;
  }
`;

const OnlineLogo = () => {
  return (
    <StyledLogoContainer>
      <img src={OnlineSvg} />
    </StyledLogoContainer>
  );
};

export default OnlineLogo;
