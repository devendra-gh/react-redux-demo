import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PaperRipple from 'react-paper-ripple';
import {Link} from 'react-router';
import MoviesList from './Movies';
import ShowsList from './Shows';

class LanguageListing extends Component {
  constructor(props) {
    super(props);
    let language =['Hindi', 'English'];
    if(this.props.location && this.props.location.state && this.props.location.state.selectedLanguage){
      language = this.props.location.state.selectedLanguage;
    }
    this.state = {
      selectedTab: 0,
      selectedLanguage: language,
    };
  }

  render() {
    const {selectedLanguage} = this.state, filters = {language: selectedLanguage};
    return (
      <div className='home-container language-list'>
        <div className='sbuName-section'>
          <Link to='/'>
            <span className='left-arrow'><i className='icon-left-thin'></i></span>
          </Link>
          <h4 className='sbuName'>Selected Languages</h4>
        </div>
        <Tabs onSelect={this.handleSelect} className='tab-section'>
          <TabList>
            <Tab><h2><PaperRipple className='ripple'>TV SHOWS</PaperRipple></h2></Tab>
            <Tab><h2><PaperRipple className='ripple'>MOVIES</PaperRipple></h2></Tab>
          </TabList>
          <TabPanel>
            <ShowsList filters={filters} />
          </TabPanel>
          <TabPanel>
            <MoviesList filters={filters} />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

LanguageListing.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
const mapDispatchToProps = (dispatch) => {
  return {
  };
};

LanguageListing.propTypes = {
  route: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(null, mapDispatchToProps)(LanguageListing);
