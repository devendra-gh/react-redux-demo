import React, {Component} from 'react';

class CardDescription extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className='description-tray'>{this.props.children}</div>
    );
  }
}

CardDescription.propTypes = {
  children: React.PropTypes.any,
};
export default CardDescription;
