import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import ListItem from '@material-ui//core/ListItem';
import Divider from '@material-ui/core/Divider';

import { adjustHexOpacity } from '../../../utils';


export const LeftMenuContainer = styled.div``;

export const StyledListItem = styled(ListItem)`
  &:hover {
    background-color: unset !important;
  }
`;

export const StyledDivider = styled(Divider)`
  background-color: ${() => adjustHexOpacity('#FFFFFF', 0.25)} !important;
  height: 1px !important;
  margin: 0.5rem 0 !important;
`;

export const StyledNavLink = styled(NavLink).attrs({
  activeClassName: 'active',
})`
  display: flex;  
  align-items: center;
  justify-content: center; 
  cursor: pointer;

  font-size: 1em;
  color: white;
  text-decoration: none;
  padding: 0 0.5rem;

  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  & svg {
    color: ${props => props.theme.palette.primary[300]};
  }
  &  h3 {
    font-weight: 300;
    color: white;
  }
  
  &:hover {
    background-color: ${props => props.theme.palette.primary[300]};
  }
  &:hover h3 {
    color: white;
  }
  &:hover svg {
    color: white;
  }

  &.${'active'} {
    background-color: ${props => props.theme.palette.primary[300]};
    & h3 {
      color: white;
    }
    & svg {
      color: white;
    }

    &:hover {
        background-color: ${props => props.theme.palette.primary[300]};
    }
    &:hover h3 {
      color: white;
    }
    &:hover svg {
      color: white;
    }
  }
`;
