import React from 'react';
import styled from '@emotion/styled';
// import OnlineSvg from './svg/online_fagseminar.svg';
import OnlinePng from './png/online_fagseminar.png';

const StyledLogoContainer = styled.div`
  img {
    width: auto;
    height: auto;
    max-width: 33vw;
    min-width: 240px;
  }
`;

const OnlineLogo = () => {
  return (
    <StyledLogoContainer>
      <img src={OnlinePng} alt="Online fagseminar logo" />
    </StyledLogoContainer>
  );
};

export default OnlineLogo;
