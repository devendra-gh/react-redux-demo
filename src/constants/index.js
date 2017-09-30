import {MEDIA_TYPE} from './media';
export const navigation = [
  {
    name: 'Home',
    iconName: 'icon-home',
    svg: `<svg xmlns='http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink' version='1.1' width='25' height='20' viewBox='0 0 34 32'>
          <path d='M32.805 32h-31.964c-0 0-0.001 0-0.001 0-0.464 0-0.84-0.376-0.84-0.84 0-0 0-0.001 0-0.001v-21.036c0-0.309 0.167-0.579 0.415-0.726l15.991-9.284c0.121-0.071 0.267-0.113 0.422-0.113s0.301 0.042 0.426 0.115l15.974 9.279c0.252 0.149 0.419 0.419 0.419 0.728v21.036c0 0 0 0.001 0 0.001 0 0.464-0.376 0.84-0.84 0.84-0 0-0.001 0-0.001 0zM1.683 30.317h30.281v-19.711l-15.141-8.794-15.141 8.794z' />
          <path d='M21.028 32h-8.412c-0 0-0.001 0-0.001 0-0.464 0-0.84-0.376-0.84-0.84 0-0 0-0.001 0-0.001v-15.141c0-0 0-0.001 0-0.001 0-0.464 0.376-0.84 0.84-0.84 0 0 0.001 0 0.001 0h8.411c0 0 0.001 0 0.001 0 0.464 0 0.84 0.376 0.84 0.84 0 0 0 0.001 0 0.001v15.141c0 0 0 0.001 0 0.001 0 0.464-0.376 0.84-0.84 0.84-0 0-0.001 0-0.001 0zM13.458 30.317h6.729v-13.458h-6.729z' />
          </svg>`,
    redirectUrl: '/',
  },
  {
    name: 'Shows',
    iconName: 'icon-shows',
    svg: `<svg xmlns='http://www.w3.org/2000/svg' xmlnsxlink='http://www.w3.org/1999/xlink' version='1.1' width='25' height='20' viewBox='0 0 37 32'>
            <path d='M35.873 32.003h-35.111c-0 0-0.001 0-0.001 0-0.42 0-0.761-0.341-0.761-0.761 0-0.001 0-0.003 0-0.004v-25.080c0-0 0-0.001 0-0.001 0-0.42 0.341-0.761 0.761-0.761 0 0 0.001 0 0.001 0h35.111c0 0 0.001 0 0.001 0 0.42 0 0.761 0.341 0.761 0.761 0 0 0 0.001 0 0.001v25.080c0 0.001 0 0.002 0 0.004 0 0.42-0.341 0.761-0.761 0.761-0 0-0.001 0-0.001 0zM1.524 30.476h33.589v-23.557h-33.589z' />
            <path d='M27.058 32.003c-0 0-0.001 0-0.001 0-0.42 0-0.761-0.341-0.761-0.761 0-0 0-0.001 0-0.001v-25.082c0.015-0.409 0.35-0.736 0.762-0.736s0.747 0.326 0.762 0.734l0 25.081c0 0.001 0 0.002 0 0.004 0 0.42-0.341 0.761-0.761 0.761 0 0 0 0 0 0z' />
            <path d='M11.039 6.919c-0 0-0.001 0-0.001 0-0.21 0-0.4-0.085-0.538-0.223l-5.397-5.396c-0.125-0.135-0.202-0.317-0.202-0.517 0-0.421 0.341-0.762 0.762-0.762 0.2 0 0.382 0.077 0.517 0.203l5.396 5.395c0.138 0.138 0.223 0.328 0.223 0.538 0 0.421-0.341 0.762-0.761 0.762z' />
            <path d='M11.061 6.919c-0.42-0.001-0.761-0.342-0.761-0.762 0-0.21 0.085-0.4 0.223-0.538l5.396-5.396c0.136-0.129 0.321-0.209 0.524-0.209 0.421 0 0.762 0.341 0.762 0.762 0 0.203-0.080 0.388-0.209 0.525l-5.396 5.395c-0.137 0.138-0.328 0.223-0.538 0.223-0 0-0.001 0-0.001 0z' />
          </svg>`,
    redirectUrl: '/shows',
  },
  {
    name: 'Channels',
    iconName: 'icon-channel',
    svg: `<svg xmlns='http://www.w3.org/2000/svg' xmlnsxlink='http://www.w3.org/1999/xlink' version='1.1' width='25' height='20' viewBox='0 0 48 32'>
          <path d='M38.928 31.995h-30.236c-0.487 0-0.882-0.395-0.882-0.882v-30.232c0-0.487 0.395-0.882 0.882-0.882h30.236c0.487 0 0.882 0.395 0.882 0.882v30.237c-0.003 0.485-0.396 0.877-0.882 0.877 0 0 0 0 0 0zM9.574 30.237h28.472v-28.473h-28.472z' />
          <path d='M42.832 28.221h-3.911c-0.487 0-0.882-0.395-0.882-0.882v-22.679c0-0.487 0.395-0.882 0.882-0.882h3.911c0.487 0 0.882 0.395 0.882 0.882v22.679c0 0.487-0.395 0.882-0.882 0.882zM39.809 26.458h2.14v-20.914h-2.14z' />
          <path d='M8.692 28.221h-3.911c-0.482-0.006-0.871-0.398-0.871-0.882 0-0 0-0 0-0v-22.679c0-0.487 0.395-0.882 0.882-0.882h3.911c0.487 0 0.882 0.395 0.882 0.882v22.679c0 0 0 0 0 0 0 0.487-0.395 0.882-0.882 0.882-0.004 0-0.008-0-0.011-0zM5.669 26.457h2.14v-20.913h-2.14z' />
          <path d='M46.738 24.441h-3.911c-0.487 0-0.882-0.395-0.882-0.882v-15.118c0-0.487 0.395-0.882 0.882-0.882h3.911c0.487 0 0.882 0.395 0.882 0.882v15.118c0 0.487-0.395 0.882-0.882 0.882zM43.715 22.678h2.145v-13.355h-2.145z' />
          <path d='M4.786 24.441h-3.911c-0.484-0.003-0.876-0.397-0.876-0.882 0 0 0 0 0-0v-15.118c0-0.487 0.395-0.882 0.882-0.882h3.911c0.487 0 0.882 0.395 0.882 0.882v15.118c0 0 0 0 0 0 0 0.487-0.395 0.882-0.882 0.882-0.002 0-0.004 0-0.006-0zM1.763 22.678h2.147v-13.355h-2.147z' />
          <path d='M19.631 23.745c-0.487 0-0.882-0.395-0.882-0.882v-12.86c0.002-0.486 0.396-0.879 0.882-0.879 0.162 0 0.314 0.044 0.445 0.12l11.135 6.426c0.266 0.155 0.441 0.439 0.441 0.764s-0.176 0.608-0.437 0.762l-11.143 6.432c-0.126 0.073-0.277 0.116-0.439 0.116-0.001 0-0.002 0-0.002 0zM20.513 11.531v9.799l8.491-4.902z' />
        </svg>`,
    redirectUrl: '/channels',
  },
  {
    name: 'Kids',
    iconName: 'icon-kids',
    svg: `<svg xmlns='http://www.w3.org/2000/svg' xmlnsxlink='http://www.w3.org/1999/xlink' version='1.1' width='25' height='20' viewBox='0 0 33 32'>
          <path d='M16.569 32c-7.149-0-13.029-5.435-13.733-12.399-1.625-0.383-2.83-1.792-2.836-3.484 0-2.075 1.829-3.769 3.923-3.485 2.187-4.976 7.188-8.275 12.647-8.275s10.46 3.299 12.647 8.275c2.096-0.281 3.923 1.411 3.923 3.484-0.002 1.699-1.208 3.115-2.811 3.442-0.742 7.016-6.617 12.44-13.759 12.441zM3.558 18.103c0 0 0 0 0.001 0 0.403 0 0.732 0.319 0.748 0.719 0.346 6.506 5.705 11.649 12.265 11.649s11.918-5.143 12.264-11.617c0.012-0.242 0.108-0.428 0.254-0.559 0.139-0.12 0.32-0.193 0.518-0.193 0.013 0 0.026 0 0.040 0.001l-0.002-0c1.093-0.005 1.977-0.892 1.977-1.986 0-1.097-0.889-1.986-1.986-1.986-0.003 0-0.006 0-0.009 0-0.226 0.004-0.441 0.046-0.641 0.119-0.059 0.021-0.142 0.035-0.229 0.035-0.323 0-0.599-0.201-0.71-0.484-1.81-4.739-6.422-7.919-11.477-7.919s-9.666 3.179-11.477 7.913c-0.113 0.288-0.389 0.489-0.712 0.489-0.086 0-0.17-0.014-0.247-0.041-0.181-0.068-0.397-0.109-0.621-0.113-1.099-0-1.989 0.89-1.989 1.987s0.89 1.988 1.988 1.988z' />
          <path d='M16.569 26.059c-2.992 0-5.633-2.358-6.004-5.37-0.002-0.021-0.003-0.046-0.003-0.072 0-0.421 0.341-0.762 0.762-0.762 0.38 0 0.695 0.278 0.753 0.642 0.281 2.266 2.253 4.038 4.489 4.038s4.212-1.772 4.488-4.034c0.037-0.378 0.353-0.671 0.737-0.671 0.040 0 0.079 0.003 0.117 0.009 0.374 0.047 0.664 0.367 0.664 0.755 0 0.033-0.002 0.066-0.006 0.098-0.363 3.007-3.002 5.365-5.996 5.365z' />
          <path d='M11.322 15.080c0.225 0 0.407 0.182 0.407 0.407s-0.182 0.407-0.407 0.407c-0.225 0-0.407-0.182-0.407-0.407s0.182-0.407 0.407-0.407zM11.322 13.556c-1.066 0-1.931 0.864-1.931 1.931s0.864 1.931 1.931 1.931c1.066 0 1.931-0.864 1.931-1.931-0.003-1.065-0.866-1.927-1.931-1.928z' />
          <path d='M21.818 15.080c0.225 0 0.407 0.182 0.407 0.407s-0.182 0.407-0.407 0.407c-0.225 0-0.407-0.182-0.407-0.407s0.182-0.407 0.407-0.407zM21.818 13.556c-1.066 0.001-1.929 0.865-1.929 1.931s0.864 1.931 1.931 1.931c1.066 0 1.93-0.864 1.931-1.93-0.002-1.066-0.867-1.929-1.933-1.929 0 0 0 0 0 0z' />
          <path d='M14.12 7.792c-0.421-0-0.762-0.341-0.762-0.762 0-0.21 0.085-0.401 0.223-0.539l1.178-1.178-1.325-2.643c-0.051-0.099-0.080-0.216-0.080-0.341 0-0.211 0.085-0.401 0.223-0.539l1.571-1.566c0.139-0.148 0.337-0.241 0.556-0.241 0.421 0 0.762 0.341 0.762 0.762 0 0.219-0.092 0.416-0.24 0.555l-1.179 1.179 1.317 2.643c0.051 0.099 0.081 0.217 0.081 0.341 0 0.211-0.086 0.401-0.224 0.539l-1.566 1.567c-0.137 0.137-0.326 0.222-0.535 0.223z' />
          <path d='M18.058 7.792c-0.421-0-0.762-0.341-0.762-0.762 0-0.21 0.085-0.401 0.223-0.539l1.182-1.178-1.325-2.643c-0.051-0.099-0.081-0.217-0.081-0.341 0-0.211 0.086-0.401 0.224-0.539l1.567-1.566c0.136-0.128 0.32-0.206 0.521-0.206 0.421 0 0.762 0.341 0.762 0.762 0 0.202-0.079 0.385-0.207 0.522l-1.182 1.178 1.321 2.643c0.051 0.099 0.080 0.216 0.080 0.341 0 0.211-0.085 0.401-0.223 0.539l-1.563 1.567c-0.137 0.138-0.327 0.223-0.537 0.223-0.001 0-0.001 0-0.002 0z' />
          </svg>`,
    redirectUrl: '/kids',
  },
  {
    name: 'Movies',
    iconName: 'icon-movie',
    svg: `<svg xmlns='http://www.w3.org/2000/svg' xmlnsxlink='http://www.w3.org/1999/xlink' version='1.1' width='30' height='20' viewBox='0 0 37 32'>
          <path d='M15.999 32c-8.822 0-15.999-7.177-15.999-15.999s7.177-16 15.999-16 16.001 7.177 16.001 16-7.179 15.999-16 15.999zM15.999 1.567c-7.958 0.001-14.432 6.476-14.432 14.434s6.474 14.433 14.432 14.433 14.433-6.477 14.433-14.433-6.476-14.433-14.433-14.433z' />
          <path d='M15.999 12.794c-2.358 0-4.27-1.912-4.27-4.27s1.912-4.27 4.27-4.27c2.358 0 4.27 1.912 4.27 4.27-0.003 2.357-1.913 4.267-4.269 4.27zM15.999 5.822c-1.492 0.001-2.701 1.21-2.701 2.702s1.21 2.702 2.702 2.702c1.492 0 2.702-1.209 2.702-2.701-0.001-1.493-1.211-2.702-2.703-2.703z' />
          <path d='M15.999 28.779c-2.358 0-4.27-1.912-4.27-4.27s1.912-4.27 4.27-4.27c2.358 0 4.27 1.912 4.27 4.27-0.003 2.357-1.913 4.267-4.269 4.27zM15.999 21.807c-1.492 0.001-2.701 1.21-2.701 2.702s1.21 2.702 2.702 2.702c1.492 0 2.702-1.209 2.702-2.701-0.001-1.493-1.211-2.702-2.703-2.703z' />
          <path d='M23.992 20.787c-2.358 0-4.27-1.912-4.27-4.27s1.912-4.27 4.27-4.27c2.358 0 4.27 1.912 4.27 4.27-0.003 2.357-1.913 4.266-4.269 4.27zM23.992 13.815c-1.492 0.001-2.701 1.21-2.701 2.702s1.21 2.702 2.702 2.702c1.492 0 2.702-1.209 2.702-2.701-0.001-1.493-1.211-2.702-2.703-2.703z' />
          <path d='M8.007 20.787c-2.358 0-4.27-1.912-4.27-4.27s1.912-4.27 4.27-4.27c2.358 0 4.27 1.912 4.27 4.27-0.003 2.357-1.913 4.267-4.269 4.27zM8.007 13.815c-1.492 0.001-2.701 1.21-2.701 2.702s1.21 2.702 2.702 2.702c1.492 0 2.702-1.209 2.702-2.701-0.001-1.493-1.211-2.702-2.703-2.703z' />
          <path d='M36.402 32h-20.402c-0.433 0-0.784-0.351-0.784-0.784s0.351-0.784 0.784-0.784h20.402c0.433 0 0.784 0.351 0.784 0.784s-0.351 0.784-0.784 0.784z' />
          </svg>`,
    redirectUrl: '/movies',
  },
];

