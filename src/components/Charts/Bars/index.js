/* eslint-disable no-shadow */
import React from 'react';
import styled, { withTheme } from 'styled-components';
import { withParentSize } from '@vx/responsive';
import { BarStackHorizontal } from '@vx/shape';
import { Group } from '@vx/group';
import { AxisBottom, AxisLeft } from '@vx/axis';
import { cityTemperature } from '@vx/mock-data';
import { scaleBand, scaleLinear } from '@vx/scale';
import { timeParse, timeFormat } from 'd3-time-format';
import { withTooltip, Tooltip } from '@vx/tooltip';
import { LegendOrdinal } from '@vx/legend';
import { max } from 'd3-array';


const StyledLegendOrdinal = styled(LegendOrdinal)`
  color: ${props => props.theme.palette.secondary[300]};
`;

const data = cityTemperature.slice(0, 12);
const keys = Object.keys(data[0]).filter(d => d !== 'date');
const parseDate = timeParse('%Y%m%d');
const format = timeFormat('%b %d');
const formatDate = date => format(parseDate(date));


const totals = data.reduce((ret, cur) => {
  const t = keys.reduce((dailyTotal, k) => {
    // eslint-disable-next-line no-param-reassign
    dailyTotal += +cur[k];
    return dailyTotal;
  }, 0);
  return [...ret, t];
}, []);


const Bars = withTooltip(({
  parentWidth: width,
  events = false,
  margin = {
    top: 40,
    left: 50,
    right: 40,
    bottom: 100,
  },
  tooltipOpen,
  tooltipLeft,
  tooltipTop,
  tooltipData,
  hideTooltip,
  showTooltip,
  theme,
}) => {
  if (width < 10) return null;
  const height = 600;

  // accessors
  const y = d => d.date;

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // // scales
  const xScale = scaleLinear({
    domain: [0, max(totals)],
    rangeRound: [0, xMax],
    nice: true,
  });
  const yScale = scaleBand({
    domain: data.map(y),
    rangeRound: [yMax, 0],
    padding: 0.2,
    tickFormat: () => val => formatDate(val),
  });
  const zScale = theme.palette.eventScale;

  let tooltipTimeout;

  return (
    <React.Fragment>
      <svg width={width} height={height}>
        <Group top={margin.top} left={margin.left}>
          <BarStackHorizontal
            data={data}
            keys={keys}
            height={yMax}
            y={y}
            xScale={xScale}
            yScale={yScale}
            zScale={zScale}
            onClick={data => () => {
              if (!events) return;
              alert(`clicked: ${JSON.stringify(data)}`);
            }}
            onMouseLeave={() => () => {
              tooltipTimeout = setTimeout(() => {
                hideTooltip();
              }, 300);
            }}
            onMouseMove={data => () => {
              if (tooltipTimeout) clearTimeout(tooltipTimeout);
              showTooltip({
                tooltipData: data,
                tooltipTop: margin.top + yScale(y(data.data)),
                tooltipLeft: margin.left + data.width + 75,
              });
            }}
          />
          <AxisLeft
            hideAxisLine
            hideTicks
            scale={yScale}
            stroke={theme.palette.secondary[300]}
            tickStroke={theme.palette.secondary[300]}
            tickLabelProps={() => ({
              fill: theme.palette.secondary[300],
              fontSize: 11,
              textAnchor: 'end',
              dy: '0.33em',
            })}
          />
          <AxisBottom
            scale={xScale}
            top={yMax}
            stroke={theme.palette.secondary[300]}
            tickStroke={theme.palette.secondary[300]}
            tickLabelProps={() => ({
              fill: theme.palette.secondary[300],
              fontSize: 11,
              textAnchor: 'middle',
            })}
          />
        </Group>
      </svg>
      <div
        style={{
          position: 'absolute',
          top: (margin.top / 2) - 10,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          fontSize: '14px',
        }}
      >
        <StyledLegendOrdinal
          scale={zScale}
          direction="row"
          labelMargin="0 15px 0 0"
        />
      </div>
      {tooltipOpen && (
        <Tooltip
          top={tooltipTop}
          left={tooltipLeft}
          style={{
            minWidth: 60,
            backgroundColor: 'rgba(0,0,0,0.9)',
            color: 'white',
          }}
        >
          <div style={{ color: zScale(tooltipData.key) }}>
            <strong>{tooltipData.key}</strong>
          </div>
          <div>{tooltipData.data[tooltipData.key]}℉</div>
          <div>
            <small>{tooltipData.xFormatted}</small>
          </div>
        </Tooltip>
      )}
    </React.Fragment>
  );
});

export default withTheme(withParentSize(Bars));
