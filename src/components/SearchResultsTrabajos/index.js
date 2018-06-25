import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SingleResult from './SingleResult';

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 2rem;
`;

export default function SearchResultsTrabajos(props) {
  const { results } = props;
  return (
    <ResultsContainer>
      {results.map(r => (
        <SingleResult key={r.id} {...r} />
      ))}
    </ResultsContainer>
  );
}

SearchResultsTrabajos.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
  })),
};

SearchResultsTrabajos.defaultProps = {
  results: [],
};
