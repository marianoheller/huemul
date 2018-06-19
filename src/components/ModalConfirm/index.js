import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as Buttons from '../Buttons';
import * as SC from './StyledComponents';


export default function ModalConfirm(props) {
  const {
    title,
    message,
    onClose,
    onAccept,
    error,
    isLoading,
    isOpen,
  } = props;
  return (
    <SC.StyledModal
      onRequestClose={onClose}
      isOpen={isOpen}
    >
      <SC.ContentWrapper>
        <SC.Title>{title}</SC.Title>
        <SC.Message>{message}</SC.Message>
        <SC.BottomContainer>
          <SC.StatusContainer isUpdating={isLoading}>
            {isLoading ?
              <CircularProgress color="primary" size={36} />
            :
              error
            }
          </SC.StatusContainer>
          <SC.Buttonera>
            <Buttons.PrimaryButton
              text="Si"
              onClick={onAccept}
              disabled={isLoading}
            />
            <Buttons.SecondaryButton
              text="No"
              onClick={onClose}
              disabled={isLoading}
            />
          </SC.Buttonera>
        </SC.BottomContainer>
      </SC.ContentWrapper>
    </SC.StyledModal>
  );
}

ModalConfirm.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onAccept: PropTypes.func,
};

ModalConfirm.defaultProps = {
  error: '',
  title: '',
  message: '',
  isLoading: false,
  isOpen: false,
  onClose: () => {},
  onAccept: () => {},
};
