import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

import AssocEdiTable from '../AssocTable/AssocEdiTable';
import * as Buttons from '../Buttons';

const EditFormWrapper = styled.div`
  color: ${props => props.theme.palette.primary[300]};
  font-weight: 300;
  display: flex;
  flex-direction: column;
`;


const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 2rem !important;
  margin-bottom: 1rem !important;
`;

const StatusContainer = styled.div`
  color: ${props => props.theme.status.danger[300]};
  font-size: 0.75rem;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtoneraContainer = styled.div``;

const StyledTextField = styled(TextField)`
  margin-top: 0.8rem !important
  
  & > div {
    margin-top: 0.8rem !important
  }
  
  & label {
    color: ${props => props.theme.palette.secondary[300]};
  }

  & input {
    color: ${props => props.theme.palette.secondary[200]};
  }

  & label + div::before {
    border-color: ${props => props.theme.palette.secondary[300]} !important;
    transition: border-bottom-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
  }
  & label + div::after {
    transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
  }
`;


export default function EditForm(props) {
  const {
    table, textFields, onCancel, onSubmit, autocomplete, updateStatus,
  } = props;
  return (
    <EditFormWrapper>
      {textFields.map(f => (
        <StyledTextField
          key={f.name}
          name={f.name}
          label={f.label}
          value={f.value}
          onChange={f.onChange}
          margin="normal"
        />
      ))}

      <AssocEdiTable
        assocTableProps={table}
        autocompleteProps={{
          items: autocomplete.items,
          opts: autocomplete.opts,
        }}
        onAdd={autocomplete.onAdd}
      />

      <BottomContainer>
        <StatusContainer isUpdating={updateStatus.isUpdating}>
          {updateStatus.isUpdating ?
            <CircularProgress color="primary" size={36} />
          :
            updateStatus.error
          }
        </StatusContainer>
        <ButtoneraContainer>
          <Buttons.SecondaryButton text="Cancelar" onClick={onCancel} disabled={updateStatus.isUpdating} />
          <Buttons.PrimaryButton text="Modificar" onClick={onSubmit} disabled={updateStatus.isUpdating} />
        </ButtoneraContainer>
      </BottomContainer>
    </EditFormWrapper>
  );
}


EditForm.propTypes = {
  updateStatus: PropTypes.shape({
    error: PropTypes.string,
    isUpdating: PropTypes.bool,
  }),
  table: PropTypes.shape({
    headers: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      prop: PropTypes.string,
    })),
    data: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  textFields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
  })),
  autocomplete: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    opts: PropTypes.shape({}),
    onAdd: PropTypes.func.isRequired,
  }),
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};


EditForm.defaultProps = {
  updateStatus: {
    error: '',
    isUpdating: false,
  },
  table: {
    headers: [],
    data: [],
  },
  textFields: [],
  onCancel: () => {},
  onSubmit: () => {},
  autocomplete: {
    text: '',
    name: '',
  },
};
