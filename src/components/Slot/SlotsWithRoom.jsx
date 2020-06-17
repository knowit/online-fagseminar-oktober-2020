import React from 'react';
import PropTypes from 'prop-types';
import Home from '@material-ui/icons/Home';
import Person from '@material-ui/icons/Person';
import AddFavorite from '../Favorites/AddFavorite';
import {
  StyledSlotGridWrapper,
  StyledSlotGrid,
  StyledTitle,
  StyledType,
  StyledSpeakers,
  StyledFavorite,
  StyledRoom,
  StyledDuration,
  StyledTime,
  StyledUserName,
  StyledUserLabel,
  StyledRoomLabel,
  StyledRoomName,
  StyledRoomIcon,
  StyledUserIcon,
} from './SlotStyles';
import SlotSpeakers from './SlotSpeakers';
import styled from '@emotion/styled';
import groupBy from 'lodash/groupBy';
import mediaQueries from '../../util/mediaQueries';
import SlotDescription from './SlotDescription';
import spacing from '../../util/spacing';
import css from '@emotion/css';

const columnStyle = css`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 5rem auto;
`;

const StyledSlotWithRooms = styled.div`
  flex: ${p => (p.viewType === 'column' ? '1 28%' : '1')};
  width: ${p => (p.viewType === 'column' ? 28 : 100)}%;
  ${p => (p.viewType === 'column' ? columnStyle : '')} 
  @media (${mediaQueries.medium}) {
    flex: 1 100%;
    width: 100%;
  }
`;

const StyledRoomHeader = styled.h3`
  min-height: ${p => (p.viewType === 'column' ? '4rem' : 'inherit')};
  max-width: ${p => (p.viewType === 'column' ? '98%' : '100%')};
`;
const SlotsWithRoom = ({ slot, date, favorites, setFavorites, viewType }) => {
  const groupedByRoom = groupBy(slot.slots, subSlot => subSlot.room);
  const sortedRoomsByLength = Object.keys(groupedByRoom)
    .map(roomKey => {
      const sortedSlots = groupedByRoom[roomKey].sort((a, b) => {
        return (
          new Date('1970/01/01 ' + a.start) - new Date('1970/01/01 ' + b.start)
        );
      });
      return { roomKey, slots: sortedSlots };
    })
    .sort((a, b) => {
      if (a.roomKey > b.roomKey) {
        return 1;
      }
      if (a.roomKey < b.roomKey) {
        return -1;
      }
      return 0;
    });
  return (
    <>
      {sortedRoomsByLength.map((room, index) => {
        return (
          <StyledSlotWithRooms key={`room_${index}`} viewType={viewType}>
            <StyledRoomHeader viewType={viewType}>
              {room.roomKey || 'Lokasjon ukjent'}
            </StyledRoomHeader>
            {room.slots.map(subSlot => (
              <StyledSlotGridWrapper viewType={viewType}>
                <StyledType type={subSlot.type} viewType={viewType} />
                <div>
                  <StyledSlotGrid
                    type={subSlot.type}
                    viewType={viewType}
                    rowGap={!subSlot.description && !subSlot.room && '0'}>
                    <StyledTitle>
                      <b>{subSlot.title}</b>
                    </StyledTitle>
                    <StyledTime>
                      <b>{`${subSlot.start} ${
                        subSlot.end ? '-' : ''
                      } ${subSlot.end || ''}`}</b>
                    </StyledTime>
                    {subSlot.duration && (
                      <StyledDuration>
                        {subSlot.duration
                          ? `${subSlot.duration} minutter`
                          : 'Ikke oppgitt'}
                      </StyledDuration>
                    )}
                    <SlotDescription description={subSlot.description} />
                    <StyledFavorite>
                      <AddFavorite
                        title={subSlot.title}
                        startTime={subSlot.start || subSlot.time}
                        setFavorites={setFavorites}
                        favorites={favorites}
                        date={subSlot.date}
                      />
                    </StyledFavorite>
                    {subSlot.userIds && (
                      <StyledSpeakers viewType={viewType}>
                        <StyledUserIcon>
                          <Person fontSize="small" />
                        </StyledUserIcon>
                        <StyledUserLabel>Foredragsholdere</StyledUserLabel>
                        <StyledUserName>
                          <SlotSpeakers slot={subSlot} />
                        </StyledUserName>
                      </StyledSpeakers>
                    )}
                    {subSlot.room && (
                      <StyledRoom viewType={viewType}>
                        <StyledRoomIcon>
                          <Home fontSize="small" />
                        </StyledRoomIcon>
                        <StyledRoomLabel>Track:</StyledRoomLabel>
                        <StyledRoomName>{subSlot.room}</StyledRoomName>
                      </StyledRoom>
                    )}
                  </StyledSlotGrid>
                </div>
              </StyledSlotGridWrapper>
            ))}
          </StyledSlotWithRooms>
        );
      })}
    </>
  );
};

SlotsWithRoom.propTypes = {
  slot: PropTypes.object,
  viewType: PropTypes.string,
};

export default SlotsWithRoom;
