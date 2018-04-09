import React from 'react';
import Downshift from 'downshift';
import PropTypes from 'prop-types';

import * as SC from './StyledComponents';


export default function InputAutocomplete({
  items,
  onChange,
  inputAdornment,
  onInputChange,
  inputOpts,
  onEnter,
  ...rest
}) {
  return (
    <Downshift
      onChange={onChange}
      {...rest}
    >
      {({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        selectedItem,
        highlightedIndex,
      }) => (
        <div style={{ flex: '1' }}>
          <SC.StyledFormControl>
            <SC.StyledInput
              {...getInputProps({
                onChange: onInputChange,
                onKeyDown: (event) => {
                  if (event.key === 'Enter') {
                    if (isOpen) return;
                    onEnter();
                  }
                },
              })}
              {...inputOpts}
              fullWidth
              endAdornment={inputAdornment}
            />
          </SC.StyledFormControl>

          <SC.ItemsContainerAnchor>
            {(isOpen && inputValue.length) ? (
              <SC.ItemsContainer>
                {items
                  .filter(i =>
                      !inputValue ||
                      i.toLowerCase().includes(inputValue.toLowerCase()))
                  .map((item, index) => (
                    <SC.Item
                      {...getItemProps({ item })}
                      key={`${item}${index}`}
                      highlighted={highlightedIndex === index}
                      selected={selectedItem === item}
                    >
                      {item}
                    </SC.Item>
                  ))}
              </SC.ItemsContainer>
            ) : null}
          </SC.ItemsContainerAnchor>
        </div>
      )}
    </Downshift>
  );
}


InputAutocomplete.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  onInputChange: PropTypes.func,
  onEnter: PropTypes.func,
  inputAdornment: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]),
  inputOpts: PropTypes.shape({}),
};

InputAutocomplete.defaultProps = {
  items: [],
  onChange: () => {},
  onInputChange: () => {},
  onEnter: () => {},
  inputAdornment: () => {},
  inputOpts: {},
};
