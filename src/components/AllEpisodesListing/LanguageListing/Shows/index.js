/**
 * Created by TTND on 2/12/2017.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {MEDIA_TYPE} from '../../../../constants/media';
import endpoints from '../../../../endpoints/shows';
import {SHOWS} from '../../../../constants/showsActionConstants';
import { getTvShowsData, appendTvShowsData, clearTvShowsErrors, clearTvSeriesData } from '../../../../actions/shows';
import {updateInitialLanguage, resetInitialData} from '../../../../actions/filters';
import {setLoader} from '../../../../actions/loader';
import {formDataGenerator} from '../../../../util/formDataGenerator';
import Loader from '../../../Loader';
import {applyPageIndexFilter, initializePageIndexFilter, applyLanguageGenreFilter, applyPopularLanguageGenreFilter} from '../../../../util/mapingFilters';
import {createRouteString} from '../../../../util/routeCreater';
import HeadTray from '../../../Tray/HeadTray';
import EpisodeDefaultCard from '../../../CardLayout/EpisodeDefaultCard';
import FilterComponent from '../../../FilterComponent';
import GenreLanguage from '../../../Landing/GenreLanguage';
import clone from 'clone';
import _ from 'lodash';

class ShowsList extends Component {
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
      firstCall: 0,
      mediaType: null,
      notInGenre: ['kids', 'kid'],
      initialFilters: filters,
      currentFilters: filters,
      serachAtoZFilter: [
        {
          "key": "filter",
          "value": '',
        },
        {
          "key": "orderBy",
          "value": "a_to_z",
        },
        {
          "key": "pageSize",
          "value": "10",
        },
        {
          "key": "pageIndex",
          "value": "0",
        },
      ],
      popularFilter: [
        {
          "key": "language",
          "value": '',
        },
        {
          "key": "isKids",
          "value": "0",
        },
        {
          "key": "pageSize",
          "value": "10",
        },
        {
          "key": "pageIndex",
          "value": "0",
        },
      ],
      toggle: 0,
      data: [],
    };
  }

  componentWillMount() {
    const {setLoader, loader, tvSeries, getTvShowsData} = this.props;
    const {currentFilters:{genre, language}, mediaType} = this.state;
    let popularData = applyPopularLanguageGenreFilter(this.state.popularFilter, genre, language);
    this.setState({
      firstCall: 0,
      data: popularData,
    });

    if (mediaType !== MEDIA_TYPE.TV_SERIES)
      this.setState({mediaType : (MEDIA_TYPE.TV_SERIES)});
    if (!tvSeries.showData.data.length) {
      if (!loader.load) {
        setLoader(true);
      }
      getTvShowsData(endpoints.popularShowsList, formDataGenerator(popularData));
    }
  }

  componentWillUnmount() {
    const {clearTvShowsErrors, tvSeries, clearTvSeriesData} = this.props;
    if (tvSeries.error.message) {
      clearTvShowsErrors();
    }
    clearTvSeriesData();
  }

  loadMore = () => {
    const {appendTvShowsData, setLoader} = this.props;
    const {toggle, serachAtoZFilter, popularFilter}=this.state;
    setLoader(true);
    if(toggle)
      appendTvShowsData(endpoints.showsListWithAssetsCounts, formDataGenerator(applyPageIndexFilter(serachAtoZFilter)));
    else
      appendTvShowsData(endpoints.popularShowsList, formDataGenerator(applyPageIndexFilter(popularFilter)));
  };

  orderByMostPopular = () => {
    const {clearTvSeriesData, getTvShowsData, setLoader} = this.props;
    const {currentFilters:{genre,language}} = this.state;
    let data = applyPopularLanguageGenreFilter(this.state.popularFilter, genre, language);
    clearTvSeriesData();
    setLoader(true);
    getTvShowsData(endpoints.popularShowsList, formDataGenerator(data));
    this.setState({
      toggle: 0,
      popularFilter: data,
      data,
    });
  };

  orderByAtoZ = () => {
    const {clearTvSeriesData, getTvShowsData, setLoader} = this.props;
    const {currentFilters:{genre, language}, notInGenre, mediaType} = this.state;
    let data = applyLanguageGenreFilter(this.state.serachAtoZFilter, genre, notInGenre, language, mediaType);
    clearTvSeriesData();
    setLoader(true);
    getTvShowsData(endpoints.showsListWithAssetsCounts, formDataGenerator(data));
    this.setState({
      toggle: 1,
      serachAtoZFilter: data,
      data,
    });
  };

  applyGenreAndLanguage= (genres, languages) => {
    let newFilter = {genre: genres, language: languages};
    this.setState({
      currentFilters: newFilter,
    });
  };

  routeToAllShowsEpisodes = (show) => {
    this.context.router.push(`/shows/${createRouteString(show.metas.SeriesMainTitle.replace(/\?/g, '-'))}/${show.metas.Season}/${show.id}`);
  };

  getShowList = (tvSeries) => {
    let showList = '';

    if (tvSeries.data)
      showList = tvSeries.data.map((show, key) => {
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

        <div className='top-heading'>
          <div className='heading-inner'>
            {
              !showData.data.length && error.message ? <div className='section text-center no-result'>Sorry, No Results Found</div> :
                <div className='order-filter'>
                  <button className={` ${toggle ?' most-popular-btn' : 'most-popular-btn active'}`} onClick={this.orderByMostPopular}>Most Popular</button>
                  <button className={` ${toggle ? ' most-popular-btn active' : 'most-popular-btn'}`} onClick={this.orderByAtoZ}>A - Z</button>
                </div>
            }
          </div>
        </div>

        <FilterComponent>
          <GenreLanguage data={data} getData={getTvShowsData}  clearData={clearTvSeriesData} {...this.state} {...this.props}
                         applyGenreAndLanguage={this.applyGenreAndLanguage} />
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
    // getTvShowsCarousel: bindActionCreators(getTvShowsCarousel, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
    getTvShowsData: bindActionCreators(getTvShowsData, dispatch),
    appendTvShowsData: bindActionCreators(appendTvShowsData, dispatch),
    clearTvShowsErrors: bindActionCreators(clearTvShowsErrors, dispatch),
    clearTvSeriesData: bindActionCreators(clearTvSeriesData, dispatch),
    updateInitialLanguage: bindActionCreators(updateInitialLanguage, dispatch),
    resetInitialData:  bindActionCreators(resetInitialData, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    tvSeries: state.shows.tvSeries,
    loader: state.loader,
  };
};

ShowsList.propTypes = {
  getTvShowsData: React.PropTypes.func.isRequired,
  appendTvShowsData: React.PropTypes.func.isRequired,
  clearTvShowsErrors: React.PropTypes.func.isRequired,
  clearTvSeriesData: React.PropTypes.func.isRequired,
  tvSeries: React.PropTypes.object.isRequired,
  filters: React.PropTypes.object.isRequired,
  setLoader: React.PropTypes.func.isRequired,
  loader: React.PropTypes.object.isRequired,
  updateInitialLanguage: React.PropTypes.func.isRequired,
  resetInitialData: React.PropTypes.func.isRequired,
};

ShowsList.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowsList);

