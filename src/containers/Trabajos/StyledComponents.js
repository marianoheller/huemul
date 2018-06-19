import styled from 'styled-components';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

export const MainContainer = styled.div`
background-color: ${props => props.theme.background.primary};
width: 100vw;
`;

export const StyledTabs = styled(Tabs)`
background-color: ${props => props.theme.background.secondary};
`;

export const TabContainer = styled.div`
background-color: ${props => props.theme.background.primary};
text-align: center;
color: ${props => props.theme.palette.secondary[300]};
`;

export const StyledTab = styled(Tab)`
color: ${({ selected, theme }) => (selected ?
    theme.palette.primary[300]
    :
    theme.palette.secondary[300])} !important;
}
`;


export const StyledSwipeableViews = styled(SwipeableViews)`
  & > div {
    transition: unset !important;
    height: unset !important;
  }
`;
