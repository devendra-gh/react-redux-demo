import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {isRequired, lessThan, greaterThan} from '../../../../util/validations';
import {changePassword, changePasswordModalClosed, clearErrors} from '../../../../actions/changePasswordActionCreater';
import endpoints from '../../../../endpoints/authentication';
import {COOKIE} from '../../../../constants';
import {formDataGenerator} from '../../../../util/formDataGenerator';
import Header from '../../../Header/LoginHeader';
import {setLoader} from '../../../../actions/loader';
import Loader from '../../../Loader';
import cookie from 'react-cookie';
import {logout} from '../../../../actions/authentication';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFields: ['newPassword', 'oldPassword', 'confirmNewPassword'],
      onSubmit: false,
      isNotEqual: false,
      type: 'password',
      minPasswordLength:6,
      maxPasswordLength: 15,
    };
  }

  componentWillMount() {
    if(this.props.login.data.Uid === ''){
      return false;
    }else{
      const {inputFields}=this.state;
      inputFields.map((input) => {

        let value = '';
        if (input === 'location')
          value = 'Select Location';

        this.setState({
          [input]: {
            value,
            changed: false,
            type:'password',
          },
        });
      });
    }
  }

  componentWillUnmount() {
    const {clearErrors, passwordChanged:{error}} = this.props;
    if(error.description)
      clearErrors();
  }

  changeHandler = (value, property, changed = 'true',type='password') => {
    this.setState({
      [property]: {
        value,
        changed,
        type,
      },
    });
  };

  logoutUser=()=>{
    this.props.setLoader(true);
    cookie.remove(COOKIE.USER_ID);
    cookie.remove(COOKIE.KALTURA_PLAYER_CONFIG_IDS);
    this.props.logout();
    this.props.setLoader(false);
  };

  changePassword = () => {
    const {newPassword, oldPassword, confirmNewPassword, minPasswordLength, maxPasswordLength}=this.state;
    if ((newPassword.value && newPassword.value.length) < minPasswordLength || newPassword.value.length > maxPasswordLength || oldPassword.value.length > maxPasswordLength || confirmNewPassword.value.length > maxPasswordLength ||  (oldPassword.value && oldPassword.value.length) < minPasswordLength || (confirmNewPassword.value && confirmNewPassword.value.length) < minPasswordLength) {
      this.setState({onSubmit: true});
      return false;
    }
    else {
      if (newPassword.value != confirmNewPassword.value) {
        this.setState({isNotEqual: true});
        //document.getElementById('errorMessage').innerHTML='New password and confirm password is not equal.';
        return false;
      }
      else {
        this.setState({isNotEqual: false});
        let data = [
          {
            "key": "account_id",
            "value": this.props.login.data.Uid,
          },
          {
            "key": "old_password",
            "value": oldPassword.value,
          },
          {
            "key": "new_password",
            "value": newPassword.value,
          },
        ];
        this.props.setLoader(true);
        this.props.change(endpoints.changePassword, formDataGenerator(data));
      }
    }
  };

  closeModalHandler = ()=>{
    const { closeChangePasswordModal, changePasswordModalClosed, openSignInModal } = this.props;
    this.logoutUser();
    changePasswordModalClosed();
    this.context.router.push('/');
    closeChangePasswordModal();
    openSignInModal();
  };

  showPassword = (data) => {
    let {newPassword, oldPassword, confirmNewPassword} = this.state;
    if(data ==='oldPassword'){
      if (oldPassword.type === 'password')
        oldPassword.type = 'text';
      else
        oldPassword.type = 'password';
      this.setState({oldPassword});
    }else if(data==='newPassword'){
      if (newPassword.type === 'password')
        newPassword.type = 'text';
      else
        newPassword.type = 'password';
      this.setState({newPassword});
    }else{
      if (confirmNewPassword.type === 'password')
        confirmNewPassword.type = 'text';
      else
        confirmNewPassword.type = 'password';
      this.setState({confirmNewPassword});
    }
  };

  render() {
    let {newPassword, oldPassword, confirmNewPassword, onSubmit, minPasswordLength, maxPasswordLength, isNotEqual}=this.state;
    const { closeChangePasswordModal, passwordChanged, closeModal } = this.props;
    return (
      <div className='container'><Loader {...this.props} />
        <Header closeModal={closeModal} />
        {
          passwordChanged.isPasswordChanged
            ? <div className='forgot-password-reset'>
              <div className='resets-success'>
                <p>Your Password has been Successfully Changed.</p>
                <button type='button' className='changePasswordButton' onClick={this.closeModalHandler}>Login</button>
              </div>
            </div>
            : <div className='change-password-container'>
              <h3>Change Password</h3>
              <div onClick={closeChangePasswordModal}  className='close-icon'><i className='icon-cross'></i></div>
              <ul className='change-password-form'>
                {passwordChanged.error!=null
                  ?
                  <p id='errorMessage'className='form-group text-danger txt-center'>{passwordChanged.error.description}</p>
                  :
                  null
                }
                {
                  isNotEqual ?
                    <p className='form-group text-danger txt-center'>The password you entered did not match. Please try again.</p> :
                    null
                }
                <li className='form-group'>
                  <input className='form-control' id='password' type={oldPassword.type} placeholder='Old Password'
                         ref='oldPassword'
                         onChange={(e) => this.changeHandler(e.target.value, 'oldPassword', true)} required />
                  <span className='show-password' onClick={(e)=>this.showPassword('oldPassword')}>{oldPassword.type === 'password'? 'SHOW' : 'HIDE'}</span>
                  <p className='form-group text-danger'>
                    {oldPassword.changed && (!lessThan(oldPassword.value, minPasswordLength) || !greaterThan(oldPassword.value, maxPasswordLength)) && `Password length must be ${minPasswordLength}-${maxPasswordLength} Characters.`}
                    {onSubmit && !isRequired(oldPassword.value) && 'Mandatory Field.'}
                  </p>
                </li>

                <li className='form-group'>
                  <input className='form-control' id='password' type={newPassword.type} placeholder='New Password'
                         ref='newPassword'
                         onChange={(e) => this.changeHandler(e.target.value, 'newPassword', true)} required />
                  <span className='show-password' onClick={(e)=>this.showPassword('newPassword')}>{newPassword.type === 'password'? 'SHOW' : 'HIDE'}</span>
                  <p className='form-group text-danger'>
                    {newPassword.changed && (!lessThan(newPassword.value, minPasswordLength) || !greaterThan(newPassword.value, maxPasswordLength)) && `Password length must be ${minPasswordLength}-${maxPasswordLength} Characters.`}
                    {onSubmit && !isRequired(newPassword.value) && 'Mandatory Field.'}
                  </p>
                </li>

                <li className='form-group'>
                  <input className='form-control' id='password' type={confirmNewPassword.type} placeholder='Confirm New Password'
                         ref='newPassword'
                         onChange={(e) => this.changeHandler(e.target.value, 'confirmNewPassword', true)} required />
                  <span className='show-password' onClick={(e)=>this.showPassword('confirmNewPassword')}>{confirmNewPassword.type === 'password'? 'SHOW' : 'HIDE'}</span>
                  <p className='form-group text-danger'>
                    {confirmNewPassword.changed && (!lessThan(confirmNewPassword.value, minPasswordLength)  || !greaterThan(confirmNewPassword.value, maxPasswordLength)) && `Password length must be ${minPasswordLength}-${maxPasswordLength} Characters.`}
                    {onSubmit && !isRequired(confirmNewPassword.value) && 'Mandatory Field.'}
                  </p>
                </li>
                <li className='form-group txt-center'>
                  <button className='changePasswordButton' onClick={this.changePassword}>Change Password</button>
                </li>
              </ul>
            </div>
        }
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    login: state.authentication.login,
    loader: state.loader,
    passwordChanged: state.authentication.passwordChanged,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: bindActionCreators(setLoader,dispatch),
    change: bindActionCreators(changePassword, dispatch),
    logout: bindActionCreators(logout, dispatch),
    changePasswordModalClosed: bindActionCreators(changePasswordModalClosed, dispatch),
    clearErrors: bindActionCreators(clearErrors, dispatch),
  };
};

ChangePassword.propTypes = {
  login: React.PropTypes.object.isRequired,
  passwordChanged: React.PropTypes.object.isRequired,
  setLoader: React.PropTypes.func.isRequired,
  clearErrors: React.PropTypes.func.isRequired,
  change: React.PropTypes.func.isRequired,
  closeChangePasswordModal: React.PropTypes.func.isRequired,
  openChangePasswordModal: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
  changePasswordModalClosed: React.PropTypes.func.isRequired,
  openSignInModal: React.PropTypes.func.isRequired,
  closeModal: React.PropTypes.func.isRequired,
};

ChangePassword.contextTypes = {
  router: React.PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);


