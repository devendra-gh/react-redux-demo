import React from 'react';
import {expect} from 'chai';
import ReactDOM from 'react-dom';
import configureStore from '../../../../src/store/index';
import renderPage from '../../../renderPage';
import TabNav from '../../../../src/components/Navigation/TabNav';

describe('Navigation SideNav.', () => {
  before(async function () {
    this.store = configureStore();
    this.page = await renderPage(this.store, <TabNav />);
  });
  after(function(){
    // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.page.get(0).parentNode))
  });

  it('Should render navigation container', function() {
    expect(this.page.find('.navigation').length).eq(1);
  });

  it('Should render a list of tab', function() {
    expect(this.page.find('ul').length).eq(1);
  });
});
