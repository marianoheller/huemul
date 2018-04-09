import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Add } from '@material-ui/icons';

import AssocTable from './AssocTable';
import InputAutocomplete from '../InputAutocomplete';


const AssocEdiTableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TableContainer = styled.div`
  margin-top: 0.75rem;
`;


class __AssocEdiTable extends React.Component {
  constructor() {
    super();

    this.state = {
      selected: '',
      inputValue: '',
    };
    this.handleSelection = this.handleSelection.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSelection(selected) {
    this.setState({
      selected,
      inputValue: selected,
    });
  }

  handleAdd() {
    const { onAdd } = this.props;
    const { selected, inputValue } = this.state;
    if (!selected.length) return;
    if (selected !== inputValue) return;
    this.setState({
      selected: '',
      inputValue: '',
    }, () => onAdd(selected));
  }

  handleInputChange(event) {
    const { value } = event.target;
    const { autocompleteProps } = this.props;
    const { items } = autocompleteProps;
    const nextState = { inputValue: value };
    if (items.includes(value)) {
      nextState.selected = value;
    }
    this.setState(nextState);
  }

  render() {
    const { assocTableProps, autocompleteProps } = this.props;
    const { selected, inputValue } = this.state;
    return (
      <AssocEdiTableContainer>
        <TableContainer>
          <AssocTable {...assocTableProps} />
        </TableContainer>
        <InputContainer>
          <InputAutocomplete
            items={autocompleteProps.items}
            inputOpts={autocompleteProps.opts}
            inputAdornment={(
              <InputAdornment position="end">
                <IconButton onClick={this.handleAdd} disabled={!selected.length}>
                  <Add color="primary" />
                </IconButton>
              </InputAdornment>
            )}
            onChange={this.handleSelection}
            inputValue={inputValue}
            onInputChange={this.handleInputChange}
            onEnter={this.handleAdd}
            selectedItem={selected}
          />
        </InputContainer>
      </AssocEdiTableContainer>
    );
  }
}


export default styled(__AssocEdiTable)``;


__AssocEdiTable.propTypes = {
  assocTableProps: PropTypes.shape({}).isRequired,
  autocompleteProps: PropTypes.shape({}).isRequired,
  onAdd: PropTypes.func.isRequired,
};
