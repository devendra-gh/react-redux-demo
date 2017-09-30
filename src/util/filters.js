import {isset} from '../util/common';
import {MEDIA_TYPE} from '../constants/media';
import {COOKIE} from '../constants/index';
import cookie from 'react-cookie';

export const dateFormat = (inputDate) => {
  if (inputDate) {
    let dateString = inputDate,
      curr_date = dateString.substring(6, 8),
      curr_month = dateString.substring(4, 6),
      curr_year = dateString.substring(2, 4),
      m_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return (`${curr_date} ${m_names[curr_month - 1]} ${curr_year}`);
  }
};

export const episodeFormat = (episodeNo) => {
  if (episodeNo) {
    let episode = episodeNo;
    episode = (episode < 10) ? `0${episode}` : episode;
    return `E${episode}`;
  }
};

export const seriesFormat = (seriesNo) => {
  if (seriesNo) {
    let series = seriesNo;
    series = (series < 10) ? `0${series}` : series;
    return `S${series}`;
  }
};

export const videoFormat = (videoNo) => {
  if (videoNo) {
    let video = videoNo;
    video = (video > 0 && video < 2 ) ? `${video} video` : `${video} videos`;
    return video;
  }
};

export const sbuFormat = (shows) => {
  if (shows != undefined) {
    let showsList = {
      "CCI": "Comedy Central India",
      "COB": "Colors Bangla",
      "COG": "Colors Gujrati",
      "COH": "Colors Hindi",
      "COI": "Colors Infinity",
      "COK": "Colors Kannada",
      "COM": "Colors Marathi",
      "COS": "Colors SUPER",
      "DAN": "Dandelooo",
      "DHX": "DHX",
      "DTH": "Dream Theatre",
      "ETO": "Entertainment one",
      "GRG": "Green Gold",
      "HBR": "Hasbro",
      "Hi5": "Hi5",
      "HITENT": "Hit Entertainment",
      "KAR": "Karadi Tales",
      "MIL": "Millimages",
      "MTV": "MTV",
      "MTVI": "Pepsi MTV Indies",
      "MTVMN": "MTV International",
      "NICK": "Nickelodeon",
      "STR": "Strika Entertainment",
      "TFC": "The Film Company",
      "TOON": "Toonz Animation",
      "Tur": "Turner",
      "VMP": "Viacom18 Motion Pictures",
      "VOOT": "VOOT Originals",
      "VH1": "VH1",
      "WAM": "Wide Angle Media",
      "YOB": "Yoboho",
    };

    return `${showsList[shows]}`;
  }
};

export const timeFormat = (duration) => {
  if (duration) {
    let
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    if (hours > 0) {
      return hours + ":" + minutes + ":" + seconds;
    }
    return minutes + ":" + seconds;
  }
};

export const convertToMinute = (millis) => {
  // Your logic
  let milliseconds = parseInt(millis);
  let hours = milliseconds / (1000 * 60 * 60);
  let absoluteHours = Math.floor(hours);
  let h = absoluteHours >= 10 ? absoluteHours : '0' + absoluteHours;
  //Get remainder from hours and convert to minutes
  let minutes = (hours - absoluteHours) * 60;
  let absoluteMinutes = Math.floor(minutes);
  let m = absoluteMinutes >= 10 ? absoluteMinutes : '0' + absoluteMinutes;
  //Get remainder from minutes and convert to seconds
  let seconds = (minutes - absoluteMinutes) * 60;
  let absoluteSeconds = Math.round(seconds);
  let s = absoluteSeconds >= 10 ? absoluteSeconds : '0' + absoluteSeconds;
  let readableTime = '';
  if (h > 0)
    readableTime += h;
  if (h > 0 && m)
    readableTime += ':';
  if (m && s)
    readableTime += m + ':' + s;
  return readableTime;
};

export const convertToSecond = (second) => {
  let milliSeconds = parseInt(second);
  let seconds = milliSeconds / 1000;
  let absoluteSeconds = Math.round(seconds);
  return absoluteSeconds.toString();
};