export const sideNav = [
  {
    menuLabel: 'Home',
    iconName: 'icon-home',
    redirectUrl: '/',
  },
  {
    menuLabel: 'Shows',
    iconName: 'icon-shows-thin',
    redirectUrl: '/shows',
  },
  {
    menuLabel: 'Channels',
    iconName: 'icon-channel',
    redirectUrl: '/channels',
  },
  {
    menuLabel: 'Kids',
    iconName: 'icon-kids',
    redirectUrl: '/kids',
  },
  {
    menuLabel: 'Movies',
    iconName: 'icon-movie',
    redirectUrl: '/movies',
  },
  {
    menuLabel: 'My Voot',
    iconName: 'icon-profile-thin',
    redirectUrl: '/myvoot',
  },
  // {
  //   menuLabel: 'HDFC LIFE YOUNGSTARS S02',
  //   iconName: '',
  //   redirectUrl: '/hdfclife-youngstars2',
  // },
  // {
  //   menuLabel: 'Bigg Boss',
  //   iconName: 'icon-shows-thin',
  //   redirectUrl: '/shows/bigg-boss',
  // },
  {
    menuLabel: 'Logout',
    iconName: 'icon-shutdown',
    redirectUrl: '/logout',
  },
  {
    menuLabel: 'SignIn',
    iconName: 'icon-login',
    redirectUrl: '/login',
  },
  {
    menuLabel: 'SignUp',
    iconName: 'icon-shutdown',
    redirectUrl: '/signup',
  },
];

