// partnerId=1918321
// ui_config= 29158152
//32626752

// "Platform": "Web",
//   "SiteGuid": '',
//   "DomainID": 0,
//   "UDID": '',


// function to embed kaltura player .
// pass the media id of the video to play video.
// replace 457932 in the function ( kWidget.embed() and kWidget.thumbEmbed()) with the media id of the video to be played.
// Do not change anything else.

import React, {Component} from 'react';
import PlayList from './PlayList';
import {connect} from 'react-redux';
import endpoints from '../../endpoints/playList';
import {bindActionCreators} from 'redux';
import {getMediaInfo, relatedMedia} from '../../actions/playlist';
import PlayerInner from './PlayerInner/PlayerInner';

import './style.scss';

class Player extends Component {
  constructor(props) {
    super(props);

    /*this.state = {
      width: 0,
      height: 0,
    };
    if(typeof window !== "undefined"){
      this.state = {
        width: window.innerWidth,
        height: (window.innerWidth/ 16 *9),
      };
      window.addEventListener("orientationchange", () =>{
        setTimeout(()=>{
          this.setState({
            width: window.innerWidth,
            height: (window.innerWidth/ 16 *9),
          });
        }, 1000);
        // this.render();

      }, false);
    }*/

  }

  componentWillMount=()=>{
   let mId={
      mediaId:this.props.mediaId,
    };

    /*if(typeof window !== "undefined") {
      this.setState({
        width: window.innerWidth,
        height: (window.innerWidth / 16 * 9),
      });
    }*/

    // const script = document.createElement('script');
    // script.src = 'https://player-as.ott.kaltura.com/225/v2.50.4_viacom_v0.35_v0.5.0_viacom_proxy_v0.4.14/mwEmbed/mwEmbedLoader.php?protocol=https';
    // script.async = false;
    // console.log(script,'------------');
    // document.body.appendChild(script);
    // this.props.getMediaInfo(endpoints.getMediaInfo,mId);
   // this.props.getRelatedMedia(endpoints.relatedMedia,{mediaId:this.props.mId,pageIndex:0});
  };

  componentDidMount = ()=>{
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'PlayerPageView');
    }
  };

  render() {
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    // console.log('this.props.playerData ',this.props.playerData);
    //style={{width:this.state.width,height: this.state.height}}
    return (
      <div className='player-section'>
        <img className='placeholder-image' src='/placeholder-default.png' alt='video placeholder' />
        <PlayerInner mediaId={this.props.mediaId}
                     playerData={this.props.playerData}
                     appBoyLogin={this.props.appBoyLogin}
                     addNowPlayingHanding={this.props.addNowPlayingHanding}
                     getIsCurrentVideoValue={this.props.getIsCurrentVideoValue}
                     resetIsCurrentVideoToFalse={this.props.resetIsCurrentVideoToFalse} />
      </div>
    );
  }
}

Player.propTypes = {
  mediaId: React.PropTypes.string.isRequired,
  playerData: React.PropTypes.object.isRequired,
  addNowPlayingHanding: React.PropTypes.func,
  getIsCurrentVideoValue: React.PropTypes.object,
  resetIsCurrentVideoToFalse: React.PropTypes.func,
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getMediaInfo: bindActionCreators(getMediaInfo, dispatch),
  //  getRelatedMedia: bindActionCreators(relatedMedia, dispatch),
    // // setLoader: bindActionCreators(setLoader, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    // mediaInfo: state.getMediaInfo.mediaInfo,
    //relatedMedia: state.playlist.getRelatedMedia,
//    playlist: state.playlist,
    // loader: state.loader,
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Player);
