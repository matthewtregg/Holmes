import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {LandingPage} from './app/components/landingPage/landingPage';
import { MapView } from './app/containers/MapViewContainer/MapViewContainer';

//react-router


function App() {
  return (
 <div className="App">
        <Router>
        <div>
        <Route exact path='/' component={LandingPage}/>     

          <Switch>
              <Route exact path='/map' component={MapView} />
              {/* <Route exact path='/map' component={MapView} /> */}
              {/* <Route exact path='/stats' component={Contact} /> */}
              {/* <Route exact path='/add' component={} */}
          </Switch>
        </div>
      </Router>

  
    {/* <MapView/>  */}
  </div>
  );
}

export default App;