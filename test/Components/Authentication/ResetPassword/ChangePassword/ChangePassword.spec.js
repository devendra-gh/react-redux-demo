/*import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isRequired, lessThan} from '../../../../util/validations';
import {changePassword} from '../../../../actions/changePasswordActionCreater';
import endpoints from '../../../../endpoints/authentication';
import {formDataGenerator} from '../../../../util/formDataGenerator';
import Header from '../../../Header/LoginHeader';
import {setLoader} from '../../../../actions/loader';
import Loader from '../../../Loader';*/

// import {isRequired, lessThan} from '/src/util/validations';
import {isRequired, lessThan} from '../../../../../src/util/validations';
import {formDataGenerator} from '../../../../../src/util/formDataGenerator';

import React from 'react';
import {expect} from 'chai';
import ReactDOM from 'react-dom';
import configureStore from '../../../../../src/store/index';
import renderPage from '../../../../renderPage';
import ChangePassword from '../../../../../src/components/Authentication/ResetPassword/ChangePassword/ChangePassword';

describe('Change Password Component', () => {
  before(async function () {
    this.store = configureStore();
    this.page = await renderPage(this.store, <ChangePassword />);
  });
  after(function(){
    // ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.page.get(0).parentNode))
  });
  it('Should render form container', function() {
    expect(this.page.find('.container').length).eq(1);
  });

  it('Should have change password button.', function() {
    expect(this.page.find('button').length).eq(1);
  });

  it('Should have 3 input fields for old password,new and confirm password.', function() {
    expect(this.page.find('input[type="password"]').length).eq(3);
  });

});
