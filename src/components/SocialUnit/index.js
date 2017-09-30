/**
 * Created by TTND on 2/7/2017.
 */
import React, {Component, PropTypes} from 'react';
import PaperRipple from 'react-paper-ripple';
import {connect} from 'react-redux';
import Follow from '../AllEpisodesListing/Shows/Follow';

class SocialUnit extends Component {
  constructor(props) {
    super(props);

  }

  openModal = ()=> {
    const {login: {isLogin}, openSignInModal, openModal} = this.props;
    if (isLogin) {
      openModal();
    }
    else {
      openSignInModal();
    }
  };
  routeToAllShowsEpisodes = (item) => {
    if(item){
      this.context.router.push(item);
    }
  };
  render() {
    const {shoutByUser, openSocialModal, openSignInModal, seriesMainTitle} = this.props;
    let color;
    if (shoutByUser.color) {
      color = shoutByUser.color;
    }
    else {
      color = '';
    }
    return (
      <ul className='social-unit'>
        <li className='social-unit__follow'>
          <PaperRipple className='ripple'>
            <Follow tvSeriesId={this.props.tvSeriesId}  mediaId={this.props.mediaId}  openSignInModal={openSignInModal} seriesMainTitle={seriesMainTitle} />
          </PaperRipple>
        </li>
        <li className='social-unit__share'><PaperRipple className='ripple'>
          <i className='icon-share' onClick={openSocialModal} />Share</PaperRipple>
        </li>
        <li className='social-unit__promo' onClick={this.openModal} style={{color:color}}>
          <PaperRipple className='ripple'>
            <i className='icon-promo' style={{color:color}} />{shoutByUser.name ? `${shoutByUser.name}` : 'Shout'}
          </PaperRipple>
        </li>
        <li className='social-unit__shows' onClick={()=>this.routeToAllShowsEpisodes(this.props.redirectUrl)}><PaperRipple className='ripple'><i className='icon-shows' />Show Details</PaperRipple></li>
      </ul>
    );
  }
}

SocialUnit.propTypes = {
  login: PropTypes.object.isRequired,
  redirectUrl: PropTypes.string.isRequired,
  openSignInModal: PropTypes.func.isRequired,
  getShoutList: PropTypes.func,
  openModal: PropTypes.func.isRequired,
  openSocialModal: PropTypes.func.isRequired,
  getShoutByUser: PropTypes.func,
  makeShout: PropTypes.func,
  tvSeriesId: PropTypes.string.isRequired,
  shoutByUser: PropTypes.object.isRequired,
  mediaId: PropTypes.string.isRequired,
  seriesMainTitle: PropTypes.string.isRequired,
};

function mapStateToProps({authentication:{login}, topShout}) {
  return {login, topShout};
}
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getShoutList: bindActionCreators(getShoutList, dispatch),
//
//   };
// };
SocialUnit.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(SocialUnit);
