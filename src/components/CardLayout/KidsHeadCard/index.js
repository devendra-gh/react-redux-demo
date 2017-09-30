import React, {Component} from 'react';
import TextTruncate from 'react-text-truncate';
import CardImage from '../../CardComponent/CardImage';
import CardArrow from '../../CardComponent/CardArrow';
import CardDescription from '../../CardComponent/CardDescription';

class KidsHeadCard extends Component {
  constructor(props) {
    super(props);
  }

  onClick=()=>{
    const {data, onClick}=this.props;
    onClick(data);
  };

  render() {

    let item = this.props.items,
      noPlayIcon = this.props.noPlayIcon,
      imageList = {
        imgURLL: item.imgURLL,
        imgURLM: item.imgURLM,
        imgURLS: item.imgURLS,
      };

    let title = (this.props.isTitleMultiLine )?<h5>{item.mediaMainTitle}</h5>:
      <h1><TextTruncate line={2} text={item.mediaMainTitle} truncateText={'...'} /></h1>;

    let desc = this.props.customDesc != undefined ? this.props.customDesc : item.desc;
    return (
      <div onClick={this.onClick} className='card-holder'>

        <figure className='figure-block'>
          <CardImage aspectRatio={this.props.aspectRatio} source={imageList} alt={item.title} />
          {!noPlayIcon && <CardArrow />}
        </figure>

        <div className='item-detail'>
          {title}
          {desc &&
            <CardDescription>
              <TextTruncate line={2} text={desc} truncateText={'...'} />
            </CardDescription>
          }
        </div>
      </div>
    );
  }
}

KidsHeadCard.propTypes = {
  items: React.PropTypes.object.isRequired,
  isTitleMultiLine: React.PropTypes.bool,
  data: React.PropTypes.object,
  onClick: React.PropTypes.func,
  noPlayIcon: React.PropTypes.bool,
  aspectRatio: React.PropTypes.string,
  customDesc: React.PropTypes.string,
};

export default KidsHeadCard;
