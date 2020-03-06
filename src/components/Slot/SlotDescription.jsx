import React from 'react';
import PropTypes from 'prop-types';
import css from '@emotion/css';
import { StyledDescription } from './SlotStyles';
import Modal from '../Modal';

const SlotDescription = ({ description }) => {
  if (!description) {
    return <StyledDescription>Ingen beskrivelse</StyledDescription>;
  }
  return (
    <StyledDescription>
      <Modal buttonText="Se beskrivelse">
        <div
          css={css`
            display: inline-block;
          `}
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      </Modal>
    </StyledDescription>
  );
};

export default SlotDescription;
