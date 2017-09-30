import React from 'react';
import {expect} from 'chai';
import ReactDOM from 'react-dom';
import configureStore from '../../../src/store/index';
import renderPage from '../../renderPage';
import Footer from '../../../src/components/Footer';

describe('Footer component', () => {
  before(async function () {
    this.store = configureStore();
    this.page = await renderPage(this.store, <Footer />);
  });
  after(function(){
    // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.page.get(0).parentNode))
  });

  it('Should render FooterLink Component', function() {
    expect(this.page.find('FooterLink').length).eq(1);
  });

  it('Should render Social Component', function() {
    expect(this.page.find('Social').length).eq(1);
  });

  it('Should render AppStore Component', function() {
    expect(this.page.find('AppStore').length).eq(1);
  });
});
