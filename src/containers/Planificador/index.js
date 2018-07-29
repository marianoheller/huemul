import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  MultilineChart,
  LinearScale,
  ShowChart,
  PieChart as PieChartIcon,
  BubbleChart,
} from '@material-ui/icons';

import TreeChart from '../../components/Charts/Tree';
import BarsChart from '../../components/Charts/Bars';
import AreaChart from '../../components/Charts/Area';
import PieChart from '../../components/Charts/Pie';
import BarGroupChart from '../../components/Charts/BarGroup';


const PlanificadorContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

const StyledAppBar = styled(AppBar)`
  width: 100%;
  z-index: ${props => props.theme.zIndex.appBar - 1} !important;
`;

const Title = styled.div`
  font-weight: 200;
  color: ${props => props.theme.palette.primary[300]};
  font-size: 3rem;
  margin: 2rem 0;
  cursor: default;
  text-align: center;
`;

const ChartContainer = styled.div`

  padding: 0 1rem;
`;

const StyledTabs = styled(Tabs)`
  background-color: ${props => props.theme.background.secondary};
`;

const StyledTab = styled(Tab)`
  color: ${({ selected, theme }) => (selected ?
    theme.palette.primary[300]
    :
    theme.palette.secondary[300])} !important;
}
`;

class CalendarioAGH extends React.Component {
  state = { value: 0 };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <PlanificadorContainer>
        <StyledAppBar position="static" color="default">
          <StyledTabs
            value={value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            centered
            fullWidth
            data-cy-type="tabs"
          >
            <StyledTab label="Chart One" icon={<MultilineChart />} />
            <StyledTab label="Chart Two" icon={<LinearScale />} />
            <StyledTab label="Chart Three" icon={<ShowChart />} />
            <StyledTab label="Chart Four" icon={<PieChartIcon />} />
            <StyledTab label="Chart Five" icon={<BubbleChart />} />
          </StyledTabs>
        </StyledAppBar>
        <ContentContainer>
          <Title>Planificador</Title>
          <ChartContainer>
            {value === 0 && <TreeChart />}
            {value === 1 && <BarGroupChart />}
            {value === 2 && <AreaChart />}
            {value === 3 && <PieChart />}
            {value === 4 && <BarsChart />}
          </ChartContainer>
        </ContentContainer>
      </PlanificadorContainer>
    );
  }
}

export default CalendarioAGH;
