import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import endpoints from '../../../../endpoints/shows';
import {SHOWS} from '../../../../constants/showsActionConstants';
import {MEDIA_TYPE} from '../../../../constants/media';
import {getTvShowsCarousel, getTvShowsData, appendTvShowsData, clearTvShowsErrors, clearTvSeriesData} from '../../../../actions/shows';
import {setLoader} from '../../../../actions/loader';
import {formDataGenerator} from '../../../../util/formDataGenerator';
import {applyPageIndexFilter, initializePageIndexFilter, applyLanguageGenreFilter, applyPopularLanguageGenreFilter} from '../../../../util/mapingFilters';
import {createRouteString} from '../../../../util/routeCreater';
import HeadTray from '../../../Tray/HeadTray';
import EpisodeDefaultCard from '../../../CardLayout/EpisodeDefaultCard';
import FilterComponent from '../../../FilterComponent';
import GenreLanguage from '../../GenreLanguage';
import {checkUrl} from './../../../../util/routeCreater';
import clone from 'clone';

const SHOWLIST_FILTER = clone(SHOWS.TV_SERIES.SHOWLIST_ASSET_COUNT_DEFAULT_FILTERS);
const POPULAR_FILTER = clone(SHOWS.TV_SERIES.POPULAR_LIST_DEFAULT_FILTERS);
class VootTvSeries extends Component {
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
      data: applyPopularLanguageGenreFilter(clone(POPULAR_FILTER), genre, language),
      toggle: 0,
    };
  }

  componentWillMount() {
    const {getTvShowsCarousel, setLoader, loader, tvSeries, getTvShowsData} = this.props;
    const {currentFilters:{genre,language}, mediaType} = this.state;
    if (!tvSeries.carousel.mName) {
      if (!loader.load) {
        setLoader(true);
      }
      getTvShowsCarousel(endpoints.tvSeriesCarousel);
    }

    if (!tvSeries.showData.data.length) {
      if (!loader.load) {
        setLoader(true);
      }
      getTvShowsData(endpoints.popularShowsList, formDataGenerator(this.state.data));
    }

    if (mediaType !== MEDIA_TYPE.TV_SERIES)
      this.setState({mediaType : (MEDIA_TYPE.TV_SERIES)});
  }

  componentWillUnmount() {
    const {clearTvShowsErrors, tvSeries, clearTvSeriesData} = this.props;
    const {data, toggle}=this.state;
    if (tvSeries.error.message) {
      clearTvShowsErrors();
    }
    clearTvSeriesData();
  }

  applyGenreAndLanguage= (genres, languages) => {
    let newFilter = {genre: genres, language: languages};
    this.setState({
      currentFilters: newFilter,
    });
  };

  loadMore = () => {
    const {appendTvShowsData, setLoader} = this.props;
    const {data, toggle}=this.state;
    setLoader(true);
    if(toggle)
      appendTvShowsData(endpoints.showsListWithAssetsCounts, formDataGenerator(applyPageIndexFilter(data)));
    else
      appendTvShowsData(endpoints.popularShowsList, formDataGenerator(applyPageIndexFilter(data)));
  };

  orderByMostPopular = () => {
    const {toggle} = this.state;
    if(toggle){
      const {clearTvSeriesData, getTvShowsData, setLoader} = this.props;
      const {currentFilters:{genre,language}} = this.state;
      let data = applyPopularLanguageGenreFilter(clone(POPULAR_FILTER), genre, language);
      clearTvSeriesData();
      setLoader(true);
      getTvShowsData(endpoints.popularShowsList, formDataGenerator(data));
      this.setState({
        toggle: 0,
        data,
      });
    }

  };

  orderByAtoZ = () => {
    const {toggle} = this.state;
    if(!toggle) {
      const {clearTvSeriesData, getTvShowsData, setLoader} = this.props;
      const {currentFilters:{genre, language}, notInGenre,mediaType } = this.state;
      let data = applyLanguageGenreFilter(clone(SHOWLIST_FILTER), genre, notInGenre, language, mediaType);
      clearTvSeriesData();
      setLoader(true);
      getTvShowsData(endpoints.showsListWithAssetsCounts, formDataGenerator(data));
      this.setState({
        toggle: 1,
        data,
      });
    }
  };

  // applyFilter = () => {
  //   this.setState({
  //     toggle: 0,
  //     data: clone(POPULAR_FILTER),
  //   });
  // };

  routeToAllShowsEpisodes = (show) => {
    const pathname = `/shows/${createRouteString(show.metas.SeriesMainTitle.replace(/\?/g, '-'))}/${show.metas.Season}/${show.id}`;
    const newPath = checkUrl(pathname);
    if(typeof newPath === "object" && typeof newPath.url !== "undefined" && typeof newPath.url !== "undefined" && typeof newPath.mediaId !== "undefined"){
      this.context.router.push(newPath.url);
    }else{
      this.context.router.push(pathname);
    }
  };

  getShowList = (tvSeries) => {
    let showList = '';

    if (tvSeries.data)
      showList = tvSeries.data.map((show, key) => {

        //console.log(show.assetsCount ? (show.assetsCount.episodesCount ? show.assetsCount.episodesCount : show.assetsCount.episode) : 0,'0000');
        //console.log(show.metas.SBU, "show.metas.SBU+++", show.tags.Genre[0], "+++show.tags.Genre[0]" );
        let items = {
          name: show.name,
          imgURLL: show.images[1].url,
          imgURLM: show.images[3].url,
          imgURLS: show.images[4].url,
          genre: [show.metas.SBU, show.tags.Genre[0]],
          videos: show.assetsCount ? (show.assetsCount.episodesCount ? show.assetsCount.episodesCount : show.assetsCount.episode) : 0,
        };

        return (
          <EpisodeDefaultCard aspectRatio='16x9' onClick={()=>this.routeToAllShowsEpisodes(show)} data={show} key={key} items={items} />
        );
      });

    return showList;
  };

  render() {
    const {tvSeries: {showData, carousel, error}, loader, getTvShowsData, clearTvSeriesData} = this.props;
    const {data, toggle} = this.state;
    return (
      <div>
        {carousel.mName
          ? <HeadTray aspectRatio='16x9' item={carousel} noPlayIcon={false} />
          : <div className='empty-tray'></div>
        }
        <div className='top-heading'>
          <div className='heading-inner'>
            <div className='tray-heading default-color'><h2>All Shows</h2></div>
            {
              !showData.data.length && error.message ? <div className='section text-center no-result'>No Results Found!</div> :
                <div className='order-filter'>
                  <button className={` ${toggle ?' most-popular-btn' : 'most-popular-btn active'}`} onClick={this.orderByMostPopular}>Most Popular</button>
                  <button className={` ${toggle ? ' most-popular-btn active' : 'most-popular-btn'}`} onClick={this.orderByAtoZ}>A - Z</button>
                </div>
            }
          </div>
        </div>

        <FilterComponent>
          <GenreLanguage data={data} getData={getTvShowsData} clearData={clearTvSeriesData} {...this.state} {...this.props} applyGenreAndLanguage={this.applyGenreAndLanguage} />
        </FilterComponent>

        <div className='grid-container clearfix grid-shows'>
          {this.getShowList(showData)}
        </div>

        {!error.message && !loader.load && showData.data.length<showData.dataCount &&
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
    getTvShowsCarousel: bindActionCreators(getTvShowsCarousel, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
    getTvShowsData: bindActionCreators(getTvShowsData, dispatch),
    appendTvShowsData: bindActionCreators(appendTvShowsData, dispatch),
    clearTvShowsErrors: bindActionCreators(clearTvShowsErrors, dispatch),
    clearTvSeriesData: bindActionCreators(clearTvSeriesData, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    tvSeries: state.shows.tvSeries,
    loader: state.loader,
    // filters: state.filters,
  };
};

VootTvSeries.propTypes = {
  getTvShowsCarousel: React.PropTypes.func.isRequired,
  getTvShowsData: React.PropTypes.func.isRequired,
  appendTvShowsData: React.PropTypes.func.isRequired,
  clearTvShowsErrors: React.PropTypes.func.isRequired,
  clearTvSeriesData: React.PropTypes.func.isRequired,
  tvSeries: React.PropTypes.object.isRequired,
  setLoader: React.PropTypes.func.isRequired,
  loader: React.PropTypes.object.isRequired,
  filters: React.PropTypes.object.isRequired,
};

VootTvSeries.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(VootTvSeries);
