import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import endpoints from '../../../../../endpoints/playList';
import showEndpoints from '../../../../../endpoints/shows';
import {headingCreator, resultCreator, searchActionSearchAssetsKidsFilter, searchActionKidsEpisodesLoadMoreFilter} from '../../../../../util/search';
import {episodeFormat,timeFormat} from '../../../../../util/filters';
import {createRoutes} from '../../../../../util/routeCreater';
import {formDataGenerator} from '../../../../../util/formDataGenerator';
import {SEARCH} from '../../../../../constants/searchActionConstants';
import {loadMoreContent, searchAssestInfoCalls} from '../../../../../actions/searchAction';
import clone from 'clone';
import _ from 'lodash';

const FILTER = clone(SEARCH.SEARCH_ASSETS_DEFAULT_FILTER);

class KidsVideos extends Component {
  constructor(props) {
    super(props);
    const {kidsVideos} = this.props;
    this.state = {
      load : false,
      kidsVideos,
      countFilter : 1,
      filter : FILTER,
    };
  }

  componentWillMount() {
    const {kidsVideos} = this.state;
    if(kidsVideos.data && kidsVideos.data.length && kidsVideos.count){
      const {searchAssestInfoCalls} = this.props;
      kidsVideos.data.map((item,key) => {
        searchAssestInfoCalls(endpoints.searchAssets, formDataGenerator(searchActionSearchAssetsKidsFilter(clone(FILTER), item)), 'kidsVideos', key, 'adult');
      });

    }
  }

  componentWillReceiveProps(nextProps) {
    const {kidsVideos} = nextProps;
    if(!(_.isEqual(kidsVideos, this.state.kidsVideos))){
      this.setState({
        kidsVideos,
        load: false,
      });
    }
  }

  loadMore = () => {
    const {loadMoreContent, keyword} = this.props;
    const {filter, countFilter} = this.state;
    if((countFilter + 1) % 2 == 1 && countFilter!==1){
      let data = searchActionKidsEpisodesLoadMoreFilter(filter, keyword);
      this.setState({
        load: true,
        filter: data,
      });
      loadMoreContent(showEndpoints.searchAssets,formDataGenerator(data), 'kidsVideos', 'adult', ()=>{
        const {kidsVideos} = this.state;
        const {searchAssestInfoCalls} = this.props;
        this.setState({load: false});
        kidsVideos.data.map((item, key) => {
          if (!item.refSeriesId)
            searchAssestInfoCalls(endpoints.searchAssets, formDataGenerator(searchActionSearchAssetsKidsFilter(clone(FILTER), item)), 'kidsVideos', key, 'adult');
        });
      });
    }

    this.setState({
      countFilter: countFilter + 1,
    });
  };

  createRoutes = (item) => {
    let route = '';
    if(item.refSeriesId){
      route = createRoutes(['kids','characters',`${item.metas.RefSeriesTitle}`,`${item.refSeriesId}`,`${item.metas.EpisodeMainTitle}`,`${item.id}`]);
    } else if(item.metas && item.metas.MovieMainTitle) {
      route = createRoutes(['kids','movie',`${item.metas.MovieMainTitle}`,`${item.id}`]);
    } else {
      route = createRoutes(['kids']);
    }
    this.context.router.push(route);
  };

  getTvSeriesSearchResult = (data, countFilter, count) => {

    return data.map((item,key)=>{
      if(key>4*countFilter -1 || key>=count)
        return;

      return (
        <li key={key} onClick={() => this.createRoutes(item)}>
          <div className='search-item'>
            <figure>
              <img src={item.images[4].url} alt={item.name} width='45' height='25' />
            </figure>
            <div className='search-content'>
              <span className='search-title'>{item.metas.EpisodeMainTitle || item.metas.MovieMainTitle}</span>
              <span className='search-list'>{item.metas.RefSeriesTitle ? episodeFormat(item.metas.RefSeriesTitle) + ' |' : null}  {timeFormat(item.metas.ContentDuration)}</span>
            </div>
          </div>
        </li>
      );
    });
  };

  render() {
    const {kidsVideos: {count, data}, countFilter, load} = this.state;

    return (
      <div>
        {
          count ?
            <div className='search-category'>
              <span className='search-type'>KIDS {headingCreator('videos', count)} - {resultCreator(count)}</span>
              <ul className='search-result'>
                {this.getTvSeriesSearchResult(data, countFilter, count)}
              </ul>
            </div> : null
        }
        {
          count && 4*countFilter<count && !load ?
            <div className='section text-center'>
              <button className='load-more' onClick={this.loadMore}>All Kids Videos</button>
            </div> : null
        }
        {
          load ? <div className='small-loader'></div> : null
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchAssestInfoCalls: bindActionCreators(searchAssestInfoCalls, dispatch),
    loadMoreContent: bindActionCreators(loadMoreContent, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    kidsVideos: state.search.adult.results.kidsVideos,
    keyword: ownProps.keyword,
  };
};

KidsVideos.propTypes = {
  kidsVideos: PropTypes.object.isRequired,
  keyword: PropTypes.string.isRequired,
  searchAssestInfoCalls: PropTypes.func.isRequired,
  loadMoreContent: PropTypes.func.isRequired,
};

KidsVideos.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(KidsVideos);
