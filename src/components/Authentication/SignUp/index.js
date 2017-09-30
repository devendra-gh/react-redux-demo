import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Header from '../../Header/LoginHeader';
import Banner from './Banner';
import Form from './Form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchCountry} from '../../../actions/country';
import endpoints from '../../../endpoints/authentication';
import {toastr} from 'react-redux-toastr';
import mixPanel from '../../../util/mixPanel';
import appBoyEvent from '../../../util/appboyEvent';

const toastrSignupOptions = {
  timeOut: 0, // by setting to 0 it will prevent the auto close
  showCloseButton: false,
  component:<div className='toaster_custom'><span>Signed up Successfully</span></div>,
};
const toastrSignupFail = {
  timeOut: 0, // by setting to 0 it will prevent the auto close
  showCloseButton: false,
};
let errorMessage = '';
class SignUp extends Component {

  componentWillMount(){
    this.props.fetchCountry(endpoints.country);
  }

  componentDidMount = ()=>{
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'SignUpPageView');
    }
  };
  componentWillReceiveProps = (nextProps)=> {
    if(nextProps.authentication.signup.isSignUpSuccess){
      this.props.closeSignUpModal();
      let userType = 'Traditional';
      const {data} = nextProps.authentication.login;

      mixPanel.accountCreated(userType,data.Email[0].Value, data.FirstName, data.LastName, data.Uid, data.Country.Name, data.BirthDate, data.CreatedDate, data.FirstLogin, data.Gender, data.Age);

      toastr.success('',toastrSignupOptions);
      this.removeToasterMsgs('success');
    }
    if(nextProps.authentication.signup.isSignUpError){
      if(nextProps.login.error.error){
        errorMessage = nextProps.login.error.error;
      }
      if(nextProps.login.error.message){
        errorMessage = "Invalid user ID or password";
      }
      toastrSignupFail.component = <div className='toaster_custom'><span>{errorMessage}</span></div>;
      toastr.error('',toastrSignupFail);
      this.removeToasterMsgs('error');
    }
  };

  removeToasterMsgs = (type) => {
    setTimeout(function(){ toastr.removeByType(type); }, 3000);
  }

  render() {
    const { closeSignUpModal, openSignInModal, closeModal, country } = this.props;
    return (
      <div className='container'>
        <Helmet
          title='Watch Colors TV Serials, Movies, Kids Entertainment Shows & Videos Online Free at Voot'
          meta={[{property:'title', content:'Watch Colors TV Serials, Movies, Kids Entertainment Shows & Videos Online Free at Voot'},
            {property: 'og:title', content: 'Latest Updates'},
            {property: 'description', content: 'Watch free online videos of Colors TV Serials, Movies, Kids Entertainment Shows at Voot. Get original videos of your favorite TV shows with HD Streaming on your mobile or laptop.'},
          ]} />
        <Header closeModal={closeModal} />
        <button type='button' onClick={closeSignUpModal} className='close-icon'><i className='icon-cross'></i></button>
        <div className='signup-container'>
          <Form  closeSignUpModal={closeSignUpModal} openSignInModal={openSignInModal} country={country} />
          <div className='skip-page txt-center'>
            <button type='button' onClick={this.props.closeSignUpModal} className='link-buttons'>SKIP & EXPLORE</button>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    country: state.country,
    authentication: state.authentication,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    fetchCountry: bindActionCreators(fetchCountry, dispatch),
  };
}

SignUp.propTypes = {
  closeSignUpModal : React.PropTypes.func.isRequired,
  openSignInModal : React.PropTypes.func.isRequired,
  country: React.PropTypes.object.isRequired,
  closeModal: React.PropTypes.func.isRequired,
  fetchCountry: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);


