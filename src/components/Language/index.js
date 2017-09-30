import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PaperRipple from 'react-paper-ripple';
import CardVerticleTitle from '../CardComponent/CardVerticleTitle';

class Language extends Component {
  constructor(props) {
    super(props);
  }
  redirectLanguagePage = (item)=>{
    this.context.router.push({
      pathname: '/discover',
      state: { selectedLanguage: item.label },
    });
  };

  render() {
    const items = this.props.item,
      language = items.list;
    let languageList;

    if (language && language.length > 0) {
      languageList = language.map((item, index) => {
        return (
          <li key={index} title={item.label} onClick={()=>{this.redirectLanguagePage(item);}}>
            <PaperRipple className='ripple blue-btn'>
              {item.name}
            </PaperRipple>
          </li>
        );
      });
    }

    return (
      <div className={'section ' + (items.mName)}>
        <div className='lang-section'>
          <CardVerticleTitle title={items.title} />
          <div className='language-item'>
            <ul className='clearfix'>{languageList}</ul>
          </div>
        </div>
      </div>
    );
  }
}

Language.propTypes = {
  item: React.PropTypes.object.isRequired,
};

Language.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default Language;