export const links = [
  {
    menuLabel: 'ABOUT US',
    redirectUrl: '/about-us',
  },
  {
    menuLabel: 'TERMS OF USE',
    redirectUrl: '/terms-of-use',
  },
  {
    menuLabel: 'PRIVACY POLICY',
    redirectUrl: '/privacy-policy',
  },
  {
    menuLabel: 'FAQ',
    redirectUrl: '/faq',
  },
  {
    menuLabel: 'CONTACT US',
    redirectUrl: '/contact-us',
  },
];

export const SIGNUP = {
  SUCCESS: 'SIGNUP_SUCCESS',
  FAILURE: 'SIGNUP_FAILURE',
  CLEAR_ERRORS: 'SIGNUP_CLEAR_ERRORS',
};
export const CHECKEMAIL = {
  SUCCESS: 'CHECK_EMAIL_SUCCESS',
  FAILURE: 'CHECK_EMAIL_FAILURE',
  REQUREST: "CHECK_EMAIL_REQUEST",
};

export const LOGIN = {
  SUCCESS: 'LOGIN_SUCCESS',
  FAILURE: 'LOGIN_FAILURE',
  CLEAR_ERRORS: "LOGIN_CLEAR_ERRORS",
};
export const LOGOUT = {
  SUCCESS: 'LOGOUT_SUCCESS',
};
export const CHANGE_PASSWORD = {
  SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
  FAILURE: 'CHANGE_PASSWORD_FAILURE',
  MODAL_CLOSE: 'MODAL_CLOSE',
  CLEAR_ERRORS: 'CHANGE_PASSWORD_CLEAR_ERRORS',
};

