import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PaperRipple from 'react-paper-ripple';
import VootEpisodes from './VootEpisodes';
import VootCuratedShorts from './VootShorts/allVootCuratedShorts';
import VootShorts from './VootShorts/allVootShorts';
import {getMediaInfo, clearMediaInfo} from '../../../../actions/getMediaInfo';
import {clearAllPosterRoutes} from '../../../../actions/shows';
import {setLoader} from '../../../../actions/loader';
import {relatedMedia} from '../../../../actions/playlist';
import CarouselTray from '../../../../components/Tray/CarouselTray';
import endpoints from '../../../../endpoints/playList';
import {formDataGenerator} from '../../../../util/formDataGenerator';
import {checkPropertyInArray} from '../../../../util/mapingFilters';
import {MEDIA_TYPE} from '../../../../constants/media';
import clone from 'clone';

class ShowsEpisodeShortsTab extends Component {
  constructor(props) {
    super(props);
    const {params}=this.props;
    this.state={
      mediaId:params.mediaId,
      params,
    };
  }

  componentWillMount() {
    const {params: {mediaId}, setLoader, getRelatedMedia, getMediaInfo, clearMediaInfo} = this.props;
      // form data to get 'more shows on voot' tray on below the playlist.
    let data = [
      {
        "key": "mediaId",
        "value": mediaId,
      },
      {
        "key": "reqMediaTypes",
        "value": MEDIA_TYPE.TV_SERIES,
      },
      {
        "key": "pageSize",
        "value": 4,
      },
      {
        "key": "pageIndex",
        "value": 0,
      },
    ];

    getRelatedMedia(endpoints.relatedMedia, formDataGenerator(data));
    if(!this.props.stopCall){
      getMediaInfo({mediaId});
    }

  }

  componentWillReceiveProps(nextProps){
    const {getMediaInfo, getRelatedMedia, clearMediaInfo, clearAllPosterRoutes} = this.props;
    const {params: {mediaId}} = nextProps;
    if(this.state.mediaId!==mediaId){
      clearMediaInfo();
      clearAllPosterRoutes();
      this.setState({mediaId});
      let data = [
            {
              "key": "mediaId",
              "value": mediaId,
            },
            {
              "key": "reqMediaTypes",
              "value": MEDIA_TYPE.TV_SERIES,
            },
            {
              "key": "pageSize",
              "value": 4,
            },
            {
              "key": "pageIndex",
              "value": 0,
            },
          ];
      getMediaInfo({mediaId});
      getRelatedMedia(endpoints.relatedMedia, formDataGenerator(data));
    }
  }

  componentWillUnmount() {
    const {clearAllPosterRoutes, clearMediaInfo} = this.props;
    clearAllPosterRoutes();
    clearMediaInfo();
  }


  check=(item)=>{
    let biggBoss = ['450656'];
    for(let i=0;biggBoss[i] ;i++){
      if(biggBoss[i]==item){
        return true;
      }
    }
  };


