import React from 'react';
import {expect} from 'chai';
import ReactDOM from 'react-dom';
import configureStore from '../../../../../src/store/index';
import renderPage from '../../../../renderPage';
import Traditional from '../../../../../src/components/Authentication/Login/Traditional';

describe('Traditional Login Component', () => {
  before(async function () {
    this.store = configureStore();
    this.page = await renderPage(this.store, <Traditional />);
  });
  after(function(){
    // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.page.get(0).parentNode))
  });

  it('Should render login form container', function() {
    expect(this.page.find('.login-form-container').length).eq(1);
  });


  it('Should render input email feild.', function() {
    expect(this.page.find('input[type="email"]').length).eq(1);
  });

  it('Should render input password feild.', function() {
    expect(this.page.find('input[type="password"]').length).eq(1);
  });

  it('Should render login button.', function() {
    expect(this.page.find('button').length).eq(1);
  });

});
