/**
 * Created by TTND on 2/22/2017.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {getMediaInfo} from '../actions/getMediaInfo';
import {setLoader} from '../actions/loader';
import endpoints from '../endpoints/playList';
import ShowsPlayer from '../components/Player/Show';
import PageNotFound from '../components/PageNotFound';
import {checkUrl} from '../util/routeCreater';

class CheckComponentType extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let route='';
    const {params: {mediaId}, getMediaInfoAction} = this.props;
    getMediaInfoAction(endpoints.getMediaInfo, mediaId);
    let url = `/shows/${this.props.params.mediaMainTitle}/${this.props.params.mediaId}`;
    route = checkUrl(url);
    if(route!=''){
      this.context.router.push(route);
    }
  }


//   // if(URL_REDIRECTION && url) {
//   checkUrl=(url)=>{
//     for (let i in URL_REDIRECTION) {
//       if (i == url) {
//         let route = URL_REDIRECTION[i];
//         console.log('route',route);
//         this.context.router.push(route);
//         return;
// //            return sbu;
//       }
//     }
//   };
//   //}
  render() {
    const {getMediaInfo: {mediaInfo : {data, error}}}=this.props;


    return (
      <div>
        {
          data.assets && <ShowsPlayer {...this} />
        }
        {

          error.message && <PageNotFound {...this} />
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    getMediaInfo: state.getMediaInfo,
    loader: state.loader,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getMediaInfoAction: bindActionCreators(getMediaInfo, dispatch),
    setLoader: bindActionCreators(setLoader, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckComponentType);

CheckComponentType.propTypes = {
  getMediaInfoAction: PropTypes.func.isRequired,
  setLoader: PropTypes.func.isRequired,
  loader: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  getMediaInfo: PropTypes.object.isRequired,
};

CheckComponentType.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
