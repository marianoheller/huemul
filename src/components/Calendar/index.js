import React from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import * as CC from './CalendarComponents';
import { SpinnerWrapper, CalendarContainer } from './StyledComponents';
import Spinner from '../Spinner';

moment.locale('es');
BigCalendar.momentLocalizer(moment);


export default function CalendarComponent(props) {
  const {
    events, error, isFetching, filter, setFilter, spinnerMessage, hasFilter,
  } = props;

  if (error) console.log('Error calendar', error);

  if (isFetching) {
    return (
      <SpinnerWrapper>
        <Spinner message={spinnerMessage || 'Loading...'} />
      </SpinnerWrapper>
    );
  }

  const filteredEvents = filter.length ? events.filter(ev =>
    ev.resource.legajo.toLowerCase().includes(filter.toLowerCase())) : events;

  const targetDate = (filter.length && filteredEvents.length) ?
    filteredEvents[0].start : new Date();

  return (
    <CalendarContainer>
      <BigCalendar
        events={filteredEvents}
        views={['month']}
        defaultDate={targetDate}
        components={{
          toolbar: iProps => (
            <CC.Toolbar hasFilter={hasFilter} setFilter={setFilter} filter={filter} {...iProps} />
          ),
          month: { ...CC.month },
        }}
      />
    </CalendarContainer>
  );
}


CalendarComponent.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    allDay: PropTypes.bool,
    resource: PropTypes.shape({
      type: PropTypes.string,
      fixed: PropTypes.bool,
      lastEvent: PropTypes.bool,
      legajo: PropTypes.string,
    }),
  })),
  isFetching: PropTypes.bool,
  hasFilter: PropTypes.bool,
  error: PropTypes.string,
  filter: PropTypes.string,
  spinnerMessage: PropTypes.string,
  setFilter: PropTypes.func,
};

CalendarComponent.defaultProps = {
  events: [],
  isFetching: false,
  hasFilter: true,
  error: '',
  filter: '',
  spinnerMessage: '',
  setFilter: () => {},
};

