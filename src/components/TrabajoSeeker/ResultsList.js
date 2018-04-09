/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


export default function ResultsList(props) {
  return (
    <React.Fragment>
      <List>
        {props.results.map((e, i) => (
          <ListItem key={`${i}${e.descripcion}`}>
            <ListItemText primary={e.descripcion} secondary={e.legajo} />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

ResultsList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    descripcion: PropTypes.string,
    tipoActividad: PropTypes.string,
    planFijo: PropTypes.bool,
    legajo: PropTypes.string,
  })),
};

ResultsList.defaultProps = {
  results: [],
};
