import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> List of Shelters </h4>
    There are { props.items.length } shelters.
    { props.items.map((item, index) => <ListItem key={index} item={item}/>)}
  </div>
)

export default List;