import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {MEDIA_TYPE} from '../../../../constants/media';
import endpoints from '../../../../endpoints/shows';
import {getMovieCarousel, getMoviesData, appendMoviesData, clearMoviesErrors, clearMoviesData} from '../../../../actions/moviesAction';
import {addLanguage} from '../../../../actions/filters';
import {setLoader} from '../../../../actions/loader';
import PosterCard from '../../../CardLayout/PosterCard';
import FilterComponent from '../../../FilterComponent';
import GenreLanguage from '../../../Landing/GenreLanguage';

import {formDataGenerator} from '../../../../util/formDataGenerator';
import {createRouteString} from '../../../../util/routeCreater';
import {applyOrderByFilter, applyPageIndexFilter, initializePageIndexFilter, applyLanguageGenreFilter, applyPopularLanguageGenreFilter} from '../../../../util/mapingFilters';
import clone from 'clone';

class MoviesList extends Component {
  constructor(props) {
    super(props);
    let filters = clone(this.props.filters);
    if (filters) {
      filters.genre = (!filters.genre) ? ['All'] : filters.genre;
      filters.language = (!filters.language) ? ['English', 'Hindi'] : filters.language;
    } else {
      filters = {genre: ['All'], language: ['English', 'Hindi']}
    }
    this.state = {
      mediaType: null,
      notInGenre: ['kids', 'kid'],
      initialFilters: filters,
      currentFilters: filters,
      data: [
        {
          "key": "filterTypes",
          "value": "390",
        },
        {
          "key": "filter",
          "value": '',
        },
        {
          "key": "orderBy",
          "value": "views",
        },
        {
          "key": "pageIndex",
          "value": "0",
        },
        {
          "key": "pageSize",
          "value": "10",
        },
      ],
      toggle: 0,
    };
  }

  componentWillMount() {
    const {setLoader, loader, movies: {moviesData, carousel}, getMoviesData} = this.props;
    const {currentFilters:{genre,language}, mediaType,notInGenre} = this.state;
    if (mediaType !== MEDIA_TYPE.MOVIE)
      this.setState({mediaType : (MEDIA_TYPE.MOVIE)});
    let popularData = applyLanguageGenreFilter(this.state.data, genre, notInGenre, language, mediaType);
      this.setState({
        data: popularData,
      });

    if (!moviesData.data.length) {
      if (!loader.load) {
        setLoader(true);
      }
      getMoviesData(endpoints.searchAssets, formDataGenerator(this.state.data));
    }
  }

  componentWillUnmount() {
    const {clearMoviesErrors, movies, clearMoviesData} = this.props;
    const {data}=this.state;
    if (movies.error.message) {
      clearMoviesErrors();
    }

    clearMoviesData();
  }

  loadMore = () => {
    const {appendMoviesData, setLoader} = this.props;
    const {data}=this.state;
    setLoader(true);
    appendMoviesData(endpoints.searchAssets, formDataGenerator(applyPageIndexFilter(data)));
  };

  orderByMostPopular = () => {
    const {clearMoviesData, getMoviesData, setLoader} = this.props;
    const {data}=this.state;

    clearMoviesData();
    this.setState({toggle: 0});

    if (applyOrderByFilter(data, 'views')) {
      setLoader(true);
      getMoviesData(endpoints.searchAssets, formDataGenerator(data));
    }
  };

  orderByAtoZ = () => {
    const {clearMoviesData, getMoviesData, setLoader} = this.props;
    const {data}=this.state;

    clearMoviesData();
    this.setState({toggle: 1});

    if (applyOrderByFilter(data, 'a_to_z')) {
      setLoader(true);
      getMoviesData(endpoints.searchAssets, formDataGenerator(data));
    }
  };

  applyGenreAndLanguage= (genres, languages) => {
    let newFilter = {genre: genres, language: languages};
    this.setState({
      currentFilters: newFilter,
    });
  };

  routeToAllShowsEpisodes = (movie) => {
    this.context.router.push(`/movie/${createRouteString(movie.name)}/${movie.id}`);
  };

  render() {
    const {movies: {moviesData, error, carousel}, loader, getMoviesData, clearMoviesData} = this.props;
    const {data, toggle} = this.state;

    let moviesList = '';

    if (moviesData.data.length)
      moviesList = moviesData.data.map((movie, key) => {

        let poster = {
          title: movie.name,
          /*imageList: {
            imgURLL: movie.imgURLL,
            imgURLM: movie.imgURLM,
            imgURLS: movie.imgURLS,
          },*/
          imgURLL: movie.images[10].url,
          imgURLM: movie.images[11].url,
          imgURLS: movie.images[13].url,
          mediaType: movie.type,
          mId: movie.id,
        };

        return (
          <PosterCard aspectRatio='2x3' onClick={()=>this.routeToAllShowsEpisodes(movie)} data={movie} gridClass={'grid-2'} key={key} poster={poster} />
        );
      });

    return (
      <div className='home-container'>
        <div className='top-heading'>
          <div className='heading-inner'>
            {
              !moviesData.data.length && error.message ? <div className='section text-center no-result'>Sorry, No Results Found</div> :
                <div className='order-filter'>
                  <button className={` ${toggle ?' most-popular-btn' : 'most-popular-btn active'}`}  onClick={this.orderByMostPopular}>Most Popular</button>
                  <button className={` ${toggle ? ' most-popular-btn active' : 'most-popular-btn'}`} onClick={this.orderByAtoZ}>A - Z</button>
                </div>
            }
          </div>
        </div>

        <FilterComponent>
          <GenreLanguage data={data} getData={getMoviesData} clearData={clearMoviesData} {...this.props} {...this.state}
                         applyGenreAndLanguage={this.applyGenreAndLanguage} />
        </FilterComponent>

        <div className='grid-container clearfix filter-list'>
          {moviesList}
        </div>

        {!error.message && moviesData.data.length<moviesData.dataCount && !loader.load &&
          <div className='section text-center'>
            <button className='load-more' onClick={this.loadMore}>Load More</button>
          </div>
        }
        {
          loader.load && <div className='small-loader'></div>
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMovieCarousel: bindActionCreators(getMovieCarousel, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
    getMoviesData: bindActionCreators(getMoviesData, dispatch),
    appendMoviesData: bindActionCreators(appendMoviesData, dispatch),
    clearMoviesErrors: bindActionCreators(clearMoviesErrors, dispatch),
    clearMoviesData: bindActionCreators(clearMoviesData, dispatch),
    addLanguage: bindActionCreators(addLanguage, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    movies: state.movies,
    loader: state.loader,
  };
};

MoviesList.propTypes = {
  getMovieCarousel: PropTypes.func.isRequired,
  getMoviesData: PropTypes.func.isRequired,
  appendMoviesData: PropTypes.func.isRequired,
  clearMoviesErrors: PropTypes.func.isRequired,
  movies: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  setLoader: PropTypes.func.isRequired,
  loader: PropTypes.object.isRequired,
  clearMoviesData: PropTypes.func. isRequired,
  addLanguage: React.PropTypes.func.isRequired,
};

MoviesList.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
