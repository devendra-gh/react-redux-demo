import React, {Component} from 'react';

class PrevArrow extends Component {
  render(){
    return(
      <button {...this.props}>
        <i className='icon-left'></i>
      </button>
    );
  }
}

export default PrevArrow;
