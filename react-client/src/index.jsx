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
  }
  // dynamic render upon page reload
  componentDidMount() {
    $.ajax({
      url: '/shelters', 
      success: (data) => {
        this.setState({items:data});
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }
  // handle search from zip code submission via search component 
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
          // this.componentDidMount();
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
        // console.log(data);
        this.setState({
          items:data
        });
        // https://stackoverflow.com/a/12038224
        setTimeout(function () { 
          location.reload();
        }, 750);
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