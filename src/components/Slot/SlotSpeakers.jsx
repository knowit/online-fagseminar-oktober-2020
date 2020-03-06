import React from 'react';
import Speaker from '../Speaker';
import Modal from '../Modal';

const SlotSpeakers = ({ slot }) => (
  <Modal buttonText={slot.userIds}>
    <Speaker slot={slot} />
  </Modal>
);

export default SlotSpeakers;
