import {MEDIA_TYPE} from './media';
const showsGenre = [
  "All",
  "Adventure",
  "Animation",
  "Comedy",
  "Cookery Show",
  "Crime",
  "Drama",
  "Events & Awards",
  "History",
  "Horror",
  "Life & Style",
  "Music",
  "Mythology",
  "Reality",
  "Religious",
  "Romance",
  "Talk Show",
];

const movieGenre = [
  "All",
  "Action",
  "Animation",
  "Biopic",
  "Comedy",
  "Drama",
  "History",
  "Horror",
  "Mythology",
  "Romance",
  "Thriller",
];

export const genreList = (mediaType) => {
  if (mediaType === MEDIA_TYPE.TV_SERIES)
    return showsGenre;
  else
    return movieGenre;
};


export const genreUrlFilter =() =>{
  return {
    "adventure": "Adventure",
    "animation": "Animation",
    "cookery-show": "Cookery Show",
    "crime": "Crime",
    "drama":"Drama",
    "events-&-awards": "Events & Awards" ,
    "history": "History",
    "horror": "Horror",
    "life-&-style":"Life & Style",
    "music": "Music",
    "mythology":"Mythology",
    "reality":"Reality",
    "religious": "Religious",
    "romance":"Romance",
    "talk-show": "Talk Show",
    "action":"Action",
    "biopic": "Biopic",
    "comedy": "Comedy",
    "thriller":"Thriller",
  };
};
