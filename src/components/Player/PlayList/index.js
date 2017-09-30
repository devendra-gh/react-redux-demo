import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LazyLoad from 'react-lazyload';
import endpoints from '../../../endpoints/playList';
import {MEDIA_TYPE} from '../../../constants/media';
import endpoint from '../../../endpoints/shows';
import {playlist, appendTopDataToPlayList, appendBottomDataToPlayList, voPlaylist, clearPlayList} from '../../../actions/playlist';
import {searchAsset} from '../../../actions/searchAssetAction';
import CardRectangular from '../../../components/CardComponent/CardRectangular';
import CardTopHeadingDefault from '../../CardComponent/CardTopHeadingDefault';
import {setLoader} from '../../../actions/loader';
import Loader from '../../Loader';
import {createRouteString} from '../../../util/routeCreater';
import {formDataGenerator} from '../../../util/formDataGenerator';
import history from 'history';

let fetchBottom = true, fetchTop = true, self = this;
class PlayList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount () {
    this.initialize(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.mId != nextProps.mId){
      this.initialize(nextProps);
    }
  }

  initialize(props){
    props.getPlayList({mediaId:props.mId}, function () {
      let container = $('div.playlist-section'), scrollTo = $('#current-video-holder');
      if (container.hasClass('playlist-section') && scrollTo.attr('id', 'current-video-holder')) {
        container.scrollTop(
          scrollTo.offset().top - container.offset().top + container.scrollTop()
        );
      }
    });
    props.getVoPlayList(endpoints.voPlaylist,{mediaId:props.mId,pageIndex:0});
  }

  routeTo = (item, isCurrentVideo = false) => {
    let self = this, context = this.context;
    if (isCurrentVideo){
      // console.log('is current Video >>>>');
      this.props.setIsCurrentVideoToTrue();
    }else {
      self.props.setLoader(true);
    }

    if (item.metas.ContentType != 'Full Episode' && item.type == MEDIA_TYPE.EPISODE) {
      context.router.push(`/clip/${createRouteString(item.metas.EpisodeMainTitle).replace(/\?/g, '-')}/${item.id}`);
    } else {
      if (item.metas.RefSeriesTitle != undefined) {
        let data = [
            {
              "key": "filterTypes",
              "value": MEDIA_TYPE.TV_SERIES,
            },
            {
              "key": "filter",
              "value": `(and SeriesMainTitle='${item.metas.RefSeriesTitle.replace(/'/g, '%27')}')`,
            },
          ],
          callback = {
            successCallback: function () {
              //this route is creating problem for shout feature on playlist page, correction need to pass 'refSeriesId' at 3rd place on route URL.
              context.router.push(`/shows/${createRouteString(item.metas.RefSeriesTitle)}/${createRouteString(item.metas.RefSeriesSeason)}/${createRouteString(self.props.searchAssetData.data.assets[0].id)}/${createRouteString(item.metas.EpisodeMainTitle).replace(/\?/g, '-')}/${item.id}`);
            },
          };

        this.props.searchAsset(endpoint.searchAssets, formDataGenerator(data), callback);
      } else {
        //this route is creating problem for shout feature on playlist page, correction need to pass 'refSeriesId' at 3rd place on route URL.
        context.router.push(`/shows/${createRouteString(item.metas.RefSeriesTitle)}/${createRouteString(item.metas.RefSeriesSeason)}/${createRouteString(self.props.searchAssetData.data.assets[0].id)}/${createRouteString(item.metas.EpisodeMainTitle).replace(/\?/g, '-')}/${item.id}`);
      }
    }
  };

  listingItems=(item,index)=>{
    if(item)
    return (
      <div key={index} className='card-item' onClick={()=>this.routeTo(item)}>
        <CardRectangular aspectRatio='16x9' cardContent={item} isTitleMultiLine={false} />
      </div>
    );
  };


  // function to fetch more data in playlist while scrolling.
  getMoreDataToPlayList = ()=> {
    const playlist = this.props.playlist.playlist && this.props.playlist.playlist.localData.assets ? this.props.playlist.playlist.localData.assets : false;
    let playlistTop = [], playlistBottom = [];
    if(playlist){
      playlistTop = this.props.playlist.playlist.localData.assets.top;
      playlistBottom = this.props.playlist.playlist.localData.assets.bottom;
    }
    let node = document.getElementsByClassName('playlist-section');
    let scrollHeight = node[0].scrollHeight, scrollTop = node[0].scrollTop, scrollPosition = scrollHeight - scrollTop, newScrollHeight;

    /*bottom scrolling*/
    if (scrollPosition - node[0].clientHeight < 200 && fetchBottom ) {
      if (playlistBottom && playlistBottom[playlistBottom.length - 1] != null) {
        fetchBottom = false;
        let nextBottomContent = playlistBottom[playlistBottom.length - 1];
        this.props.appendBottomDataToPlayList(endpoints.playlist, {mediaId: nextBottomContent.id}, function () {
          fetchBottom = true;
        });
      }
    }
    /* scrolling to top*/
    if (scrollHeight - scrollPosition < 20 && fetchTop) {
      if (playlistTop && playlistTop[0] != null) {
        fetchTop = false;
        let nextTopContent = playlistTop[0];
        this.props.appendTopDataToPlayList(endpoints.playlist, {mediaId: nextTopContent.id}, function () {
          newScrollHeight = node[0].scrollHeight - scrollHeight + scrollTop;
          $('.playlist-section').scrollTop(newScrollHeight);
          fetchTop = true;
        });
      }
    }
  };

  render() {
    const voPlaylist = this.props.playlist.voPlaylist && this.props.playlist.voPlaylist.data.assets ? this.props.playlist.voPlaylist.data.assets:false;
    const playlist = this.props.playlist.playlist && this.props.playlist.playlist.localData.assets ? this.props.playlist.playlist.localData.assets : false;
    let playlistTop = [], playlistBottom = [];
    if(playlist){
      playlistTop =  this.props.playlist.playlist && this.props.playlist.playlist.localData.assets && this.props.playlist.playlist.localData.assets.top ? this.props.playlist.playlist.localData.assets.top:false;
      playlistBottom = this.props.playlist.playlist && this.props.playlist.playlist.localData.assets && this.props.playlist.playlist.localData.assets.bottom ? this.props.playlist.playlist.localData.assets.bottom:false;
    }

    let top = playlist && playlistTop? playlistTop.map(this.listingItems):false,
     bottom = playlist && playlistBottom ? playlistBottom.map(this.listingItems):false,
      current;

    if(playlist && this.props.playlist.playlist.localData.assets){
      let currentItem = this.props.playlist.playlist.localData.assets.current;
      current = (<div id='current-video-holder'><CardRectangular
        className='current-video'
        aspectRatio='16x9'
        onClick={()=>this.routeTo(currentItem, true)}
        data={currentItem}
        cardContent={currentItem}
        isTitleMultiLine={false}
      /></div>);
    }

    let heading;
    let mustWatch;
    if (playlist && playlistBottom[playlistBottom.length - 1] == null) {
      heading = <CardTopHeadingDefault items={{'title': 'Must Watch'}} />;
      mustWatch = voPlaylist ? voPlaylist.map(this.listingItems) : false;
    }

    return (
      <div onScroll={this.getMoreDataToPlayList}>
        <CardTopHeadingDefault items={{'title': 'What\'s Up Next'}} />
        <div className='playlist-section'>
          {top}
          {current}
          {bottom}
          {heading}
          {mustWatch}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
     getPlayList: bindActionCreators(playlist, dispatch),
     appendBottomDataToPlayList: bindActionCreators(appendBottomDataToPlayList, dispatch),
     appendTopDataToPlayList: bindActionCreators(appendTopDataToPlayList, dispatch),
     getVoPlayList: bindActionCreators(voPlaylist, dispatch),
     setLoader: bindActionCreators(setLoader, dispatch),
     clearPlayList: bindActionCreators(clearPlayList, dispatch),
     searchAsset: bindActionCreators(searchAsset, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    playlist: state.playlist,
    loader: state.loader,
    searchAssetData: state.searchAsset,
  };
};

PlayList.propTypes = {
  mId: React.PropTypes.string,
  playlist: React.PropTypes.object,
  getPlayList: React.PropTypes.func,
  appendTopDataToPlayList: React.PropTypes.func,
  appendBottomDataToPlayList: React.PropTypes.func,
  getVoPlayList: React.PropTypes.func,
  clearPlayList: React.PropTypes.func,
  setLoader: React.PropTypes.func.isRequired,
  searchAsset: React.PropTypes.func.isRequired,
  setIsCurrentVideoToTrue: React.PropTypes.func.isRequired,
};

PlayList.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);
