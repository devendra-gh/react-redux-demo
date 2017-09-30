import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CustomLandingPage from '../../CustomLandingPage';

class BiggBossLandingPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentDidMount = ()=>{
    if(typeof window !== "undefined") {
      window.fbq('trackCustom', 'CustomLandingPageView');
    }
  };

  render() {

    return (
      <CustomLandingPage slugName='bigg-boss' {...this.props} />
    );
  }
}

export default BiggBossLandingPage;
