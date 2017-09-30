import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import endpoints from '../../../../../endpoints/shows';
import {KIDS} from '../../../../../constants';
import {getKidsMoviesData, appendKidsMoviesData, clearKidsMoviesErrors, clearKidsMoviesData} from '../../../../../actions/kids';
import {setLoader, setSmallLoader} from '../../../../../actions/loader';
import {Link} from 'react-router';
import {createRouteString} from '../../../../../util/routeCreater';
import {formDataGenerator} from '../../../../../util/formDataGenerator';
import PosterCard from '../../../../CardLayout/PosterCard';
import CardHeading from '../../../../CardComponent/CardHeading';
import TabNavigation from '../../../../Navigation/TabNav';
import clone from 'clone';
import {applyOrderByFilter, applyPageIndexFilter, initializePageIndexFilter} from '../../../../../util/mapingFilters';
import Loader from '../../../../Loader';
import appBoyEvent from '../../../../../util/appboyEvent';


class ViewAllKidsMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: clone(KIDS.MOVIES.DEFAULT_FILTERS),
      toggle: 0,
    };
  }

  componentWillMount() {
    const {getKidsMoviesData, moviesData, loader, setLoader} = this.props;
    let params = endpoints.searchAssets;
    if (!moviesData.data.length) {
      if (!loader.load){
        setLoader(true);
      }
      getKidsMoviesData(params, formDataGenerator(this.state.data), function () {
        setLoader(false);
      });
    }
  }

  componentDidMount = () => {
    if(typeof window !== "undefined") {
      //appboy.logCustomEvent
      //appBoyEvent.isVootKids(true);
    }
  };

  componentWillUnmount() {
    const {clearKidsMoviesErrors, moviesData, clearKidsMoviesData} = this.props;
    clearKidsMoviesData();
  }

  loadMore = () => {
    const {appendKidsMoviesData, setSmallLoader} = this.props;
    const {data}=this.state;
    let params = endpoints.searchAssets;
    setSmallLoader(true);
    params.successCallback = function () {
      setSmallLoader(false);
    };
    params.failureCallback = function () {
      setSmallLoader(false);
    };
    appendKidsMoviesData(params, formDataGenerator(applyPageIndexFilter(data)));
  };

  routeToMovieVideoPage(movie){
    this.context.router.push(`/kids/movie/${createRouteString(movie.name)}/${movie.id}`);
  }

  render() {
    let moviesList;
    const {moviesData, smallLoader} = this.props;
    if(moviesData.dataCount > 0){
      moviesList= moviesData.data.map((movie, index) => {
        let poster = {
          title: movie.name,
          imgURLL: movie.images[10].url,
          imgURLM: movie.images[11].url,
          imgURLS: movie.images[13].url,
          mediaType: movie.type,
          mId: movie.id,
        };
        return (
          <PosterCard aspectRatio='2x3' onClick={()=>this.routeToMovieVideoPage(movie)} data={movie} gridClass={'grid-2'} key={index} poster={poster} />
        );
      });
    }

    return (
      <div className='view-all-kids-movies-page'>
        <Loader {...this.props} />
        <div className='top-heading margin-t15'>
          <div className='heading-inner'>
            <CardHeading>
              <h1>All Kids Movies on Voot</h1>
              <span></span>
            </CardHeading>
          </div>
        </div>

        <div className='grid-container clearfix filter-list'>
          {moviesList}
        </div>

        {moviesData.data && moviesData.data.length<moviesData.dataCount && !smallLoader.load &&
          <div className='section text-center'>
            <button className='load-more' onClick={this.loadMore}>Load More</button>
          </div>
        }
        {
          smallLoader.load && <div className='small-loader'></div>
        }
      </div>
    );
  }
}

ViewAllKidsMovies.propTypes = {
  getKidsMoviesData: PropTypes.func.isRequired,
  appendKidsMoviesData: PropTypes.func.isRequired,
  clearKidsMoviesErrors: PropTypes.func.isRequired,
  clearKidsMoviesData: PropTypes.func.isRequired,
  setLoader: PropTypes.func.isRequired,
  setSmallLoader: PropTypes.func.isRequired,
  moviesData: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  loader: React.PropTypes.object.isRequired,
  smallLoader: React.PropTypes.object.isRequired,
};

ViewAllKidsMovies.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
const mapDispatchToProps = (dispatch) => {
  return {
    getKidsMoviesData: bindActionCreators(getKidsMoviesData, dispatch),
    appendKidsMoviesData: bindActionCreators(appendKidsMoviesData, dispatch),
    clearKidsMoviesErrors: bindActionCreators(clearKidsMoviesErrors, dispatch),
    clearKidsMoviesData: bindActionCreators(clearKidsMoviesData, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
    setSmallLoader: bindActionCreators(setSmallLoader, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    moviesData: state.kids.moviesData,
    loader: state.loader,
    smallLoader: state.smallLoader,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewAllKidsMovies);
