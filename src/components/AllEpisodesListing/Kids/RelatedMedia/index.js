import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import endpoints from '../../../../endpoints/kids';
import {KIDS} from '../../../../constants';
import {relatedMedia} from '../../../../actions/playlist';
import CardTopHeading from '../../../../components/CardComponent/CardTopHeading';
import KidsCarouselTray from '../../../Tray/KidsCarouselTray';
import MoreKidsCluster from '../../Kids/MoreKidsCluster';
import {getKidsSeriesData, clearKidsSeriesData} from '../../../../actions/kids';

class KidsRelatedMedia extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {getKidsSeriesData} = this.props;
    let params = endpoints.kidsSeries, self = this;
    getKidsSeriesData(params);
  }

  componentWillUnMount(){
    const {clearKidsSeriesData} = this.props;
    clearKidsSeriesData();
  }

  render() {
    const {mediaId, kidsSeries} = this.props;
    let moreKidsShow, moreKidsShowHeading ={title:'More Kids Shows', mName:'kidsAllShows'} ;
    let list = [];
    if(kidsSeries.totalDataCount > 0){
      kidsSeries.data.map(function (item, index) {
        if (list.length < 5)
          (item.mId != mediaId) ? list.push(item) : '';
      });
      let map = {list : list, type: 'relatedMedia'};
      moreKidsShow =  (<KidsCarouselTray aspectRatio='1x1' item={map} noCardTopHeading />);
    }

    return (
      <div className='kids-related-media-section related-media-section'>
        <div className='more-kids-shows-container kidsCharacters'>
          <div>
            <CardTopHeading items={moreKidsShowHeading} />
          </div>
          <div>
            {moreKidsShow}
          </div>
        </div>

        <MoreKidsCluster />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getKidsSeriesData: bindActionCreators(getKidsSeriesData, dispatch),
    clearKidsSeriesData: bindActionCreators(clearKidsSeriesData, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    mediaId: ownProps.mediaId,
    kidsSeries: state.kids.kidsSeries,
  };
};

KidsRelatedMedia.propTypes = {
  mediaId: PropTypes.string.isRequired,
  kidsSeries: PropTypes.object.isRequired,
  getKidsSeriesData: PropTypes.func.isRequired,
  clearKidsSeriesData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(KidsRelatedMedia);
