import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const LabelWrapper = styled.div`
  font-weight: 300;
  color: ${props => props.theme.palette.secondary[300]};
`;


export default function Header(props) {
  return <LabelWrapper>{props.label}</LabelWrapper>;
}


Header.propTypes = {
  label: PropTypes.string,
};

Header.defaultProps = {
  label: '',
};