export const CHANGE_PROFILE = {
  SUCCESS: 'CHANGE_PROFILE_SUCCESS',
  FAILURE: 'CHANGE_PROFILE_FAILURE',
};

export const GET_PROFILE = {
  SUCCESS: 'GET_PROFILE_SUCCESS',
  FAILURE: 'GET_PROFILE_FAILURE',
};

export const FORGET_PASSWORD = {
  SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
  FAILURE: 'CHANGE_PASSWORD_FAILURE',
  MODAL_CLOSE: 'MODAL_CLOSE',
};

export const SEND_LINK_TO_EMAIL = {
  SUCCESS: 'SEND_LINK_TO_EMAIL_SUCCESS',
  FAILURE: 'SEND_LINK_TO_EMAIL_FAILURE',
  MODAL_CLOSE: 'MODAL_CLOSE',
  CLEAR_ERRORS: 'SEND_LINK_TO_EMAIL_CLEAR_ERRORS',
};

export const COUNTRY = {
  SUCCESS: 'COUNTRY_SUCCESS',
  FAILURE: 'COUNTRY_FAILURE',
};

export const HOME = {
  PAGINATED_DATA :{
    SUCCESS : 'HOME_PAGINATED_DATA_SUCCESS',
    FAILURE: 'HOME_PAGINATED_DATA_FAILURE',
    UPDATE_CURRENT_PAGE: 'HOME_PAGINATED_DATA_UPDATE_CURRENT_PAGE',
    RESET: 'HOME_PAGINATED_DATA_RESET',
  },
  SUCCESS: 'HOME_SUCCESS',
  FAILURE: 'HOME_FAILURE',
  REQUEST: 'HOME_REQUEST',
  RESET_LOADER: 'RESET_LOADER',
};

