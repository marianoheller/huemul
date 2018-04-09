import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


export const AgendaContainer = styled.div`
background-color: ${props => props.theme.background.primary};
width: 100%;
`;

export const StyledSwipeableViews = styled(SwipeableViews)`
  & > div {
    transition: unset !important;
  }
`;

export const StyledTabs = styled(Tabs)`
background-color: ${props => props.theme.background.secondary};
`;

export const TabContainer = styled.div`
background-color: ${props => props.theme.background.primary};
text-align: center;
/* height: 100%; */
`;

export const StyledTab = styled(Tab)`
color: ${({ selected, theme }) => (selected ?
    theme.palette.primary[300]
    :
    theme.palette.secondary[300])} !important;
}
`;
