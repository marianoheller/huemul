import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const DateHeaderWrapper = styled.div`
  font-weight: 300;
  /* color: ${props => (props.isToday ? 'white' : props.theme.palette.secondary[300])}; */
  color: white;
`;


export default function DateHeader(props) {
  const { isOffRange } = props;
  return (
    <DateHeaderWrapper
      isOffRange={isOffRange}
    >
      {props.label}
    </DateHeaderWrapper>
  );
}


DateHeader.propTypes = {
  label: PropTypes.string,
  isOffRange: PropTypes.bool,
};

DateHeader.defaultProps = {
  label: '',
  isOffRange: false,
};