  render() {
    const {params, metas, assetsCount,mediaInfo}=this.props;

    let count={}, newParams=clone(params);
    if(this.props.assetsCount){
      if(this.props.assetsCount.clipsCount==0 && this.props.assetsCount.episodesCount==0)
        if(mediaInfo && mediaInfo.data && mediaInfo.data.assets && mediaInfo.data.assets.assetsCount){
          count = mediaInfo.data.assets.assetsCount;
          newParams.seriesMainTitle = checkPropertyInArray(mediaInfo.data.assets.Metas, 'SeriesMainTitle');
          newParams.season = checkPropertyInArray(mediaInfo.data.assets.Metas, 'Season');
          newParams.mediaId = mediaInfo.data.assets.MediaID;
        }
    }
    const data = this.props.relatedMedia && this.props.relatedMedia.data?this.props.relatedMedia.data:false;
    // const {relatedMedia:{data}}=this.props;
    let title;
    if(metas.length){
      if(checkPropertyInArray(metas, 'SBU')==='VOOT')
        title = 'More Voot Originals';
      else
        title ='More Shows on Voot';
    }


// Static data for bigboss season (Start)

    let season ={
      title:'Other Seasons',
      isSeason:true,
      list:[
        {
          isBigBoss:true,
          type:'relatedMedia',
          SeriesMainTitle:'bigg-boss-s09',
          Season:'9',
          MediaTypeID:'389',
          mediaId:360551,
          imgURLL:'https://kimg.voot.com/kimg/a9408b54e800473aa9d7c4776386173c_768X432.jpg',
          imgURLM:'https://kimg.voot.com/kimg/a9408b54e800473aa9d7c4776386173c_512X288.jpg',
          imgURLS:'https://kimg.voot.com/kimg/a9408b54e800473aa9d7c4776386173c_320X180.jpg',
          RefSeriesTitle:'Bigg Boss',
          EpisodeMainTitle:'Bigg Boss - Season 09',
          sbu:'COH',
          genre:'Reality',
        },
        {
          isBigBoss:true,
          type:'relatedMedia',
          SeriesMainTitle:'bigg-boss-s08',
          Season:'8',
          MediaTypeID:'389',
          mediaId:365234,
          imgURLL:'https://kimg.voot.com/kimg/59e8990578ec411fa6a9049b1069de2e_768X432.jpg',
          imgURLM:'https://kimg.voot.com/kimg/59e8990578ec411fa6a9049b1069de2e_512X288.jpg',
          imgURLS:'https://kimg.voot.com/kimg/59e8990578ec411fa6a9049b1069de2e_320X180.jpg',
          RefSeriesTitle:'Bigg Boss',
          EpisodeMainTitle:'Bigg Boss - Season 08',
          sbu:'COH',
          genre:'Reality',
        },
        {
          isBigBoss:true,
          type:'relatedMedia',
          SeriesMainTitle:'bigg-boss-s07',
          Season:'7',
          MediaTypeID:'389',
          mediaId:395562,
          imgURLL:'https://kimg.voot.com/kimg/81633e8ad2c1411ca5d82335c70e17c3_768X432.jpg',
          imgURLM:'https://kimg.voot.com/kimg/81633e8ad2c1411ca5d82335c70e17c3_512X288.jpg',
          imgURLS:'https://kimg.voot.com/kimg/81633e8ad2c1411ca5d82335c70e17c3_320X180.jpg',
          RefSeriesTitle:'Bigg Boss',
          EpisodeMainTitle:'Bigg Boss - Season 07',
          sbu:'COH',
          genre:'Reality',
        },
        {
          isBigBoss:true,
          type:'relatedMedia',
          SeriesMainTitle:'bigg-boss-s06',
          Season:'6',
          MediaTypeID:'389',
          mediaId:395561,
          imgURLL:'https://kimg.voot.com/kimg/48a871db900f4ef5b58fc43ed0808d94_768X432.jpg',
          imgURLM:'https://kimg.voot.com/kimg/48a871db900f4ef5b58fc43ed0808d94_512X288.jpg',
          imgURLS:'https://kimg.voot.com/kimg/48a871db900f4ef5b58fc43ed0808d94_768X432.jpg',
          RefSeriesTitle:'Bigg Boss',
          EpisodeMainTitle:'Bigg Boss - Season 06',
          sbu:'COH',
          genre:'Reality',
        },
      ],
    };
// Static data for bigboss season (End)


    let item = {
      mName: 'shows',
      title,
      list: [],
    };


    let imgURLS=[];
    imgURLS = data.assets && data.assets.map((item,index)=>{
        let metaData =  {
          type:'relatedMedia',
          SeriesMainTitle:'',
          Season:'',
          MediaTypeID:item && item.MediaTypeID,
          mediaId:item && item.MediaID,
          imgURLL:item && item.Pictures ? item.Pictures[1].URL:false,
          imgURLM:item && item.Pictures ? item.Pictures[2].URL:false,
          imgURLS:item && item.Pictures ? item.Pictures[4].URL:false,
          sbu:'',
          genre:'',
          RefSeriesTitle:'',
        };
        if(item && item.Metas){
          item.Metas.map((item, index)=>{
            if(['SBU'].indexOf(item.Key) != -1) {
              metaData.sbu = item.Value;
            }
            if(['SeriesMainTitle'].indexOf(item.Key) != -1) {
              metaData.SeriesMainTitle = item.Value;
            }
            if(['EpisodeMainTitle'].indexOf(item.Key) != -1) {
              metaData.SeriesMainTitle = item.Value;
            }
            if(['Season'].indexOf(item.Key) != -1) {
              metaData.Season = item.Value;
            }
            if(['RefSeriesSeason'].indexOf(item.Key) != -1) {
              metaData.Season = item.Value;
            }
          });
          item.Tags.map((item, index)=>{
            if(['Genre'].indexOf(item.Key) != -1) {
              metaData.genre = item.Value;
            }
          });
        }
        return metaData;
      });

    item.list = imgURLS;

    //
    // if(count && count.episodesCount  && count.clipsCount)
    //   return <div />;

    let singleTab = false;
    if((count && count.episodesCount == 0) || (count && count.clipsCount == 0)){
      singleTab = true;
    }

    return (
      <div>
        <Tabs className={singleTab ? 'tab-section single-tab-item' : 'tab-section'}>
          <TabList>
          {count && count.episodesCount!=undefined && count.episodesCount!=0 &&
            <Tab><h2><PaperRipple className='ripple'>All
              Episodes {' (' + count.episodesCount + ')'}</PaperRipple></h2></Tab>}
            {count && count.clipsCount!=undefined && count.clipsCount!=0  &&
              <Tab><h2><PaperRipple className='ripple'>Voot Shorts
                {' (' + count.clipsCount + ')'}</PaperRipple></h2></Tab>}
          </TabList>
          {count && count.episodesCount!=0 && count.episodesCount!=undefined &&
            <TabPanel>
              <VootEpisodes params={newParams} metas={metas} episodesCount={count.episodesCount} />
            </TabPanel>}
          {count && count.clipsCount!=0 && count.clipsCount!=undefined &&
            <TabPanel>
              <VootCuratedShorts params={newParams} metas={metas} />
              <VootShorts params={newParams} metas={metas} clipsCount={count.clipsCount} />
            </TabPanel>}
        </Tabs>


        {/*tray for bigg boss other season on big boss season langing page.*/}
        {this.props.params.mediaId && this.check(this.props.params.mediaId) && season.list && season.list.length && season.title &&
          <div className='all-shows-carousel'>
            <CarouselTray aspectRatio='16x9' item={season} />
          </div>
        }


        {/*tray for more show on voot.*/}
        {item.list && item.list.length && item.title &&
          <div className='all-shows-carousel'>
            <CarouselTray aspectRatio='16x9' item={item} />
          </div>
          }
      </div>
    );
  }
}

ShowsEpisodeShortsTab.propTypes = {
  params: PropTypes.object.isRequired,
  assetsCount: PropTypes.object.isRequired,
  metas: PropTypes.array.isRequired,
  setLoader: PropTypes.func.isRequired,
  getRelatedMedia: React.PropTypes.func.isRequired,
  getMediaInfo: React.PropTypes.func.isRequired,
  clearMediaInfo: React.PropTypes.func.isRequired,
  relatedMedia: React.PropTypes.object.isRequired,
  mediaInfo : React.PropTypes.object.isRequired,
  clearAllPosterRoutes: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoader: bindActionCreators(setLoader, dispatch),
    getMediaInfo: bindActionCreators(getMediaInfo, dispatch),
    getRelatedMedia: bindActionCreators(relatedMedia, dispatch),
    clearMediaInfo: bindActionCreators(clearMediaInfo, dispatch),
    clearAllPosterRoutes : bindActionCreators(clearAllPosterRoutes, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    loader: state.loader,
    params: ownProps.params,
    metas: ownProps.metas,
    assetsCount: ownProps.assetsCount,
    mediaInfo: state.getMediaInfo.mediaInfo,
    relatedMedia: state.playlist.getRelatedMedia,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowsEpisodeShortsTab);
