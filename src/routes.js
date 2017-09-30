/* eslint-disable global-require */
import React from 'react';
import {Route, IndexRoute ,createMemoryHistory,browserHistory} from 'react-router';
import App from './App';
import hasHistory from 'history';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}


// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route path='/' history={hasHistory|browserHistory|createMemoryHistory} component={App}>
    <Route
      component={require('./components/Landing').default}
    >
      <IndexRoute
        component={require('./components/Landing/Home').default}
      />

      {/* add the new route */}
      {/*<Route path='/shows/:seriesMainTitle' getComponent={(nextState, cb) => {*/}
          {/*require.ensure([], require => {*/}
            {/*cb(null, Home);*/}
          {/*});*/}
        {/*}}*/}
      {/*/>*/}


      /***** Routes for custom series landing pages *****************************/
      <Route
        path='/shows/bigg-boss'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null,  require('./components/Landing/CustomLandingPage/BiggBoss').default);
          });
        }}
      />

      <Route
        path='/shows/mtv-roadies'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null,  require('./components/Landing/CustomLandingPage/MtvRoadies').default);
          });
        }}
      />

      <Route
        path='/shows/naagin'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null,  require('./components/Landing/CustomLandingPage/Naagin').default);
          });
        }}
      />

      <Route
        path='/shows/bigg-boss-kannada'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null,  require('./components/Landing/CustomLandingPage/BiggBossKannada').default);
          });
        }}
      />

      <Route
        path='/shows/splitsvilla'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null,  require('./components/Landing/CustomLandingPage/Splitsvilla').default);
          });
        }}
      />

      <Route
        path='/shows/love-school'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null,  require('./components/Landing/CustomLandingPage/LoveSchool').default);
          });
        }}
      />

      <Route
        path='/shows/kaisi-yeh-yaariaan'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null,  require('./components/Landing/CustomLandingPage/KaisiYehYaariaan').default);
          });
        }}
      />

      <Route
        path='/shows/mtv-unplugged'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null,  require('./components/Landing/CustomLandingPage/MtvUnplugged').default);
          });
        }}
      />
      /********************************/

      <Route
        path='/shows'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Shows').default);
          });
        }}
      />

      <Route
        path='/playlist/:paramlink/:mName'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/CuratedContent').default);
          });
        }}
      />

      <Route
        path='/shows/voot-originals'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Shows').default);
          });
        }}
      />

      <Route
        path='/movie/:mediaMainTitle/:mediaId'
        onVideoPage="true"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Player/Movie').default);
          });
        }}
      />

      <Route
        path='/clip/:mediaMainTitle/:mediaId'
        onVideoPage="true"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Player/Show').default);
          });
        }}
      />

      <Route
        path='/shows/adventure'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Shows/ShowsGenre').default);
          });
        }}
      />

      <Route
        path='/shows/animation'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Shows/ShowsGenre').default);
          });
        }}
      />

      <Route
        path='/shows/comedy'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Shows/ShowsGenre').default);
          });
        }}
      />

      <Route
        path='/shows/cookery-show'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Shows/ShowsGenre').default);
          });
        }}
      />

      <Route
        path='/shows/crime'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Shows/ShowsGenre').default);
          });
        }}
      />

      <Route
        path='/shows/drama'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Shows/ShowsGenre').default);
          });
        }}
      />

      <Route
        path='/shows/events-&-awards'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Shows/ShowsGenre').default);
          });
        }}
      />

      <Route
        path='/shows/life-&-style'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Shows/ShowsGenre').default);
          });
        }}
      />

      <Route
        path='/shows/history'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Shows/ShowsGenre').default);
          });
        }}
      />

      <Route
        path='/shows/horror'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Shows/ShowsGenre').default);
          });
        }}
      />

      <Route
        path='/shows/music'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Shows/ShowsGenre').default);
          });
        }}
      />

      <Route
        path='/shows/mythology'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Shows/ShowsGenre').default);
          });
        }}
      />

      <Route
        path='/shows/reality'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Shows/ShowsGenre').default);
          });
        }}
      />

      <Route
        path='/shows/religious'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Shows/ShowsGenre').default);
          });
        }}
      />

      <Route
        path='/shows/romance'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Shows/ShowsGenre').default);
          });
        }}
      />

      <Route
        path='/shows/talk-show'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Shows/ShowsGenre').default);
          });
        }}
      />

      <Route
        path='/shows/:name/:refSeriesSeason/:refSeriesId/:mediaMainTitle/:mediaId'
        onVideoPage="true"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Player/Show').default);
          });
        }}
      />


      <Route
        path='/shows/:seriesMainTitle/:season'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/AllEpisodesListing/Shows').default);
          });
        }}
      />

      <Route
        path='/shows/:seriesMainTitle'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/AllEpisodesListing/Shows').default);
          });
        }}
      />

      <Route
        path='/shows/:seriesMainTitle/:season/:mediaId'
        getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./components/AllEpisodesListing/Shows').default);
        });
      }}
      />

      {<Route
        path='/kids'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Kids').default);
          });
        }}
      />}

      {<Route
        path='/kids/shows'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Kids/ViewAll/Shows').default);
          });
        }}
      />}

      {<Route
        path='/kids/movies'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Kids/ViewAll/Movies').default);
          });
        }}
      />}

      {<Route
        path='/kids/movie/:mediaMainTitle/:mediaId'
        onVideoPage="true"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Player/Kids/Movie').default);
          });
        }}
      />}

      {<Route
        path='/kids/clusters'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/KidsCollection').default);
          });
        }}
      />}

      {<Route
        path='/kids/clusters/:cName/:episodeMainTitle/:mediaId'
        onVideoPage="true"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Player/Kids/Cluster').default);
          });
        }}
      />}

      {<Route
        path='/kids/characters/:seriesMainTitle/:mediaId'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/AllEpisodesListing/Kids').default);
          });
        }}
      />}

      {<Route
        path='/kids/characters/:seriesMainTitle/:seriesId/:episodeMainTitle/:episodeId'
        onVideoPage="true"
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Player/Kids/Shows').default);
          });
        }}
      />}

      <Route
        path='/channels'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Channels').default);
          });
        }}
      />

      <Route
        path='/channels/:channelName'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/AllEpisodesListing/ChannelLanding').default );
          });
        }}
      />

      <Route
        path='/movies'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Movies').default);
          });
        }}
      />

      <Route
        path='/movies/action'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Movies/MoviesGenre').default);
          });
        }}
      />

      <Route
        path='/movies/animation'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Movies/MoviesGenre').default);
          });
        }}
      />

      <Route
        path='/movies/biopic'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Movies/MoviesGenre').default);
          });
        }}
      />


      <Route
        path='/movies/comedy'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Movies/MoviesGenre').default);
          });
        }}
      />

      <Route
        path='/movies/drama'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Movies/MoviesGenre').default);
          });
        }}
      />

      <Route
        path='/movies/history'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Movies/MoviesGenre').default);
          });
        }}
      />

      <Route
        path='/movies/horror'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Movies/MoviesGenre').default);
          });
        }}
      />
      <Route
        path='/movies/mythology'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Movies/MoviesGenre').default);
          });
        }}
      />
      <Route
        path='/movies/romance'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Movies/MoviesGenre').default);
          });
        }}
      />

      <Route
        path='/movies/thriller'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Movies/MoviesGenre').default);
          });
        }}
      />





      <Route
        path='/myvoot'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/User/MyVoot').default);
          });
        }}
      />

      <Route
        path='/discover'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/AllEpisodesListing/LanguageListing').default);
          });
        }}
      />

      <Route
        path='/search/:keyword'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Search/Adult').default);
          });
        }}
      />

      <Route
        path='/search/kids/:keyword'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Search/Kids').default);
          });
        }}
      />


      <Route
        path='/about-us'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Static-pages/About-us').default);
          });
        }}
      />
      <Route
        path='/terms-of-use'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Static-pages/Terms-Of-Use').default);
          });
        }}
      />
      <Route
        path='/privacy-policy'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Static-pages/Privacy-Policy').default);
          });
        }}
      />
      <Route
        path='/faq'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Static-pages/Faq').default);
          });
        }}
      />
      <Route
        path='/contact-us'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/Landing/Static-pages/Contact-us').default);
          });
        }}
      />
      <Route
        path='*'
        getComponent={(nextState, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/PageNotFound').default);
          });
        }}
      />

    </Route>
  </Route>
);
