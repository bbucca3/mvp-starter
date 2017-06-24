import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class Search extends React.Component {

  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }

  search() {
    this.props.onSearch( $('#zip').val() );
  }

  render() {
    return (<div>
      <h2> Search for pet shelters </h2>
      Enter a 5 digit zip code: <input id="zip"/>
      <button onClick={this.search}> Search </button>
    </div>)
  }
}

export default Search;