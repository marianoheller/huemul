import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import { Search } from '@material-ui/icons';

import * as actions from '../../actions/calendarioCSA';
import { adjustHexOpacity } from '../../utils';


const StyledInput = styled(Input)`
    padding: 0 0.5rem;
    caret-color: ${props => props.theme.palette.primary[300]};
    
    & input {
        color: white;
    }
`;

const StyledSearch = styled(Search)`
    stroke: ${props => adjustHexOpacity(props.theme.palette.primary[300], 0.3)};
    fill: ${props => props.theme.palette.primary[300]} !important;
`;


class LegFilter extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const { setFilter } = this.props;
    setFilter(e.target.value);
  }

  render() {
    const { filter } = this.props;

    return (
      <StyledInput
        disableUnderline
        placeholder="Nº Legajo"
        onChange={this.handleInputChange}
        value={filter}
        endAdornment={
          <InputAdornment position="end">
            <StyledSearch />
          </InputAdornment>
        }
      />
    );
  }
}

LegFilter.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func,
};

LegFilter.defaultProps = {
  filter: '',
  setFilter: () => {},
};


const mapStateToProps = ({ calendarioCSA }) => ({
  filter: calendarioCSA.filter,
});


const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch(actions.CSASetFilter(filter)),
});


export default connect(mapStateToProps, mapDispatchToProps)(LegFilter);
