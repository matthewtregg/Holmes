import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { LandingPage} from './app/components/landingPage/landingPage';
import { MapView } from './app/containers/MapViewContainer/MapViewContainer';

function App() {
  return (
 <div className="App">
        <Router>
        <div>
        <Route exact path='/' component={LandingPage}/>     
        <Route path='/map/:add' component={MapView} />
        {/* <Route exact path='/stats' component={} />  */}
        </div>
      </Router>
  </div>
  );
}

export default App;