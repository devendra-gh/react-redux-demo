import React, {Component} from 'react';

class CardMetaTagList extends Component {
  constructor(props) {
    super(props);
    this.createMetaTagList = this.createMetaTagList.bind(this);
  }

  createMetaTagList(tag){
    let customClass = this.props.customClass ? this.props.customClass :'';
    if (tag.length) {
      return tag.map(function (item, index) {
        if(item != undefined) {
          return (
            <li key={index}><span className={customClass}>{item}</span></li>
          );
        }
      });
    }
  }

  render() {
    let tagList = this.createMetaTagList(this.props.tagLists);

    return(
      tagList ? <ul className='tag-list clearfix'>{tagList}</ul> : false
    );
  }
}

CardMetaTagList.propTypes = {
  tagLists: React.PropTypes.array.isRequired,
  customClass: React.PropTypes.string,
};

export default CardMetaTagList;
