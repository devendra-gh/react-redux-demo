import React from 'react';
import {expect} from 'chai';
import ReactDOM from 'react-dom';
import configureStore from '../../../src/store/index';
import renderPage from '../../renderPage';
import Loader from '../../../src/components/Loader';

describe('Loader component', () => {
  before(async function () {
    this.store = configureStore();
    this.page = await renderPage(this.store, <Loader />);
  });
  after(function(){
    // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.page.get(0).parentNode))
  });

  it('Should render a loader-block', function() {
    expect(this.page.find('.loader-block').length).eq(0);
  });

  it('Should render a loader', function() {
    expect(this.page.find('.loader').length).eq(0);
  });

});
