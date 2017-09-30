'use strict';

require('dotenv').config();
import 'babel-polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import logger from './util/logger';
import { getUserProfileData, setRemarketingData } from './util/helper';

import { port } from './config';
import jade from 'jade';
import assets from './assets';
import {LR, COOKIE}from './constants';
import request from 'request';
import {LR_APP_KEY,LR_SECRET_KEY}from './constants';
import endpoints from './endpoints/authentication';
import cookie from 'react-cookie';

import Helmet from "react-helmet";
import _ from 'lodash'

// React And Redux Setup
import configureStore from './store';
import { Provider } from 'react-redux';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import { fetchComponentData } from './util/fetchData';
import {getMediaId} from './util/routeCreater';

import appConfigs from './appConfig';
let appConfig = appConfigs.default;

const server = global.server = express();

let morgan = require('morgan');
morgan.token('remote-addr', (req, res) => {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public'), { maxAge: 3600000 }));
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//
// Only use morgan logger in production
// -----------------------------------------------------------------------------
if (process.env.NODE_ENV === 'production') {
  server.use(morgan('combined'));
}

server.get("/manifest.json", function (req, res) {
  res.json({
    "name": "Voot Lite",
    "short_name": "Voot Lite",
    "icons": [
      {
        "src": "\/android-icon-36x36.png",
        "sizes": "36x36",
        "type": "image\/png",
        "density": "0.75"
      },
      {
        "src": "\/android-icon-48x48.png",
        "sizes": "48x48",
        "type": "image\/png",
        "density": "1.0"
      },
      {
        "src": "\/android-icon-72x72.png",
        "sizes": "72x72",
        "type": "image\/png",
        "density": "1.5"
      },
      {
        "src": "\/android-icon-96x96.png",
        "sizes": "96x96",
        "type": "image\/png",
        "density": "2.0"
      },
      {
        "src": "\/android-icon-144x144.png",
        "sizes": "144x144",
        "type": "image\/png",
        "density": "3.0"
      },
      {
        "src": "\/android-icon-192x192.png",
        "sizes": "192x192",
        "type": "image\/png",
        "density": "4.0"
      }
    ],
    "gcm_sender_id": appConfig.gcmSenderId,
    "start_url": "/?start_url=homescreen",
    "orientation": "portrait",
    "display": "standalone",
    "theme_color": "#000000",
    "background_color": "#272c31",
  });
});

server.get('*', (req, res, next) => {
  const protocal = req.protocol || 'https';
  global.domain = protocal + '://' + req.get('host');
  const unplug = cookie.plugToRequest(req, res);
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    const template = jade.compile(require('./view/index.jade.js'));
    const data = {
      title: 'Voot',
      entry: assets.index.js,
      vendor: assets.vendor.js,
      stylesheet: assets.index.css,
      apikey : LR_APP_KEY,
      appConfig : appConfig,
    };

    if (err) {
      data.error = 'Url Not Found';
      return res.status(500).end(template(data));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const store = configureStore();
    let params = renderProps.params;
    const newPath = getMediaId(req.url);
    if(typeof newPath === "object" && typeof newPath.url !== "undefined" && typeof newPath.url !== "undefined" && typeof newPath.mediaId !== "undefined"){
      // params.mediaId = newPath.mediaId;
    }
    return fetchComponentData(store, renderProps.components, params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );
        let head = Helmet.rewind();
        const finalState = store.getState();
        data.remarketingData = {};
        if(finalState && finalState.getMediaInfo && finalState.getMediaInfo.mediaInfo && finalState.getMediaInfo.mediaInfo.data){
          // data.remarketingData = setRemarketingData(finalState.getMediaInfo.mediaInfo.data);
        }
        data.body = initialView;
        data.head = head;
        data.initialState = JSON.stringify(finalState);

        let pageNotFound = _.find(renderProps.components, (component) => {
          return component.name == 'PageNotFound'
        });
        if(pageNotFound) {
           res.status(404);
        } else {
           res.status(200);
        }

        res.send(template(data));
      })
      .catch((error) => next(error));
  });

});

// POST method route
/*
server.post('/login', function (req, res) {
  console.log(res)
  res.status(200);

  res.send({data:req.body.token});
});
*/


server.post('*', function (req, res) {
  const token = req.body.token;
  const secret = LR.SECRET;
  const getAccessTokenUrl = endpoints.accessTokenUrl.path + '?token='+token+'&secret='+secret;
  request.get(getAccessTokenUrl,function(getAccessTokenError,getAccessTokenErrorResponse){
    // if(getAccessTokenError) console.log(getAccessTokenError);
    const accessToken = JSON.parse(getAccessTokenErrorResponse.body).access_token;
    const getUserProfileUrl = endpoints.userProfileUrl.path + '?access_token='+ accessToken;
        request.get(getUserProfileUrl,function(getUserProfileError,getUserProfileResponse){
          if(getUserProfileError) {
            res.cookie(COOKIE.USER_FAILED,true);
          }
          if(getUserProfileResponse && getUserProfileResponse.body){
            let userInfo = JSON.parse(getUserProfileResponse.body);
            let userProfileData = getUserProfileData(userInfo);
            res.cookie(COOKIE.USER_ID,JSON.stringify(userProfileData),{ maxAge: 1000*60*60*24*30*6});
            res.cookie(COOKIE.USER_JUST_LOGGED_IN,true);
          }
          res.redirect(req.url);
        });
  });
});



//
// Error handling
// -----------------------------------------------------------------------------
// 404 - when nothing handles this request (without error)
server.use((req, res) => {
  res.status(404);
  res.send('404');
});

// Other Server Errors
server.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
  logger.error(error);
  const statusCode = error.status || 500;
  res.status(statusCode);
  res.send('500');
});

let environment = (process.env.NODE_ENV).toString().trim().toLowerCase();
switch (environment) {
  case 'production' :
    environment = 'production';
    break;
  case 'qa2' :
    environment = 'qa2';
    break;
  case 'uat' :
    environment = 'uat';
    break;
  case 'qa' :
    environment = 'qa';
    break;
  default :
    environment = 'development';
}

server.listen(port, () => {
  //logger.info(`The server is running at http://localhost:${port}/ in ${process.env.NODE_ENV} mode`);
  logger.info(`The server is running at http://localhost:${port}/ in ${environment} mode`);
});


