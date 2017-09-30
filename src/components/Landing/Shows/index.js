import React, {Component, PropTypes} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PaperRipple from 'react-paper-ripple';
import VootAllShows from './VootAllShows';
import VootOriginals from './VootOriginals';
import TabNavigation from '../../Navigation/TabNav';
import Helmet from 'react-helmet';

class Shows extends Component {
  constructor(props) {
    super(props);
    const {route:{path}} = this.props;
    this.state = {
      selectedTab: 0,
      route: path,
    };
  }

  componentWillMount(){
    const {route} = this.state;
    if (route === '/shows')
      this.setState({selectedTab: 0});
    else
      this.setState({selectedTab: 1});
  }

  componentDidMount = ()=>{
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'ShowsPageView');
    }
  };

  componentWillReceiveProps(nextProps) {
    const {route:{path}} = nextProps;
    const {route} = this.state;
    if(path!==route){
      this.setState({route:path});
      if (route === '/shows'){
        this.setState({selectedTab: 1});
        this.context.router.push('/shows/voot-originals');
      }
      else {
        this.setState({selectedTab: 0});
        this.context.router.push('/shows');
      }
    }
  }
  handleSelect = () => {
    const {route} = this.state;
    if (route === '/shows'){
      this.setState({selectedTab: 1});
      this.context.router.push('/shows/voot-originals');
    }
    else {
      this.setState({selectedTab: 0});
      this.context.router.push('/shows');
    }
  }
  renderSeoTags = () => {
    return (<Helmet
      title='Watch TV Shows, Latest Shows Episodes, TV Shows Clips, Popular TV Series, VOOT'
      meta={[
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
                content: 'Watch TV Shows, Latest Shows Episodes, TV Shows Clips, Popular TV Series, VOOT',
              },
              {
                name: 'description',
                content: 'Watch TV Shows, Latest Shows Episodes, TV Shows Clips, Popular TV Series and many more on VOOT with Genres like Comedy, Drama, Reality and many more!',
              },
              {
                name: 'keywords',
                content: 'TV Shows, Latest Shows Episodes, TV Shows Clips, Popular TV Series, Genres, Comedy, Drama, Reality, Music, Talk Shows, Live TV Shows on Voot, TV Shows Videos, VOOT',
              },
              {
                property: 'og:url',
                content: 'https://www.voot.com/shows',
              },
              {
                property: 'og:title',
                content: 'Watch TV Shows, Latest Shows Episodes, TV Shows Clips, Popular TV Series, VOOT',
              },
              {
                property: 'og:image',
                content: 'https://dimg.voot.com/include/upload/web-vertical-images/compressed/tvSeriesHeroAsset_1_0_image_1477586636tvSeriesHeroAsset_1_0_image_1476957306showcard-bb10.jpg',
              },
              {
                property: 'og:description',
                content: 'Watch TV Shows, Latest Shows Episodes, TV Shows Clips, Popular TV Series and many more on VOOT with Genres like Comedy, Drama, Reality and many more!',
              },
              {
                property: 'og:site_name',
                content: 'Voot | Lets Voot',
              },
              {
                property: 'twitter:title',
                content: 'Watch TV Shows, Latest Shows Episodes, TV Shows Clips, Popular TV Series, VOOT',
              },
              {
                property: 'twitter:image',
                content: 'https://dimg.voot.com/include/upload/web-vertical-images/compressed/tvSeriesHeroAsset_1_0_image_1477586636tvSeriesHeroAsset_1_0_image_1476957306showcard-bb10.jpg',
              },
              {
                property: 'twitter:url',
                content: 'https://dimg.voot.com/include/upload/web-vertical-images/compressed/tvSeriesHeroAsset_1_0_image_1477586636tvSeriesHeroAsset_1_0_image_1476957306showcard-bb10.jpg',
              },

            ]}
    />);
  };

  render() {
    const {selectedTab}=this.state;
    return (
      <div className='home-container show-list'>
        {this.renderSeoTags()}
        <TabNavigation {...this.props} />
        <div className='home-page'>
          <Tabs onSelect={this.handleSelect} selectedIndex={selectedTab} className='tab-section'>
            <TabList>
              <Tab><h2><PaperRipple className='ripple'>All Shows</PaperRipple></h2></Tab>
              <Tab><h2><PaperRipple className='ripple'>Voot Originals</PaperRipple></h2></Tab>
            </TabList>
            <TabPanel>
              <VootAllShows />
            </TabPanel>
            <TabPanel>
              <VootOriginals />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

Shows.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

Shows.propTypes = {
  route: PropTypes.object.isRequired,
};


export default Shows;