export const CONFIG = {
  SUCCESS: 'CONFIG_SUCCESS',
  FAILURE: 'CONFIG_FAILURE',
  REQUEST: 'REQUEST',
};

export const PLAYLIST = {
  GET_DATA: 'PLAYLIST_GET_DATA',
  APPEND_TOP_DATA: 'PLAYLIST_APPEND_TOP_DATA',
  APPEND_BOTTOM_DATA: 'PLAYLIST_APPEND_BOTTOM_DATA',
  FAILURE: 'PLAYLIST_FAILURE',
  CLEAR_PLAYLIST: 'CLEAR_PLAYLIST',
};

export const VOPLAYLIST = {
  SUCCESS: 'VOPLAYLIST_SUCCESS',
  FAILURE: 'VOPLAYLIST_FAILURE',
};

export const CUSTOM_PAGE = {
  SUCCESS: 'CUSTOM_PAGE_SUCCESS',
  FAILURE: 'CUSTOM_PAGE_FAILURE',
  CLEAR_DATA: 'CUSTOM_PAGE_CLEAR_DATA',
};


export const RELATEDMEDIA = {
  SUCCESS: 'GETRELATEDMEDIA_SUCCESS',
  FAILURE: 'GETRELATEDMEDIA_FAILURE',
  CLEAR: 'GETRELATEDMEDIA_CLEAR',
};

