import React from 'react';
import ListItem from './ListItem.jsx';

var style = {
  alignItems: 'center'
};

const List = (props) => (
  <div style={style}>
    <h4> List of Shelters </h4>
    <u>Found { props.items.length } shelters.</u> 
    { props.items.map((item, index) => <ListItem key={index} item={item}/>)}
  </div>
)

export default List;