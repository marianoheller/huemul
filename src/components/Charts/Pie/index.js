/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React from 'react';
import { withTheme } from 'styled-components';
import { withParentSize } from '@vx/responsive';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';
import { letterFrequency, browserUsage } from '@vx/mock-data';

const letters = letterFrequency.slice(0, 4);
const browsers = Object.keys(browserUsage[0])
  .filter(k => k !== 'date')
  .map(k => ({ label: k, usage: browserUsage[0][k] }));

function Label({ x, y, children }) {
  return (
    <text
      fill="white"
      textAnchor="middle"
      x={x}
      y={y}
      dy=".33em"
      fontSize={9}
    >
      {children}
    </text>
  );
}

const PieChart = ({
  parentWidth: width,
  margin = {
    top: 30,
    left: 20,
    right: 20,
    bottom: 110,
  },
  theme,
}) => {
  if (width < 10) return null;
  const height = 500;
  const radius = Math.min(width, height) / 2;
  return (
    <svg width={width} height={height}>
      <Group top={(height / 2) - margin.top} left={width / 2}>
        <Pie
          data={browsers}
          pieValue={d => d.usage}
          outerRadius={radius - 80}
          innerRadius={radius - 120}
          fill={theme.palette.primary[300]}
          fillOpacity={d => 1 / (d.index + 2)}
          cornerRadius={3}
          padAngle={0}
          centroid={(centroid, arc) => {
            const [x, y] = centroid;
            const { startAngle, endAngle } = arc;
            if (endAngle - startAngle < 0.1) return null;
            return <Label x={x} y={y}>{arc.data.label}</Label>;
          }}
        />
        <Pie
          data={letters}
          pieValue={d => d.frequency}
          outerRadius={radius - 135}
          fill={theme.palette.primary[300]}
          fillOpacity={d => 1 / (d.index + 2)}
          centroid={(centroid, arc) => {
            const [x, y] = centroid;
            return <Label x={x} y={y}>{arc.data.letter}</Label>;
          }}
        />
      </Group>
    </svg>
  );
};

export default withParentSize(withTheme(PieChart));
