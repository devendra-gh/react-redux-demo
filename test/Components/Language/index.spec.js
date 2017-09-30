import React from 'react';
import {expect} from 'chai';
import ReactDOM from 'react-dom';
import configureStore from '../../../src/store/index';
import renderPage from '../../renderPage';
import Language from '../../../src/components/Language';

describe('Language component', () => {
  before(async function () {
    this.store = configureStore();
    this.page = await renderPage(this.store, <Language />);
  });
  after(function(){
    // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.page.get(0).parentNode))
  });

  it('Should render a Language List', function() {
    expect(this.page.find('ul').length).eq(1);
  });

});
