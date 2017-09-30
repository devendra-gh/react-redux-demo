import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import showEndpoints from '../../../../../endpoints/shows';
import {headingCreator, resultCreator, searchActionMoviesLoadMoreFilter} from '../../../../../util/search';
import {createRoutes} from '../../../../../util/routeCreater';
import {formDataGenerator} from '../../../../../util/formDataGenerator';
import {SEARCH} from '../../../../../constants/searchActionConstants';
import {loadMoreContent} from '../../../../../actions/searchAction';
import {timeFormat} from '../../../../../util/filters';

import clone from 'clone';
import _ from 'lodash';


const FILTER = clone(SEARCH.SEARCH_ASSETS_DEFAULT_FILTER);

class Movies extends Component {
  constructor(props) {
    super(props);
    const {movies} = this.props;
    this.state = {
      load : false,
      movies,
      countFilter : 1,
      filter : FILTER,
    };
  }


  componentWillReceiveProps(nextProps) {
    const {movies} = nextProps;
    if(!(_.isEqual(movies, this.state.movies))){
      this.setState({
        movies,
        load: false,
      });
    }
  }

  loadMore = () => {
     const {loadMoreContent, keyword} = this.props;
    const {filter, countFilter} = this.state;
    if((countFilter + 1) % 2 == 1 && countFilter!==1){
      let data = searchActionMoviesLoadMoreFilter(filter, keyword);
      this.setState({
        load: true,
        filter: data,
      });
      loadMoreContent(showEndpoints.searchAssets,formDataGenerator(data), 'movies', 'adult', ()=>{
        this.setState({load: false});
      });
    }
    this.setState({
      countFilter: countFilter + 1,
    });
  };

  createRoutes = (item) => {
    let route = createRoutes(['movie',`${item.metas.MovieMainTitle}`,`${item.id}`]);
    this.context.router.push(route);
  };

  getMoviesSearchResult = (data, countFilter, count) => {

    return data.map((item,key)=>{

      if(key>2*countFilter-1 || key>=count)
        return;

      return (
        <li key={key} onClick={() => this.createRoutes(item)}>
          <div className='search-item'>
            <figure>
              <img src={item.images[4].url} alt={item.name} width='45' height='25' />
            </figure>
            <div className='search-content'>
              <span className='search-title'>{item.metas.MovieMainTitle}</span>
              <span className='search-list'>{timeFormat(item.metas.ContentDuration)}</span>
            </div>
          </div>
        </li>
      );
    });
  };

  render() {
    const {movies: {count, data}, countFilter, load} = this.state;

    return (
      <div className="search-inner-section">
        {
          count ?
            <div className='search-category'>
              <span className='search-type'>{headingCreator('movies', count)} - {resultCreator(count)}</span>
              <ul className='search-result'>
                {this.getMoviesSearchResult(data, countFilter, count)}
              </ul>
            </div> : null
        }
        {
          count && 2*countFilter<count && !load ?
            <div className='section text-center'>
              <button className='load-more' onClick={this.loadMore}>See More Movies Results</button>
            </div> : null
        }
        {
          2*countFilter-1<count && load ? <div className='small-loader'></div> : null
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
    movies: state.search.adult.results.movies,
    keyword: ownProps.keyword,
  };
};

Movies.propTypes = {
  movies: PropTypes.object.isRequired,
  keyword: PropTypes.string.isRequired,
  loadMoreContent: PropTypes.func.isRequired,
};

Movies.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
