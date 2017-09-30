import React from 'react';
import {expect} from 'chai';
import ReactDOM from 'react-dom';
import configureStore from '../../../../src/store/index';
import renderPage from '../../../renderPage';
import SideNav from '../../../../src/components/Navigation/SideNav';

describe('Navigation SideNav.', () => {
  before(async function () {
    this.store = configureStore();
    this.page = await renderPage(this.store, <SideNav />);
  });
  after(function(){
    // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.page.get(0).parentNode))
  });

  it('Should render side-nav-container', function() {
    expect(this.page.find('.side-nav-container').length).eq(1);
  });

  it('Should render Loader Component', function() {
    expect(this.page.find('Loader').length).eq(1);
  });

  it('Should render a list of menu', function() {
    expect(this.page.find('ul').length).eq(1);
  });
});
