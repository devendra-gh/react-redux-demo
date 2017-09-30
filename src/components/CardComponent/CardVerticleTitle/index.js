import React, {Component} from 'react';

class CardVerticleTitle extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let title = this.props.title;
    return(
      <div className='verticle-heading'>
        <span>{title}</span>
      </div>
    );
  }
}

CardVerticleTitle.propTypes = {
  title: React.PropTypes.string.isRequired,
};

export default CardVerticleTitle;
