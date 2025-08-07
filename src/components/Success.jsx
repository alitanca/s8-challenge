// src/components/Success.jsx
import { Link } from "react-router-dom";
import './Success.css';

export default function Success() {
  return (
    <div className="success-container">
      <h2 className="success-title">Tebrikler!</h2>
      <p className="success-desc">Siparişiniz başarıyla alınmıştır.</p>
      <Link to="/">
        <button className="success-button">Ana Sayfa</button>
      </Link>
    </div>
  );
}

