import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import kidsEndpoints from '../../../../endpoints/kids';
import {KIDS} from '../../../../constants';
import {formDataGenerator} from '../../../../util/formDataGenerator';
import {getKidsClusterData, clearKidsClusterData} from '../../../../actions/kids';
import CardTopHeading from '../../../../components/CardComponent/CardTopHeading';
import KidsCarouselTray from '../../../Tray/KidsCarouselTray';

class MoreKidsCluster extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {getKidsClusterData} = this.props;
    getKidsClusterData(kidsEndpoints.kidsCollection);
  }

  componentWillUnmount() {
    const {clearKidsClusterData} = this.props;
    clearKidsClusterData();
  }

  render() {
    const {kidsCluster: {kidsData}} = this.props;
    let kidsDataList = kidsData.data.list;
    let moreKidsCollection, moreKidsCollectionHeading ={title:'More Kids Collection', mName:'kidsAllCluster'} ;
    if(kidsDataList){
      let map = {list : kidsDataList, type: 'cluster'};
      moreKidsCollection =  (<KidsCarouselTray aspectRatio='16x6' item={map} noCardTopHeading />);
    }

    return (
      <div className='kids-related-media-section related-media-section'>
        <div className='more-kids-clusters-container'>
          <div className='kidsClusters'>
            <CardTopHeading items={moreKidsCollectionHeading} />
          </div>
          {moreKidsCollection}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getKidsClusterData: bindActionCreators(getKidsClusterData, dispatch),
    clearKidsClusterData: bindActionCreators(clearKidsClusterData, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    kidsCluster: state.kids.kidsCluster,
  };
};

MoreKidsCluster.propTypes = {
  getKidsClusterData: PropTypes.func.isRequired,
  clearKidsClusterData: PropTypes.func.isRequired,
  kidsCluster: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreKidsCluster);
