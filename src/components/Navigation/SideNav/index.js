import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {logout} from '../../../actions/authentication';
import endpoints from '../../../endpoints/navigation';
import {COOKIE} from '../../../constants';
import {setLoader} from '../../../actions/loader';
import cookie from 'react-cookie';
import mixPanel from '../../../util/mixPanel';
import {sideNav} from '../../../constants';
import {toastr} from 'react-redux-toastr';
import appBoyEvent from '../../../util/appboyEvent';

const toastrOptions = {
  timeOut: 0, // by setting to 0 it will prevent the auto close
  showCloseButton: false,
  component:<div className='toaster_custom'><span>Logged out successfully</span></div>,
};


class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideNav,
    };
    this.createSideNav = this.createSideNav.bind(this);
  }
  //Note: Changed the code to static as per the new discussion
  // componentWillMount() {
  //   const { config } = this.props.config;
  //   const path = `${config.assets.API.API_DOMAIN}${config.assets.API.API_GATWAYS}menu.json`;
  //   const menu = {
  //     path: path,
  //     method: 'GET',
  //     query: getParams(),
  //   };
  //   this.props.fetchMenu(menu);
  // }

  navigate(e, menuItem) {
    document.body.className = "";
    if (menuItem.menuLabel === 'LOGOUT') {
      this.logoutUser();
    } else {

      // browserHistory.push(menuItem.menuLabel);
    }
  }

  logoutUser() {
    // this.props.setLoader(true);
    cookie.remove(COOKIE.USER_ID);
    cookie.remove(COOKIE.KALTURA_PLAYER_CONFIG_IDS);
    mixPanel.signOutMix();
    if(location.pathname === '/myvoot'){
      this.context.router.push('/');
      this.props.logout();
      toastr.info('', toastrOptions);
      this.removeToasterMsgs('info');
    }
    else{
      this.props.logout();
      toastr.info('', toastrOptions);
      this.removeToasterMsgs('info');
    }
    document.getElementsByTagName('body')[0].className='';

    if(typeof window !== "undefined") {
      appBoyEvent.isSignOut();
    }
  }

  removeToasterMsgs = (type) => {
    setTimeout(function(){ toastr.removeByType(type) }, 3000);
  };

  signInModalHandler = ()=>{
    document.body.className = "";
    const { openSignInModal } = this.props;
    openSignInModal();
  };
  signUpModalHandler = ()=>{
    document.body.className = "";
    const { openSignUpModal } = this.props;
    openSignUpModal();
  };
  createSideNav=(item, index)=>{
    if (this.props.isLogin) {
      let arr = ['SignIn', 'SignUp'];
      if (arr.indexOf(item.menuLabel) === -1) {
        if(item.menuLabel === 'Logout'){
          return(
            <li key={index} onClick={()=>this.logoutUser()}>
              <a href='#'>
                <i className={item.iconName}></i>
                <span>{item.menuLabel}</span>
              </a>
            </li>
          );
        }
        return (
          <li key={index}>
            <Link onlyActiveOnIndex activeClassName='active' onClick={(e) => {
              this.navigate(e, item);
            }} to={item.redirectUrl ? item.redirectUrl : ''}>
              <i className={item.iconName}></i>
              <span>{item.menuLabel}</span>
            </Link>
          </li>
        );
      }
    } else {
      let arr = ['My Voot', 'Logout','Shows Following'];
      if (arr.indexOf(item.menuLabel) === -1) {
        if(item.menuLabel === 'SignIn'){
          return (
            <li key={index} onClick={this.signInModalHandler}>
              <a href='#'>
                <i className={item.iconName}></i>
                <span>{'Sign In'}</span>
              </a>
            </li>
          );
        }
        if(item.menuLabel === 'SignUp'){
          return (
            <li key={index} onClick={this.signUpModalHandler}>
              <a href='#'>
                <i className={item.iconName}></i>
                <span>{'Sign Up'}</span>
              </a>
            </li>
          );
        }
        return (
          <li key={index}>
            <Link onlyActiveOnIndex activeClassName='active' onClick={(e) => {
              this.navigate(e, item);
            }} to={item.redirectUrl ? item.redirectUrl : ''}>
              <i className={item.iconName}></i>
              <span>{item.menuLabel}</span>
            </Link>
          </li>
        );
      }
    }
  };

  render() {
    let menu = this.state.sideNav;
    let navItem = menu.length && menu.map(this.createSideNav);

    return (
      <div className='side-nav-container'>
        {/*<Loader {...this.props} />*/}
        <div className='side-nav view'>
          <div className='align-middle'>
            <ul className='align-middle-cell'>
              {navItem}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

SideNav.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

SideNav.propTypes =
  {
    //menu: React.PropTypes.object.isRequired,
    isLogin: React.PropTypes.bool.isRequired,
    // fetchMenu: React.PropTypes.func.isRequired,
    logout: React.PropTypes.func.isRequired,
    config: React.PropTypes.object.isRequired,
    setLoader: React.PropTypes.func.isRequired,
    openSignInModal: React.PropTypes.func.isRequired,
    openSignUpModal: React.PropTypes.func.isRequired,
  };

const mapStateToProps = (state, ownProps) => {
  return {
    // menu: state.sideNav,
    loader: state.loader,
    isLogin: state.authentication.login.isLogin,
    config: state.config,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchMenu: bindActionCreators(fetchMenu, dispatch),
    logout: bindActionCreators(logout, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
  };
};


export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(SideNav);
