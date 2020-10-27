import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { typeColors } from '../Slot/SlotStyles';
import Button from '../Button';
import css from '@emotion/css';
import spacing from '../../util/spacing';
import mediaQueries from '../../util/mediaQueries';

export const filterTypes = [
  { label: 'Felles', type: 'other' },
  { label: 'Lyntale', type: 'lightningTalk' },
  { label: 'Foredrag', type: 'talk' },
  { label: 'Workshop', type: 'workshop' },
];

const StyledFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 70%;
  justify-content: flex-start;
  grid-column-gap: ${spacing.normal};
  @media (${mediaQueries.medium}) {
    width: 100%;
    margin-top: ${spacing.large};
  }
`;

const filledFilter = type => css`
  color: white;
  background-color: ${typeColors[type]};
`;

const outlinedFilter = type => css`
  color: black;
  background-color: inherit;
`;

const getStyle = (isHover, isFocus, isActive, type) => {
  if (isHover) {
    return isActive ? outlinedFilter(type) : filledFilter(type);
  } else if (isFocus) {
    return isActive ? filledFilter(type) : outlinedFilter(type);
  }
  return isActive ? filledFilter(type) : outlinedFilter(type);
};

const filterButtonStyle = (type = 'other', isActive = false) => css`
  &,
  &:hover,
  &:focus {
    border: 2px solid ${typeColors[type]};
    font-weight: 700;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    line-height: 1.8rem;
    width: 25%;
    margin-right: 1rem;
    margin-top: 1rem;
    @media (${mediaQueries.medium}) {
      width: 35%;
    }
  }

  & {
    ${getStyle(false, false, isActive, type)};
  }

  &:focus {
    ${getStyle(false, true, isActive, type)};
  }

  &:hover {
    ${getStyle(true, false, isActive, type)};
  }
`;

const Filters = ({ activeFilters, onChangeActiveFilters }) => {
  return (
    <StyledFilters>
      {filterTypes.map(filter => (
        <Button
          key={filter.type}
          onClick={() => onChangeActiveFilters(filter.type)}
          appearance="stripped"
          css={filterButtonStyle(
            filter.type,
            activeFilters.includes(filter.type),
          )}>
          {filter.label}
        </Button>
      ))}
    </StyledFilters>
  );
};

Filters.propTypes = {
  activeFilters: PropTypes.arrayOf(PropTypes.string),
  onChangeActiveFilters: PropTypes.func.isRequired,
};

export default Filters;
