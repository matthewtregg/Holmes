
import React from 'react';
import Sherlock from '../../assets/sherlock2.png';
import {Link } from 'react-router-dom';

export const LandingPage = () => {

  return (
    <div>
    <img src={Sherlock} alt='Sherlock Icon'/>
    <ul className="navbar-nav mr-auto">
            <div><Link to={'/map/search'} className="nav-link"> Uk Crime Map  </Link></div>
            <div><Link to={'/map/statistics'} className="nav-link">Visualise Crime Stats</Link></div>
            <div><Link to={'/map/add'} className="nav-link">Report a Crime</Link></div> 
    </ul>
    </div>
  );

}