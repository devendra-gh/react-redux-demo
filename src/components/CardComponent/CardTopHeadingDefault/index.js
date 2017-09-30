import React, {Component} from 'react';
import CardHeading from '../../CardComponent/CardHeading';

class CardTopHeadingDefault extends Component {
  render() {
    let items = this.props.items;
    if(items.title && items.title != ''){
      return (
        <div className='top-heading'>
          <div className='heading-inner'>
            <CardHeading>
              <h2>{items.title}</h2>
            </CardHeading>
          </div>
        </div>
      );
    }
  }
}

CardTopHeadingDefault.propTypes = {
  items: React.PropTypes.object.isRequired,
};

export default CardTopHeadingDefault;
