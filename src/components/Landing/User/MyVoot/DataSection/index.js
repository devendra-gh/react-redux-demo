import React, { Component, PropTypes } from 'react';
import ListItem from './ListItem';

const DataSection = ({dataUsage, onSelect})=>{
  return(
    <div className='data-usage'>
      <div>
        <h4>Data Usage</h4>
        <p>Select your default playback quality for videos on voot. You can always change this setting while you're watching a video.</p>
      </div>
      <div>
        <ul className='data-usage-button'>
          {
            dataUsage.map((datausage, index)=>{
              return <ListItem key={index}  datausage={datausage} onSelect={onSelect} /> ;
            })
          }
        </ul>
      </div>
    </div>
  );
};

DataSection.propTypes = {
  dataUsage : PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default DataSection;

