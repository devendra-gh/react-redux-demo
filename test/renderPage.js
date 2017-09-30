import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import App from '../src/App';

function renderPage (store, component) {
  return mount(
    <Provider store={store}>
      {component}
    </Provider>
  );
}

module.exports = renderPage;
