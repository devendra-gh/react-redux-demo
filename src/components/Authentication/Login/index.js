import React, {Component} from 'react';
import Header from '../../Header/LoginHeader';
import Banner from './Banner';
import SocialLogin from './Social';
import TraditionalLogin from './Traditional';
import  {environment} from '../../../config';
import  {LR} from '../../../constants';
import Helmet from "react-helmet";

class Login extends Component {

  componentWillMount = ()=>{
    // this.createSocialButton();
  };

  componentDidMount = ()=>{
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'LoginPageView');
    }
  };

  createSocialButton = ()=>{
    const options={};
    options.templatename = "loginradiuscustom_tmpl";
    options.login=true;
    if(typeof window.$LRIC !== "undefined")
      window.$LRIC.util.ready(()=>{
      let options = {};
      options.apikey = LR.KEY;
      options.templatename = "loginradiuscustom_tmpl";
      window.$LRIC.renderInterface("interfacecontainerdiv", options);
    });
  };

  handleScriptInject({ scriptTags }) {
    if (scriptTags) {
      // const scriptTag = scriptTags[0];
      const scriptLoginRadius = scriptTags[0];
      // scriptTag.onload = this.createSocialButton;
      scriptLoginRadius.onload = this.createSocialButton;
    }
  }

  render() {
    const { closeSignInModal, openSignUpModal, openForgotPasswordModal, closeModal } = this.props;
    return (
      <div className='container'>
        <Helmet
          script={[
                    {src: "//hub.loginradius.com/include/js/LoginRadius.js"},
                    // {src: "//cdn.loginradius.com/hub/prod/js/CustomInterface.2.js", type: "text/javascript"},

                ]}
          onChangeClientState={(newState, addedTags) => this.handleScriptInject(addedTags)}
        />
        <Header closeModal={closeModal} />
        <button type='button' onClick={closeSignInModal} className='close-icon'><i className='icon-cross'></i></button>
        <div className='login-container'>
          <Banner />
          <SocialLogin />
          <TraditionalLogin openSignUpModal={openSignUpModal} closeSignInModal={closeSignInModal} openForgotPasswordModal={openForgotPasswordModal} />
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  closeSignInModal : React.PropTypes.func.isRequired,
  openSignUpModal: React.PropTypes.func.isRequired,
  openForgotPasswordModal: React.PropTypes.func.isRequired,
  closeModal: React.PropTypes.func.isRequired,
};
export default Login;
