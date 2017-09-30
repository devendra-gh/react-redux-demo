import React from 'react';
import {expect} from 'chai';
import ReactDOM from 'react-dom';
import configureStore from '../../../../src/store/index';
import renderPage from '../../../renderPage';
import LoginHeader from '../../../../src/components/Header/LoginHeader';

describe('Header Logo.', () => {
  before(async function () {
    this.store = configureStore();
    this.page = await renderPage(this.store, <LoginHeader />);
  });
  after(function(){
    // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.page.get(0).parentNode))
  });

  it('Should render h1 tag', function() {
    expect(this.page.find('h1').length).eq(1);
  });

  it('Should render Link Component', function() {
    expect(this.page.find('Link').length).eq(1);
  });

});
