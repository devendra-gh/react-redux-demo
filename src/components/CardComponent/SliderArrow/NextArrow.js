import React, {Component} from 'react';

class NextArrow extends Component {
  render(){
    return(
      <button {...this.props}>
        <i className='icon-right'></i>
      </button>
    );
  }
}

export default NextArrow;
