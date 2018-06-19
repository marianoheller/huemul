import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Calendar from '../../components/Calendar';
import * as actions from '../../actions/calendarioCSA';
import * as SC from './StyledComponents';


class CalendarioCSA extends React.Component {
  componentDidMount() {
    const { getData } = this.props;
    getData();
  }


  render() {
    const {
      events, isFetching, error, filter,
    } = this.props;
    return (
      <SC.CSAContainer>
        <SC.Title>Calendario CSA</SC.Title>
        <Calendar
          spinnerMessage="Cargando calendario..."
          events={events}
          isFetching={isFetching}
          error={error}
          filter={filter}
          hasFilter
        />
      </SC.CSAContainer>
    );
  }
}


CalendarioCSA.propTypes = {
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
  error: PropTypes.string,
  filter: PropTypes.string,
  getData: PropTypes.func,
};

CalendarioCSA.defaultProps = {
  events: [],
  isFetching: false,
  error: '',
  filter: '',
  getData: () => {},
};


const mapStateToProps = ({ calendarioCSA }) => ({
  errors: calendarioCSA.errors,
  isFetching: calendarioCSA.isFetching,
  events: calendarioCSA.events,
  filter: calendarioCSA.filter,
});


const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(actions.CSACalendar.request()),
});


export default connect(mapStateToProps, mapDispatchToProps)(CalendarioCSA);
