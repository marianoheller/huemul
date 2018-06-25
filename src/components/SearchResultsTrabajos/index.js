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

export default class SearchResultsTrabajos extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: null,
    };
    this.setActive = this.setActive.bind(this);
  }

  setActive(i) {
    return () => {
      const index = this.state.activeIndex === i ? null : i;
      this.setState({ activeIndex: index });
    };
  }

  render() {
    const { results } = this.props;
    const { activeIndex } = this.state;
    return (
      <ResultsContainer>
        {results.map((r, i) => (
          <SingleResult
            key={r.id}
            isActive={i === activeIndex}
            onClick={this.setActive(i)}
            {...r}
          />
        ))}
      </ResultsContainer>
    );
  }
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
