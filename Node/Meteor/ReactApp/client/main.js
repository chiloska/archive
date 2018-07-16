import './main.html';

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import ImageList from './components/images_list';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = { images: [] }
  }


  componentWillMount() {
    //console.log('App is about to Load');
    axios.get('https://api.unsplash.com/search/photos?page=0&query=cars&client_id=0922a87130d79536e91eff886c186c01a3e5830cac9370a2228ac6328253e68c')
      .then(response => this.setState({ images: response.data.results }))
      .catch(error => console.log(error));

  }


  render() {
    return (
      <div>
        <ImageList images={this.state.images} />
      </div>
    )
  }
}


Meteor.startup(() => {
  ReactDOM.render(<App />, document.querySelector('#app'))
});

