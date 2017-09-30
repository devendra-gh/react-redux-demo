import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  isRequired,
  lessThan,
  greaterThan,
  validateEmail,
  formatDatetoDDMMYY,
  getTodaysDate,
  validateFullName,
} from '../../../../util/validations';
import {formDataGenerator} from '../../../../util/formDataGenerator';

import {filterArray} from '../../../../util/mapingFilters';
import {
  signUpNewUser,
  clearSignUpErrors,
  checkEmailExists,
  kalturaConfiguration,
} from '../../../../actions/authentication';
import {setLoader} from '../../../../actions/loader';
import endpoints from '../../../../endpoints/authentication';
import Loader from '../../../Loader';
import {isset} from '../../../../util/common';
import Banner from '../Banner';
import {languages} from '../../../../constants/languages';

import PaperRipple from 'react-paper-ripple';
import includes from 'array-includes';

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputFields: ['firstname', 'lastname', 'email', 'password', 'age', 'location'],
      onSubmit: false,
      onNext: false,
      openLanguage: false,
      type: 'password',
      callDispatched: false,
      minPasswordLength: 6,
      maxPasswordLength: 15,
      languages,
      languageList: ['English','Hindi'],
      checkEmail: false,
    };
  }

  componentWillMount() {
    const {inputFields} = this.state;
    inputFields.map((input)=> {
      let value = '';
      if (input === 'location')
        value = 'Location';

      this.setState({
        [input]: {
          value,
          changed: false,
        },
      });

    });
  }

  componentWillUnmount() {
    const {clearSignUpErrors}=this.props;
    clearSignUpErrors();
  }

  changeHandler = (target, property, changed = 'true')=> {
    if(property == 'age'){
      target.className=(target.value!=''?'form-control has-value':'form-control');
    }
    const reg = /([#0-9]\u20E3)|[\xA9\xAE\u203C\u2047-\u2049\u2122\u2139\u3030\u303D\u3297\u3299][\uFE00-\uFEFF]?|[\u2190-\u21FF][\uFE00-\uFEFF]?|[\u2300-\u23FF][\uFE00-\uFEFF]?|[\u2460-\u24FF][\uFE00-\uFEFF]?|[\u25A0-\u25FF][\uFE00-\uFEFF]?|[\u2600-\u27BF][\uFE00-\uFEFF]?|[\u2900-\u297F][\uFE00-\uFEFF]?|[\u2B00-\u2BF0][\uFE00-\uFEFF]?|(?:\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDEFF])[\uFE00-\uFEFF]?/g;
    const newValue = (target.value).replace(reg, '');
    this.setState({
      [property]: {
        value: newValue,
        changed,
      },
    });
  }

  saveAge = (value) => {
    const reg = /([#0-9]\u20E3)|[\xA9\xAE\u203C\u2047-\u2049\u2122\u2139\u3030\u303D\u3297\u3299][\uFE00-\uFEFF]?|[\u2190-\u21FF][\uFE00-\uFEFF]?|[\u2300-\u23FF][\uFE00-\uFEFF]?|[\u2460-\u24FF][\uFE00-\uFEFF]?|[\u25A0-\u25FF][\uFE00-\uFEFF]?|[\u2600-\u27BF][\uFE00-\uFEFF]?|[\u2900-\u297F][\uFE00-\uFEFF]?|[\u2B00-\u2BF0][\uFE00-\uFEFF]?|(?:\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDEFF])[\uFE00-\uFEFF]?/g;
    const newValue = value.replace(reg, '');
    this.setState({
      age: {
        value: newValue,
        changed: true,
      },
    });
  };

  showHandler = () => {
    let inputType = '';
    if (this.state.type === 'password')
      inputType = 'text';
    else
      inputType = 'password';
    this.setState({
      type: inputType,
    });
  }

  checkEmail = () => {
    const {email} = this.state;
    const {checkEmailExists, setLoader} = this.props;
    if (validateEmail(email.value)) {
      let data = [
        {
          'key': 'email',
          'value': email.value,
        },
      ];
      // setLoader(true);
      checkEmailExists(endpoints.checkEmailExists, formDataGenerator(data), ()=>{
        this.setState({checkEmail:true});
      });
    }
  }

  checkMaximumDate = () => {
    if(this.textInput){
      if(getTodaysDate()<this.textInput.value){
        return true;
      }
      else{
        return false;
      }
    }
  }

  handleNext = () => {
    this.setState({
      onNext: true,
    });
    const {
      state:{firstname, lastname, email, password, age, location, minPasswordLength, maxPasswordLength, checkEmail},
      props:{authentication:{checkEmailExist,isLoading}},
    }=this;

    if (checkEmail && !checkEmailExist && !isLoading && isRequired(firstname.value) && isRequired(lastname.value) && isRequired(email.value) && isRequired(password.value) && isRequired(age.value) && validateEmail(email.value) && lessThan(password.value, minPasswordLength) && greaterThan(password.value, maxPasswordLength) && !this.checkMaximumDate()) {
      this.setState({
        openLanguage: true,
      });
    }

  };

  handleSignUp = () =>{
    const {
      state:{firstname, lastname, email, password, age, location, languageList},
      props:{signUpNewUser,setLoader},
    }=this;

    let data = [
      {
        "key": "emailid",
        "value": email.value,
      },
      {
        "key": "password",
        "value": password.value,
      },
      {
        "key": "firstname",
        "value": firstname.value,
      },
      {
        "key": "lastname",
        "value": lastname.value,
      },
      {
        "key": "birthdate",
        "value": formatDatetoDDMMYY(age.value),
      },
      {
        "key": "Languages",
        "value": languageList.toString(),
      },
    ];

    if (location.value !== 'Location')
      data.push({
        "key": "Country",
        "value": location.value,
      })
    setLoader(true);
    signUpNewUser(endpoints.signup, formDataGenerator(data), ()=> {
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
      kalturaConfiguration(endpoints.kalturaRegistration, formDataGenerator(kalturaData));
    });
  }

  getOptionList(list) {
    let optionList = '';
    if (list.length !== 0)
      optionList = list.map((country, key)=> {
        return (
          <option key={key} value={country.name}>{country.name}</option>
        );
      });
    return optionList;
  }

  modalHandler = ()=> {
    const {closeSignUpModal, openSignInModal} = this.props;
    closeSignUpModal();
    openSignInModal();
  };

  addLanguageList = (languageItem) => {
    const {languageList} = this.state;
    if(languageItem!="English" && languageItem!="Hindi"){
      this.setState({
        languageList: filterArray(languageList, languageItem)
      });
    }
  };

  getLanguages = (language, languageList) => {
    if (language.length)
      return language.map((languageItem, index)=> {
        if(!includes(languageList, languageItem.name))
          return (
            <li key={index} onClick={()=>this.addLanguageList(languageItem.name)}>
              {languageItem.name}
            </li>
          );
        else
          return (
            <li className='selected-language' key={index} onClick={()=>this.addLanguageList(languageItem.name)}>
              {languageItem.name}
            </li>
          );
      });
  };

  goBack = ()=> {
    this.setState({
      openLanguage: false,
    });
  };

  render() {

    const {email, languageList, languages, firstname, lastname, password, age, location, onSubmit, openLanguage, onNext, type, minPasswordLength, maxPasswordLength}=this.state;
    const {
      authentication:{
        signup:{
          error,
        },
        checkEmail:{
          checkEmailExist,
          isLoading,
        },
      },
      country:{
        list,
      },
    } = this.props;

    return (
      <div>
        {!openLanguage ?
          <div>
            <Banner />
            <ul className='signup-form'>
              <li className='form-group'>
                <p className='form-group text-danger'>
                  {error.message}
                </p>
              </li>

              <li className='form-group'>
                <span className='star-input'>*</span>
                {isRequired(firstname.value) && <small>First Name</small>}
                <input
                  className='form-control'
                  type='text'
                  placeholder='First Name'
                  value={firstname.value}
                  onChange={(e)=>this.changeHandler(e.target,'firstname',true)}
                  maxLength='20'
                  required
                />
                <p className='form-group text-danger'>
                  {onNext && !isRequired(firstname.value) && 'First name is required.'}
                </p>
              </li>

              <li className='form-group'>
                <span className='star-input'>*</span>
                {isRequired(lastname.value) && <small>Last Name</small>}
                <input
                  className='form-control'
                  value={lastname.value}
                  type='text' placeholder='Last Name'
                  onChange={(e)=>this.changeHandler(e.target,'lastname',true)}
                  maxLength='20'
                  required />
                <p className='form-group text-danger'>
                  {onNext && !isRequired(lastname.value) && 'Last name is required.'}
                </p>
              </li>

              <li className='form-group'>
                <span className='star-input'>*</span>
                {isRequired(email.value) && <small>Email Address</small>}
                <input
                  className='form-control'
                  value={email.value}
                  type='text' placeholder='Email Address'
                  onBlur={this.checkEmail}
                  onChange={(e)=>this.changeHandler(e.target,'email',true)}
                  required
                />
                {isLoading ? <div className='small-loader' /> : ''}
                <p className='form-group text-danger'>
                  {validateEmail(email.value) && checkEmailExist && 'The email address you entered is already registered.'}
                  {onNext && !isRequired(email.value) && 'Email is required.'}
                  {email.changed && !validateEmail(email.value) && 'Enter a valid email address.'}
                </p>
              </li>

              <li className='form-group'>
                <span className='star-input'>*</span>
                {isRequired(password.value) && <small>Enter Password</small>}
                <input
                  className='form-control'
                  value={password.value}
                  type={type} placeholder='Enter Password'
                  onChange={(e)=>this.changeHandler(e.target,'password',true)}
                  onCut={(e)=>e.preventDefault()}
                  onCopy={(e)=>e.preventDefault()}
                  onPaste={(e)=>e.preventDefault()}
                  required
                />
                <span className='show-password' onClick={this.showHandler}>{type === 'password' ? 'SHOW' : 'HIDE'}</span>
                <p className='form-group text-danger'>
                  {onNext && !isRequired(password.value) && 'Password is required.'}
                  {password.changed && (!lessThan(password.value, minPasswordLength) || !greaterThan(password.value, maxPasswordLength)) && `Password length must be ${minPasswordLength}-${maxPasswordLength} Characters.`}
                </p>
              </li>

              <li className='form-group'>
                <small>Date of Birth</small>
                <div>
                  <input
                    ref={(input) => {this.textInput = input;}}
                    className='form-control'
                    type='date'
                    max={getTodaysDate()}
                    value={age.value}
                    placeholder='DD/MM/YY'
                    onChange={(e)=>this.changeHandler(e.target,'age',true)}
                    onBlur={(e)=>this.saveAge(e.target.value)}
                  />
                </div>
                <p className='form-group text-danger'>
                  {age.changed && !isRequired(age.value) && 'Please enter a valid date.'}
                  {age.changed && isRequired(age.value) && this.checkMaximumDate() && 'Please enter a valid date.'}
                  {onNext && !isRequired(age.value) && 'Date is Required'}
                </p>
              </li>

              <li className='form-group'>
                {isRequired(location) && <small>Location</small>}
                <select
                  className='form-control'
                  onChange={(e)=>this.changeHandler(e.target,'location',true)}
                  value={location.value}
                >
                  <option value='Location'>Location</option>
                  {this.getOptionList(list)}
                </select>
              </li>

              <li className='form-group txt-center'>
                <button className={"btn-danger " + (checkEmailExist ? 'button-disabled' : '')} onClick={this.handleNext}>Next</button>
              </li>

              <li className='form-group txt-center'>
                Already a member?
                <button type='button' onClick={this.modalHandler} className='link-buttons register-link'>Login</button>
              </li>

            </ul>
          </div> :

          <div className='language-preference'>
            <Loader {...this.props} />
            <div>
              <h4>Language Preferences</h4>
              <p>Help us with your language preferences. We will ensure you having a better viewing experience.</p>
            </div>
            <div>
              <ul className='languages'>
                {this.getLanguages(languages, languageList)}
              </ul>
            </div>
            <div>
              <ul className='signup-form'>
                <li>
                  <p onClick={this.goBack}>
                    <i className="icon-left-thin" />
                    Back
                  </p>
                </li>
                <li className='form-group txt-center'>
                  <button className='btn-danger' onClick={this.handleSignUp}>SignUp</button>
                </li>
                {/*<li className='form-group txt-center'>
                  Already a member?
                  <button type='button' onClick={this.modalHandler} className='link-buttons register-link'>Login</button>
                </li>*/}
              </ul>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    authentication: state.authentication,
    login: state.authentication.login,
    loader: state.loader,
    country: state.country,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    signUpNewUser: bindActionCreators(signUpNewUser, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
    clearSignUpErrors: bindActionCreators(clearSignUpErrors, dispatch),
    checkEmailExists: bindActionCreators(checkEmailExists, dispatch),
    kalturaConfiguration: bindActionCreators(kalturaConfiguration, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);

Form.propTypes = {
  authentication: React.PropTypes.object.isRequired,
  login: React.PropTypes.object.isRequired,
  country: React.PropTypes.object.isRequired,
  loader: React.PropTypes.object.isRequired,
  signUpNewUser: React.PropTypes.func.isRequired,
  setLoader: React.PropTypes.func.isRequired,
  clearSignUpErrors: React.PropTypes.func.isRequired,
  checkEmailExists: React.PropTypes.func.isRequired,
  closeSignUpModal: React.PropTypes.func.isRequired,
  openSignInModal: React.PropTypes.func.isRequired,
  kalturaConfiguration: React.PropTypes.func.isRequired,
};

Form.contextTypes = {
  store: React.PropTypes.object,
  router: React.PropTypes.object.isRequired,
};

