import {polyfill} from 'es6-promise';
polyfill();
import fetch from 'isomorphic-fetch';
import {getApiUrl, flatternObj} from './helper';

export const API_URL = getApiUrl('"development"'); //process.env.NODE_ENV
//export const API_URL = getApiUrl(process.env.NODE_ENV);

export default function callApi({path, method = 'get', body, query}) {

  let queryString = query ? `?${flatternObj(query)}` : '';
  let url = `${path}${queryString}`;
  let data = {
    method,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify(body),
  };

  if(method==='POST'){
    data.headers = {};
    data.body = body;
  }

  return fetch(url, data)
    .then(response => response.json().then(json => ({json, response})))
    .then(({json, response}) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      if(json[0])
        return json[0];

      return json;
    })
    .then(
      response => response,
      error => error
    );
}
