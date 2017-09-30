import React from 'react';
import {expect} from 'chai';
import ReactDOM from 'react-dom';
import configureStore from '../../../../../src/store/index';
import renderPage from '../../../../renderPage';
import Banner from '../../../../../src/components/Authentication/Login/Banner';

describe('Banner Component', () => {
  before(async function () {
    this.store = configureStore();
    this.page = await renderPage(this.store, <Banner />);
  });
  after(function(){
    // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.page.get(0).parentNode))
  });

  it('Should render h3 tag', function() {
    expect(this.page.find('h3').length).eq(1);
  });

  it('Should render paragraph tag', function() {
    expect(this.page.find('h3').length).eq(1);
  });

});
