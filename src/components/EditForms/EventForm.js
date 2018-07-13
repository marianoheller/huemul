import React from 'react';
import PropTypes from 'prop-types';

import EditForm from './EditForm';


export default class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.event.title,
      legajo: props.event.resource.legajo,
      type: props.event.resource.type,
      start: props.event.start,
      end: props.event.end,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name) {
    return (e) => {
      this.setState({ [name]: e.currentTarget.value });
    };
  }

  handleSubmit() {
    const { onSubmitEdit } = this.props;
    const {
      id,
      title,
      legajo,
      type,
      start,
      end,
    } = this.state;
    onSubmitEdit({
      id,
      title,
      legajo,
      type,
      start,
      end,
    });
  }

  render() {
    const {
      title,
      legajo,
      type,
      start,
      end,
    } = this.state;
    const { onCancel, updateStatus } = this.props;
    const textFields = [
      {
        name: 'title',
        label: 'title',
        value: title,
        onChange: this.handleChange('title'),
      },
      {
        name: 'legajo',
        label: 'Legajo',
        value: legajo,
        onChange: this.handleChange('legajo'),
      },
      {
        name: 'type',
        label: 'Tipo de actividad',
        value: type,
        onChange: this.handleChange('type'),
      },
      {
        name: 'start',
        label: 'Comienza',
        value: start,
        onChange: this.handleChange('start'),
      },
      {
        name: 'end',
        label: 'Finaliza',
        value: end,
        onChange: this.handleChange('end'),
      },
    ];
    return (
      <EditForm
        updateStatus={updateStatus}
        textFields={textFields}
        onSubmit={this.handleSubmit}
        onCancel={onCancel}
      />
    );
  }
}


EventForm.propTypes = {
  updateStatus: PropTypes.shape({
    error: PropTypes.string,
    isUpdating: PropTypes.bool,
  }),
  onSubmitEdit: PropTypes.func,
  onCancel: PropTypes.func,
  event: PropTypes.shape({
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
  }).isRequired,
};

EventForm.defaultProps = {
  updateStatus: {
    error: '',
    isUpdating: false,
  },
  onSubmitEdit: () => {},
  onCancel: () => {},
};

