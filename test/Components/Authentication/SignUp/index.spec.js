import React from 'react';
import {expect} from 'chai';
import ReactDOM from 'react-dom';
import configureStore from '../../../../src/store/index';
import renderPage from '../../../renderPage';
import SignUp from '../../../../src/components/Authentication/SignUp';

describe('Authentication SignUp', () => {
  before(async function () {
    this.store = configureStore();
    this.page = await renderPage(this.store, <SignUp />);
  });
  after(function(){
    // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.page.get(0).parentNode))
  });

  it('Should render Banner Component', function() {
    expect(this.page.find('Banner').length).eq(1);
  });

  xit('Should render Header Component', function() {
    expect(this.page.find('Header').length).eq(1);
  });


  it('Should render Banner Component', function() {
    expect(this.page.find('Banner').length).eq(1);
  });

  it('Should render Form Component', function() {
    expect(this.page.find('Form').length).eq(1);
  });
});
