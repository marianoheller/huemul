import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SingleResult from './SingleResult';
import CustomPaginate from '../CustomPaginate';

const RESULTS_PER_PAGE = 10;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 2rem;
`;

const NoFoundContainer = styled.div`
  margin-top: 2rem;
  font-weight: 300;
  display: flex;
  justify-content: center;
  font-style: italic;
`;


export default class SearchResultsTrabajos extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: null,
      page: 0,
      offsetIndex: 0,
    };
    this.paginateRef = React.createRef();

    this.setActive = this.setActive.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  setActive(i) {
    return () => {
      const index = this.state.activeIndex === i ? null : i;
      this.setState({ activeIndex: index });
    };
  }


  handlePageClick(data) {
    const { selected } = data;
    const offsetIndex = Math.ceil(selected * RESULTS_PER_PAGE);

    if (selected === this.state.page) return;
    this.setState({
      offsetIndex,
      page: selected,
      activeIndex: null,
    }, () => {
      // eslint-disable-next-line react/no-find-dom-node
      const node = ReactDom.findDOMNode(this.paginateRef.current);
      window.scrollTo(0, node.offsetTop);
    });
  }


  render() {
    const { results } = this.props;
    const { activeIndex, offsetIndex, page } = this.state;
    return (
      <ResultsContainer>
        {results.slice(offsetIndex, offsetIndex + RESULTS_PER_PAGE).map((r, i) => (
          <SingleResult
            key={r.id}
            isActive={i === activeIndex}
            onClick={this.setActive(i)}
            {...r}
          />
        ))}
        { results.length ?
          <CustomPaginate
            ref={this.paginateRef}
            pageCount={Math.ceil(results.length / RESULTS_PER_PAGE)}
            onPageChange={this.handlePageClick}
            forcePage={page}
          />
          :
          <NoFoundContainer>
            No se han encontrado registros
          </NoFoundContainer>
        }
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
