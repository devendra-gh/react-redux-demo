import React, {Component} from 'react';
import {connect} from 'react-redux';
import LazyLoad from 'react-lazyload';
import { forceCheck } from 'react-lazyload';

class CardImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps){
    forceCheck();
  }

  render() {
    const {deviceInfo:{imageURL}, source, alt, aspectRatio} = this.props,
      imagePlaceholder = '/image-'+ aspectRatio +'-placeholder.jpg';
    const { loaded } = this.state;
    let imgURL = source[imageURL],
      imgTag = (<img
        className={`original-image ${loaded ? '' : 'hide-image'}`}
        src={imgURL}
        alt={alt}
        title={alt}
        onLoad={() => { this.setState({ loaded: true }); }}
        onError={(e)=>{e.target.src=imagePlaceholder;}} />);
    //imgURL = imgURL && (imgURL.match('^http://')) ? imgURL.replace(/^http:\/\//i, 'https://') : imgURL;


    return (
      <div className='figure'>
        <img className='placeholder-image' src={imagePlaceholder} alt='placeholder-image' />
        {this.props.disableLazyLoading ? imgTag : <LazyLoad once height={50} offset={300}>{imgTag}</LazyLoad>}
      </div>
    );
  }
}

CardImage.propTypes = {
  source: React.PropTypes.object,
  alt: React.PropTypes.string,
deviceInfo: React.PropTypes.object,
  disableLazyLoading: React.PropTypes.bool,
  aspectRatio: React.PropTypes.string,
};

function mapStateToProps({deviceInfo}){
  return{
    deviceInfo,
  };
}

export default connect(mapStateToProps)(CardImage);


