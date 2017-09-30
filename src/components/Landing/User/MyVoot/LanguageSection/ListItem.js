import React, { Component, PropTypes} from 'react';

const ListItem = (props)=>{
  const { language, onSelect } = props;
  let style = {
    'backgroundColor': '',
  };
  if (language.isReq) {
    style = {
      'backgroundColor': '#401F80',
      'color':'#FFFFFF',
    };
  }
  return(
    <li style={style} onClick={() => onSelect(language)}>
      {language.isReq && (language.name ==='English' || language.name ==='Hindi')? <div><span>*</span> {language.name}</div> : language.name}
    </li>
  );
};

ListItem.propTypes = {
  language: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ListItem;