export const getPlayerData = (contentObject) => {
  let returnObject = {};
  if (isset(contentObject) && isset(contentObject.Metas)) {
    contentObject.Metas.map(function (media, idx) {
      contentObject.Metas[media.Key] = media.Value;
    });
  }

  /* for tags data */
  if (isset(contentObject) && isset(contentObject.Tags)) {
    contentObject.Tags.map(function (media, idx) {
      contentObject.Tags[media.Key] = media.Value.split("|");
    });
  }

  if (isset(contentObject) && contentObject.MediaTypeID == MEDIA_TYPE.EPISODE) {
    returnObject.seriesTitle = (isset(contentObject.Metas.RefSeriesTitle) ? contentObject.Metas.RefSeriesTitle : '');
    returnObject.movieTitle = null;
    returnObject.contentName = (isset(contentObject.Metas.EpisodeMainTitle) ? contentObject.Metas.EpisodeMainTitle : '');
    returnObject.sbu = (isset(contentObject.Metas.SBU) ? contentObject.Metas.SBU : '');
    returnObject.contentType = (isset(contentObject.Metas.ContentType) ? contentObject.Metas.ContentType : '');
    returnObject.genre = (isset(contentObject.Tags.Genre) ? contentObject.Tags.Genre : '');
    returnObject.language = (isset(contentObject.Tags.Language) ? contentObject.Tags.Language[0] : '');
    if (isset(contentObject.Metas.ContentDuration)) {
      returnObject.duration = convertToMinute(contentObject.Metas.ContentDuration);
      returnObject.durationInSeconds = convertToSecond(contentObject.Metas.ContentDuration);
    } else {
      returnObject.duration = '';
      returnObject.durationInSeconds = '';
    }
    returnObject.mediaid = (isset(contentObject.MediaID) ? contentObject.MediaID : '');
    returnObject.previousPage = cookie.load('lastVisitedPath');
  }
  else if (isset(contentObject) && contentObject.MediaTypeID == MEDIA_TYPE.MOVIE) {
    returnObject.seriesTitle = null;
    returnObject.movieTitle = (isset(contentObject.Metas.MovieMainTitle) ? contentObject.Metas.MovieMainTitle : '');
    returnObject.contentName = (isset(contentObject.Metas.MovieMainTitle) ? contentObject.Metas.MovieMainTitle : '');
    returnObject.sbu = (isset(contentObject.Metas.SBU) ? contentObject.Metas.SBU : '');
    returnObject.contentType = (isset(contentObject.Metas.ContentType) ? contentObject.Metas.ContentType : '');
    returnObject.genre = (isset(contentObject.Tags.Genre) ? contentObject.Tags.Genre : '');
    returnObject.language = (isset(contentObject.Tags.Language) ? contentObject.Tags.Language[0] : '');
    if (isset(contentObject.Metas.ContentDuration)) {
      returnObject.duration = convertToMinute(contentObject.Metas.ContentDuration);
      returnObject.durationInSeconds = convertToSecond(contentObject.Metas.ContentDuration);
    } else {
      returnObject.duration = '';
      returnObject.durationInSeconds = '';
    }
    returnObject.mediaid = (isset(contentObject.MediaID) ? contentObject.MediaID : '');
    returnObject.previousPage = cookie.load('lastVisitedPath');
  }
  else if (isset(contentObject) && contentObject.type == MEDIA_TYPE.EPISODE) {

    returnObject.seriesTitle = (isset(contentObject.metas.RefSeriesTitle) ? contentObject.metas.RefSeriesTitle : '');
    returnObject.movieTitle = null;
    returnObject.contentName = (isset(contentObject.metas.EpisodeMainTitle) ? contentObject.metas.EpisodeMainTitle : '');
    returnObject.sbu = (isset(contentObject.metas.SBU) ? contentObject.metas.SBU : '');
    returnObject.contentType = (isset(contentObject.metas.ContentType) ? contentObject.metas.ContentType : '');
    returnObject.genre = (isset(contentObject.tags.Genre) ? contentObject.tags.Genre : '');
    returnObject.language = (isset(contentObject.tags.Language) ? contentObject.tags.Language[0] : '');

    if (isset(contentObject.metas.ContentDuration)) {
      returnObject.duration = convertToMinute(contentObject.metas.ContentDuration);
      returnObject.durationInSeconds = convertToSecond(contentObject.metas.ContentDuration);
    } else {
      returnObject.duration = '';
      returnObject.durationInSeconds = '';
    }
    returnObject.mediaid = (isset(contentObject.id) ? contentObject.id : '');
    returnObject.previousPage = cookie.load('lastVisitedPath');
  }
  else if (isset(contentObject) && contentObject.type == MEDIA_TYPE.MOVIE) {
    returnObject.seriesTitle = null;
    returnObject.movieTitle = (isset(contentObject.metas.MovieMainTitle) ? contentObject.metas.MovieMainTitle : '');
    returnObject.contentName = (isset(contentObject.metas.MovieMainTitle) ? contentObject.metas.MovieMainTitle : '');
    returnObject.sbu = (isset(contentObject.metas.SBU) ? contentObject.metas.SBU : '');
    returnObject.contentType = (isset(contentObject.metas.ContentType) ? contentObject.metas.ContentType : '');
    returnObject.genre = (isset(contentObject.tags.Genre) ? contentObject.tags.Genre : '');
    returnObject.language = (isset(contentObject.tags.Language) ? contentObject.tags.Language[0] : '');
    if (isset(contentObject.metas.ContentDuration)) {
      returnObject.duration = convertToMinute(contentObject.metas.ContentDuration);
      returnObject.durationInSeconds = convertToSecond(contentObject.metas.ContentDuration);
    } else {
      returnObject.duration = '';
      returnObject.durationInSeconds = '';
    }

    returnObject.mediaid = (isset(contentObject.id) ? contentObject.id : '');
    returnObject.previousPage = cookie.load('lastVisitedPath');
  }
  else {
    returnObject.seriesTitle = '';
    returnObject.movieTitle = '';
    returnObject.contentName = '';
    returnObject.sbu = '';
    returnObject.contentType = '';
    returnObject.genre = '';
    returnObject.duration = '';
    returnObject.mediaid = '';
    returnObject.previousPage = '';
    returnObject.language = '';
    returnObject.durationInSeconds = '';
  }

  return returnObject;
};


