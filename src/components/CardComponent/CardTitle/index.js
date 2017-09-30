import React, {Component} from 'react';
import TextTruncate from 'react-text-truncate';
import {getCardTitle} from '../../../util/getCardTitle';

class CardTitle extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let item = this.props.title,
      //label = this.props.label,
      componentFlag = this.props.componentFlag,
      isTitleMultiLine = this.props.isTitleMultiLine,
      title = '';

    if(item != undefined){
      title = getCardTitle(item, componentFlag);
    }

    if(isTitleMultiLine === false){
      if(item.contentType=='Movie'){
        //return <h1>{title}{label?'-' + label:false}</h1>;
        return <h1>{title}</h1>;
      } else if(this.props.h1Text) {
        return <h1>{title}</h1>;
      }
      else{
        return <h4>{title}</h4>;
      }
    } else{
      if(this.props.h1Text) {
        return <h1><TextTruncate line={2} text={title} truncateText={'...'} /></h1>;
      }
      else {
        return <h4><TextTruncate line={2} text={title} truncateText={'...'} /></h4>;
      }
    }
  }
}

CardTitle.propTypes = {
  title: React.PropTypes.object.isRequired,
  label: React.PropTypes.string,
  componentFlag: React.PropTypes.string,
  isTitleMultiLine: React.PropTypes.bool,
  h1Text: React.PropTypes.bool,
};

export default CardTitle;
