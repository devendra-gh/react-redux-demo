import React from 'react';
import {expect} from 'chai';
import ReactDOM from 'react-dom';
import configureStore from '../../../../../src/store/index';
import renderPage from '../../../../renderPage';
import Social from '../../../../../src/components/Authentication/Login/Social';

describe('Social Login Component', () => {
  before(async function () {
    this.store = configureStore();
    this.page = await renderPage(this.store, <Social />);
  });
  after(function(){
    // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.page.get(0).parentNode))
  });

  it('Should render login radius container', function() {
    expect(this.page.find('.login-radius-container').length).eq(1);
  });

  it('Should render login radius interface', function() {
    expect(this.page.find('#interfacecontainerdiv').length).eq(1);
  });

});
