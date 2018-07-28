/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { withTheme } from 'styled-components';
import { withParentSize } from '@vx/responsive';
import { BarGroup } from '@vx/shape';
import { AxisBottom } from '@vx/axis';
import { cityTemperature } from '@vx/mock-data';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { timeParse, timeFormat } from 'd3-time-format';
import { max } from 'd3-array';

const data = cityTemperature.slice(0, 4);
const keys = Object.keys(data[0]).filter(d => d !== 'date');
const parseDate = timeParse('%Y%m%d');
const format = timeFormat('%b %d');
const formatDate = date => format(parseDate(date));

// accessors
const x0 = d => d.date;

const BarGroupChart = ({
  parentWidth: width,
  margin = {
    top: 40,
  },
  theme,
}) => {
  if (width < 10) return null;
  const height = 500;

  // bounds
  const xMax = width;
  const yMax = height - margin.top - 100;

  // // scales
  const x0Scale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x0),
    padding: 0.2,
    tickFormat: () => val => formatDate(val),
  });
  const x1Scale = scaleBand({
    rangeRound: [0, x0Scale.bandwidth()],
    domain: keys,
    padding: 0.1,
  });
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, max(data, d => max(keys, key => d[key]))],
  });
  const zScale = scaleOrdinal({
    domain: keys,
    range: ['#aeeef8', '#e5fd3d', '#9caff6'],
  });

  return (
    <svg width={width} height={height}>
      <BarGroup
        top={margin.top}
        data={data}
        keys={keys}
        height={yMax}
        x0={x0}
        x0Scale={x0Scale}
        x1Scale={x1Scale}
        yScale={yScale}
        zScale={zScale}
        rx={4}
      />
      <AxisBottom
        scale={x0Scale}
        top={yMax + margin.top}
        stroke={theme.palette.secondary[300]}
        tickStroke={theme.palette.secondary[300]}
        hideAxisLine
        tickLabelProps={() => ({
          fill: '#e5fd3d',
          fontSize: 11,
          textAnchor: 'middle',
        })}
      />
    </svg>
  );
};

export default withParentSize(withTheme(BarGroupChart));
