import React, {Component} from 'react';
import TextTruncate from 'react-text-truncate';

class EpisodeTitle extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let item = this.props.title,
      isTitleMultiLine = this.props.isTitleMultiLine;

    if(isTitleMultiLine === false){
      return <h4>{item}</h4>;
    } else{
      return <h4><TextTruncate line={2} text={item} truncateText={'...'} /></h4>;
    }
  }
}

EpisodeTitle.propTypes = {
  isTitleMultiLine: React.PropTypes.bool,
  title: React.PropTypes.string.isRequired,
};

export default EpisodeTitle;
