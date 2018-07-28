/* eslint-disable max-len */
import React from 'react';

import * as SC from './StyledComponents';

export default function Landing() {
  return (
    <SC.StyledContainer>
      <SC.Title>huemul</SC.Title>
      <SC.Subtitle>gestión.de.procesos</SC.Subtitle>
      <SC.Description>
        This is a minimal PWA reduced from a bigger product.<br />
        All private information has been obfuscated or removed and many features have been disabled.
      </SC.Description>
    </SC.StyledContainer>
  );
}
