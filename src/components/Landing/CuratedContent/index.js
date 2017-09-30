/**
 * Created by TTND on 2/15/2017.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import endpoints from '../../../endpoints/shows';
import {getChannelMedias, clearChannelMedias} from '../../../actions/channelMediasAction';
import {setLoader} from '../../../actions/loader';
import {createRouteString} from '../../../util/routeCreater';
import {Link} from 'react-router';
import PosterCard from '../../CardLayout/PosterCard';
import NormalCard from '../../CardLayout/NormalCard';
import DefaultCard from '../../CardLayout/DefaultCard';
import {getPaginatedData} from '../../../util/pagination';
import {checkUrl} from '../../../util/routeCreater';
import {getImageUrlMap, getSeriesValueFromListOfMapsForKey, getShowDescription, getShowMetaTags, getSocialShareImageUrl} from '../../../util/getShowDetails';
class CuratedContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination : {
        pageSize : 10,
        pageIndex: 0,
        currentArray : [],
        completeArray : [],
      },
    };
  }

  componentWillMount() {
    let queryParams = {
      cName : this.props.params.paramlink,
      mName : this.props.params.mName,
    };
    const {getChannelMedias, loader, setLoader} = this.props;
    let self = this;
    setLoader(true);
    getChannelMedias(queryParams, function(){
      let paginatedData = getPaginatedData(self.props.channelMedias.data.list, self.state.pagination.pageIndex, self.state.pagination.pageSize);
      self.setState({
        pagination : {
          pageSize : self.state.pagination.pageSize,
          pageIndex: paginatedData.pageIndex,
          currentArray : paginatedData.resultantArray,
          completeArray : self.props.channelMedias.data.list,
        },
      });
      setLoader(false);}, function () {
      setLoader(false);
    });

  }

  componentDidMount = ()=>{
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'CuratedContentPageView');
    }
  };

  componentWillUnmount() {
    const {clearChannelMedias} = this.props;
    clearChannelMedias();
  }
  loadMore(){
    let paginatedData = this.state.pagination;
    let output = getPaginatedData(paginatedData.completeArray, paginatedData.pageIndex, paginatedData.pageSize);
    this.setState({
      pagination : {
        pageSize : paginatedData.pageSize,
        completeArray : paginatedData.completeArray,
        pageIndex: output.pageIndex,
        currentArray : output.resultantArray,
      },
    });
  }
  routeTo = (item) => {
    if(item.MediaTypeID == 390 && item.Genre != 'Kids'){
      this.context.router.push(`/movie/${createRouteString(item.title)}/${createRouteString(item.mId)}`);
    }
    if(item.MediaTypeID == 390 && item.Genre == 'Kids'){
      this.context.router.push(`/kids/movie/${createRouteString(item.title)}/${createRouteString(item.mId)}`);
    }
    if(item.MediaTypeID  == 389  && item.Genre != 'Kids'){
      const pathname = `/shows/${createRouteString(item.mediaMainTitle)}/${createRouteString(item.RefSeriesSeason)}/${createRouteString(item.mId)}`;
      const newPath = checkUrl(pathname);
      if(typeof newPath === "object" && typeof newPath.url !== "undefined" && typeof newPath.url !== "undefined" && typeof newPath.mediaId !== "undefined"){
        this.context.router.push(newPath.url);
      }else{
        this.context.router.push(pathname);
      }
    }
    if(item.MediaTypeID  == 391 && item.Genre != 'Kids'){
      this.context.router.push(`/shows/${createRouteString(item.refSeriesTitle)}/${createRouteString(item.refSeriesSeason)}/${createRouteString(item.refSeriesId)}/${createRouteString(item.mediaMainTitle)}/${item.mId}`);
    }
    // if(item.MediaTypeID  == 391 && item.Genre == 'Kids'){
    //   this.context.router.push(`/kids/${createRouteString(item.refSeriesTitle)}/${createRouteString(item.refSeriesSeason)}/${createRouteString(item.refSeriesId)}/${createRouteString(item.mediaMainTitle)}/${item.mId}`);
    // }
    if(item.MediaTypeID  == 389 && item.Genre == 'Kids') {
      this.context.router.push(`/kids/characters/${createRouteString(item.mediaMainTitle)}/${createRouteString(item.mId)}`);
    }
    if(item.MediaTypeID  == 391 && item.Genre == 'Kids') {
      this.context.router.push(`/kids/characters/${createRouteString(item.refSeriesTitle)}/${createRouteString(item.refSeriesId)}/${createRouteString(item.mediaMainTitle).replace(/\?/g, '-')}/${item.mId}`);
    }
  };
  getCuratedPage=(item, idx, mName)=>{
    if(item.MediaTypeID  == 391 && (getSeriesValueFromListOfMapsForKey(item.Tags, "Genre") != 'Kids' || this.props.params.mName == 'vootCatchups')) {
      let data = {};
      data = getImageUrlMap(item.Pictures);
      data.mId = item.MediaID;
      data.mediaMainTitle = getSeriesValueFromListOfMapsForKey(item.Metas, "EpisodeMainTitle");
      data.duration = getSeriesValueFromListOfMapsForKey(item.Metas, "ContentDuration");
      data.refSeriesSeason = getSeriesValueFromListOfMapsForKey(item.Metas, "RefSeriesSeason");
      data.refSeriesId = item.RefSeriesId;
      data.telecastDate = getSeriesValueFromListOfMapsForKey(item.Metas,'TelecastDate');
      data.MediaTypeID = item.MediaTypeID;
      data.episodeNo= getSeriesValueFromListOfMapsForKey(item.Metas, 'EpisodeNo');
      data.refSeriesTitle = getSeriesValueFromListOfMapsForKey(item.Metas, "RefSeriesTitle");
      data.Genre = getSeriesValueFromListOfMapsForKey(item.Tags, "Genre");
      return <div key={idx} className='grid-view grid-2'><NormalCard  onClick={()=>this.routeTo(data)} data={data}  aspectRatio='16x9' item={data} isTitleMultiLine={false} /></div>;
    }
    else if(item.MediaTypeID  == 391 && getSeriesValueFromListOfMapsForKey(item.Tags, "Genre") != 'Kids' && getSeriesValueFromListOfMapsForKey(item.Metas, "ContentType") != 'Full Episode' ) {
      let data = {};
      data = getImageUrlMap(item.Pictures);
      data.mId = item.MediaID;
      data.mediaType = item.MediaTypeID;
      data.mediaMainTitle = getSeriesValueFromListOfMapsForKey(item.Metas, "EpisodeMainTitle");
      data.duration = getSeriesValueFromListOfMapsForKey(item.Metas, "ContentDuration");
      data.refSeriesSeason = getSeriesValueFromListOfMapsForKey(item.Metas, "RefSeriesSeason");
      data.telecastDate ='';
      data.refSeriesTitle = getSeriesValueFromListOfMapsForKey(item.Metas, "RefSeriesTitle");
      data.episodeNo= getSeriesValueFromListOfMapsForKey(item.Metas, 'EpisodeNo');
      data.Genre = getSeriesValueFromListOfMapsForKey(item.Tags, "Genre");
      return <div key={idx} className='grid-view grid-2'><NormalCard aspectRatio='16x9' item={data} isTitleMultiLine onClick={()=>this.routeTo(item)} data={data} /></div>;
    }
    else if(item.MediaTypeID  == 391 && getSeriesValueFromListOfMapsForKey(item.Tags, "Genre") != 'Kids' && getSeriesValueFromListOfMapsForKey(item.Metas, "ContentType") != 'Full Episode' ) {
      let data = {};
      data = getImageUrlMap(item.Pictures);
      data.mId = item.MediaID;
      data.mediaMainTitle = getSeriesValueFromListOfMapsForKey(item.Metas, "EpisodeMainTitle");
      data.duration = getSeriesValueFromListOfMapsForKey(item.Metas, "ContentDuration");
      data.refSeriesSeason = getSeriesValueFromListOfMapsForKey(item.Metas, "RefSeriesSeason");
      data.telecastDate ='';
      data.episodeNo= '';
      data.Genre = getSeriesValueFromListOfMapsForKey(item.Tags, "Genre");
      return <div key={idx} className='grid-view grid-2'><NormalCard onClick={()=>this.routeTo(item)} data={data} aspectRatio='16x9' item={data} isTitleMultiLine={false} /></div>;
    }
    else if(item.MediaTypeID  == 391 && getSeriesValueFromListOfMapsForKey(item.Tags, "Genre") == 'Kids') {
      let data = {};
      data = getImageUrlMap(item.Pictures);
      data.mId = item.MediaID;
      data.MediaTypeID = item.MediaTypeID;
      data.mediaMainTitle = getSeriesValueFromListOfMapsForKey(item.Metas, "EpisodeMainTitle");
      data.duration = getSeriesValueFromListOfMapsForKey(item.Metas, "ContentDuration");
      data.episodeNo = getSeriesValueFromListOfMapsForKey(item.Metas, "EpisodeNo");
      data.Genre = getSeriesValueFromListOfMapsForKey(item.Tags, "Genre");
      data.refSeriesTitle = getSeriesValueFromListOfMapsForKey(item.Metas, "RefSeriesTitle");
      data.RefSeriesSeason = getSeriesValueFromListOfMapsForKey(item.Metas, "RefSeriesSeason");
      //hardcoded for now as it is not coming from API response
      data.refSeriesId = item.RefSeriesId;

      return <div key={idx} className='grid-view grid-2'><NormalCard onClick={()=>this.routeTo(data)} data={data} aspectRatio='16x9' item={data} isTitleMultiLine={false} /></div>;
    }
    else if(item.MediaTypeID  == 389  && getSeriesValueFromListOfMapsForKey(item.Tags, "Genre") != 'Kids') {
      let data = {};
      data = getImageUrlMap(item.Pictures);
      data.mId = item.MediaID;
      data.MediaTypeID = item.MediaTypeID;
      data.mediaMainTitle = getSeriesValueFromListOfMapsForKey(item.Metas, "SeriesMainTitle");
      data.RefSeriesSeason = getSeriesValueFromListOfMapsForKey(item.Metas, "Season");
      data.RefSeriesTitle = getSeriesValueFromListOfMapsForKey(item.Metas, "RefSeriesTitle");

      if(['tvSeriesGrid', 'popularShows'].indexOf(mName)!== -1) {
        data.sbu = getSeriesValueFromListOfMapsForKey(item.Metas, "SBU");
        data.genre= getSeriesValueFromListOfMapsForKey(item.Tags, "Genre");
        return <div key={idx} className='grid-view grid-2 series-grid tvSeries no-play'><NormalCard aspectRatio='16x9' item={data} isTitleMultiLine onClick={()=>this.routeTo(data)} data={data}  noPlayIcon={false} /></div>;
      }
      else{
        return <div key={idx} className='grid-view grid-2 series-grid vootOriginalSeries no-play'><NormalCard aspectRatio='16x9' item={data} isTitleMultiLine onClick={()=>this.routeTo(data)} data={data}   noPlayIcon={false} /></div>;
      }
    }

    else if(item.MediaTypeID  == 390) {
      let data = {
        mId : item.MediaID,
        mName: item.MediaName,
        title: item.MediaName,
        MediaTypeID: item.MediaTypeID,
        imgURLL:  item.Pictures[11].URL,
        imgURLM:  item.Pictures[13].URL,
        imgURLS: item.Pictures[13].URL,
        Genre: getSeriesValueFromListOfMapsForKey(item.Tags, "Genre"),
      };
      return <div key={idx} className='grid-view grid-2'><PosterCard aspectRatio='2x3' mName={data.mediaMainTitle} mediaType={data.MediaTypeID} poster={data} onClick={()=>this.routeTo(data)} data={data} /></div>;
    }
    else if (item.MediaTypeID  == 389  && getSeriesValueFromListOfMapsForKey(item.Tags, "Genre") == 'Kids') {
      let data = {};
      data = getImageUrlMap(item.Pictures);
      data.mId = item.MediaID;
      data.MediaTypeID= item.MediaTypeID;
      data.mediaMainTitle = getSeriesValueFromListOfMapsForKey(item.Metas, "SeriesMainTitle");
      data.Genre= getSeriesValueFromListOfMapsForKey(item.Tags, "Genre");

      return ( <div key={idx} className='grid-view grid-2 kidsCharacters'><div key={idx} className='card-item'>
        <DefaultCard data={data} aspectRatio='16x9' items={data} isTitleMultiLine componentFlag={data.mediaMainTitle} showPlayIcon={false} noTags onClick={()=>this.routeTo(data)} />
      </div></div>);
    }

  };

  render() {
    const {channelMedias, loader} = this.props;
    let paginatedData = this.state.pagination;
    let shownData, title, mName =  this.props.params.mName, loadMoreEpisodes;
    if(channelMedias.data && channelMedias.data.list) {
      title = channelMedias.data.title;
      shownData = paginatedData.currentArray.map((item, index)=>{
          return this.getCuratedPage(item, index, mName);
        });
    }
    if (!loader.load && paginatedData.currentArray.length < paginatedData.completeArray.length) {
      loadMoreEpisodes = (
        <div className='section text-center'>
          <button className='load-more' onClick={()=>this.loadMore()}>Load More</button>
        </div>
      );
    }

    return (
      <div className='curated-content-page '>
        {
          this.props.loader.load ? <div className='small-loader'></div>:
            <div>
              <div className='sbuName-section'>
                <Link to='/'>
                  <span className='left-arrow'><i className='icon-left-thin'></i></span>
                </Link>
                <h1 className='sbuName'>{title}</h1>
              </div>
              <div  className='grid-container clearfix'>
                {shownData}
              </div>
              {loadMoreEpisodes}
            </div>}
      </div>
    );
  }
}

CuratedContent.propTypes = {
  router: PropTypes.object,
  getChannelMedias: PropTypes.func.isRequired,
  channelMedias: PropTypes.object.isRequired,
  aspectRatio: PropTypes.string,
  params: PropTypes.object.isRequired,
  loader: React.PropTypes.object.isRequired,
  clearChannelMedias: PropTypes.func,
  setLoader: PropTypes.func,
};

CuratedContent.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChannelMedias: bindActionCreators(getChannelMedias, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
    clearChannelMedias: bindActionCreators(clearChannelMedias, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    channelMedias: state.channelMedias,
    loader: state.loader,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CuratedContent);
