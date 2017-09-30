import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isRequired, lessThan, validateEmail} from '../../../../util/validations';
import {
  sendLInktoEmail,
  forgotModalClosed,
  clearErrorsForgotPassword,
} from '../../../../actions/changePasswordActionCreater';
import endpoints from '../../../../endpoints/authentication';
import {formDataGenerator} from '../../../../util/formDataGenerator';
import Header from '../../../Header/LoginHeader';
import {setLoader} from '../../../../actions/loader';
import Loader from '../../../Loader';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: '',
        changed: false,
      },
      onSubmit: false,
    };
  }

  checkEmail = (value, changed) => {
    const {forgotPassword:{error}} = this.props;
    if (error.error || error.description) {
      const {clearErrorsForgotPassword} = this.props;
      clearErrorsForgotPassword();
    }

    this.setState({
      email: {
        value: value,
        changed: changed,
      },
    });
  }

  sendLInktoEmail = () => {
    const {email} = this.state;
    const {setLoader, sendLInktoEmail} = this.props;

    if (email.value.length === 0) {
      this.setState({onSubmit: true});
      return false;
    }
    else {
      if (validateEmail(email.value)) {
        let data = [
          {
            "key": "email",
            "value": email.value,
          },
        ];
        setLoader(true);
        sendLInktoEmail(endpoints.forgotPassword, formDataGenerator(data));
      }
    }
  };

  closeModalHandler = () => {
    const {openSignInModal, closeForgotPasswordModal, forgotModalClosed} = this.props;
    forgotModalClosed();
    closeForgotPasswordModal();
    openSignInModal();
  };

  render() {
    const {email, onSubmit}=this.state;
    const {forgotPassword, closeModal} = this.props;

    return (
      <div className='container'><Loader {...this.props} />
        <Header closeModal={closeModal} />
        {
          forgotPassword.isLinkSend
            ?
            <div className='forgot-password-reset'>
              <div className='center-content'>
                <p>Password Reset Request sent on your registered email.</p>
                <button type='button' className='forgotButton' onClick={this.closeModalHandler}>Back to Login</button>
              </div>
            </div>
            :
            <div className='forgot-password-container'>
              <h3>Forgot Password</h3>
              <button type='button' onClick={this.closeModalHandler} className='close-icon'><i
                className='icon-cross'></i>
              </button>
              <ul className='forgot-password-form'>
                {forgotPassword.error.error != null ?
                  <p id='errorMessage' className='form-group text-danger'>{forgotPassword.error.error}</p> : ''}
                {forgotPassword.error.description != null ?
                  <p id='errorMessage' className='form-group text-danger'>{forgotPassword.error.description}</p> : ''}
                <li className='form-group'>
                  <input className='form-control' id='email' type='email' placeholder='Registered Email Address'
                         ref='email'
                         onChange={(e) => this.checkEmail(e.target.value, true)} required />
                  <p className='form-group text-danger'>
                    {email.changed && !validateEmail(email.value) && 'Enter a valid email address.'}
                    {onSubmit && !isRequired(email.value) && 'Mandatory Field.'}
                  </p>
                </li>
                <li className='form-group login-banner txt-center'>
                  <p>A password reset request will be emailed to you on your registered email address.</p>
                </li>
                <li className='form-group txt-center'>
                  <button className='btn-danger' onClick={this.sendLInktoEmail}>Send</button>
                </li>
              </ul>
            </div>
        }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    forgotPassword: state.forgotPassword,
    loader: state.loader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: bindActionCreators(setLoader, dispatch),
    sendLInktoEmail: bindActionCreators(sendLInktoEmail, dispatch),
    forgotModalClosed: bindActionCreators(forgotModalClosed, dispatch),
    clearErrorsForgotPassword: bindActionCreators(clearErrorsForgotPassword, dispatch),
  };
};
ForgotPassword.propTypes = {
  forgotPassword: React.PropTypes.object.isRequired,
  setLoader: React.PropTypes.func.isRequired,
  sendLInktoEmail: React.PropTypes.func.isRequired,
  closeSignInModal: React.PropTypes.func.isRequired,
  openSignInModal: React.PropTypes.func.isRequired,
  closeForgotPasswordModal: React.PropTypes.func.isRequired,
  forgotModalClosed: React.PropTypes.func.isRequired,
  closeModal: React.PropTypes.func.isRequired,
  clearErrorsForgotPassword: React.PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
