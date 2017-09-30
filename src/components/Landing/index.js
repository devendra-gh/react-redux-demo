import React, {Component} from 'react';
import SideNavigation from '../Navigation/SideNav';
import Header from '../Header/DefaultHeader';
import Footer from '../Footer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Modal from 'react-modal';
import Login from '../Authentication/Login';
import SignUp from '../Authentication/SignUp';
import ForgotPassword from '../Authentication/ResetPassword/ForgotPassword/ForgotPassword';
import customStyles from '../../general/modalCustomStyle';
import {setLoader} from '../../actions/loader';
import  {environment} from '../../config';
import  {LR, COOKIE} from '../../constants';
import cookie from 'react-cookie';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSignInModal: false,
      openSignUpModal: false,
      forgotPassword: false,
    };
  }
  // componentWillMount(){
  //   //const {setLoader} = this.props;
  //   //setLoader(true);
  // }
  componentDidUpdate() {
    //needs refactoring
    if(typeof document != 'undefined' && this.props && this.props.location) {
      if(this.props.location.pathname.match(/(\/shows)|(\/clip)/g)) {
        for (let i = 0; i < ((document.querySelectorAll("[href='/shows']") || document.querySelectorAll("[href='/clip']")).length); i++) {
          document.querySelectorAll("[href='/shows']")[i] ? document.querySelectorAll("[href='/shows']")[i].className = 'active' : false;
          document.querySelectorAll("[href='/kids']")[i] ? document.querySelectorAll("[href='/kids']")[i].className = '' : false;
          document.querySelectorAll("[href*='/movie']")[i] ? document.querySelectorAll("[href*='/movie']")[i].className = '' : false;
          document.querySelectorAll("[href*='/channels']")[i] ? document.querySelectorAll("[href*='/channels']")[i].className = '' : false;
        }
        return;
      }
      else if(this.props.location.pathname.match(/(\/kids)/g)) {
        for (let i = 0; i < document.querySelectorAll("[href='/kids']").length; i++) {
          document.querySelectorAll("[href='/shows']")[i] ? document.querySelectorAll("[href='/shows']")[i].className = '' : false;
          document.querySelectorAll("[href='/kids']")[i] ? document.querySelectorAll("[href='/kids']")[i].className = 'active' : false;
          document.querySelectorAll("[href*='/movie']")[i] ? document.querySelectorAll("[href*='/movie']")[i].className = '' : false;
          document.querySelectorAll("[href*='/channels']")[i] ? document.querySelectorAll("[href*='/channels']")[i].className = '' : false;
        }
        return;
      }
      else if(this.props.location.pathname.match(/(\/movie)/g)){
        for (let i = 0; i < document.querySelectorAll("[href*='/movie']").length; i++) {
          document.querySelectorAll("[href='/shows']")[i] ? document.querySelectorAll("[href='/shows']")[i].className = '' : false;
          document.querySelectorAll("[href='/kids']")[i] ? document.querySelectorAll("[href='/kids']")[i].className = '' : false;
          document.querySelectorAll("[href*='/movie']")[i] ? document.querySelectorAll("[href*='/movie']")[i].className = 'active' : false;
          document.querySelectorAll("[href*='/channels']")[i] ? document.querySelectorAll("[href*='/channels']")[i].className = '' : false;
        }
        return;
      }
      else if(this.props.location.pathname.match(/(\/channels)/g)) {
        for (let i = 0; i < document.querySelectorAll("[href*='/channels']").length; i++) {
          document.querySelectorAll("[href='/shows']")[i] ? document.querySelectorAll("[href='/shows']")[i].className = '' : false;
          document.querySelectorAll("[href='/kids']")[i] ? document.querySelectorAll("[href='/kids']")[i].className = '' : false;
          document.querySelectorAll("[href*='/movie']")[i] ? document.querySelectorAll("[href*='/movie']")[i].className = '' : false;
          document.querySelectorAll("[href*='/channels']")[i] ? document.querySelectorAll("[href*='/channels']")[i].className = 'active' : false;
        }
        return;
      }
      else {
        for (let i = 0; i < document.querySelectorAll("[href='/']").length; i++) {
          document.querySelectorAll("[href='/shows']")[i] ? document.querySelectorAll("[href='/shows']")[i].className = '' : false;
          document.querySelectorAll("[href='/kids']")[i] ? document.querySelectorAll("[href='/kids']")[i].className = '' : false;
          document.querySelectorAll("[href*='/movie']")[i] ? document.querySelectorAll("[href*='/movie']")[i].className = '' : false;
          document.querySelectorAll("[href*='/channels']")[i] ? document.querySelectorAll("[href*='/channels']")[i].className = '' : false;
        }
        return;
      }
    }
  }

  playVideo = ()=> {
    const kdp = document.getElementById('kaltura_player');
    //console.log('kdp',kdp);
    if(typeof kdp === 'undefined' || kdp === null) {
      return false;
    }else{
      if(cookie.load(COOKIE.PLAYER)!== '0') {
        kdp.sendNotification("doPlay");
      }
      return true;
    }
  };
  pauseVideo=()=> {
    const kdp = document.getElementById('kaltura_player');
    //console.log('kdp',kdp);
    if (typeof kdp === 'undefined' || kdp === null) {
      return false;
    }
    else{
      if(cookie.load(COOKIE.PLAYER)!== '0') {
        kdp && kdp.sendNotification && kdp.sendNotification("doPause");
      }
      return true;
    }
  };

  openSignInModal=()=>{
    this.pauseVideo();
    document.getElementsByTagName('body')[0].className = 'body-static';
    this.setState({openSignInModal: true});
  };
  closeSignInModal=()=> {
    document.getElementsByTagName('body')[0].className = '';
    this.setState({openSignInModal: false});
    this.playVideo();
  };
  openSignUpModal=()=>{
    this.pauseVideo();
    document.getElementsByTagName('body')[0].className = 'body-static';
    this.setState({openSignUpModal: true});
  };
  closeSignUpModal=()=> {
    document.getElementsByTagName('body')[0].className = '';
    this.setState({openSignUpModal: false});
    this.playVideo();
  };
  openForgotPasswordModal=()=>{
    document.getElementsByTagName('body')[0].className = 'body-static';
    this.setState({forgotPassword: true});
  };
  closeForgotPasswordModal=()=> {
    document.getElementsByTagName('body')[0].className = '';
    this.setState({forgotPassword: false});
  };


  closeModal = ()=>{
    const {
      openSignInModal,
      openSignUpModal,
      forgotPassword,
    } = this.state;
    if(openSignInModal){
      this.closeSignInModal();
    }
    if(openSignUpModal){
      this.closeSignUpModal();
    }
    if(forgotPassword){
      this.closeForgotPasswordModal();
    }
  };

  sideNavCloser = ()=> {
    document.body.className = "";
  };


  render() {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        openSignInModal: this.openSignInModal,
        closeModal: this.closeModal,
      })
    );

    return (
      <div>
        <SideNavigation openSignInModal={this.openSignInModal}  openSignUpModal={this.openSignUpModal} router={this.context.router}  />
        <div className='main-container view'>

          <span onClick={this.sideNavCloser} className='body-close'></span>

          <div className='content-container'>
            <Header openSignInModal={this.openSignInModal} closeModal={this.closeModal} {...this.props} />
            <div className='middle-content'>{childrenWithProps}</div>
            {
              childrenWithProps[0].props.route.path === '/myvoot' ? '' : <Footer />
            }
          </div>
        </div>
        <Modal
          ref='signInModal'
          isOpen={this.state.openSignInModal}
          style={customStyles}
          contentLabel='Modal'
        >
          <Login
            closeSignInModal={this.closeSignInModal}
            openSignUpModal={this.openSignUpModal}
            openForgotPasswordModal={this.openForgotPasswordModal}
            closeModal={this.closeModal}
          />
        </Modal>
        <Modal
          ref='signUpModal'
          isOpen={this.state.openSignUpModal}
          style={customStyles}
          contentLabel='Modal'
        >
          <SignUp
            closeSignUpModal={this.closeSignUpModal}
            openSignInModal={this.openSignInModal}
            closeModal={this.closeModal}
          />
        </Modal>
        <Modal
          ref='forgotPassword'
          isOpen={this.state.forgotPassword}
          style={customStyles}
          contentLabel='Modal'
        >
          <div className='forgot-model'>
            <ForgotPassword
              closeSignInModal={this.closeSignInModal}
              openSignInModal={this.openSignInModal}
              closeForgotPasswordModal={this.closeForgotPasswordModal}
              closeModal={this.closeModal}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

Landing.propTypes = {
  children: React.PropTypes.element.isRequired,
  setLoader: React.PropTypes.func.isRequired,
  loader: React.PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: bindActionCreators(setLoader, dispatch),
  };
};


const mapStateToProps = (state, ownProps) => {
  return {
    loader: state.loader,
  };
};

Landing.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
