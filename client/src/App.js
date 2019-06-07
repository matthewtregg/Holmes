import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { LandingPage} from './app/components/landingPage/landingPage';
import { MapView } from './app/containers/MapViewContainer/MapViewContainer';
import { AddView } from './app/containers/AddViewContainer';

function App() {
  return (
 <div className="App">
        <Router>
        <div>
        <Route exact path='/' component={LandingPage}/>     
        <Route exact path='/map' component={MapView} />
        <Route exact path='/add' component={AddView} /> 
        {/* <Route exact path='/stats' component={} />  */}
        </div>
      </Router>
  </div>
  );
}

export default App;