export const GETMEDIAINFO = {
  SUCCESS: 'GETMEDIAINFO_SUCCESS',
  FAILURE: 'GETMEDIAINFO_FAILURE',
  CLEAR: 'GETMEDIAINFO_CLEAR',
};

export const GET_IS_FOLLOW_INFO = {
  SUCCESS: 'GET_IS_FOLLOW_SUCCESS',
  FAILURE: 'GET_IS_FOLLOW_FAILURE',
};

export const REMOVE_FOLLOW_INFO= {
  SUCCESS: 'REMOVE_FOLLOW_INFO_SUCCESS',
  FAILURE: 'REMOVE_FOLLOW_INFO_FAILURE',
};

export const ADD_FOLLOW_INFO = {
  SUCCESS: 'ADD_FOLLOW_INFO_SUCCESS',
  FAILURE: 'ADD_FOLLOW_INFO_FAILURE',
};

export const GET_FOLLOW_LIST = {
  SUCCESS: 'FOLLOW_LIST_SUCCESS',
  FAILURE: 'FOLLOW_LIST_FAILURE',
  REQUREST: 'FOLLOW_LIST_REQUEST',
};
export const RESET_ADD_FOLLOW = {
  RESET: 'RESET_ADD_FOLLOW',
};

export const RESET_IS_FOLLOWED_INFO = {
  RESET: 'RESET_IS_FOLLOWED_INFO',
};

export const LOADER = 'LOADER';

export const SMALL_LOADER = 'SMALL_LOADER';

export const ENV  = {
  DEVELOPMENT: '"development"',
  PRODUCTION: '"production"',
  LR_APP_KEY : "96493dd1-efaa-4d01-b2fe-bc2a5cd2b59b",
};

export const LR = {
  KEY: '96493dd1-efaa-4d01-b2fe-bc2a5cd2b59b',
  SECRET: 'd91d8bf9-907d-4e29-aec3-b5bff0313941',
  CALLBACK_DEV: 'http://dev-pwa.voot.com/login',
  CALLBACK_PROD: 'http://qa-pwa.voot.com/login',
};

export const COOKIE = {
  USER_ID: 'user_id',
  KALTURA_PLAYER_CONFIG_IDS: 'user_kaltura_player_config_ids',
  PLAYER: 'PLAYER',
  MIXPANEL_DISTINCT_ID: 'MIXPANEL_DISTINCT_ID',
  USER_JUST_LOGGED_IN: 'USER_JUST_LOGGED_IN',
  USER_FAILED: 'USER_FAILED',
};

