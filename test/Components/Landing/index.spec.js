import React from 'react';
import {expect} from 'chai';
import ReactDOM from 'react-dom';
import configureStore from '../../../src/store/index';
import renderPage from '../../renderPage';
import Landing from '../../../src/components/Landing';

describe('Landing component', () => {
  before(async function () {
    this.store = configureStore();
    this.page = await renderPage(this.store, <Landing />);
  });
  after(function(){
    // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.page.get(0).parentNode))
  });

  it('Should render container', function() {
    expect(this.page.find('.container').length).eq(1);
  });

  xit('Should render SideNavigation Component', function() {
    expect(this.page.find('SideNavigation').length).eq(1);
  });

  it('Should render TabNavigation Component', function() {
    expect(this.page.find('TabNavigation').length).eq(1);
  });

  it('Should render home-container', function() {
    expect(this.page.find('.home-container').length).eq(1);
  });

});
