import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';


const StyledDrawer = styled(Drawer)`
  z-index: ${props => props.theme.zIndex.appBar - 1} !important;

  & > div:last-child {
    position: relative;
    width: 250px !important;
    max-width: 250px;
    background-color: ${props => props.theme.background.secondary};
  }
  & > div:last-child > div {
    outline: none;
  }
`;

const AppBarSpacer = styled.div`
min-height: 64px;
`;

export default function CustomDrawer(props) {
  const { onClose, isOpen, children } = props;
  return (
    <div>
      <StyledDrawer
        open={isOpen}
        onClose={onClose}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={onClose}
          onKeyDown={onClose}
        >
          <AppBarSpacer />
          {children}
        </div>
      </StyledDrawer>
    </div>
  );
}

CustomDrawer.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  children: PropTypes.node,
};

CustomDrawer.defaultProps = {
  onClose: () => {},
  isOpen: false,
  children: null,
};
