import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import { navigate as NAVIGATE } from 'react-big-calendar/lib/utils/constants';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

import CustomFilter from '../../CustomFilter';
import { adjustHexOpacity } from '../../../utils';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


const ToolbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 300;
  margin: 1rem 0;
`;

const ButtonGrp = styled.div`
    display: flex;
    flex-direction: row;
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    border-color: ${props => adjustHexOpacity(props.theme.palette.primary[300], 0.2)};
    border-width: 1px;
    border-style: solid;
    border-right-width: 0px;
    background-color: ${props => props.theme.background.secondary};
`;

const FilterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    border-color: ${props => adjustHexOpacity(props.theme.palette.primary[300], 0.2)};
    border-width: 1px;
    border-style: solid;
    background-color: ${props => props.theme.background.secondary};

    margin-right: 1rem;
`;

const Label = styled.div`
    display: flex;
    flex: 1;
    justify-content: center;
    text-align: center;
    color: white;
    font-weight: 300;
    padding: 0.25rem 0.5rem;
    cursor: default;
`;

const Button = styled.div`
    display: flex;
    color:  ${props => (props.disabled ? 'grey' : 'white')};
    cursor:  ${props => (props.disabled ? 'default' : 'pointer')};
    user-select: none;
    padding: 0.25rem 0.5rem;
    justify-content: center;
    text-align: center;
    vertical-align: middle;
    background: ${props => (props.disabled ? props.theme.background.primary : 'inherit')};

    border-right-color: ${props => adjustHexOpacity(props.theme.palette.primary[300], 0.4)};
    border-right-width: 1px;
    border-right-style: solid;

    &:hover {
        background-color: ${props =>
    (props.disabled ? props.theme.background.primary : props.theme.palette.primary[300])
};
    }
`;

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleChangeView = this.handleChangeView.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleNavigation(action) {
    return () => {
      const { onNavigate, date } = this.props;
      const newDate = moment(date).add(1, 'days').toDate();
      onNavigate(action, newDate);
    };
  }

  handleChangeView(view) {
    return () => {
      const { onViewChange } = this.props;
      onViewChange(view);
    };
  }

  handleFilterChange(input) {
    if (!input || input.target) return;
    const { setFilter } = this.props;
    setFilter(input);
  }

  isToday() {
    const { date } = this.props;
    return moment().month() === moment(date).month();
  }

  render() {
    const { messages, hasFilter, filter } = this.props;
    return (
      <ToolbarWrapper>
        <Label>{capitalizeFirstLetter(this.props.label)}</Label>

        { hasFilter &&
          <FilterWrapper>
            <CustomFilter
              /* TODO: fix autofocus not working */
              autoFocus
              onFilterChange={this.handleFilterChange}
              filter={filter}
              placeholder="Legajo"
              isLoading={false}

              handleCommit={this.handleFilterChange}
            />
          </FilterWrapper>
        }

        <ButtonGrp>
          <Button
            disabled={this.isToday()}
            onClick={this.handleNavigation(NAVIGATE.TODAY)}
          >
            {messages.today}
          </Button>
          <Button onClick={this.handleNavigation(NAVIGATE.PREVIOUS)}>
            <KeyboardArrowLeft />
          </Button>
          <Button onClick={this.handleNavigation(NAVIGATE.NEXT)}>
            <KeyboardArrowRight />
          </Button>
        </ButtonGrp>
      </ToolbarWrapper>
    );
  }
}


Toolbar.propTypes = {
  label: PropTypes.string,
  messages: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ])),
  onNavigate: PropTypes.func,
  onViewChange: PropTypes.func,
  date: PropTypes.instanceOf(Date),
  hasFilter: PropTypes.bool,
  setFilter: PropTypes.func,
  filter: PropTypes.string,
};

Toolbar.defaultProps = {
  label: '',
  messages: {},
  onNavigate: () => {},
  onViewChange: () => {},
  date: {},
  filter: '',
  hasFilter: true,
  setFilter: () => {},
};


/**
{
  "date": "2018-04-23T14:02:52.677Z",
  "view": "month",
  "views": [
    "month",
    "week",
    "day",
    "agenda"
  ],
  "label": "April 2018",
  "messages": {
    "date": "Date",
    "time": "Time",
    "event": "Event",
    "allDay": "all day",
    "week": "week",
    "work_week": "work week",
    "day": "day",
    "month": "month",
    "previous": "back",
    "next": "next",
    "yesterday": "yesterday",
    "tomorrow": "tomorrow",
    "today": "today",
    "agenda": "agenda"
  },
  onNavigate: ƒ (action, newDate),
  onViewChange:ƒ (view),
}
 */
