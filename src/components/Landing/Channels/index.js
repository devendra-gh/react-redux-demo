import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import endpoints from '../../../endpoints/channels';
import {getChannels} from '../../../actions/channels';
import TabNavigation from '../../Navigation/TabNav';
import ChannelCard from '../../CardLayout/ChannelCard';
import {createRouteString} from '../../../util/routeCreater';

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      channels: [],
      sortedChannels: [],
    };

    this.createChannelList = this.createChannelList.bind(this);
  }

  componentWillMount() {
    const {getChannels, channel:{home}} = this.props;
    this.setState({
      channels: this.props.channel.home.list,
      sortedChannels: this.props.channel.home.list,
    });
    if (!home.list.length) {
      getChannels(endpoints.home);
    }
  }

  componentDidMount = ()=>{
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'ChannelsPageView');
    }
  };

  componentWillReceiveProps(nextProps) {
    if(nextProps.channel && nextProps.channel.home && nextProps.channel.home.list){
      this.setState({
        channels: nextProps.channel.home.list,
        sortedChannels: nextProps.channel.home.list,
      });
    }
  }

  sbuSort = (first, second) => {
    if(first.sbu < second.sbu)
      return -1;
    else if(first.sbu > second.sbu)
      return 1;
    return 0;
  };

  orderBy = (sortFunction) => {
    if(this.state && this.state.channels){
      if(!this.state.isActive){
        this.setState({
          sortedChannels: [...this.state.channels].sort(sortFunction),
          isActive: true,
        });
      } else {
        this.setState({
          sortedChannels: this.state.channels,
          isActive: false,
        });
      }
    }
  };

  createChannelList(item, index){
    return (
      <li key={index} onClick={()=>this.routeToChannelLanding(item)} data={item} className='grid-channel'>
        <ChannelCard data={item} aspectRatio='1x1' />
      </li>
    );
  }

  routeToChannelLanding = (item) => {
    this.context.router.push(`/channels/${createRouteString(item.sbu)}`);
  };

  render() {
    const {sortedChannels, isActive} = this.state;

    let channelList;

    if(sortedChannels){
      channelList = sortedChannels.map(this.createChannelList);
    }

    return (
      <div className='home-container'>
        <TabNavigation {...this.props} />
        <div className='channel-container'>

          <div className='top-heading'>
            <div className='heading-inner'>
              <div className='tray-heading default-color'><h1>All Channels</h1></div>
              <div className='order-filter'>
                <button className={` ${isActive ?' most-popular-btn active' : 'most-popular-btn'}`} onClick={(e) => this.orderBy(this.sbuSort)}>A - Z</button>
              </div>
            </div>
          </div>

          <ul className='grid-container clearfix'>
            {channelList}
          </ul>

        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getChannels: bindActionCreators(getChannels, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    params: ownProps.params,
    channel: state.channel,
  };
};

Channels.propTypes = {
  getChannels: PropTypes.func.isRequired,
  channel: PropTypes.object.isRequired,
};

Channels.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
