import 'roboto-fontface/css/roboto/roboto-fontface.css';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, green, orange } from '@material-ui/core/colors';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import './index.css';

// const eventColors = googlePallete('tol-rainbow', config.EVENT_TYPES.length).map(c => `#${c}`);

const store = configureStore({});
const theme = {
  background: {
    primary: '#374046',
    secondary: '#3e464c',
  },
  palette: {
    primary: green,
    secondary: blueGrey,
    // event: config.EVENT_TYPES.reduce((acc, type, i) => ({ ...acc, [type]: eventColors[i] }), {}),
    eventScale: scaleOrdinal(schemeCategory10),
  },
  status: {
    danger: orange,
  },
  zIndex: {
    appBar: 100,
  },
};
const muiTheme = createMuiTheme(theme);

render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={muiTheme}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
