
import React from 'react';
import Sherlock from '../../assets/sherlock2.png';
import {Link } from 'react-router-dom';

export const LandingPage = () => {

  return (
    <div>
    <img src={Sherlock} alt='Sherlock Icon'/>
    <ul className="navbar-nav mr-auto">
            <li><Link to={'/map'} className="nav-link"> Uk Crime Map  </Link></li>
            <li><Link to={'/stats'} className="nav-link">Visualise Crime Stats</Link></li>
            <li><Link to={'/add'} className="nav-link">Report a Crime</Link></li> 
    </ul>
    </div>
  );

}