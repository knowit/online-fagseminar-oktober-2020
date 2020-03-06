import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import { isWithinInterval, parseISO } from 'date-fns';
import styled from '@emotion/styled';
import Slot from '.';
import { getCookie, setCookie } from '../../util/cookieHelper';
import viewmodel from '../../json';
import css from '@emotion/css';
import mediaQueries from '../../util/mediaQueries';
import SlotsWithRoom from './SlotsWithRoom';

const groupSlots = {
  27: [
    { start: '14:00', end: '14:30' },
    { start: '14:30', end: '15:00' },
    { start: '15:20', end: '17:30' },
  ],
  28: [
    { start: '09:00', end: '10:30' },
    { start: '10:50', end: '11:30' },
    { start: '11:45', end: '12:15' },
  ],
};

const isTimeBetween = (time, start, end, d) => {
  const splittedStart = start.split(':');
  const startTime = new Date();
  startTime.setHours(splittedStart[0]);
  startTime.setMinutes(splittedStart[1]);

  const splittedEnd = end.split(':');
  const endTime = new Date();
  endTime.setHours(splittedEnd[0]);
  endTime.setMinutes(splittedEnd[1]);

  const timeToCheck = new Date();
  timeToCheck.setHours(time.split(':')[0]);
  timeToCheck.setMinutes(time.split(':')[1]);
  return isWithinInterval(timeToCheck, { start: startTime, end: endTime });
};

const slotsMappedByRoom = (activeDay, slots) => {
  const groups = groupSlots[activeDay.date];
  if (!groups) {
    return slots;
  }
  let newSlots = [];
  slots.forEach(slot => {
    const foundGroupStart = groups.find(
      group =>
        group.start === slot.start ||
        isTimeBetween(slot.start, group.start, group.end, slot.userIds),
    );
    const foundGroupEnd = groups.find(group => group.end === slot.end);

    if (slot.type !== 'other' && (foundGroupStart || foundGroupEnd)) {
      const start = foundGroupStart
        ? foundGroupStart.start
        : foundGroupEnd.start;
      const end = foundGroupEnd ? foundGroupEnd.end : foundGroupStart.end;
      const alreadyPushed = newSlots.find(newSlot => newSlot.start === start);

      if (alreadyPushed) {
        const alreadyPushedIndex = newSlots.findIndex(
          newSlot => newSlot.start === start,
        );
        newSlots = [
          ...newSlots.slice(0, alreadyPushedIndex),
          {
            ...newSlots[alreadyPushedIndex],
            slots: [...newSlots[alreadyPushedIndex].slots, slot],
          },
          ...newSlots.slice(alreadyPushedIndex + 1),
        ];
      } else {
        newSlots.push({
          start,
          end,
          date: slot.date,
          slots: [slot],
        });
      }
    } else {
      newSlots.push(slot);
    }
  });
  return newSlots;
};

const getColumnStyle = viewType => {
  if (viewType === 'column') {
    return css`
      align-items: stretch;
      flex-wrap: nowrap;

      & > * {
        flex: 1 28%;
        width: 28%;
      }

      @media (${mediaQueries.medium}) {
        flex-direction: column;
        & > * {
          flex: 1 100%;
          width: 100%;
        }
      }
    `;
  }
  return '';
};

const StyledSlots = styled.div`
  display: flex;
  flex-direction: ${p => (p.viewType === 'row' ? 'column' : 'row')};
  ${p => getColumnStyle(p.viewType)};
`;

const Slots = ({
  slots,
  removeFavorite,
  noGroupBy,
  viewType,
  isFavourites,
  activeDay,
}) => {
  const [favorites, setFavorites] = useState([]);

  const updateFavorites = newFavorites => {
    setCookie('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
    removeFavorite && removeFavorite(newFavorites);
  };

  useEffect(() => {
    const favoritesCookies = getCookie('favorites', document.cookie);
    const currentCookie = favoritesCookies ? JSON.parse(favoritesCookies) : [];
    setFavorites(currentCookie);
  }, []);

  if (noGroupBy) {
    return (
      <StyledSlots viewType={viewType}>
        {slots.map(slot => (
          <Slot
            key={`${slot.title}_${slot.room}`}
            slot={slot}
            setFavorites={updateFavorites}
            favorites={favorites}
            viewType={viewType}
          />
        ))}
      </StyledSlots>
    );
  }

  if (isFavourites) {
    const groupedByDate = groupBy(slots, slot => slot.date);
    return Object.keys(groupedByDate)
      .sort()
      .map(startKey => (
        <div key={startKey}>
          <h3>{viewmodel.days.find(day => day.date === startKey).label}</h3>
          <StyledSlots viewType={viewType}>
            {groupedByDate[startKey]
              .sort((a, b) => (a.start > b.start ? 1 : -1))
              .map(slot => (
                <Slot
                  key={`${slot.title}_${slot.room}`}
                  slot={slot}
                  setFavorites={updateFavorites}
                  favorites={favorites}
                  viewType={viewType}
                />
              ))}
          </StyledSlots>
        </div>
      ));
  }

  const groupedByStart = groupBy(
    slotsMappedByRoom(activeDay, slots),
    slot => slot.start,
  );
  return Object.keys(groupedByStart)
    .sort()
    .map(startKey => (
      <div key={startKey}>
        <h2>{startKey}</h2>
        <StyledSlots viewType={viewType}>
          {groupedByStart[startKey].map((slot, index) =>
            slot.slots ? (
              <SlotsWithRoom
                key={`${index}`}
                slot={slot}
                setFavorites={updateFavorites}
                favorites={favorites}
                viewType={viewType}
              />
            ) : (
              <Slot
                key={`${slot.title}_${slot.room}`}
                slot={slot}
                setFavorites={updateFavorites}
                favorites={favorites}
                viewType={viewType}
              />
            ),
          )}
        </StyledSlots>
      </div>
    ));
};

Slots.propTypes = {
  slots: PropTypes.arrayOf(PropTypes.object),
  removeFavorite: PropTypes.func,
  noGroupBy: PropTypes.bool,
  isFavourites: PropTypes.bool,
  viewType: PropTypes.string,
};

Slots.defaultProps = {
  noGroupBy: false,
  viewType: 'row',
};

export default Slots;
