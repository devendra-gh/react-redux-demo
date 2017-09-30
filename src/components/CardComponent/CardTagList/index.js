import React, {Component} from 'react';
import {connect} from 'react-redux';

class CardTagList extends Component {
  constructor(props) {
    super(props);

    this.createTagList = this.createTagList.bind(this);
  }

  createTagList(tags){
    const SBU=this.props.SBU_LIST ? this.props.SBU_LIST:false;
    if (tags && tags.length>0) {
      return tags.map(function (item, index) {
        if(SBU && item) {
            for (let i in SBU) {
              if (i==item) {
                let sbu=SBU[i];
                return <li key={index}><span>{sbu}</span></li>;
              }
          }
          return (
            <li key={index}><span>{item}</span></li>
          );
        }
      });
    }
  }

  // getSbuValue=(item)=>{
  //   const SBU=this.props.SBU_LIST;
  //   if(SBU && item){
  //     for (let i in SBU) {
  //       if (i==item) {
  //         let sbu=SBU[i];
  //         return sbu;
  //       }
  //     }
  //   }
  // };




  render() {
    let tagList = this.createTagList(this.props.tagLists);
    return(
      tagList ? <ul className='tag-list clearfix'>{tagList}</ul> : false
    );
  }
}

CardTagList.propTypes = {
  tagLists: React.PropTypes.array,
  SBU_LIST: React.PropTypes.object.isRequired,
};


const mapStateToProps = (state, ownProps) => {
  return {
    SBU_LIST: state.config && state.config.config && state.config.config.assets && state.config.config.assets.SBU_LIST ?  state.config.config.assets.SBU_LIST:false,
  };
};

export default connect(mapStateToProps)(CardTagList);
