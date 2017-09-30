import React, {Component} from 'react';
import {dateFormat, timeFormat, episodeFormat, seriesFormat} from '../../../util/filters';
import CardTitle from  '../CardTitle';
import CardDescription from '../CardDescription';
import CardMetaTagList from '../../CardComponent/CardMetaTagList';
import TopShout from '../../Player/TopShout';
import {MEDIA_TYPE} from '../../../constants/media';

class MetasDesc extends Component {
  constructor(props) {
    super(props);
    this.createMetasList = this.createMetasList.bind(this);
  }

  showHideMetas = () => {
    if (!document.getElementsByClassName('show-data').length > 0) {
      document.getElementsByClassName('hidden-data')[0].className += ' show-data';
      document.getElementsByClassName('icon-down')[0].className = ' icon-up';
    } else {
      document.getElementsByClassName('hidden-data show-data')[0].className = 'hidden-data';
      document.getElementsByClassName('icon-up')[0].className = ' icon-down';
    }
  };

  openModal = () => {
    const {isLogin, openSignInModal, openModal} = this.props;
    if (isLogin) {
      openModal();
    }
    else {
      openSignInModal();
    }
  };

  createMetasList(metas) {
    const noShout = this.props.noShout, isKids = this.props.isKids;
    let color;
    let ContentDuration = !isNaN(metas.ContentDuration) ? timeFormat(metas.ContentDuration) : metas.ContentDuration,
      duration = !isNaN(metas.ContentDuration) ? timeFormat(metas.ContentDuration) : metas.ContentDuration,
      seriesSeason = !isNaN(metas.RefSeriesSeason) ? seriesFormat(metas.RefSeriesSeason) : metas.RefSeriesSeason,
      telecastDate = metas.TelecastDate!='0'?!isNaN(metas.TelecastDate) ? dateFormat(metas.TelecastDate) : metas.TelecastDate:false;
    let item = [];
    let showButton = false;
    if(typeof document !== "undefined" && document.getElementsByClassName('description-tray')[0] != undefined && document.getElementsByClassName('shows-shout')[0] != undefined){
      showButton = true;
    }
    else if (typeof document !== "undefined" && document.getElementsByClassName('description-tray')[0] != undefined) {
      showButton = document.getElementsByClassName('description-tray')[0].offsetHeight > 42;
    }

    if (metas.MediaTypeID == MEDIA_TYPE.EPISODE && metas.ContentType != 'Full Episode' && metas.ContentType != undefined) {
      item = [metas.ContentType.toUpperCase(), ContentDuration];
      return (
        <div className='meta-desc'>
          <CardTitle title={{RefSeriesTitle: metas.RefSeriesTitle}} />
          <h1>{metas.EpisodeMainTitle}</h1>
          <div className='tags-section'>
            {metas.EpisodeNo ? <span>Episode </span> : false}
            <CardMetaTagList tagLists={item} />
          </div>
          <div className='hidden-data'>
            {metas.ContentSynopsis &&
              <CardDescription>
                {metas.ContentSynopsis}
              </CardDescription>
            }
            {!noShout && noShout!=undefined ? <TopShout mediaId={metas.MediaID} tvSeries={false} /> : false}
          </div>
          {showButton ? <div className='toggleButton' onClick={this.showHideMetas} >
            <i className='icon-down' />
          </div> : false}
        </div>
      );
    } else if (metas.MediaTypeID == MEDIA_TYPE.EPISODE) {
      item = isKids ? [metas.EpisodeNo, metas.language, ContentDuration]: [metas.EpisodeNo, ContentDuration, telecastDate];
      return (
        <div className='meta-desc'>
          <CardTitle title={{RefSeriesTitle: metas.RefSeriesTitle}} />
          <div className='tags-section'>
            {metas.EpisodeNo ? <span>Episode </span> : false}
            <CardMetaTagList tagLists={item} />
          </div>
          <h1>{metas.EpisodeMainTitle}</h1>
          <div className='hidden-data'>
            {metas.ContentSynopsis &&
              <CardDescription>
                {metas.ContentSynopsis}
              </CardDescription>
            }
            {noShout && noShout !=undefined? false : <TopShout mediaId={metas.MediaID} tvSeries={false} />}
          </div>
          {showButton ? <div className='toggleButton' onClick={this.showHideMetas}>
            <i className='icon-down' />
          </div> : false}
        </div>

      );
    } else if (metas.MediaTypeID == MEDIA_TYPE.MOVIE) {
      item = [metas.Genre, metas.Language, metas.ReleaseYear, ContentDuration];
      const {shoutByUser} = this.props;
      color = shoutByUser ? shoutByUser.color : '';
      const {openSocialModal} = this.props;
      return (
        <div className='meta-desc'>
          <CardTitle title={metas} h1Text />
          <CardMetaTagList tagLists={item} customClass={this.props.customClass} />

          {!noShout ?
            <div className='movie-social'>
              <i className='icon-share' onClick={openSocialModal} />
              <i className='icon-promo' onClick={this.openModal} style={{color: color}} />
            </div> : false}

          <div className='hidden-data'>
            {metas.ContentSynopsis &&
              <CardDescription>
                {metas.ContentSynopsis}
              </CardDescription>
            }
            {!noShout ? <TopShout mediaId={metas.MediaID} tvSeries={false} /> : false}
          </div>
          {showButton ? <div className='toggleButton' onClick={this.showHideMetas} >
            <i className='icon-down' />
          </div> : false}
        </div>
      );
    } else {
      return;
    }

  }

  render() {
    let metasList = this.createMetasList(this.props.metas);
    return (
      <div className='tag-list clearfix'>{metasList}</div>
    );
  }
}

MetasDesc.propTypes = {
  metas: React.PropTypes.object.isRequired,
  openSignInModal: React.PropTypes.func,
  openSocialModal: React.PropTypes.func,
  openModal: React.PropTypes.func,
  isLogin: React.PropTypes.bool,
  noShout: React.PropTypes.bool,
  isKids: React.PropTypes.bool,
  shoutByUser: React.PropTypes.object,
  customClass: React.PropTypes.string,
};

export default MetasDesc;
