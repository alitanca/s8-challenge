import { Link, useLocation } from "react-router-dom";
import "./Success.css";
import logo from "../components/images/iteration-1-images/logo.svg"; 

export default function Success() {
  const { state } = useLocation();

  const urunAdi    = state?.urunAdi ?? "Position Absolute Acı Pizza";
  const boyut      = state?.boyut ?? "-";
  const hamur      = state?.hamur ?? "-";
  const malzemeler = state?.malzemeler ?? [];
  const adet       = state?.adet ?? 1;
  const secimlerT  = state?.fiyatlar?.toppingsTutari ?? "0.00";
  const toplamT    = state?.fiyatlar?.toplamFiyat ?? "0.00";

  return (
    <div className="success-wrap">
      <div className="success-inner">
        <img src={logo} alt="Teknolojik Yemekler Logo" className="success-logo" />

        <div className="headline">
          <div className="eyebrow">lezzetin yolda</div>
          <h1 className="title">SİPARİŞ ALINDI</h1>
        </div>

        <hr className="divider" />

        <h2 className="product">{urunAdi}</h2>

        <div className="details">
          <p><span className="label">Boyut:</span> {boyut}</p>
          <p><span className="label">Hamur:</span> {hamur}</p>
          <p>
            <span className="label">Ek Malzemeler:</span>
            {malzemeler.length ? malzemeler.join(", ") : "-"}
          </p>
          <p><span className="label">Adet:</span> {adet}</p>
        </div>

        <div className="summary">
          <h3>Sipariş Toplamı</h3>
          <div className="row">
            <span>Seçimler</span>
            <span>{secimlerT}₺</span>
          </div>
          <div className="row total">
            <span>Toplam</span>
            <span>{toplamT}₺</span>
          </div>
        </div>

        <Link to="/" className="home-link">Ana sayfa</Link>
      </div>
    </div>
  );
}
