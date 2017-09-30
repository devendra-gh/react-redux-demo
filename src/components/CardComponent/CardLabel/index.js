import React, {Component} from 'react';
import {connect} from 'react-redux';

class CardLabel extends Component {
  constructor(props){
    super(props);
  }

  SbuMapping(title) {
    const {SBU_LIST} = this.props;
    let sbu = title;

    Object.keys(SBU_LIST).map((SBU)=>{
      if(SBU===title)
        sbu = SBU_LIST[SBU];
    });

    return sbu;
  }

  render() {
    const {title} = this.props;
    return (
      <h2>{this.SbuMapping(title)}</h2>
    );
  }
}

CardLabel.propTypes = {
  title: React.PropTypes.string.isRequired,
  SBU_LIST: React.PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
  return {
    SBU_LIST: state.config && state.config.config && state.config.config.assets && state.config.config.assets.SBU_LIST ?  state.config.config.assets.SBU_LIST:false,
    title : ownProps.title,
  };
};

export default connect(mapStateToProps)(CardLabel);
