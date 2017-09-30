import React, {Component} from 'react';
import TextTruncate from 'react-text-truncate';
import CardImage from '../../CardComponent/CardImage';
import CardTitle from '../../CardComponent/CardTitle';
import CardArrow from '../../CardComponent/CardArrow';
import CardDescription from '../../CardComponent/CardDescription';
import Follow from '../../AllEpisodesListing/Shows/Follow';
import CardTagList from '../../CardComponent/CardTagList';
import PaperRipple from 'react-paper-ripple';
import SocialShare from '../../SocialShare';
import TopShout from '../../Player/TopShout';

class EpisodeHeadCard extends Component {
  constructor(props) {
    super(props);
  }

  onClick=()=>{
    const {data, onClick}=this.props;
    if(data && onClick){
      onClick(data);
    }
  };

  showHideMetas = () => {
    if(typeof document !== "undefined"){
      if (!document.getElementsByClassName('show-data').length > 0) {
        document.getElementsByClassName('hidden-data')[0].className += ' show-data';
        document.getElementsByClassName('icon-down')[0].className = ' icon-up';
      } else {
        document.getElementsByClassName('hidden-data show-data')[0].className = 'hidden-data';
        document.getElementsByClassName('icon-up')[0].className = ' icon-down';
      }
    }
  };

  showButtonCheck = () => {
    if(typeof document !=="undefined" && document.getElementsByClassName('description-tray')[0] != undefined) {
      return document.getElementsByClassName('description-tray')[0].offsetHeight > 42;
    }
    return false;
  };

  render() {
    const noShout = this.props.noShout;
    let item = this.props.items,
      noPlayIcon = this.props.noPlayIcon,
      imageList = {
        imgURLL: item.imgURLL,
        imgURLM: item.imgURLM,
        imgURLS: item.imgURLS,
      };

    const { openSocialModal } = this.props;
    let tags=[];
    if(item){
      tags=[item.sbu,item.genre,item.language];
    }

    let altText = item.title!=undefined ? item.title : item.seriesMainTitle;
    let socialSection;

    if(!this.props.noSocialIcons){
      socialSection = ( <div className='social-right'>
        <PaperRipple className='ripple'>
          <Follow tvSeriesId={this.props.mediaId} mediaId={this.props.mediaId} openSignInModal={this.props.openSignInModal} seriesMainTitle={item.seriesMainTitle} />
        </PaperRipple>
        <span className='share-show' ><i className='icon-share' onClick={()=>openSocialModal()} /></span>
      </div>);
    }

    return (
      <div className='card-holder'>

        <figure className='figure-block' onClick={this.onClick}>
          <CardImage aspectRatio={this.props.aspectRatio} source={imageList} alt={altText} />
          {noPlayIcon && <CardArrow />}
        </figure>

        <div className='item-detail'>

          <CardTitle title={item} isTitleMultiLine={this.props.isTitleMultiLine} h1Text />

          <div className='tags-social-container'>

            <CardTagList tagLists={item.tags} />


            {/*this condition is for only season/custom landing page*/}

            {item && item.mName =='seriesSeasonMastHead' &&
              <CardTagList tagLists={tags} />
            }


            {/*<h2>*/}
              {/*<span className='display-tags'>{item.tags}</span>*/}
            {/*</h2>*/}

          </div>

          {socialSection}

          <div className='hidden-data'>
            <CardDescription>
              {item.desc}
            </CardDescription>
            {!noShout ? <TopShout mediaId={this.props.mediaId} tvSeries />: false}
          </div>
          {this.showButtonCheck() ? <div className='toggleButton' onClick={this.showHideMetas}>
            <i className='icon-down' />
          </div>  : false}
        </div>
      </div>
    );
  }
}

EpisodeHeadCard.propTypes = {
  items: React.PropTypes.object.isRequired,
  data: React.PropTypes.object,
  mediaId: React.PropTypes.string,
  isTitleMultiLine: React.PropTypes.bool,
  noPlayIcon: React.PropTypes.bool,
  aspectRatio: React.PropTypes.string,
  onClick: React.PropTypes.func,
  openSocialModal: React.PropTypes.func,
  openSignInModal: React.PropTypes.func,
  noSocialIcons: React.PropTypes.bool,
  noShout: React.PropTypes.bool,
};



export default EpisodeHeadCard;
