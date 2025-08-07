// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import logo from "../components/images/iteration-1-images/logo.svg";
import banner from "../components/images/iteration-1-images/home-banner.png";

export default function Home() {
  return (
    <div className="home-page">
      <img src={logo} alt="logo" className="home-logo" />
      <p className="home-slogan">KOD ACIKTIRIR<br /> PIZZA DOYURUR</p>

      <div
        className="home-banner-wrapper"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <Link to="/order-pizza">
          <button className="home-button">ACIKTIM</button>
        </Link>
      </div>
    </div>
  );
}

