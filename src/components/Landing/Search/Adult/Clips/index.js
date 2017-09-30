import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import showEndpoints from '../../../../../endpoints/shows';
import {headingCreator, resultCreator, searchActionClipsLoadMoreFilter} from '../../../../../util/search';
import {createRoutes} from '../../../../../util/routeCreater';
import {formDataGenerator} from '../../../../../util/formDataGenerator';
import {timeFormat} from '../../../../../util/filters';
import {SEARCH} from '../../../../../constants/searchActionConstants';
import {loadMoreContent} from '../../../../../actions/searchAction';
import clone from 'clone';
import _ from 'lodash';


const FILTER = clone(SEARCH.SEARCH_ASSETS_DEFAULT_FILTER);

class Clips extends Component {
  constructor(props) {
    super(props);
    const {clips} = this.props;
    this.state = {
      load : false,
      clips,
      countFilter : 1,
      filter : FILTER,
    };
  }


  componentWillReceiveProps(nextProps) {
    const {clips} = nextProps;
    if(!(_.isEqual(clips, this.state.clips))){
      this.setState({
        clips,
        load: false,
      });
    }
  }

  loadMore = () => {
    const {loadMoreContent, keyword} = this.props;
    const {filter, countFilter} = this.state;
      let data = searchActionClipsLoadMoreFilter(filter, keyword);
      this.setState({
        load: true,
        filter: data,
      });
    loadMoreContent(showEndpoints.searchAssets,formDataGenerator(data), 'clips', 'adult', ()=>{
      this.setState({load: false});
    });

    this.setState({
      countFilter: countFilter + 1,
    });
  };

  createRoutes = (item) => {
    let route = createRoutes(['clip',`${item.metas.EpisodeMainTitle}`,`${item.id}`]);
    this.context.router.push(route);
  };

  getClipsSearchResult = (data, countFilter, count) => {

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
              <span className='search-title'>{item.metas.EpisodeMainTitle}</span>
              <span className='search-list'>{timeFormat(item.metas.ContentDuration)}</span>
            </div>
          </div>
        </li>
      );
    });
  };

  render() {
    const {clips: {count, data}, countFilter, load} = this.state;

    return (
      <div className="search-inner-section">
        {
          count ?
            <div className='search-category'>
              <span className='search-type'>{headingCreator('clips', count)} - {resultCreator(count)}</span>
              <ul className='search-result'>
                {this.getClipsSearchResult(data, countFilter, count)}
              </ul>
            </div> : null
        }
        {
          count && 4*countFilter<count && !load ?
            <div className='section text-center'>
              <button className='load-more' onClick={this.loadMore}>See More Voot Shorts Results</button>
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
    loadMoreContent: bindActionCreators(loadMoreContent, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    clips: state.search.adult.results.clips,
    keyword: ownProps.keyword,
  };
};

Clips.propTypes = {
  clips: PropTypes.object.isRequired,
  keyword: PropTypes.string.isRequired,
  loadMoreContent: PropTypes.func.isRequired,
};

Clips.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Clips);
