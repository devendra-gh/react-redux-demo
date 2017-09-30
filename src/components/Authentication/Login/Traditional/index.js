import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {isRequired, lessThan, validateEmail} from '../../../../util/validations';
import {login, clearLoginErrors, kalturaConfiguration} from '../../../../actions/authentication';
import {connect} from 'react-redux';
import {formDataGenerator} from '../../../../util/formDataGenerator';
import {setLoader} from '../../../../actions/loader';
import endpoints from '../../../../endpoints/authentication';
import Loader from '../../../Loader';
import {toastr} from 'react-redux-toastr';
import mixPanel from '../../../../util/mixPanel';
const toastrLoginOptions = {
  timeOut: 0,
  showCloseButton: false,
  component:<div className='toaster_custom'><span>Logged in Successfully.</span></div>,
};

let errorMessage = '';

const toastrLoginFail = {
  timeOut: 0,
  showCloseButton: false,
};

class TraditionalLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFields: ['email', 'password'],
      onSubmit: false,
      type: 'password',
      passwordLength:6,
    };
  }

  componentWillMount() {
    const {inputFields}=this.state;
    inputFields.map((input) => {

      let value = '';
      if (input === 'location')
        value = 'Select Location';

      this.setState({
        [input]: {
          value,
          changed: false,
        },
      });
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.login.isLoginSuccess) {
      //console.log('next',nextProps.login);
      this.props.closeSignInModal();
      toastr.success('',toastrLoginOptions);
      this.removeToasterMsgs('success');
      document.body.className = "";
    }
    if(nextProps.login.isLoginFail && (nextProps.login.error.error || nextProps.login.error.message)){
      if(nextProps.login.error.error){
        errorMessage = nextProps.login.error.error;
      }
      if(nextProps.login.error.message){
        errorMessage = "Invalid user ID or password";
      }
      toastrLoginFail.component = <div className='toaster_custom'><span>{errorMessage}</span></div>;
      toastr.error('',toastrLoginFail);
      this.removeToasterMsgs('error');
      this.props.clearLoginErrors();
    }
  }

  removeToasterMsgs = (type) => {
    setTimeout(function(){ toastr.removeByType(type); }, 3000);
  }

  changeHandler = (value, property, changed = 'true') => {
    this.setState({
      [property]: {
        value,
        changed,
      },
    });
  };
  registerHandler = ()=>{
    const { closeSignInModal, openSignUpModal } = this.props;
    closeSignInModal();
    openSignUpModal();
  };
  forgotPasswordHandler = ()=>{
    const { closeSignInModal, openForgotPasswordModal } = this.props;
    closeSignInModal();
    openForgotPasswordModal();
  };
  render() {
    const {email, password, onSubmit, passwordLength,type}=this.state;
    const showPassword = () => {
      let inputType = "";
      if (type === 'password')
        inputType = 'text';
      else
        inputType = 'password';
      this.setState({
        type: inputType,
      });
    };
    const handleLogin = () => {
      const { closeSignInModal, login } = this.props;
      if (email.value.length === 0 || !validateEmail(email.value) || !isRequired(password.value)) {
        this.setState({onSubmit: true});
        return false;
      }
      else {

        let data = [
          {
            "key": "username",
            "value": email.value,
          },
          {
            "key": "password",
            "value": password.value,
          },
        ];
        let userType = 'Traditional';
        let providerType = 'Traditional';
        mixPanel.singIn(userType, providerType);
        this.props.setLoader(true);
        this.props.userLogin(endpoints.login, formDataGenerator(data),()=>{
          const {login: {data}, kalturaConfiguration} = this.props;
          let kalturaData = [
            {
              "key": "email",
              "value": email.value,
            },
            {
              "key": "UID",
              "value": data.Uid,
            },
            {
              "key": "firstname",
              "value": data.FirstName,
            },
            {
              "key": "lastname",
              "value": data.LastName,
            },
          ];
          kalturaConfiguration(endpoints.kalturaLogin, formDataGenerator(kalturaData));
        });
      }
    };

    return (
      <div><Loader {...this.props} />
        <div className='login-form-container'>

          <div className='seperator-line'>
            <span>OR</span>
          </div>
          <ul className='login-form'>
            <li className='form-group'>
              <input className='form-control' id='email' type='email' placeholder='Email' ref='email'
                     onChange={(e) => this.changeHandler(e.target.value, 'email', true)} required />
              <p className='form-group text-danger'>
                {onSubmit && email.changed && email.value && !validateEmail(email.value) && 'Enter a valid email address.'}
                {onSubmit && !isRequired(email.value) && 'Email field is empty.'}
              </p>
            </li>
            <li className='form-group'>
              <input className='form-control' id='password' type={this.state.type} placeholder='Password' ref='password'
                     onChange={(e) => this.changeHandler(e.target.value, 'password', true)} required />
              <span className='show-password' onClick={showPassword}>{this.state.type === 'password' ? 'SHOW' : 'HIDE'}</span>
              <p className='form-group text-danger'>
                {onSubmit && !isRequired(password.value) && 'Password field is empty.'}
              </p>
            </li>
            <li className='form-group form-group forgot-password-link'>
              <button type='button' onClick={this.forgotPasswordHandler} className='link-buttons'>Forgot Password ?</button>
            </li>
            <li className='form-group txt-center'>
              <button className='btn-danger login-btn' onClick={() => handleLogin()}>Login</button>
            </li>
            <li className='form-group txt-center'>
              <span className='not-member'>Not a member yet?</span><button type='button' onClick={this.registerHandler} className='link-buttons register-link'>Register</button>
            </li>
          </ul>
          <div className='skip-page txt-center'>
            <button type='button' onClick={this.props.closeSignInModal} className='link-buttons'>SKIP & EXPLORE</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.authentication.login,
    loader: state.loader,
    config: state.config,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: bindActionCreators(setLoader,dispatch),
    userLogin: bindActionCreators(login, dispatch),
    clearLoginErrors: bindActionCreators(clearLoginErrors, dispatch),
    kalturaConfiguration: bindActionCreators(kalturaConfiguration, dispatch),
  };
};

TraditionalLogin.propTypes = {
  login: React.PropTypes.object.isRequired,
  userLogin: React.PropTypes.func.isRequired,
  setLoader: React.PropTypes.func.isRequired,
  openSignUpModal: React.PropTypes.func.isRequired,
  closeSignInModal: React.PropTypes.func.isRequired,
  openForgotPasswordModal: React.PropTypes.func.isRequired,
  clearLoginErrors: React.PropTypes.func.isRequired,
  kalturaConfiguration: React.PropTypes.func.isRequired,
};

TraditionalLogin.need = [
  // login.userLogin
];

TraditionalLogin.contextTypes = {
  store: React.PropTypes.object,
  router: React.PropTypes.object.isRequired,
};



export default connect(mapStateToProps, mapDispatchToProps)(TraditionalLogin);
