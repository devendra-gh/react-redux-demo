import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import customStyles from '../../../src/general/modalCustomStyle';
import Modal from 'react-modal';
import mixPanel from '../../util/mixPanel';


class SocialShare extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount = ()=> {
    const {title} = this.props.post;
    const {data} = this.props.mediaInfo;
    const mainTtile = (data && data.assets && data.assets.MediaName) || title;
    const mediaId = this.props.mId;
    window.LoginRadius.util.ready(function () {
      let $i, $u;
      window.$SS.Providers.Top = ['Facebook', 'Twitter', 'Email'];
      $i = window.$SS.Interface.horizontal;
      $u = window.LoginRadius.user_settings;
      $u.apikey = '96493dd1-efaa-4d01-b2fe-bc2a5cd2b59b';
      $i.size = 32;
      /*
      // Following code is for enabling url shortener
      window.$SS.urlShorten = true;
      window.$SS.isTrackReferralsEnabled = false;
      */

      $i.show("lrsharecontainer");

      $('.lrshare_facebook').click(function(){
        mixPanel.shareInitiated(mainTtile, mediaId,'facebook');
      });
      $('.lrshare_twitter').click(function(){
        mixPanel.shareInitiated(mainTtile, mediaId,'twitter');
      });
      $('.lrshare_email').click(function(){
        mixPanel.shareInitiated(mainTtile, mediaId,'email');
      });
    });
  };

  render() {
    const {closeModal, isMovie} = this.props;
    const {showName, title, description, imageurl} = this.props.post;
    const mediaID = this.props && this.props.mId;
    const mediaTypeId = this.props && this.props.mediaInfo && this.props.mediaInfo.data && this.props.mediaInfo.data.assets && this.props.mediaInfo.data.assets.MediaTypeID;
    // const url =   "http://www.voot.com/share.php?mId="+mediaID+'&t='+mediaTypeId;

    let URL = window.location.href, shareDescription, shareShowName;

    shareShowName = isMovie ? showName : ('Check out this video from '+ showName +' only on Voot:');
    shareDescription = title ? (title +' - '+ description) : description;

    return (
      <div className='filter-section share-modal'>
        <button className='modal-close' onClick={closeModal}><i className='icon-cross' /></button>
        <h2>Share this page</h2>
        <span className='page-url'>{location.href}</span>
        <div className='lrsharecontainer'
             data-share-title={shareShowName}
             data-share-description={shareDescription}
             data-share-imageurl={imageurl}
             data-share-url={URL}
        >
          Loading..
        </div>
      </div>
    );
  }
}

//data-share-title={'Check out this video from '+ title +' only on Voot:'}

SocialShare.propTypes = {
  post: React.PropTypes.object.isRequired,
  closeModal: React.PropTypes.func,
  openModal: React.PropTypes.func,
  openSocialModal: React.PropTypes.func,
  mediaInfo: React.PropTypes.object,
  mId: React.PropTypes.string,
};

SocialShare.defaultProps = {
  post: {
    title: "Default Post title",
    description: "Default Post description",
    // TODO: defuault imageurl is only for testing, after testing remove it and add any default img
    imageurl: "https://dimg.voot.com/include/upload/web-vertical-images/compressed/heroAsset_1_0_image_1486439231rising-star--12-5-_600X250.jpg",
  },
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


export default connect(mapStateToProps, mapDispatchToProps)(SocialShare);
