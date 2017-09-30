import {isRequired, lessThan} from '../../../../../src/util/validations';
import {formDataGenerator} from '../../../../../src/util/formDataGenerator';

import React from 'react';
import {expect} from 'chai';
import ReactDOM from 'react-dom';
import configureStore from '../../../../../src/store/index';
import renderPage from '../../../../renderPage';
import Form from '../../../../../src/components/Authentication/SignUp/Form';

describe('SignUp Form Component', () => {
  before(async function () {
    this.store = configureStore();
    this.page = await renderPage(this.store, <Form />);
  });
  after(function(){
    // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.page.get(0).parentNode))
  });
  it('Should render from container', function() {
    expect(this.page.find('.signup-form').length).eq(1);
  });

  it('Should render 4 input fields.', function() {
    expect(this.page.find('input').length).eq(5);
  });

  it('Should render a location select box fields.', function() {
    expect(this.page.find('select').length).eq(1);
  });

  it('Should render sign up button.', function() {
    expect(this.page.find('button').length).eq(1);
  });


});
