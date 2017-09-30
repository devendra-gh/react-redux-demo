import React, { Component } from 'react';

class Banner extends Component {
  render(){
    const { closeSignUpModal } = this.props;
    return(
      <div className='signup-banner'>
        <h3>Register with VOOT</h3>
        <button type='button' onClick={closeSignUpModal}>×</button>
        <ul>
          <li>
            <span className='banner-icon'><i className='icon-play'></i></span>
            <span className='banner-text'>Continue Watching Feature</span>
          </li>
          <li>
            <span className='banner-icon'><i className='icon-star'></i></span>
            <span className='banner-text'>Recommended Content</span>
          </li>
        </ul>

      </div>
    );
  }
}
Banner.propTypes = {
  closeSignUpModal: React.PropTypes.func.isRequired,
};

export default Banner;
