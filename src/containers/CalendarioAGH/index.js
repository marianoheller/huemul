import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import EventForm from '../../components/EditForms/EventForm';
import Calendar from '../../components/Calendar';
import * as actions from '../../actions/calendarioAGH';
import * as SC from './StyledComponents';


class CalendarioAGH extends React.Component {
  constructor() {
    super();

    this.state = {
      selectedEvent: null,
    };
    this.openTrabajoModal = this.openTrabajoModal.bind(this);
    this.closeTrabajoModal = this.closeTrabajoModal.bind(this);
  }

  componentDidMount() {
    const { getData } = this.props;
    getData();
  }

  openTrabajoModal(trabajoId) {
    const { events } = this.props;
    const trabajo = events.find(e => e.resource.id === trabajoId);
    this.setState({
      selectedEvent: trabajo || null,
    });
  }

  closeTrabajoModal() {
    this.setState({
      selectedEvent: null,
    });
  }

  render() {
    const { selectedEvent } = this.state;
    const {
      events, isFetching, error, filter, setFilter,
    } = this.props;
    return (
      <SC.CSAContainer>
        <SC.Title>Calendario AGH</SC.Title>
        <Calendar
          spinnerMessage="Cargando calendario..."
          events={events}
          isFetching={isFetching}
          error={error}
          filter={filter}
          viewTrabajo={this.openTrabajoModal}
          setFilter={setFilter}
          hasFilter
        />

        <SC.StyledModal
          isOpen={!!selectedEvent}
          onRequestClose={this.closeTrabajoModal}
        >
          <EventForm
            {...selectedEvent}
            onCancel={this.closeTrabajoModal}
          />
        </SC.StyledModal>
      </SC.CSAContainer>
    );
  }
}


CalendarioAGH.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    allDay: PropTypes.bool,
    resource: PropTypes.shape({
      id: PropTypes.string,
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
  setFilter: PropTypes.func,
};

CalendarioAGH.defaultProps = {
  events: [],
  isFetching: false,
  error: '',
  filter: '',
  getData: () => {},
  setFilter: () => {},
};


const mapStateToProps = ({ calendarioAGH }) => ({
  errors: calendarioAGH.errors,
  isFetching: calendarioAGH.isFetching,
  events: calendarioAGH.events,
  filter: calendarioAGH.filter,
});


const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(actions.CSACalendar.request()),
  setFilter: filter => dispatch(actions.CSASetFilter(filter)),
});


export default connect(mapStateToProps, mapDispatchToProps)(CalendarioAGH);
