const intialState = {
  imageURL: 'imgURLS',
};

const deviceInfo = function (state = intialState, action) {
  switch (action.type) {
    case 'medium-device':
      return {
        ...state,
        imageURL: 'imgURLM',
      };

    case 'large-device':
      return {
        ...state,
        imageURL: 'imgURLL',
      };

    case 'small-device':
      return {
        ...state,
        imageURL: 'imgURLS',
      };

    default:
      return state;
  }
};

export default deviceInfo;
