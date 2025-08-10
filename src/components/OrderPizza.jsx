import { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./OrderPizza.css";
import logo from "../components/images/iteration-1-images/logo.svg";

export default function OrderPizza() {
  const navigate = useNavigate();

  // Fiyat sabitleri
  const BASE_PRICE = 85.5;     // pizza taban fiyatı (tek adet)
  const TOPPING_PRICE = 5;     // topping birim fiyatı (tek adet)

  const [formData, setFormData] = useState({
    boyut: "",
    hamur: "",
    malzemeler: [],
    özel: "",
  });

  // Adet kontrolü
  const [adet, setAdet] = useState(1);

  const [hata, setHata] = useState("");

  const malzemeListesi = [
    "Mozzarella", "Sucuk", "Mantar", "Zeytin",
    "Ananas", "Tavuk ızgara", "Soğan", "Mısır",
    "Biber", "Sosis", "Pepperoni", "Sarımsak",
    "Kabak", "Domates", "Jalapeño"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      let yeni = [...formData.malzemeler];

      if (checked) {
        // Maksimum 10 kontrolü + yineleneni ekleme
        if (yeni.length >= 10) return;
        if (!yeni.includes(value)) yeni.push(value);
      } else {
        yeni = yeni.filter((m) => m !== value);
      }

      setFormData((s) => ({ ...s, malzemeler: yeni }));
    } else {
      setFormData((s) => ({ ...s, [name]: value }));
    }
  };

  const azalt = () => setAdet((a) => Math.max(1, a - 1));
  const arttir = () => setAdet((a) => a + 1);

  // Min 4 şartı yok; boyut+hamur zorunlu, max 10 topping
  const formGecerliMi =
    formData.boyut &&
    formData.hamur &&
    formData.malzemeler.length <= 10;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formGecerliMi) return;

    const payload = { ...formData, adet };

    axios
      .post("https://reqres.in/api/pizza", payload, {
        headers: { "x-api-key": "reqres-free-v1" },
      })
      .then(() => navigate("/success"))
      .catch(() => setHata("Sipariş gönderilirken bir hata oluştu."));
  };

  const secimSayaci = useMemo(
    () => `${formData.malzemeler.length} / 10`,
    [formData.malzemeler.length]
  );

  // Ara hesaplar
  const pizzaTutari = useMemo(
    () => (BASE_PRICE * adet).toFixed(2),
    [adet]
  );

  const toppingsTutari = useMemo(
    () => (formData.malzemeler.length * TOPPING_PRICE * adet).toFixed(2),
    [formData.malzemeler.length, adet]
  );

  const toplamFiyat = useMemo(() => {
    const perPizza = BASE_PRICE + formData.malzemeler.length * TOPPING_PRICE;
    const total = perPizza * adet;
    return total.toFixed(2);
  }, [formData.malzemeler.length, adet]);

  return (
    <div className="order-container">
      {/* Kırmızı alan (logo + breadcrumb) */}
      <header className="order-header">
        <div className="order-header-inner">
          <img src={logo} alt="Teknolojik Yemekler Logo" className="logo" />
          <nav className="breadcrumb breadcrumb--in-header">
            <Link to="/" className="breadcrumb-link">Anasayfa</Link> &gt; <span>Sipariş Oluştur</span>
          </nav>
        </div>
      </header>

      {/* Form */}
      <form className="order-form" onSubmit={handleSubmit}>
        <h2 className="pizza-title">Position Absolute Pizza</h2>

        <div className="pizza-info-row">
          {/* Dinamik toplam fiyat */}
          <div className="pizza-price">{toplamFiyat}₺</div>
          <div className="pizza-rating">
            <span className="star">★</span> 4.9 <span className="muted">(200)</span>
          </div>
        </div>

        <p className="pizza-description">
          Frontend Dev olarak hâlâ position:absolute kullanıyorsan bu çok acı pizza tam sana göre.
          Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak
          odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı
          buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
        </p>

        {/* Boyut (dikey) + Hamur (dropdown) aynı satır */}
        <div className="field-row">
          <div className="field field--stack">
            <label className="field-label">Boyut Seçin</label>
            <div className="radio-group radio-group--vertical">
              {["Küçük", "Orta", "Büyük"].map((boyut) => (
                <label
                  key={boyut}
                  className={`radio-chip ${formData.boyut === boyut ? "active" : ""}`}
                >
                  <input
                    type="radio"
                    name="boyut"
                    value={boyut}
                    checked={formData.boyut === boyut}
                    onChange={handleChange}
                  />
                  <span>{boyut}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="field">
            <label htmlFor="hamur" className="field-label">Hamur Kalınlığı</label>
            <select
              id="hamur"
              name="hamur"
              value={formData.hamur}
              onChange={handleChange}
              className="select-input"
            >
              <option value="" disabled>Seçiniz</option>
              <option value="İnce">İnce</option>
              <option value="Normal">Normal</option>
              <option value="Kalın Kenar">Kalın Kenar</option>
            </select>
          </div>
        </div>

        <div className="field">
          <div className="field-top">
            <label className="field-label">Malzemeler - 5 TL</label>
            <small className="helper">En fazla 10 malzeme seçebilirsiniz • {secimSayaci}</small>
          </div>

          <div className="malzemeler-grid">
            {malzemeListesi.map((m, i) => {
              const checked = formData.malzemeler.includes(m);
              return (
                <label key={`${m}-${i}`} className={`check-card ${checked ? "checked" : ""}`}>
                  <input
                    type="checkbox"
                    name="malzemeler"
                    value={m}
                    checked={checked}
                    onChange={handleChange}
                  />
                  <span className="box" />
                  <span className="text">{m}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="field">
          <label htmlFor="özel" className="field-label">Ek Not</label>
          <textarea
            id="özel"
            name="özel"
            value={formData.özel}
            onChange={handleChange}
            placeholder="Özel istek varsa giriniz"
          />
        </div>

        {hata && <p className="error-text">{hata}</p>}

        {/* 🔹 Sipariş Özeti Kutusu (butonun üstünde) */}
        <div className="summary-card">
          <div className="qty">
            <button type="button" className="qty-btn" onClick={azalt} aria-label="Azalt">−</button>
            <span className="qty-value">{adet}</span>
            <button type="button" className="qty-btn" onClick={arttir} aria-label="Arttır">+</button>
          </div>

          <div className="summary-right">
            <div className="summary-row">
              <span>Pizza Fiyatı</span>
              <span>{pizzaTutari}₺</span>
            </div>
            <div className="summary-row">
              <span>Ek Malzemeler</span>
              <span>{toppingsTutari}₺</span>
            </div>
            <div className="summary-row total-row">
              <strong>Toplam</strong>
              <strong>{toplamFiyat}₺</strong>
            </div>
          </div>
        </div>

        {/* Onay butonu */}
        <div className="submit-wrap">
          <button type="submit" disabled={!formGecerliMi} className="cta-btn">
            Siparişi Onayla
          </button>
        </div>
      </form>
    </div>
  );
}


