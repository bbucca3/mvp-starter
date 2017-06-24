import React from 'react';

var style = {
  flexDirection: 'row', 
  height: 50, 
  padding: 20
};

const ListItem = (props) => (

  // https://stackoverflow.com/a/34779681
  <div style={style}>
    { props.item.name }: <a href={"mailto:" + props.item.email}> Email</a> <br />
    { props.item.address } { props.item.city }, {props.item.state} <br /> 
    Phone: { props.item.phone } <br />
    <a href={"https://www.petfinder.com/pet-search?&status=A&shelter_id=" + props.item.shelterId}> View available pets on Petfinder</a>
  </div>
)

export default ListItem;