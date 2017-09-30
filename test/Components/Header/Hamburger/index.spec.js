import React from 'react';
import {expect} from 'chai';
import ReactDOM from 'react-dom';
import configureStore from '../../../../src/store/index';
import renderPage from '../../../renderPage';
import Hamburger from '../../../../src/components/Header/Hamburger';

describe('Header hamburger.', () => {
  before(async function () {
    this.store = configureStore();
    this.page = await renderPage(this.store, <Hamburger />);
  });
  after(function(){
    // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.page.get(0).parentNode))
  });

  it('Should render hamburger container', function() {
    expect(this.page.find('.hamburger-container').length).eq(1);
  });

 /* it('Should render notification-counter', function() {
    expect(this.page.find('.notification-counter').length).eq(1);
  });
*/
});
