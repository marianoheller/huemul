/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
import React from 'react';
import styled, { withTheme } from 'styled-components';
import PropTypes from 'prop-types';
import { ParentSize } from '@vx/responsive';
import { Group } from '@vx/group';
import { Tree } from '@vx/hierarchy';
import { LinearGradient } from '@vx/gradient';
import { hierarchy } from 'd3-hierarchy';
import { LinkHorizontal } from '@vx/shape';
import { withTooltip, TooltipWithBounds } from '@vx/tooltip';
import { localPoint } from '@vx/event';

import { adjustHexOpacity } from '../../../utils';
import data from './data';

const StyledNode = styled(Group)`
  cursor: pointer;
`;

const StyledTooltipWithBounds = styled(TooltipWithBounds)`
  max-width: 5rem;
  max-height: 8rem;
  overflow: hidden;
`;


const nodeCount = [];
/**
 * Recursive tree's node counter
 * @param {*} node Node
 * @param {*} d Depth
 */
function countLeaves(node, d = 0) {
  if (node.children) {
    for (let i = 0; i < node.children.length; i++) {
      if (node.children[i].children) {
        if (!nodeCount[d]) nodeCount[d] = 1;
        else nodeCount[d]++;
        countLeaves(node.children[i], d + 1);
      } else if (!nodeCount[d]) nodeCount[d] = 1;
      else nodeCount[d]++;
    }
  }
}

class PertChart extends React.Component {
  componentWillMount() {
    nodeCount.splice(0);
    countLeaves(data);
  }

  componentDidUpdate() {
    nodeCount.splice(0);
    countLeaves(data);
  }

  handleMouseOver = (event, datum) => {
    const coords = localPoint(event.target.ownerSVGElement, event);
    this.props.showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: datum,
    });
  };

  render() {
    const {
      // data
      theme,
      margin,
      tooltipData,
      tooltipLeft,
      tooltipTop,
      tooltipOpen,
      hideTooltip,
    } = this.props;
    const stepPercent = 0.5;
    const origin = { x: 0, y: 0 };
    const maxLeaves = nodeCount.reduce((acc, a) => (a > acc ? a : acc), 0);
    return (
      <ParentSize>
        {({ width, height }) => (
          <React.Fragment>
            <svg width={width} height={40 * maxLeaves}>
              <LinearGradient id="lg" from="#fd9b93" to="#fe6e9e" />
              <Tree
                top={margin.top}
                left={margin.left}
                root={hierarchy(data, d => d.children)}
                size={[
                  height - margin.top - margin.bottom,
                  width - margin.left - margin.right,
                ]}
                separation={(a, b) => (a.parent === b.parent ? 0.95 : 1)}
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
                        <StyledNode
                          top={top}
                          left={left}
                          key={key}
                          onMouseOver={e => this.handleMouseOver(e, node.data.description)}
                          onFocus={e => this.handleMouseOver(e, node.data.description)}
                          onMouseOut={hideTooltip}
                          onBlur={hideTooltip}
                        >
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
                        </StyledNode>
                      );
                    })}
                  </Group>
                )}
              </Tree>
            </svg>
            {tooltipOpen && (
              <StyledTooltipWithBounds
                // random so it correctly updates with parent bounds
                key={Math.random()}
                top={tooltipTop}
                left={tooltipLeft}
              >
                <div>{tooltipData}</div>
              </StyledTooltipWithBounds>
            )}
          </React.Fragment>
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

export default withTooltip(withTheme(PertChart));
