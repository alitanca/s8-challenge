import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OrderPizza.css";
import logo from "../components/images/iteration-1-images/logo.svg";

export default function OrderPizza() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    boyut: "",
    malzemeler: [],
    özel: "",
  });
  const [hata, setHata] = useState("");

  const malzemeListesi = [
    "Mozzarella", "Sucuk", "Mantar", "Zeytin",
    "Ananas", "Tavuk", "Soğan", "Mısır",
    "Biber", "Sosis"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let yeni = [...formData.malzemeler];
      checked ? yeni.push(value) : (yeni = yeni.filter((m) => m !== value));
      setFormData({ ...formData, malzemeler: yeni });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const formGecerliMi =
    formData.boyut &&
    formData.malzemeler.length >= 4 &&
    formData.malzemeler.length <= 10;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formGecerliMi) return;

    axios
      .post("https://reqres.in/api/pizza", formData, {
        headers: {
          "x-api-key": "reqres-free-v1"
        }
      })
      .then(() => navigate("/success"))
      .catch(() => setHata("Sipariş gönderilirken bir hata oluştu."));
  };

  return (
    <>
      <header className="order-header">
        <img src={logo} alt="Teknolojik Yemekler Logo" />
      </header>

      <form className="order-form" onSubmit={handleSubmit}>
        <h2>Position Absolute Pizza</h2>

        <div className="pizza-info-row">
          <div className="pizza-price">85.50₺</div>
          <div className="pizza-rating">⭐ 4.9 (200)</div>
        </div>

        <p className="pizza-description">
          Frontend Dev olarak hâlâ position:absolute kullanıyorsan bu çok acı pizza tam sana göre.
          Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. Küçük bir pizzaya bazen pizzetta denir.
        </p>

        <label>Boyut Seçin:</label>
        <div className="radio-group">
          {["Küçük", "Orta", "Büyük"].map((boyut) => (
            <label key={boyut}>
              <input
                type="radio"
                name="boyut"
                value={boyut}
                checked={formData.boyut === boyut}
                onChange={handleChange}
              />
              {boyut}
            </label>
          ))}
        </div>

        <label>Malzemeler (4–10 seçin):</label>
        <div className="malzemeler-grid">
          {malzemeListesi.map((m) => (
            <label key={m}>
              <input
                type="checkbox"
                name="malzemeler"
                value={m}
                checked={formData.malzemeler.includes(m)}
                onChange={handleChange}
              />
              {m}
            </label>
          ))}
        </div>

        <label htmlFor="özel">
          Ek Not:
          <textarea
            id="özel"
            name="özel"
            value={formData.özel}
            onChange={handleChange}
            placeholder="Özel istek varsa giriniz"
          />
        </label>

        {hata && <p className="error-text">{hata}</p>}

        <button type="submit" disabled={!formGecerliMi}>
          Sipariş Ver
        </button>
      </form>
    </>
  );
}
