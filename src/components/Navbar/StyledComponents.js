import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';

// https://blog.christopherianmurphy.com/2016/01/responsive-pure-css-menu/


export const NavbarContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
background-color: ${props => props.theme.background.secondary};

  flex-grow: 1;
`;

export const CustomAppBar = styled(AppBar)`
  background-color: ${props => props.theme.background.secondary} !important;
  z-index: ${props => props.theme.zIndex.appBar} !important;
`;

export const LogoContainer = styled(NavLink)`
margin-left: 0.5rem;
padding-top: 10px;
padding-bottom: 10px;
text-decoration: none;
`;

export const Logo = styled.div`
color: ${props => props.theme.palette.primary[300]};
font-size: 1.25rem;
font-weight: 300;

display: flex;
flex-direction: row;
`;

export const Version = styled.div`
color: ${props => (props.active ? props.theme.palette.secondary[300] : props.theme.background.secondary)};
font-size: 0.75rem;
font-weight: 300;
margin-top: auto;
margin-bottom: 2px;
`;

export const Spacer = styled.div`
  flex: 1;
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

  & > button > span {
    font-weight: 300;
    color: ${props => props.theme.palette.primary[300]};
  }

  &:hover {
    background-color: ${props => props.theme.palette.primary[300]};
  }

  &:hover > button > span {
    color: white;
  }

  &.${'active'} {
    background-color: ${props => props.theme.palette.primary[300]};
    & > button > span {
      color: white;
    }

    &:hover {
        background-color: ${props => props.theme.palette.primary[300]};
    }
    &:hover > button > span {
      color: white;
    }
  }
`;
