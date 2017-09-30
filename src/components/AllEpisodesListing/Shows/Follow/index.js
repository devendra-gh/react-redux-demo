import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import endpoints from '../../../../endpoints/playList';
import {getMediaInfo, getIsFollowedInfo, removeFollowedInfo, resetIsFollowedInfo, addFollowedInfo, resetAddFollow, getFollowList} from '../../../../actions/getMediaInfo';
import {setLoader} from '../../../../actions/loader';
import Loader from '../../../Loader';
import HeadCard from '../../../../components/CardLayout/HeadCard';
import ShowsEpisodesShortsTab from '../ShowsEpisodesShortsTab';
import mixPanel from '../../../../util/mixPanel';

import Login from '../../../../components/Authentication/Login';
import Modal from 'react-modal';
import customStyles from '../../../../../src/general/modalCustomStyle';
import {formDataGenerator} from '../../../../util/formDataGenerator';
import appBoyEvent from '../../../../util/appboyEvent';

class Follow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowInfo: {},
      removeFollowInfo: {},
      addFollowInfo: {},
      followList: {},
    };
  }

  componentWillMount() {
    const {getMediaInfo, getIsFollowedInfo, setLoader, tvSeriesId, isFollowInfo, login, mediaInfo} = this.props;
    const seriesId = (mediaInfo && mediaInfo.data && mediaInfo.data.assets && mediaInfo.data.assets.MediaID ) || tvSeriesId;

    const { data } = login;
    if (login.isLogin && login.data.Uid) {
      let queryParamsIsFollowed = [
        {
          'key': 'userKey',
          'value': login.data.Uid,
        },
        {
          'key': 'tvSeriesId',
          'value': seriesId,
        },
      ];

      if(typeof window !== "undefined"){
        getIsFollowedInfo(endpoints.isFollowed, formDataGenerator(queryParamsIsFollowed));
        this.initialize(data);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const {isFollowInfo, addFollowInfo, removeFollowInfo} = nextProps;
    this.setState({
      isFollowInfo,
      addFollowInfo,
      removeFollowInfo,
    });
  }

  componentDidUpdate (prevProps, prevState) {
    const {getIsFollowedInfo, login, resetAddFollow} = this.props;
    if(prevProps.tvSeriesId !== this.props.tvSeriesId){
      resetAddFollow();
      if (login.isLogin && login.data.Uid) {
        let queryParamsIsFollowed = [
          {
            'key': 'userKey',
            'value': login.data.Uid,
          },
          {
            'key': 'tvSeriesId',
            'value': this.props.tvSeriesId,
          },
        ];
        // getIsFollowedInfo(endpoints.isFollowed, formDataGenerator(queryParamsIsFollowed));
      }
    }
  }

  componentWillUnmount(){
    this.props.resetIsFollowedInfo();
  }

  initialize(data) {
    const {getFollowList} = this.props;
    const {Uid} = data;
    if (Uid) {
      const formData = [
        {
          'key': 'userKey',
          'value': Uid,
        },
      ];
      getFollowList(endpoints.followList, formDataGenerator(formData));
    }
  }

  updateFollow(followStatus) {
    const {tvSeriesId, login, seriesMainTitle, followList, getFollowList} = this.props;
    if (login.isLogin && login.data.Uid) {
      let queryParamsIsFollowed = [
        {
          'key': 'userKey',
          'value': login.data.Uid,
        },
        {
          'key': 'tvSeriesId',
          'value': tvSeriesId,
        },
      ];
      // {
      //   tvSeriesId: mediaId,
      //     userKey: login.data.Uid,
      // }
      let updatePrefix = followStatus ? "remove" : "add";
      let updateFollowInfoEndPoint = updatePrefix + "Follow";
      let updateFollowInfo = updatePrefix + "FollowedInfo";
      this.props[updateFollowInfo](endpoints[updateFollowInfoEndPoint], formDataGenerator(queryParamsIsFollowed));
      const formData = [
        {
          'key': 'userKey',
          'value': login.data.Uid,
        },
      ];

      setTimeout(function(){
        getFollowList(endpoints.followList, formDataGenerator(formData));
      },1000);


      if(!followStatus){
        if(typeof window !== "undefined") {
          appBoyEvent.isFollow(!followStatus, seriesMainTitle, login.data.Uid);
        }
      }

      let that = this;
      if(seriesMainTitle){
        setTimeout(function(){
          let showFollowed = (that.props && that.props.followList && that.props.followList.data && that.props.followList.data.total_items) || 0;
          mixPanel.Follow(seriesMainTitle, showFollowed);
        },4000);
      }
    } else {
      throw new Error("opps !! User uid not found.");
    }
  }

  getFollowStatus() {
    let followed = false;
    const {isFollowInfo, addFollowInfo, removeFollowInfo, seriesMainTitle, login}=this.props;
    if (isFollowInfo && isFollowInfo.data && isFollowInfo.data.assets) {
      if(isFollowInfo.data.assets.isFollowed){
        followed = true;
      }
      else{
        followed = false;
      }
    }

    if (addFollowInfo && addFollowInfo.data && addFollowInfo.data.status && addFollowInfo.data.status.code == "0") {
      if (addFollowInfo.data.status.message == "Success") {
        followed = true;
      }
    }

    if (removeFollowInfo && removeFollowInfo.data && removeFollowInfo.data.status && removeFollowInfo.data.status.code == "0") {
      if (removeFollowInfo.data.status.message == "Success") {
        followed = false;
      }
    }

    return followed;
  }


  render() {
    let followStatus = this.getFollowStatus();
    if(this.props.tvSeriesId || this.props.mediaId ){
      return (
        <div className='follow-module'>
          {
            this.props.login.isLogin ?
              <span className='follow' onClick={()=>{this.updateFollow(followStatus);}}>
              {!followStatus ? <span><i className='icon-fav-empty' /> <span className='follow-name'>Follow</span> </span> : <span> <i className='icon-fav-fill' /> <span className='follow-name'>Following</span></span>}</span> :
              <div className='like-show' onClick={()=>this.props.openSignInModal()} > <i className='icon-fav-empty' /><span className='follow-name'>Follow</span></div>
          }
        </div>
      );
    }
    else{
      return null;
    }
  }
}

Follow.propTypes = {
  login: React.PropTypes.object,
  tvSeriesId: React.PropTypes.string,
  getMediaInfo: React.PropTypes.func.isRequired,
  loader: React.PropTypes.object.isRequired,
  mediaInfo: React.PropTypes.object.isRequired,
  getIsFollowedInfo: React.PropTypes.func.isRequired,
  getFollowList: PropTypes.func.isRequired,
  setLoader: React.PropTypes.func.isRequired,
  openSignInModal: React.PropTypes.func.isRequired,
  isFollowInfo: React.PropTypes.object.isRequired,
  resetAddFollow: React.PropTypes.func.isRequired,
  resetIsFollowedInfo: React.PropTypes.func.isRequired,
  mediaId:  React.PropTypes.string.isRequired,
  seriesMainTitle:  React.PropTypes.string,
  addFollowInfo: React.PropTypes.object.isRequired,
  removeFollowInfo: React.PropTypes.object.isRequired,
  followList: React.PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMediaInfo: bindActionCreators(getMediaInfo, dispatch),
    getIsFollowedInfo: bindActionCreators(getIsFollowedInfo, dispatch),
    removeFollowedInfo: bindActionCreators(removeFollowedInfo, dispatch),
    addFollowedInfo: bindActionCreators(addFollowedInfo, dispatch),
    resetIsFollowedInfo: bindActionCreators(resetIsFollowedInfo, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
    resetAddFollow: bindActionCreators(resetAddFollow, dispatch),
    getFollowList: bindActionCreators(getFollowList,dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    params: ownProps.params,
    loader: state.loader,
    mediaInfo: state.getMediaInfo.mediaInfo,
    isFollowInfo: state.getMediaInfo.isFollowInfo,
    addFollowInfo: state.getMediaInfo.addFollowInfo,
    removeFollowInfo: state.getMediaInfo.removeFollowInfo,
    login: state.authentication.login,
    followList: state.getMediaInfo.followList,
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Follow);
