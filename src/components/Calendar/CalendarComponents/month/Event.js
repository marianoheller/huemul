import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/**
 * TODO: Estaria bueno que si el evento esta offRange aparezca greyed out.
 * El problema es que en las props del event no veo forma de saber si el event esta offRange o no.
 */

const EventWrapper = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  text-align: center;
  
  border-radius: 5px;
  background-color: ${props => props.theme.palette.eventScale(props.type) || 'black'};
  padding: 0 1rem;
  border: 1px solid ${props => props.theme.palette.secondary[700]};
`;

export default function Event(props) {
  const { title } = props;
  return (
    <EventWrapper type={props.event.resource.type}>
      {title}
    </EventWrapper>
  );
}


Event.propTypes = {
  title: PropTypes.string,
  event: PropTypes.shape({
    resource: PropTypes.shape({
      type: PropTypes.string,
    }),
  }),
};

Event.defaultProps = {
  title: '',
  event: {
    resource: {
      type: '',
    },
  },
};
