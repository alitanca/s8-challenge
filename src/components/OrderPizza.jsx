import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./OrderPizza.css";
import logo from "/src/components/images/iteration-1-images/logo.svg";



export default function OrderPizza() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    isim: "",
    boyut: "",
    malzemeler: [],
    özel: ""
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
    formData.isim.length >= 3 &&
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
      .then((res) => {
        console.log("Sipariş Yanıtı:", res.data);
        navigate("/success");
      })
      .catch((err) => {
        console.error("Hata:", err);
        setHata("Sipariş gönderilirken bir hata oluştu.");
      });
  };

  return (
    <form className="order-form red-theme" onSubmit={handleSubmit}>
      <div className="logo-container">
        <img src={logo} alt="Teknolojik Yemekler Logo" />
      </div>

      <h2>Pizza Siparişini Hazırla</h2>

      <label htmlFor="isim">
        İsim:
        <input
          id="isim"
          type="text"
          name="isim"
          value={formData.isim}
          onChange={handleChange}
          placeholder="Adınızı yazın"
        />
        {formData.isim.length > 0 && formData.isim.length < 3 && (
          <p className="error-text">En az 3 karakter gerekli.</p>
        )}
      </label>

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
      {formData.malzemeler.length < 4 && (
        <p className="error-text">En az 4 malzeme seçmelisiniz.</p>
      )}
      {formData.malzemeler.length > 10 && (
        <p className="error-text">En fazla 10 malzeme seçebilirsiniz.</p>
      )}

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
  );
}