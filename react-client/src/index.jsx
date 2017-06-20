import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
    console.log(this.state.items);
  }

  // componentDidMount() {
  //   $.ajax({
  //     url: '/items', 
  //     success: (data) => {
  //       this.setState({
  //         items: data
  //       })
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }

  search(zipCode) {
    if (zipCode.length !== 5) {
      alert('Please enter a 5 digit zip')
    } else {      
      console.log(`${zipCode} was searched`);

      $.ajax({
        url:'/shelters/search',
        type:'POST',
        data:{zip:zipCode},
        success: () => {
          console.log('success client post');
          this.getShelters(zipCode);
        },
        error: (err) => {
          console.log(err);
        }
      });     
    }
  }

  getShelters(zip) {
    console.log('inside getShelters');
    $.ajax({
      url:'/shelters',
      type:'GET',
      data:{zip:zip},
      success: (data) => {
        console.log(this);
        this.setState({items:data});
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Pet Adoption Shop</h1>

      <Search onSearch={this.search.bind(this)} />

      <List items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));