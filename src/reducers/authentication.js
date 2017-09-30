import {
  SIGNUP,
  LOGIN,
  LOGOUT,
  CHANGE_PASSWORD,
  CHECKEMAIL,
  CHANGE_PROFILE,
} from '../constants';

//TODO:get user info store & initailize state
const initialState = {
  login: {
    isLogin: false,
    loginFromSocial: false,
    data:{},
    error: {},
    isLoginSuccess:false,
    isLoginFail:false,
  },
  signup: {
    error:{},
    isSignUpSuccess:false,
    isSignUpError:false,
  },
  passwordChanged:{
    isPasswordChanged: false,
    error:{},
  },
  profileChanged:{
    isProfileChanged: false,
    error:{},
  },
  checkEmail:{
    checkEmailExist: false,
    isLoading:false,
  },
};

const authentication = function (state = initialState, action) {
  switch (action.type) {
    case LOGIN.SUCCESS:
    {
      let loginFromSocial;
      if (action.data.Provider === 'google' || action.data.Provider === 'facebook') {
        loginFromSocial = true;
      }
      return {
        ...state,
        login: {
          isLogin: true,
          loginFromSocial: loginFromSocial,
          isLoginSuccess:true,
          data: action.data,
        },
      };
    }
    case LOGIN.FAILURE:
      return {
        ...state,
        login: {
          isLogin: false,
          loginFromSocial: false,
          isLoginFail:true,
          error:action.error.message,
        },
      };

    case LOGIN.CLEAR_ERRORS:
      return {
        ...state,
        login: {
          ...state.login,
          error: {},
        },
      };
    
    case CHANGE_PASSWORD.SUCCESS:
      return {
        ...state,
        passwordChanged: {
          isPasswordChanged: true,
          error:{},
        },
      };

    case CHANGE_PASSWORD.FAILURE:
      return {
        ...state,
        passwordChanged: {
          isPasswordChanged: false,
          error:action.error.message,
        },
      };

    case CHANGE_PASSWORD.CLEAR_ERRORS:
      return {
        ...state,
        passwordChanged: {
          isPasswordChanged: false,
          error: {},
        },
      };

    case CHANGE_PASSWORD.MODAL_CLOSE :
      return {
        ...state,
        passwordChanged: {
          isPasswordChanged: false,
        },
      };
    case CHANGE_PROFILE.SUCCESS:
      return {
        ...state,
        profileChanged: {
          isProfileChanged: true,
          error:{},
        },
      };

    case CHANGE_PROFILE.FAILURE:
      return {
        ...state,
        profileChanged: {
          isProfileChanged: false,
          error:action.error.message,
        },
      };
    case SIGNUP.SUCCESS:
      return {
        ...state,
        signup: {
          error: {},
          isSignUpSuccess:true,
        },
        login:{
          error: {},
          isLogin: true,
          data: action.data,
        },
      };

    case SIGNUP.FAILURE:
      return {
        ...state,
        signup: {
          error: action.error.message,
          isSignUpError: true,
        },
      };

    case LOGOUT.SUCCESS:
      return {
        ...state,
        login: {
          data: {},
          loginFromSocial: false,
          isLogin: false,
        },
      };

    case SIGNUP.CLEAR_ERRORS:
      return{
        ...state,
        signup:{
          error: {},
        },
      };
    case CHECKEMAIL.SUCCESS:
      return {...state, checkEmail:{checkEmailExist: action.data.isExist, isLoading:false}};
    case CHECKEMAIL.FAILURE:
      return {...state, checkEmail:{checkEmailExist:false, isLoading: false}};
    case CHECKEMAIL.REQUREST:
      return {...state,checkEmail:{checkEmailExist:false, isLoading: true}};

    default:
      return state;
  }
};
export default authentication;
