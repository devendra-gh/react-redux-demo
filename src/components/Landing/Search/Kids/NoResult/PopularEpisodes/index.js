import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import endpoints from '../../../../../../endpoints/playList';
import showEndpoints from '../../../../../../endpoints/shows';
import {headingCreator, resultCreator, searchActionSearchAssetsKidsFilter, searchActionKidsEpisodesLoadMoreFilter} from '../../../../../../util/search';
import {episodeFormat,dateFormat,timeFormat} from '../../../../../../util/filters';
import {createRoutes} from '../../../../../../util/routeCreater';
import {formDataGenerator} from '../../../../../../util/formDataGenerator';
import {SEARCH} from '../../../../../../constants/searchActionConstants';
import {loadMoreContent, searchAssestInfoCallsNoResult, kidsPopularEpisodes} from '../../../../../../actions/searchAction';
import clone from 'clone';
import _ from 'lodash';


const FILTER = clone(SEARCH.SEARCH_ASSETS_DEFAULT_FILTER);
const GET_DATA_FILTER = clone(SEARCH.KIDS.SEARCH_ASSETS_POPULAR_EPISODES_DEFAULT_FILTER);

class KidsPopularEpisodes extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {popularEpisodes:{count}, kidsPopularEpisodes, searchAssestInfoCallsNoResult}=this.props;
    if(!count)
      kidsPopularEpisodes(endpoints.searchAssets, formDataGenerator(GET_DATA_FILTER), ()=>{
        const {popularEpisodes:{data}} = this.props;
        data.map((item, key) => {
          if (!item.refSeriesId && item.tags.Genre[0]=='Kid' || item.tags.Genre[0]=='Kids')
            searchAssestInfoCallsNoResult(endpoints.searchAssets, formDataGenerator(searchActionSearchAssetsKidsFilter(clone(FILTER), item)), 'popularEpisodes', key, 'kids');
        });
      }) ;
  }


  createRoutes = (item) => {
    let route = '';
    if(item.refSeriesId)
     route = createRoutes(['kids','characters',`${item.metas.RefSeriesTitle}`,`${item.refSeriesId}`,`${item.metas.EpisodeMainTitle}`,`${item.id}`]);
    else
      route = createRoutes(['kids']);
    this.context.router.push(route);
  };

  getPopularKidsEpisodes = (data) => {
    let count = 0;
    return data.map((item,key)=>{
      if(count > 3)
        return;

      if(item.tags.Genre[0]=='Kid' || item.tags.Genre[0]=='Kids') {
        count += 1;
        return (
          <li key={key} onClick={() => this.createRoutes(item)}>
            <div className='search-item'>
              <figure>
                <img src={item.images[4].url} alt={item.name} width='45' height='25' />
              </figure>
              <div className='search-content'>
                <span className='search-title'>{item.metas.EpisodeMainTitle}</span>
                <span
                  className='search-list'>{item.metas.RefSeriesTitle ? episodeFormat(item.metas.RefSeriesTitle) + ' |' : null} {timeFormat(item.metas.ContentDuration)}</span>
              </div>
            </div>
          </li>
        );
      }
    });
  };

  render() {
    const {popularEpisodes: {count, data}} = this.props;

    return (
      <div>
        {
          count ?
            <div className='search-category'>
              <span className='search-type'>POPULAR KIDS VIDEOS</span>
              <ul className='search-result'>
                {this.getPopularKidsEpisodes(data)}
              </ul>
            </div> : null
        }

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchAssestInfoCallsNoResult: bindActionCreators(searchAssestInfoCallsNoResult, dispatch),
    kidsPopularEpisodes: bindActionCreators(kidsPopularEpisodes, dispatch),
    loadMoreContent: bindActionCreators(loadMoreContent, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    popularEpisodes: state.search.kids.noResult.popularEpisodes,
    keyword: ownProps.keyword,
  };
};

KidsPopularEpisodes.propTypes = {
  popularEpisodes: PropTypes.object.isRequired,
  keyword: PropTypes.string,
  searchAssestInfoCallsNoResult: PropTypes.func.isRequired,
  loadMoreContent: PropTypes.func.isRequired,
  kidsPopularEpisodes: PropTypes.func.isRequired,
};

KidsPopularEpisodes.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(KidsPopularEpisodes);
