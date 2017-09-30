import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CustomLandingPage from '../../CustomLandingPage';

class SplitsvillaLandingPage extends Component {
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
      <CustomLandingPage slugName='splitsvilla' {...this.props} />
    );
  }
}

export default SplitsvillaLandingPage;
