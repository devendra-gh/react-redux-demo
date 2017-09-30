import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setLoader, setSmallLoader} from '../../../actions/loader';
import {paginatedHome, resetHomePaginatedData, resetLoader, home} from '../../../actions/home';
import Helmet from 'react-helmet';
import Loader from '../../Loader';
import HeadTray from '../../Tray/HeadTray';
import GridTray from '../../Tray/GridTray';
import PosterTray from '../../Tray/PosterTray';
import NormalTray from '../../Tray/NormalTray';
import CarouselTray from '../../Tray/CarouselTray';
import MultiTray from '../../Tray/MultiTray';
import Language from '../../Language';
import ChannelTray from '../../Tray/ChannelTray';
import TabNavigation from '../../Navigation/TabNav';
import {site_name, get_domain_url, domain_url} from '../../../constants/seoConstant';
import InfiniteScroll from 'react-infinite-scroller';

let self;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: [],
      totalCount: 0,
    };
    // console.log("func>>>>>>>",get_domain_url());
  }

  componentWillMount = () => {
    self = this;
    const {setLoader, loader, paginatedHome, resetHomePaginatedData} = this.props;
    // resetHomePaginatedData();
    if(this.props.home.data.length > 0){
      let totalCount = self.props.home.data ? self.props.home.data[0]['total_item_count'] : 0;
      self.setState({
        totalCount: totalCount,
      });
    }else{
      if (!loader.load) {
        setLoader(true);
      }
      let queryParams = {pageIndex: 1}, callback = {};
      callback.successCallback = function () {
        let totalCount = self.props.home.data ? self.props.home.data[0]['total_item_count'] : 0;
        self.setState({
          totalCount: totalCount,
        });
        setLoader(false);
      };
      callback.failureCallback = function () {
        setLoader(false);
      };
      paginatedHome(queryParams, callback);
    }
    // else{
    //
    // }
  };

  componentDidMount = ()=> {
    if (typeof window !== "undefined") {
      window.fbq('trackCustom', 'HomePageView');
    }
  };

  componentWillUnmount() {
    // this.props.resetHomePaginatedData();
  }

  createChildComponents = ()=> {
    let tray;
    if (this.props.home.data) {
      tray = this.props.home.data.map((item, index) => {
        if (item) {
          if (item.mName === 'vootOriginalVideos' || item.mName === 'popularShows' || item.mName === 'vootCatchups') {
            return <NormalTray aspectRatio='16x9' key={index} item={item} isTitleMultiLine={false} />;
          }

          if (item.mName === 'featuredMovies' || item.mName === 'kidsMovies') {
            return <PosterTray aspectRatio='2x3' key={index} item={item} />;
          }

          if (item.mName === 'mastHead') {
            return <HeadTray aspectRatio='16x9' key={index} item={item} />;
          }

          if (item.mName === 'vootOriginalSeries') {
            //return <NormalTray aspectRatio='16x9' key={index} item={item} isTitleMultiLine={false} />;
            //  Please dont delete this commented code
            return <GridTray aspectRatio='16x9' key={index} item={item} />;
          }

          if (item.mName === 'vootShorts' || item.mName === 'celebritySpotlight') {
            return <MultiTray aspectRatio='16x9' key={index} item={item} />;
          }

          if (item.mName === 'discover') {
            return (
              <Language key={index} item={item} />
            );
          }

          if (item.mName === 'channels') {
            return (
              <ChannelTray aspectRatio='1x1' key={index} item={item} />
            );
          }

          if (item.mName === 'kidsCharacters') {
            return (
              <CarouselTray aspectRatio='1x1' key={index} isItemIndex item={item} type={item.mName} />
            );
          }
          if (item.mName === 'featuredVideos' || item.mName === 'kidsVideos') {
            return (
              <CarouselTray aspectRatio='16x9' key={index} item={item} showPlayIcon type={item.mName} />
            );
          }
          if (item.mName === 'kidsClusters' || item.mName === 'kidsZoneClusters') {
            return (
              <CarouselTray aspectRatio='16x6' key={index} item={item} />
            );
          }

          return <CarouselTray aspectRatio='16x9' key={index} item={item} />;
        }
      });
    }
    return tray;
  };

  renderSeoTags = () => {
    const props = {
      title: 'Watch Colors TV Serials, Movies, Kids Entertainment Shows & Videos Online Free at Voot',
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
          content: 'Watch Colors TV Serials, Movies, Kids Entertainment Shows & Videos Online Free at Voot',
        },
        {
          name: 'description',
          content: 'Watch free online videos of Colors TV Serials, Movies, Kids Entertainment Shows at Voot. Get original videos of your favorite TV shows with HD Streaming on your mobile or laptop.',
        },
        {
          name: 'keywords',
          content: 'Voot, Free Videos, Colors TV, Online Serials, TV shows, Watch Movies Online, HD Streaming, TV Serials',
        },
        {
          property: 'og:url',
          content: get_domain_url() + this.props.location.pathname,
        },
        {
          property: 'og:title',
          content: 'Watch Colors TV Serials, Movies, Kids Entertainment Shows & Videos Online Free at Voot',
        },
        {
          property: 'og:image',
          content: 'https://dimg.voot.com/si-images/VIacom_680x340_Voot.jpg',
        },
        {
          property: 'og:description',
          content: 'Voot - Watch free online streaming of your favorite TV Shows, Latest Movies, Movie Trailers & Clips, Kids Entertainment Zone with English, Hindi, Marathi & more languages preferences on Voot VOD platform!',
        },
        {
          property: 'og:site_name',
          content: site_name,
        },
        {
          property: 'twitter:title',
          content: 'Watch Colors TV Serials, Movies, Kids Entertainment Shows & Videos Online Free at Voot',
        },
        {
          property: 'twitter:image',
          content: 'https://dimg.voot.com/si-images/VIacom_680x340_Voot.jpg',
        },
        {
          property: 'twitter:url',
          content: get_domain_url() + this.props.location.pathname,
        },
      ],
    };
    return (<Helmet {...props} />);
  };

  loadMore(page) {
    let queryParams = {pageIndex: page};
    self.props.paginatedHome(queryParams);
  }

  render() {
    let sections;
    if (this.state.totalCount > 0) {
      const size = this.props.home.data.length, totalItems = this.state.totalCount, resultantSize = this.props.home.resultantSize,
        currentPage = this.props.home.currentPage;
      let loaderContent = (<div className='load-more-pagination'><div className='small-loader'></div></div>);
      sections = (
        <InfiniteScroll pageStart={currentPage} loadMore={this.loadMore} hasMore={(size != totalItems && resultantSize != 0 )} loader={loaderContent}>
          {this.createChildComponents()}</InfiniteScroll>);
    }
    return (
      <div className='home-container'>
        <Loader {...this.props} />
        {this.renderSeoTags()}
        <TabNavigation {...this.props} />
        <div className='home-page home-bg'>
          {sections}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    home: state.home,
    loader: state.loader,
    config: state.config,
    smallLoader: state.smallLoader,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    paginatedHome: bindActionCreators(paginatedHome, dispatch),
    resetHomePaginatedData: bindActionCreators(resetHomePaginatedData, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
    resetLoader: bindActionCreators(resetLoader, dispatch),
    setSmallLoader: bindActionCreators(setSmallLoader, dispatch),
  };
};


Home.need = [
  // home,
];

Home.propTypes = {
  home: React.PropTypes.object,
  loader: React.PropTypes.object.isRequired,
  paginatedHome: React.PropTypes.func.isRequired,
  resetHomePaginatedData: React.PropTypes.func.isRequired,
  setLoader: React.PropTypes.func.isRequired,
  config: React.PropTypes.object.isRequired,
  isItemIndex: React.PropTypes.bool,
  location: React.PropTypes.object.isRequired,
  setSmallLoader: React.PropTypes.func.isRequired,
  smallLoader: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
