import React, { Component } from 'react';
import SignIn from './components/SignIn/SignIn';
import Page2 from './components/Page2/Page2'
import Logout from './components/logout/logout';
import './App.css';
import 'tachyons';

class App extends Component {
  constructor(){
    super();
    this.state = {
      route: 'signin',
      isSignedIn: false
    }
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({route: 'signin'})
    } else if (route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route})
  }

  render(){
    return (
      <div className="App">
        <h1 className='pa3 pv3'>Nemesis Consultants LLP</h1>
        {this.state.route === 'home'
        ? <div>
            <Logout onRouteChange = {this.onRouteChange} isSignedIn = {this.state.isSignedIn}/>
            <Page2 onRouteChange = {this.onRouteChange} isSignedIn = {this.state.isSignedIn} />
         </div>
         : <div>
            <SignIn onRouteChange = {this.onRouteChange} />
          </div>
        }
      </div>
    );
  }
}

export default App;
