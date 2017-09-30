import React, {Component} from 'react';

class CardHeading extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className='tray-heading'>{this.props.children}</div>
    );
  }
}

CardHeading.propTypes = {
  children: React.PropTypes.any.isRequired,
};

export default CardHeading;
