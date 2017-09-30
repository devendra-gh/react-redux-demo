import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {MOVIES} from '../../../constants/moviesActionConstants';
import {MEDIA_TYPE} from '../../../constants/media';
import endpoints from '../../../endpoints/shows';
import {getMovieCarousel, getMoviesData, appendMoviesData, clearMoviesErrors, clearMoviesData} from '../../../actions/moviesAction';
import {clearFilters, addMediaType} from '../../../actions/filters';
import {setLoader} from '../../../actions/loader';
import clone from 'clone';

import HeadTray from '../../Tray/HeadTray';
import PosterCard from '../../CardLayout/PosterCard';
import FilterComponent from '../../FilterComponent';
import GenreLanguage from '../GenreLanguage';

import {formDataGenerator} from '../../../util/formDataGenerator';
import {createRouteString} from '../../../util/routeCreater';
import {applyOrderByFilter, applyPageIndexFilter, initializePageIndexFilter, applyLanguageGenreFilter} from '../../../util/mapingFilters';

import TabNavigation from '../../Navigation/TabNav';
import {site_name, get_domain_url} from '../../../constants/seoConstant';


class Movies extends Component {
  constructor(props) {
    super(props);
    let filters = clone(this.props.filters);
    if (filters) {
      filters.genre = (!filters.genre) ? ['All'] : filters.genre;
      filters.language = (!filters.language) ? ['English', 'Hindi'] : filters.language;
    } else {
      filters = {genre: ['All'], language: ['English', 'Hindi']}
    }
    const {genre, language} = filters;

    this.state = {
      mediaType: null,
      notInGenre: ['kids', 'kid'],
      initialFilters: filters,
      currentFilters: filters,
      data: applyLanguageGenreFilter(clone(MOVIES.DEFAULT_FILTERS), genre, ['kids', 'kid'],language, MEDIA_TYPE.MOVIE),
      toggle: 0,
    };
  }

  componentWillMount() {
    const {getMovieCarousel, setLoader, loader, movies: {moviesData, carousel}, getMoviesData} = this.props;
    const {mediaType} = this.state;
    if (!carousel.mName) {
      if (!loader.load) {
        setLoader(true);
      }
      getMovieCarousel(endpoints.moviesCarousel);
    }

    if (!moviesData.data.length) {
      if (!loader.load) {
        setLoader(true);
      }
      getMoviesData(endpoints.searchAssets, formDataGenerator(this.state.data));
    }

    if (mediaType !== MEDIA_TYPE.MOVIE)
      this.setState({mediaType : (MEDIA_TYPE.MOVIE)});
  }

  componentDidMount = ()=>{
    if(typeof window!=='undefined')
      window.fbq('trackCustom', 'MoviePageView');
  };

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
    const {data}=this.state;
    this.setState({toggle: 0});

    if (applyOrderByFilter(data, 'views')) {
      const {clearMoviesData, getMoviesData, setLoader} = this.props;
      clearMoviesData();
      setLoader(true);
      getMoviesData(endpoints.searchAssets, formDataGenerator(data));
    }
  };

  orderByAtoZ = () => {
    const {data}=this.state;
    this.setState({toggle: 1});

    if (applyOrderByFilter(data, 'a_to_z')) {
      const {clearMoviesData, getMoviesData, setLoader} = this.props;
      clearMoviesData();
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

  renderSeoTags = () => {
      const title = 'Watch Full HD Unlimited movies online free on - VOOT';
      const description = 'Watch full movie for Free only on Voot. Get the complete list of other full movies to watch online for free only on Voot.';
      const props = {
        title,
        meta: [
          {
            name: 'google-play-app',
            content: 'app-id=com.tv.v18.viola',
          },
          {
            name: 'robots',
            content: 'index, follow',
          },
          {
            name: 'title',
            content: title,
          },
          {
            name: 'description',
            content: description,
          },
          {
            name: 'keywords',
            content: 'Watch Full Length HD quality movies, Full Movie streaming, Full Movies, HD Quality Free Movies, watch online free on Voot.',
          },
          {
            property: 'og:url',
            content: get_domain_url() + this.props.location.pathname,
          },
          {
            property: 'og:title',
            content: title,
          },
          {
            property: 'og:image',
            content: 'https://dimg.voot.com/include/upload/web-vertical-images/compressed/moviesHeroAsset_1_0_image_1487828006moviesHeroAsset_1_1_image_1467626266Drishyam1-HIGH-RES-.jpg',
          },
          {
            property: 'og:description',
            content: 'Free Movies Watch - Movies Videos, Movies Clips, Upcoming Movies Trailer on VOOT with Movies Genres like Action, Drama, Comedy, Romance and many more!',
          },
          {
            property: 'og:site_name',
            content: site_name,
          },
          {
            property: 'twitter:title',
            content: title,
          },
          {
            property: 'twitter:image',
            content: 'https://dimg.voot.com/include/upload/web-vertical-images/compressed/moviesHeroAsset_1_0_image_1487828006moviesHeroAsset_1_1_image_1467626266Drishyam1-HIGH-RES-.jpg',
          },
          {
            property: 'twitter:url',
            content: get_domain_url() + this.props.location.pathname,
          },
        ],
      };
      return (<Helmet {...props} />);
    };


  render() {
    const {movies: {moviesData, error, carousel}, loader, clearMoviesData, getMoviesData} = this.props;
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
        {this.renderSeoTags()}
        <TabNavigation {...this.props} />

        <div className='home-page'>
          {carousel.mName
            ? <HeadTray aspectRatio='16x9' item={carousel} noPlayIcon={false} />
            : <div className='empty-tray'></div>
          }

          <div className='top-heading'>
            <div className='heading-inner'>
              <div className='tray-heading default-color'><h2>All Movies</h2></div>
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
            <GenreLanguage data={data} getData={getMoviesData} clearData={clearMoviesData} {...this.props} {...this.state} applyGenreAndLanguage={this.applyGenreAndLanguage} />
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
    clearFilters: bindActionCreators(clearFilters, dispatch),
    clearMoviesErrors: bindActionCreators(clearMoviesErrors, dispatch),
    addMediaType: bindActionCreators(addMediaType, dispatch),
    clearMoviesData: bindActionCreators(clearMoviesData, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    movies: state.movies,
    loader: state.loader,
  };
};


Movies.need = [
  getMovieCarousel,
];


Movies.propTypes = {
  getMovieCarousel: PropTypes.func.isRequired,
  getMoviesData: PropTypes.func.isRequired,
  appendMoviesData: PropTypes.func.isRequired,
  clearMoviesErrors: PropTypes.func.isRequired,
  movies: PropTypes.object.isRequired,
  location: PropTypes.object,
  setLoader: PropTypes.func.isRequired,
  loader: PropTypes.object.isRequired,
  addMediaType: PropTypes.func. isRequired,
  clearMoviesData: PropTypes.func. isRequired,
};

Movies.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