//export const CHECK_EMAIL = 'CHECK_EMAIL';

export const KIDS = {
  CLUSTER: {
    GET_DATA: 'KIDS_CLUSTER_GET_DATA',
    APPEND_DATA: 'KIDS_CLUSTER_APPEND_DATA',
    ERROR: 'KIDS_CLUSTER_ERROR',
    CLEAR_ERROR: 'KIDS_CLUSTER_CLEAR_ERROR',
    CLEAR_DATA: 'KIDS_CLUSTER_CLEAR_DATA',
    DEFAULT_FILTERS: [
      {
        "key": "filterTypes",
        "value": `${MEDIA_TYPE.MOVIE}`,
      },
      {
        "key": "filter",
        "value": "(or language='english' language='hindi')",
      },
      {
        "key": "orderBy",
        "value": "views",
      },
      {
        "key": "pageIndex",
        "value": "0",
      },
      {
        "key": "pageSize",
        "value": "",
      },
    ],
  },
  HOME: {
    GET_DATA: 'KIDS_HOME_GET_DATA',
    ERROR: 'KIDS_HOME_ERROR',
    RESET: 'KIDS_HOME_RESET',
    CLEAR_ERROR: 'KIDS_HOME_CLEAR_ERROR',
  },
  ALL_EPISODES : {
    GET_DATA: 'ALL_EPISODES_GET_DATA',
    APPEND_DATA: 'ALL_EPISODES_APPEND_DATA',
    CLEAR_DATA: 'ALL_EPISODES_CLEAR_DATA',
    ERROR: 'ALL_EPISODES_ERROR',
    SEARCH_ASSESTS_DEFAULT_FILTERS : [
      {
        "key": "filterTypes",
        "value": `${MEDIA_TYPE.EPISODE}`,
      },
      {
        "key": "filter",
        "value": "(and contentType='Full Episode' refSeriesTitle='Untag')",
      },
      {
        "key": "orderBy",
        "value": "views",
      },
      {
        "key": "pageIndex",
        "value": "0",
      },
      {
        "key": "pageSize",
        "value": "10",
      },
    ],
    SEARCH_MEDIA_DEFAULT_FILTERS: [
      {
        "key": "mediaType",
        "value": `${MEDIA_TYPE.EPISODE}`,
      },
      {
        "key": "andList",
        "value": "",
      },
      {
        "key": "pageIndex",
        "value": "0",
      },
      {
        "key": "pageSize",
        "value": "4",
      },
      {
        "key": "orderBy",
        "value": "META",
      },
      {
        "key": "orderDir",
        "value": "DESC",
      },
      {
        "key": "orderMeta",
        "value": "EpisodeNo",
      },
      {
        "key": "exact",
        "value": "true",
      },
    ],
  },
  SERIES: {
    GET_DATA: 'KIDS_SERIES_GET_DATA',
    APPEND_DATA: 'KIDS_SERIES_APPEND_DATA',
    ERROR: 'KIDS_SERIES_ERROR',
    CLEAR_ERROR: 'KIDS_SERIES_CLEAR_ERROR',
    CLEAR_DATA: 'KIDS_SERIES_CLEAR_DATA',
  },
  MOVIES:{
    GET_DATA: 'KIDS_MOVIES_GET_DATA',
    APPEND_DATA: 'KIDS_MOVIES_APPEND_DATA',
    ERROR: 'KIDS_MOVIES_ERROR',
    CLEAR_ERROR: 'KIDS_MOVIES_CLEAR_ERROR',
    CLEAR_DATA: 'KIDS_MOVIES_CLEAR_DATA',
    DEFAULT_FILTERS: [
      {
        "key": "filterTypes",
        "value": `${MEDIA_TYPE.MOVIE}`,
      },
      {
        "key": "filter",
        "value": "(and (or language='english' language='hindi') genre='kids')",
      },
      {
        "key": "orderBy",
        "value": "views",
      },
      {
        "key": "pageIndex",
        "value": "0",
      },
      {
        "key": "pageSize",
        "value": "10",
      },
    ],
  },
  POSTER_ROUTE: {
    EPISODES: 'KIDS_SET_POSTER_ROUTE',
    CLEAR_ROUTES: 'KIDS_CLEAR_POSTER_ROUTE',
  },
};

