import React from 'react';
import {expect} from 'chai';
import ReactDOM from 'react-dom';
import configureStore from '../../../../src/store/index';
import renderPage from '../../../renderPage';
// import Movies from '../../../../src/components/Landing/Movies/index';

describe('Authentication login.', () => {
  before(async function () {
    // this.store = configureStore();
    // this.page = await renderPage(this.store, <Home />);
  });
  after(function(){
    // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.page.get(0).parentNode))
  });

  it('Should render Banner Component', function() {
    // expect(this.page.find('Banner').length).eq(1);
  });

  it('Should render SocialLogin Component', function() {
    // expect(this.page.find('SocialLogin').length).eq(1);
  });

  it('Should render TraditionalLogin Component', function() {
    // expect(this.page.find('TraditionalLogin').length).eq(1);
  });
});
