import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCuratedVootShortsData, appendCuratedVootShortsData, setCuratedVootShortsPosterRoute} from '../../../../../actions/shows';
import endpoints from '../../../../../endpoints/shows';
import DefaultCard from '../../../../CardLayout/DefaultCard';
import {createRouteString} from '../../../../../util/routeCreater';
import _ from 'lodash';
import clone from 'clone';

class AllCuratedVootShorts extends Component {
  constructor(props) {
    super(props);
    const {vootShorts:{data}} = this.props;
    this.state = {
      loaders : [],
      data,
    };
  }

  componentWillMount() {
    const {getCuratedVootShortsData, params: {mediaId}} = this.props;
    let queryParams = {
      tvSeriesId : `${mediaId}`,
    };
    // let queryParams = {
    //   tvSeriesId : 434095,
    // };
    getCuratedVootShortsData(endpoints.vootShorts,queryParams, ()=>{
      const{posterRoute:{episodes}} = this.props;
      if(!episodes){
        const {vootShorts, setCuratedVootShortsPosterRoute} = this.props;
        if(vootShorts.data && vootShorts.data[0]){
          let short = vootShorts.data[0].list[0];
          if(short) {
            let url = `/clip/${createRouteString(short.mediaMainTitle)}/${short.mId}`;
            setCuratedVootShortsPosterRoute(url);
          }
        }
      }
    });
  }

  componentWillReceiveProps(nextProps){
    const {data, toggle}= this.state;
    const {vootShorts}=nextProps;
    if(!(_.isEqual(data, vootShorts.data))){
      this.setState({data: vootShorts.data});
      this.setLoaderFalse(vootShorts.data);
    }
  }

  loadMore = (shorts, key) => {
    const {appendCuratedVootShortsData} = this.props;
    const {loaders}= this.state;
    let queryParams = {
      cName : shorts.mName,
      mName : shorts.paramlink,
    };
    // let queryParams = {
    //   cName : 'app-kids-cluster-6',
    //   mName : 'kidsClusters',
    // };
    appendCuratedVootShortsData(endpoints.getChannelMedias,queryParams, shorts.title);
    loaders[key]=true;
    this.setState({
      loaders,
    });
  };

  setLoaderFalse = (data) => {
    let loaders=[];

    data.map(()=>{
      loaders.push(clone(false));
    });

    this.setState({
      loaders,
    });
  };

  routeToVideoPlayPage = (short) => {
    this.context.router.push(`/clip/${createRouteString(short.mediaMainTitle)}/${short.mId}`);
  };

  getVootShort = (shortList) => {
    return shortList.map((short, skey)=>{
      let items = {};
      items.mediaMainTitle = short.name;
      items.imgURLL = short.imgURLL;
      items.imgURLM = short.imgURLM;
      items.imgURLS = short.imgURLS;
      items.duration = short.duration;
      return(
        <div key={skey} className='grid-view grid-2'>
          <DefaultCard aspectRatio='16x9' onClick={()=>this.routeToVideoPlayPage(short)} data={short} items={items} showPlayIcon />
        </div>
      );
    });
  }

  getVootShorts = (vootShorts, loader) => {
    let vootShortList = '';
    vootShortList = vootShorts.map((shorts,key)=>{
      return(
        <div key={key}>
          <div className='top-heading'>
            <div className='heading-inner'>
              <h3 className='tray-heading default-color'>{shorts.title}</h3>
            </div>
          </div>
          <div className='grid-container clearfix grid-shows'>
            {this.getVootShort(shorts.list)}
          </div>
          {!loader[key] && shorts.list.length<shorts.listCount &&
            <div className='section text-center'>
              <button className='load-more' onClick={()=>this.loadMore(shorts, key)}>Load More</button>
            </div>
          }
          {loader[key] &&  <div className='small-loader' />}
        </div>
      );
    });

    return vootShortList;
  }

  render() {
    const {vootShorts, loader} = this.props;
    const {loaders} = this.state;
    return (
      <div>
        {vootShorts.totalDataCount ? this.getVootShorts(vootShorts.data, loaders) : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCuratedVootShortsData: bindActionCreators(getCuratedVootShortsData, dispatch),
    appendCuratedVootShortsData: bindActionCreators(appendCuratedVootShortsData, dispatch),
    setCuratedVootShortsPosterRoute: bindActionCreators(setCuratedVootShortsPosterRoute, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    params: ownProps.params,
    metas: ownProps.metas,
    vootShorts : state.shows.episodes.vootShorts.curated,
    posterRoute : state.shows.posterRoute,
  };
};

AllCuratedVootShorts.propTypes = {
  getCuratedVootShortsData: PropTypes.func.isRequired,
  appendCuratedVootShortsData: PropTypes.func.isRequired,
  setCuratedVootShortsPosterRoute: PropTypes.func.isRequired,
  loader: PropTypes.object,
  params: PropTypes.object.isRequired,
  posterRoute: PropTypes.object.isRequired,
  vootShorts: PropTypes.object,
  metas: PropTypes.array.isRequired,
};


AllCuratedVootShorts.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllCuratedVootShorts);
