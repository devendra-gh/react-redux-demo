import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loader from './components/Loader';
import {createMarkup} from './util/helper';
import {login} from './actions/authentication';
import { getConfig } from './actions/configAction';
import { getMediaInfo } from './actions/getMediaInfo';
import { home } from './actions/home';
import {setLoader} from './actions/loader';
import {getDeviceInfo} from './actions/deviceAction';
import {customPageAction} from './actions/customPageAction';
import {getKidsHomeData} from './actions/kids';
import {playlist} from './actions/playlist';
import {getMovieCarousel} from './actions/moviesAction';
import ReduxToastr from 'react-redux-toastr';
import {getTvShowsCarousel, getTvShowsData, appendTvShowsData, clearTvShowsErrors, clearTvSeriesData} from '../src/actions/shows';
import {getChannelMedias} from './actions/channelMediasAction';
import {get_domain_url} from './constants/seoConstant';
import cookie from 'react-cookie';
import {COOKIE} from '../src/constants';
import mixPanel from '../src/util/mixPanel';
import './styles/core.scss';


class App extends Component {
  constructor(props) {
    super(props);
    this.markup = {
      "@context": "http://schema.org",
      "@type": "Organization",
      "url": "http://www.voot.com",
      "logo": get_domain_url() + "/apple-touch-icon-144x144.png",
      "name" : "Voot",
      "contactPoint": [
        { "@type": "ContactPoint",
          "email": "support@voot.com",
          "faxNumber": "+91-22425-81403",
          "telephone": "+91-22425-81818",
          "contactType": "customer support",
        }],
      "sameAs": [ "http://www.facebook.com/voot/",
        "http://twitter.com/justvoot",
        "http://www.youtube.com/channel/UCFHhFwEdsLs2wuvh1YdChHw",
        "https://plus.google.com/+JustVoot",
        "http://play.google.com/store/apps/details?id=com.tv.v18.viola&hl=en"],
    };
    this.state = {
      isLogin: this.props.isLogin,
    }
  }

  componentWillMount(){
    cookie.remove(COOKIE.PLAYER);
    if(this.props.config && ! this.props.config.config.assets){
      this.props.getConfig();
    }
    if(!this.state.isLogin){
      //console.log('not login');
    }
  }

  componentDidMount(){
    if(typeof window != 'undefined') {
      window.onpopstate = this.onBackButtonEvent;
    }
    if(typeof document !== "undefined"){
      const windowWidth = window.innerWidth || document || document.documentElement || document.documentElement.clientWidth || document.body.clientWidth;
      this.props.getDeviceInfo(windowWidth);
    }
    this.props.login();
  }

  componentWillReceiveProps = (nextProps) => {
    const {isLogin} = nextProps;
    if(this.state.isLogin!=isLogin){
      this.setState({isLogin});
      if(!isLogin) {

      }
    }
  };

  onBackButtonEvent=()=> {
    // console.log('onbackbutton');
    if(typeof document!='undefined' && document.getElementsByTagName('body')[0]) {
      document.getElementsByTagName('body')[0].className = '';
    }
  };

  render() {
    const { config } = this.props;
    if(config.isLoading){
      return(
        <Loader loader={{load:true}} />
      );
    }
    else{
      if(!this.props.isLogin){
        //mixPanel.authenticated('Guest', '', 'F', '', '', '', '', '', '');
      }
      return(
        <div className='container'>
          {this.props.children}
          {createMarkup(this.markup)}
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position='bottom-center'
            transitionIn='fadeIn'
            transitionOut='fadeOut'
            progressBar={false}
            showCloseButton={false}
          />
        </div>
      );
    }

  }
}

App.need = [
  // getChannelMedias,
  // login,
  // getConfig,
  // home, //
  // getMediaInfo,
  // playlist, //
  // getMovieCarousel, //
  // customPageAction, //
  // getKidsHomeData, //
];

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  config: React.PropTypes.object.isRequired,
  getConfig: React.PropTypes.func.isRequired,
  getDeviceInfo: React.PropTypes.func.isRequired,
  login: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    getConfig: bindActionCreators(getConfig, dispatch),
    getDeviceInfo: bindActionCreators(getDeviceInfo, dispatch),
    login: bindActionCreators(login, dispatch),
  };
};
const mapStateToProps =({config, authentication:{login:{isLogin}}}) => {
  return {
    config,
    isLogin,
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
