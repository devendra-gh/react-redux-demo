import React from 'react';
import {expect} from 'chai';
import ReactDOM from 'react-dom';
import configureStore from '../../../../src/store/index';
import renderPage from '../../../renderPage';
import UserAction from '../../../../src/components/Header/UserAction';

describe('Header UserAction.', () => {
  before(async function () {
    this.store = configureStore();
    this.page = await renderPage(this.store, <UserAction />);
  });
  after(function(){
    // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.page.get(0).parentNode))
  });

  it('Should render container', function() {
    expect(this.page.find('.nav-right').length).eq(1);
  });

  it('Should render Image Component', function() {
    expect(this.page.find('Image').length).eq(2);
  });

});
