import styled from 'styled-components';
import { adjustHexOpacity } from '../../utils';


export const SpinnerWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 3rem;
  .tooltip {
    visibility: ${({ hover }) => (hover ? 'visible' : 'hidden')};
    transition: top .2s ease-out, left .2s ease-out;
  }
`;

export const CalendarContainer = styled.div`
  position: relative;
  display: inline-block;
  height: 80vh;
  width: 100%;

  & .rbc-month-view {
      background-color: ${props => props.theme.background.secondary};
      box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  }

  /* Cell's Background */
  & .rbc-today {
    background-color: ${props => props.theme.palette.primary[300]};
    color: white;
  }
  & .rbc-off-range-bg {
    background-color: ${props => props.theme.palette.secondary[900]};
  }

  /* Border grid */
  & .rbc-month-view,
  & .rbc-header,
  & .rbc-month-row + .rbc-month-row,
  & .rbc-header + .rbc-header,
  & .rbc-day-bg + .rbc-day-bg {
      border-color: ${props => adjustHexOpacity(props.theme.palette.primary[300], 0.4)};
      border-width: 
  }

  /* Events */ 
  & .rbc-event {
    font-weight: 300;
    /* background-color: ${props => props.theme.palette.secondary[500]} */
    background-color: rgba(0,0,0,0);
    border: 1px solid ${props => adjustHexOpacity(props.theme.palette.primary[900], 0.1)};
  }

  /* Show more */
  & .rbc-show-more {
    text-decoration: underline;
    font-weight: 300;
    color: ${props => props.theme.palette.primary[300]};
    color: white;
    background-color: rgba(0,0,0,0);
    overflow: hidden;
  }
`;
