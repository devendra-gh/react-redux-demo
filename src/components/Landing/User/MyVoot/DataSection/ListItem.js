import React, { Component, PropTypes} from 'react';

const ListItem = ({ datausage, onSelect }) => {
  let style = {
    'backgroundColor': '',
  };
  if (datausage.isSelected) {
    style = {
      'backgroundColor': '#401f80',
      'color':'#FFFFFF',
    };
  }
  return(
    <li style={style} onClick={() => onSelect(datausage)}>{datausage.label}</li>
  );
};

ListItem.propTypes = {
  datausage: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ListItem;
