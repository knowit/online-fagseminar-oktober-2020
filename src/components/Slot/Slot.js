import React from 'react';
import PropTypes from 'prop-types';
import EntriesSlot from './EntriesSlot';
import OtherSlot from './OtherSlot';

const Slot = ({ collection }) => {
  console.log(collection);
  if (!collection) {
    return null;
  } else if (collection.type === 'talk') {
    return <EntriesSlot collection={collection} />;
  }
  return <OtherSlot collection={collection} />;
};

Slot.propTypes = {
  collection: PropTypes.object,
};

export default Slot;
