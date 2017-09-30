import {URL_REDIRECTION} from '../constants/URL';

export const createRouteString = (routeString) => {
/* Case 1 : Replace ' (' with dash (to prevent two dashes : one for space, another for opening bracket);
   Case 2 : Replace '(' with dash (no space before opening bracket);
   Case 3 : Replace ') ' with dash (to prevent two dashes : one for closing bracket, another for space);
   Case 4 : Replace ')' with dash (no space after closing bracket);
   Case 5 : Replace ' ' with dash (only space);
   Case 6 : Remove ':' from routeString(--Chetna);
   Case 7 : Replace '!' with dash(--Chetna);
   Case 8 : Replace '’' with dash(--Chetna);
   Case 9 : Remove ',' from routeString(--Chetna);
   Case 10 : Replace ''' with dash(--Chetna);
   Case 11 : Replace '?' with dash(--Chetna);
   */
  let initialRouteString = (routeString).toString().replace(/ \(/g,"-").replace(/\(/g,"-").replace(/\) /g,"-").replace(/\)/g,"-").replace(/ /g, "-").replace(/\?/g, '-').replace(/\:/g, '').replace(/\!/g, '-').replace(/\’/g, '-').replace(/\,/g, '').replace(/\'/g, '-').toLowerCase();

  /*******Logic to Remove multiple white spaces from Route String(--Chetna)*************/
  let finalRouteString = '';
  initialRouteString.split('-').map((item, key)=>{
    if(item.length)
      finalRouteString+=item+'-';
  });
  finalRouteString=finalRouteString.slice(0,finalRouteString.length-1);

  return finalRouteString;
};

export const createRoutes = (routes) => {
  let str = '/';

  routes.map((item,index) => {
    str += item ;
    if(routes.length-1!==index)
      str += '/';
  });

  return(createRouteString(str));
};


// dont delete this function
// function to check url for search functionality.
// Sourabh chourasiya.

export const checkUrl=(url)=>{
  //loop through keys array
  let filteredUrl =Object.keys(URL_REDIRECTION).filter(function(key) {
    return key==url;
  });
  const urlKey = filteredUrl[0];
  return URL_REDIRECTION[urlKey] || url;
};


export const getMediaId=(url)=>{
  if(url.substr(-1) === '/') {
    url =  url.substr(0, url.length - 1);
  }
  for (let i in URL_REDIRECTION) {
    if (URL_REDIRECTION[i].url == url) {
      return URL_REDIRECTION[i];
    }
  }
};

