import React from 'react';

const ListItem = (props) => (
  // https://stackoverflow.com/a/34779681
  <div>
    { props.item.name } <a href={"mailto:" + props.item.email}> Email</a>
  </div>
)

export default ListItem;