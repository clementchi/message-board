// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(
//     <div>
//     <App />
//     </div>
// , document.getElementById('root'));
// registerServiceWorker();

// ./src/index.js
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import './index.css';
import App from './App';

// inital context
const store = configureStore();
ReactDOM.render (
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById('root')
);