/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

import { adjustHexOpacity } from '../../utils';

const ReactPaginateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & ul {
    display: flex;
    flex-direction: row;
    list-style-type: none;
    padding: 0;
  }
  & li > a {
    padding: 0.25rem 0.5rem;
    font-weight: 300;
    color: ${props => props.theme.palette.secondary[100]};
    cursor: pointer;
    border-radius: 2px;
    border-width: 1px;
    border-style: solid;
    border-color: ${props => adjustHexOpacity(props.theme.palette.primary[300], 0.5)};
    user-select: none;
  }
  & li:not(.disabled) > a:hover, & li.selected:not(.disabled) > a {
    background-color: ${props => props.theme.palette.primary[300]};
    color: white;
  }
  & li:first-child {
    margin-right: 1rem;
  }
  & li:last-child {
    margin-left: 1rem;
  }
  & li > a:focus {
    outline: 0;
  }
  & li.disabled > a {
    cursor: default;
    border-color: ${props => adjustHexOpacity(props.theme.palette.primary[300], 0.25)};
    color: ${props => props.theme.palette.secondary[500]};
  }
  & li.break {
    margin: 0 1rem;
    color: white;
  }
`;

// Its a class component and not a function due to the need to assign a ref to it in the future
export default class CustomPaginate extends React.Component {
  render() {
    return (
      <ReactPaginateWrapper>
        <ReactPaginate
          previousLabel="Anterior"
          nextLabel="Siguiente"
          breakLabel="..."
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          {...this.props}
        />
      </ReactPaginateWrapper>
    );
  }
}
