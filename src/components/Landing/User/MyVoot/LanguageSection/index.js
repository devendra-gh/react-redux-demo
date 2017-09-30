import React, { Component, PropTypes} from 'react';
import ListItem from './ListItem';

const LanguageSection = ({ languages, onSelect })=>{
  return(
    <div className='language-preference'>
      <div>
        <h4>Language Preferences</h4>
        <p>Only content from selected languages will be displayed within Voot. All content from languages you do not select will be hidden.</p>
      </div>
      <div>
        <ul className='languages'>
        {
          languages.map((language, index) => {
            return <ListItem key={index} language={language} onSelect={onSelect} />;
          })
        }
        </ul>
      </div>
    </div>
  );
};

LanguageSection.propTypes = {
  languages: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default LanguageSection;