export const FILTERS = {
  ADD_GENRE : 'ADD_GENRE',
  ADD_LANGUAGE : 'ADD_LANGUAGE',
  ADD_MEDIATYPE: 'ADD_MEDIATYPE',
  CLEAR_ALL_FILTERS: 'CLEAR_ALL_FILTERS',
  UPDATE_LANGUAGE: 'UPDATE_LANGUAGE',
  UPDATE_INITIAL_LANGUAGE: 'UPDATE_INITIAL_LANGUAGE',
  RESET_INITIAL_LANGUAGE: 'RESET_INITIAL_LANGUAGE',
};



export const TOP_SHOUT = {
  SUCCESS: 'TOP_SHOUT_SUCCESS',
  FAILURE: 'TOP_SHOUT_FAILURE',
};

export const TV_SERIES_TOP_SHOUT = {
  SUCCESS: 'TV_SERIES_TOP_SHOUT_SUCCESS',
  FAILURE: 'TV_SERIES_TOP_SHOUT_FAILURE',
};
export const SHOUT = {
  SHOUT_LIST: {
    SUCCESS: 'SHOUT_LIST_SUCCESS',
    FAILURE: 'SHOUT_LIST_FAILURE',
  },
  SHOUT_BY_USER: {
    SUCCESS: 'SHOUT_BY_USER_SUCCESS',
    FAILURE: 'SHOUT_BY_USER_FAILURE',
    REQUEST: 'SHOUT_BY_USER_REQUEST',
  },
  MAKE_SHOUT: {
    SUCCESS: 'MAKE_SHOUT_SUCCESS',
    FAILURE: 'MAKE_SHOUT_FAILURE',
    RESET_MAKE_SHOUT:'RESET_MAKE_SHOUT',
  },
};


export const CHANNEL = {
  HOME:{
    SUCCESS: 'CHANNELS_HOME_SUCCESS',
    FAILURE: 'CHANNELS_HOME_FAILURE',
  },
  LANDING:{
    HEAD_CAROUSEL: 'CHANNELS_HEAD_CAROUSEL',
    HEAD_CAROUSEL_RESET: 'CHANNELS_HEAD_CAROUSEL_RESET',
    MORE_SHOWS: 'CHANNELS_MORE_SHOWS',
    APPEND_MORE_SHOWS: 'CHANNELS_APPEND_MORE_SHOWS',
    FAILURE: 'CHANNELS_LANDING_FAILURE',
    RESET:"CHANNEL_RESET",
    SHOW_MORE_RESET:"CHANNEL_SHOW_MORE_RESET",
    MORE_SHOWS_FILTERS: [
      {
        "key": "filterTypes",
        "value": `${MEDIA_TYPE.TV_SERIES}`,
      },
      {
        "key": "filter",
        "value": "(and genre!='kids' genre!='kids' sbu='COH')",
      },
      {
        "key": "orderBy",
        "value": "views",
      },
      {
        "key": "pageIndex",
        "value": "0",
      },
      {
        "key": "pageSize",
        "value": "6",
      },
    ],
  },
};
// export const GET_CHANNEL_MEDIAS = {
//   SUCCESS: 'GET_CHANNEL_MEDIAS_SUCCESS',
//   FAILURE: 'GET_CHANNEL_MEDIAS_FAILURE',
// };

export const CHANNEL_MEDIAS ={
  CLEAR_CHANNEL_MEDIAS: 'CLEAR_CHANNEL_MEDIAS',
  GET_CHANNEL_MEDIAS: 'GET_CHANNEL_MEDIAS',
  FAILURE: 'CHANNEL_MEDIAS_FAILURE',
};
