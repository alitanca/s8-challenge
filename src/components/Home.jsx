import React from 'react';
import { Link } from "react-router-dom";
import logo from "/src/components/images/iteration-1-images/logo.svg";
import banner from "/src/components/images/iteration-1-images/home-banner.png";
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <img src={logo} alt="Logo" className="home-logo" />

      <div
        className="home-banner-wrapper"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <Link to="/pizza">
          <button className="home-button">ACIKTIM</button>
        </Link>
      </div>
    </div>
  );
}
