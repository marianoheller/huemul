import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import { Search } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from '@material-ui/core/Select';

import { adjustHexOpacity } from '../../utils';

const CustomFilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledInput = styled(({ hasSelect, ...rest }) => <Input {...rest} />)`
  flex: 1;
  min-width: 33%;
  padding: 0 0.5rem;
  caret-color: ${props => props.theme.palette.primary[300]};
  border-style: solid;
  border-width: 1px;
  border-color: ${props => adjustHexOpacity(props.theme.palette.primary[300], 0.5)};
  ${({ hasSelect }) => (hasSelect ? 'border-right-width: 0px' : '')}
  & input {
      color: white;
  }
`;

const StyledSearch = styled(Search)`
    stroke: ${props => adjustHexOpacity(props.theme.palette.primary[300], 0.3)};
    fill: ${props => props.theme.palette.primary[300]} !important;
`;

const StyledSelect = styled(({ hasSelect, ...rest }) => <Select {...rest} />)`
  padding-left: 0.5rem;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => adjustHexOpacity(props.theme.palette.primary[300], 0.5)};
  ${({ hasSelect }) => (hasSelect ? 'border-right-width: 0px' : '')}
  
  & select {
    color: ${props => props.theme.palette.secondary[300]};
  }
  & select > option {
    color: black;
  }
  & svg {
    color: ${props => props.theme.palette.primary[300]};
  }
`;

const AdornmentContainer = styled.div`
  display: flex;
  border-style: solid;
  border-width: 1px;
  border-color: ${props => adjustHexOpacity(props.theme.palette.primary[300], 0.5)};

  & > div {
    margin: 0;
  }
`;

export default class CustomFilter extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const { onFilterChange } = this.props;
    onFilterChange(e.target.value);
  }

  render() {
    const {
      autoFocus,
      placeholder,
      filter,
      isLoading,
      hasSelect,
      selectOptions,
      selectValue,
      handleSelectChange,
      handleCommit,
    } = this.props;

    const iconAdornment = (
      <InputAdornment position="end">
        {isLoading ?
          <IconButton
            aria-label="Loading"
          >
            <CircularProgress color="primary" size={24} />
          </IconButton>
        :
          <IconButton
            aria-label="Buscar"
            onClick={handleCommit}
            data-type="filterButton"
          >
            <StyledSearch />
          </IconButton>
        }
      </InputAdornment>
    );

    return (
      <CustomFilterWrapper>
        <StyledInput
          disableUnderline
          autoFocus={autoFocus}
          placeholder={placeholder}
          onChange={this.handleInputChange}
          onKeyDown={e => (e.keyCode === 13 ? handleCommit() : '')}
          hasSelect={hasSelect}
          value={filter}
          endAdornment={hasSelect ? undefined : iconAdornment}
          data-type="filterInput"
        />
        { hasSelect &&
        <React.Fragment>
          <StyledSelect
            native
            hasSelect={hasSelect}
            disableUnderline
            value={selectValue}
            onChange={e => handleSelectChange(e.target.value)}
          >
            {selectOptions.map(o => <option key={`select${o.value}`} value={o.value}>{o.text}</option>)}
          </StyledSelect>
          <AdornmentContainer>
            {iconAdornment}
          </AdornmentContainer>
        </React.Fragment>
        }
      </CustomFilterWrapper>
    );
  }
}

CustomFilter.propTypes = {
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
  isLoading: PropTypes.bool,
  hasSelect: PropTypes.bool,
  selectOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    text: PropTypes.string,
  })),
  selectValue: PropTypes.string,
  handleSelectChange: PropTypes.func,
  handleCommit: PropTypes.func,
};

CustomFilter.defaultProps = {
  autoFocus: false,
  placeholder: '',
  filter: '',
  onFilterChange: () => {},
  isLoading: false,
  hasSelect: false,
  selectOptions: [],
  selectValue: '',
  handleSelectChange: () => {},
  handleCommit: () => {},
};
