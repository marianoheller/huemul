/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import React from 'react';
import { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { ParentSize } from '@vx/responsive';
import { Group } from '@vx/group';
import { Tree } from '@vx/hierarchy';
import { LinearGradient } from '@vx/gradient';
import { hierarchy } from 'd3-hierarchy';
import { LinkHorizontal } from '@vx/shape';

import { adjustHexOpacity } from '../../utils';

const data = {
  name: 'T',
  children: [
    {
      name: 'A',
      children: [
        { name: 'A1' },
        { name: 'A2' },
        { name: 'A3' },
        {
          name: 'C',
          children: [
            {
              name: 'C1',
            },
            {
              name: 'D',
              children: [
                {
                  name: 'D1',
                },
                {
                  name: 'D2',
                },
                {
                  name: 'D3',
                },
              ],
            },
          ],
        },
      ],
    },
    { name: 'Z' },
    {
      name: 'B',
      children: [{ name: 'B1' }, { name: 'B2' }, { name: 'B3' }],
    },
  ],
};

class PertChart extends React.Component {
  render() {
    const {
      // data
      theme,
      margin,
    } = this.props;
    const stepPercent = 0.5;
    const origin = { x: 0, y: 0 };

    return (
      <ParentSize>
        {({ width, height }) => (
          <svg width={width} height={height}>
            <LinearGradient id="lg" from="#fd9b93" to="#fe6e9e" />
            <Tree
              top={margin.top}
              left={margin.left}
              /* root={hierarchy(data, d => (d.isExpanded ? d.children : null))} */
              root={hierarchy(data, d => d.children)}
              size={[
                height - margin.top - margin.bottom,
                width - margin.left - margin.right,
              ]}
              separation={(a, b) => (a.parent === b.parent ? 1 : 0.5) / a.depth}
            >
              {({ data }) => (
                <Group
                  top={origin.y}
                  left={origin.x}
                >
                  {data.links().map((link, i) => (
                    <LinkHorizontal
                      data={link}
                      percent={stepPercent}
                      stroke={theme.palette.primary[300]}
                      strokeWidth="1"
                      fill="none"
                      key={i}
                    />
                  ))}

                  {data.descendants().map((node, key) => {
                    const height = 30;
                    const width = 30;
                    const top = node.x;
                    const left = node.y;

                    return (
                      <Group top={top} left={left} key={key}>
                        {node.depth === 0 && (
                          <circle
                            r={12}
                            fill="url('#lg')"
                            onClick={() => {
                              // eslint-disable-next-line no-param-reassign
                              node.data.isExpanded = !node.data.isExpanded;
                              this.forceUpdate();
                            }}
                          />
                        )}
                        {node.depth !== 0 && (
                          <rect
                            y={-height / 2}
                            x={-width / 2}
                            height={height}
                            width={width}
                            fill={adjustHexOpacity(theme.palette.primary[300], 0.5)}
                            stroke={theme.palette.primary[300]}
                            strokeWidth={1}
                            strokeDasharray={!node.data.children ? '2,2' : '0'}
                            strokeOpacity={!node.data.children ? 0.6 : 1}
                            rx={!node.data.children ? 10 : 0}
                            onClick={() => {
                              // eslint-disable-next-line no-param-reassign
                              node.data.isExpanded = !node.data.isExpanded;
                              this.forceUpdate();
                            }}
                          />
                        )}
                        <text
                          dy=".33em"
                          fontSize={9}
                          fontFamily="Arial"
                          textAnchor="middle"
                          style={{ pointerEvents: 'none' }}
                          fill={node.depth === 0 ? 'white' : node.children ? 'white' : 'white'}
                        >
                          {node.data.name}
                        </text>
                      </Group>
                    );
                  })}
                </Group>
              )}
            </Tree>
          </svg>
        )}
      </ParentSize>
    );
  }
}

PertChart.propTypes = {
  margin: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
  }),
  theme: PropTypes.shape({}).isRequired,
};

PertChart.defaultProps = {
  margin: {
    top: 30,
    left: 30,
    right: 30,
    bottom: 30,
  },
};

export default withTheme(PertChart);
