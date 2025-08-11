import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";


import logo from "../components/images/iteration-1-images/logo.svg";


import heroPizza from "../components/images/iteration-1-images/home-banner.png";


import ico1 from "../components/images/iteration-2-images/icons/1.svg";
import ico2 from "../components/images/iteration-2-images/icons/2.svg";
import ico3 from "../components/images/iteration-2-images/icons/3.svg";
import ico4 from "../components/images/iteration-2-images/icons/4.svg";
import ico5 from "../components/images/iteration-2-images/icons/5.svg";
import ico6 from "../components/images/iteration-2-images/icons/6.svg";


import kart1 from "../components/images/iteration-2-images/cta/kart-1.png";
import kart2 from "../components/images/iteration-2-images/cta/kart-2.png";
import kart3 from "../components/images/iteration-2-images/cta/kart-3.png";


import food1 from "../components/images/iteration-2-images/pictures/food-1.png";
import food2 from "../components/images/iteration-2-images/pictures/food-2.png";
import food3 from "../components/images/iteration-2-images/pictures/food-3.png";


import logoFooter from "../components/images/iteration-2-images/logo-footer.svg";
import iconPhone from "../components/images/iteration-2-images/footer/icons/icon-1.png";
import iconMail from "../components/images/iteration-2-images/footer/icons/icon-2.png";
import iconMap from "../components/images/iteration-2-images/footer/icons/icon-3.png";
import ig0 from "../components/images/iteration-2-images/footer/insta/li-0.png";
import ig1 from "../components/images/iteration-2-images/footer/insta/li-1.png";
import ig2 from "../components/images/iteration-2-images/footer/insta/li-2.png";
import ig3 from "../components/images/iteration-2-images/footer/insta/li-3.png";
import ig4 from "../components/images/iteration-2-images/footer/insta/li-4.png";
import ig5 from "../components/images/iteration-2-images/footer/insta/li-5.png";

export default function Home() {
  return (
    <div className="home">

      <section className="hero">
        <div className="hero-inner">
          <img src={logo} className="hero-logo" alt="Teknolojik Yemekler" />
          <h1 className="hero-title">
            <span className="sub">fırsatı kaçırma</span>
            KOD ACIKTIRIR
            <br />
            PIZZA, DOYURUR
          </h1>
          <Link to="/order-pizza" className="hero-cta">ACIKTIM</Link>
        </div>
        <img src={heroPizza} className="hero-pizza" alt="" aria-hidden="true" />
      </section>


      <section className="cats">
        <div className="container cats-row">
          <button className="cat-pill"><img src={ico1} alt="" /><span>YENİ! Kore</span></button>
          <button className="cat-pill"><img src={ico2} alt="" /><span>Pizza</span></button>
          <button className="cat-pill"><img src={ico3} alt="" /><span>Burger</span></button>
          <button className="cat-pill"><img src={ico4} alt="" /><span>Kızartmalar</span></button>
          <button className="cat-pill"><img src={ico5} alt="" /><span>Fast food</span></button>
          <button className="cat-pill"><img src={ico6} alt="" /><span>Gazlı içecek</span></button>
        </div>
      </section>

      <section className="promos">
        <div className="container promos-grid">
          <Link to="/order-pizza" className="promo promo-big">
            <div className="promo-copy">
              <h3>Özel<br />Lezzetus</h3>
              <p>Position Absolute Pizza</p>
              <span className="promo-btn">SİPARİŞ VER</span>
            </div>
            <img src={kart1} alt="" className="promo-img--left" />
          </Link>

          <div className="promo-stack">
            <div className="promo promo-dark">
              <div className="promo-copy">
                <h4>Hackathlon Burger Menü</h4>
                <span className="promo-btn">SİPARİŞ VER</span>
              </div>
              <img src={kart2} alt="" className="promo-img" />
           </div>

            <Link to="/order-pizza" className="promo promo-beige">
              <div className="promo-copy">
                <h4>Çoooook hızlı<br />npm gibi kurye</h4>
                <span className="promo-btn">SİPARİŞ VER</span>
              </div>
              <img src={kart3} alt="" className="promo-img" />
            </Link>
          </div>
        </div>
      </section>


      <section className="popular">
        <div className="container">
          <p className="popular-eyebrow">en çok paketlenen menüler</p>
          <h2 className="popular-title">Acıktıran Kodlara Doyuran Lezzetler</h2>

          <div className="popular-cats">
            <button className="chip">Ramen</button>
            <button className="chip chip--active">Pizza</button>
            <button className="chip">Burger</button>
            <button className="chip">French fries</button>
            <button className="chip">Fast food</button>
            <button className="chip">Soft drinks</button>
          </div>

          <div className="cards">
            <div className="card">
              <div className="card-media">
                <img src={food1} alt="Terminal Pizza" />
              </div>
              <div className="card-body">
                <h3>Terminal Pizza</h3>
                <div className="meta">
                  <span>4.9</span>
                  <span>(200)</span>
                  <span className="price">60₺</span>
                </div>
              </div>
            </div>

            <Link to="/order-pizza" className="card">
              <div className="card-media">
                <img src={food2} alt="Position Absolute Acı Pizza" />
              </div>
              <div className="card-body">
                <h3>Position Absolute Acı Pizza</h3>
              <div className="meta">
                <span>4.9</span>
                <span>(828)</span>
                <span className="price">85₺</span>
              </div>
              </div>
            </Link>


            <div className="card">
              <div className="card-media">
                <img src={food3} alt="useEffect Tavuklu Burger" />
              </div>
              <div className="card-body">
                <h3>useEffect Tavuklu Burger</h3>
                <div className="meta">
                  <span>4.9</span>
                  <span>(462)</span>
                  <span className="price">75₺</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="f-brand">
            <img src={logoFooter} className="footer-logo" alt="Teknolojik Yemekler" />
            <ul className="contact-list">
              <li><img src={iconMap} alt="" /> 341 Londonderry Road, İstanbul Türkiye</li>
              <li><img src={iconMail} alt="" /> aciktim@teknolojikyemekler.com</li>
              <li><img src={iconPhone} alt="" /> +90 216 123 45 67</li>
            </ul>
          </div>

          <div className="f-links">
            <h4>Sıcacık Menüler</h4>
            <ul>
              <li>Terminal Pizza</li>
              <li>5 Kişilik Hackathlon Pizza</li>
              <li>useEffect Tavuklu Pizza</li>
              <li>Beyaz Console Frosty</li>
              <li>Tester Gözlü Mutlu Burger</li>
              <li>Position Absolute Acı Burger</li>
            </ul>
          </div>

          <div className="f-ig">
            <h4>Instagram</h4>
            <div className="ig-grid">
              <img src={ig0} alt="" />
              <img src={ig1} alt="" />
              <img src={ig2} alt="" />
              <img src={ig3} alt="" />
              <img src={ig4} alt="" />
              <img src={ig5} alt="" />
            </div>
          </div>
        </div>
        <div className="f-bottom">© 2023 Teknolojik Yemekler.</div>
      </footer>
    </div>
  );
}
