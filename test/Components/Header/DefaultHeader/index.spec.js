import React from 'react';
import {expect} from 'chai';
import ReactDOM from 'react-dom';
import configureStore from '../../../../src/store/index';
import renderPage from '../../../renderPage';
import DefaultHeader from '../../../../src/components/Header/DefaultHeader';

describe('Header DefaultHeader.', () => {
  before(async function () {
    this.store = configureStore();
    this.page = await renderPage(this.store, <DefaultHeader />);
  });
  after(function(){
    // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.page.get(0).parentNode))
  });

  it('Should render header container', function() {
    expect(this.page.find('header').length).eq(1);
  });

  it('Should render Hamburger Component', function() {
    expect(this.page.find('Hamburger').length).eq(1);
  });

  it('Should render UserAction Component', function() {
    expect(this.page.find('UserAction').length).eq(1);
  });
});
