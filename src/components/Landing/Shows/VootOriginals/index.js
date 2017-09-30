import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import endpoints from '../../../../endpoints/shows';
import {SHOWS} from '../../../../constants/showsActionConstants';
import {
  getVootOriginalsCarousel,
  getAndAppendVootOriginalsData,
  clearVootOriginalsErrors,
  clearVootOriginalsData,
} from '../../../../actions/shows';
import {setLoader} from '../../../../actions/loader';
import {formDataGenerator} from '../../../../util/formDataGenerator';
import {applyPageIndexFilter, initializePageIndexFilter} from '../../../../util/mapingFilters';
import {createRouteString} from '../../../../util/routeCreater';

import HeadTray from '../../../Tray/HeadTray';
import EpisodeDefaultCard from '../../../CardLayout/EpisodeDefaultCard';


import clone from 'clone';

class VootOriginals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: clone(SHOWS.VOOT_ORIGINALS.DEFAULT_FILTERS),
    };
  }

  componentWillMount() {
    const {getVootOriginalsCarousel, setLoader, loader, vootOriginals: {vootOriginalData, carousel}, getAndAppendVootOriginalsData} = this.props;
    if (!carousel.mName) {
      if (!loader.load) {
        setLoader(true);
      }
      getVootOriginalsCarousel(endpoints.vootOriginalsCarousel);
    }

    if (!vootOriginalData.data.length) {
      if (!loader.load)
        setLoader(true);
      getAndAppendVootOriginalsData(endpoints.voShowList, formDataGenerator(this.state.data));
    }
  }

  componentWillUnmount() {
    const {clearVootOriginalsErrors, vootOriginals, clearVootOriginalsData} = this.props;
    const {data} = this.state;

    if (vootOriginals.error.message)
      clearVootOriginalsErrors();

    if(initializePageIndexFilter(data))
      clearVootOriginalsData();
  }

  loadMore = () => {
    const {getAndAppendVootOriginalsData, setLoader} = this.props;
    const {data}=this.state;
    setLoader(true);
    getAndAppendVootOriginalsData(endpoints.voShowList, formDataGenerator(applyPageIndexFilter(data)));
  };

  routeToAllShowsEpisodes = (show) => {
    this.context.router.push(`/shows/${createRouteString(show.metas.SeriesMainTitle)}/${show.metas.Season}/${show.id}`);
  };

  render() {
    const {vootOriginals: {vootOriginalData, error, carousel}, loader} = this.props;
    let data = '';

    if (vootOriginalData.data.length)
      data = vootOriginalData.data.map((show, key)=> {

        let items = {
          name: show.name,
          imgURLL: show.images[1].url,
          imgURLM: show.images[3].url,
          imgURLS: show.images[4].url,
          genre: [show.tags.Genre[0], show.metas.Language],
          videos: show.assetsCount ? show.assetsCount.episode: 0,
        };

        return (
          <EpisodeDefaultCard aspectRatio='16x9' onClick={()=>this.routeToAllShowsEpisodes(show)} data={show} key={key} items={items} />
        );
      });

    return (
      <div>

        {carousel.mName
          ? <HeadTray aspectRatio='16x9' item={carousel} noPlayIcon={false} />
          : <div className='empty-tray'></div>
        }

        <div className='top-heading'>
          <div className='heading-inner'>
            <div className='tray-heading default-color'><h2>All Voot Originals Shows</h2></div>
          </div>
        </div>

        <div className='grid-container clearfix grid-shows'>
          {data}
        </div>

        {!error.message && !loader.load && vootOriginalData.data.length<vootOriginalData.dataCount &&
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
    getVootOriginalsCarousel: bindActionCreators(getVootOriginalsCarousel, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
    getAndAppendVootOriginalsData: bindActionCreators(getAndAppendVootOriginalsData, dispatch),
    clearVootOriginalsErrors: bindActionCreators(clearVootOriginalsErrors, dispatch),
    clearVootOriginalsData: bindActionCreators(clearVootOriginalsData, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    vootOriginals: state.shows.vootOriginals,
    loader: state.loader,
  };
};

VootOriginals.propTypes = {
  getVootOriginalsCarousel: React.PropTypes.func.isRequired,
  getAndAppendVootOriginalsData: React.PropTypes.func.isRequired,
  clearVootOriginalsErrors: React.PropTypes.func.isRequired,
  clearVootOriginalsData: React.PropTypes.func.isRequired,
  vootOriginals: React.PropTypes.object.isRequired,
  setLoader: React.PropTypes.func.isRequired,
  loader: React.PropTypes.object.isRequired,
};

VootOriginals.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(VootOriginals);

