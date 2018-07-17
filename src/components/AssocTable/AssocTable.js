import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import { Delete, Code } from '@material-ui/icons';
import { adjustHexOpacity, uniq } from '../../utils';


const BUTTON_ICONS = {
  delete: <Delete color="primary" />,
  default: <Code color="primary" />,
};


function __AssocTable(props) {
  if (!props.data.length) return null;
  const data = uniq(props.data);
  return (
    <div className={props.className}>
      <Table data-cy-type="assocTable">
        <TableHead>
          <TableRow>
            {props.headers.map(head => <TableCell data-cy-type="assocTableHeader" key={head.prop}>{head.text}</TableCell>)}
            {props.buttons.map((button, i) => <TableCell key={`head${button.type}${i}`} />)}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => (
            <TableRow key={n.id}>
              {props.headers.map(head => <TableCell key={head.prop}>{n[head.prop]}</TableCell>)}
              {props.buttons.map((button, i) => (
                <TableCell key={`button${button.type}${i}`}>
                  <IconButton onClick={button.handlerFactory(n.id)}>
                    {BUTTON_ICONS[button.type] || BUTTON_ICONS.default}
                  </IconButton>
                </TableCell>
              ))}
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}


export default styled(__AssocTable)`
  max-height: 300px;
  overflow-y: auto;
  overflow-x: auto;
  
  & tr {
    height: 2rem;
  }

  & thead > tr > th {
    width: ${props => `${100 / props.headers.length}%`};
    font-weight: 300;
    color: ${props => props.theme.palette.primary[300]};
    border-bottom-color: ${props => adjustHexOpacity(props.theme.palette.secondary[300], 0.4)};
  }

  & tbody > tr > td {
    font-weight: 300;
    color: white;
    border-bottom-color: ${props => adjustHexOpacity(props.theme.palette.secondary[300], 0.4)};
  }

  & tbody > tr:last-child > td {
    border-bottom-color: rgba(0,0,0,0);
  }
`;

__AssocTable.propTypes = {
  className: PropTypes.string,
  headers: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    prop: PropTypes.string,
  })),
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
  buttons: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    handlerFactory: PropTypes.func,
  })),
};

__AssocTable.defaultProps = {
  className: '',
  headers: [],
  data: [],
  buttons: [],
};
