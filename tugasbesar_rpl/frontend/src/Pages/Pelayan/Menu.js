import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Popup from "../../Components/popup"; // Import komponen popup

function HalamanMenu() {
  const { nomorMeja } = useParams();
  const navigate = useNavigate();
  const [keranjang, setKeranjang] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupTitle, setShowPopupTitle] = useState(false);
  const [kategoriAktif, setKategoriAktif] = useState("Semua");
  const [daftarMenu, setDaftarMenu] = useState([]);
useEffect(() => {
  const loadMenu = async () => {
    try {
      const res = await fetch("http://localhost:5000/menu");
      const data = await res.json();
      const statushabis = JSON.parse(localStorage.getItem("statusMenuHabis")) || [];

      const merged = data.map((menu) => {
        const found = statushabis.find((m) => m.nama === menu.nama);
        return { ...menu, habis: found?.habis || false };
      });

      setDaftarMenu(merged);
    } catch (err) {
      console.error("Gagal mengambil menu dari server", err);
    }
  };

  // Load awal
  loadMenu();

  // Sync localStorage setiap 2 detik
  const interval = setInterval(loadMenu, 2000);

  // Event listener untuk perubahan di tab lain
  const handleStorageChange = (event) => {
    if (event.key === "statusMenuHabis") {
      loadMenu();
    }
  };
  window.addEventListener("storage", handleStorageChange);

  return () => {
    clearInterval(interval);
    window.removeEventListener("storage", handleStorageChange);
  };
}, []);

  const tambahKeKeranjang = (menu) => {
    const itemBaru = { nama: menu.nama, jumlah: 1, harga: menu.harga };

    setKeranjang((prev) =>
      prev.some((item) => item.nama === menu.nama)
        ? prev.map((item) =>
            item.nama === menu.nama
              ? { ...item, jumlah: item.jumlah + 1 }
              : item
          )
        : [...prev, itemBaru]
    );
  };

  const kurangiItem = (namaMenu) => {
    setKeranjang((prev) =>
      prev
        .map((item) =>
          item.nama === namaMenu ? { ...item, jumlah: item.jumlah - 1 } : item
        )
        .filter((item) => item.jumlah > 0)
    );
  };

  const konfirmasiPesanan = async () => {
    try {
      const dataToSend = {
        nomorMeja: parseInt(nomorMeja),
        items: keranjang,
      };

      console.log("Mengirim ke server:", dataToSend);

      const response = await fetch("http://localhost:5000/pesanan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error("gagal mengirim");

      const data = await response.json();
      setShowPopupTitle("pesanan berhasil dikirim");
      setShowPopup(true);
      setKeranjang([]);
      setTimeout(() => {
        navigate("/meja");
      }, 1000); // setelah 1 detik
    } catch (error) {
      alert("Gagal mengirim pesanan!");
      console.error(error);
    }
  };

const kategoriUnik = [
  "Semua",
  ...new Set(
    daftarMenu
      .map((menu) => menu.kategori)
      .filter((kategori) => kategori && kategori.trim() !== "")
  ),
];


  const menuTampil =
    kategoriAktif === "Semua"
      ? daftarMenu
      : daftarMenu.filter((menu) => menu.kategori === kategoriAktif);

  return (
    <div
      className="container-fluid min-vh-100 d-flex flex-column justify-content-between p-0"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      {/* Header */}
      <div
        className="text-center py-3"
        style={{ backgroundColor: "#0E2A1D", color: "white" }}
      >
        <h5 className="m-0 fw-bold">Pesan Menu - Meja {nomorMeja}</h5>
      </div>

      {/* Kategori */}
      <div className="d-flex justify-content-center my-3 gap-2 flex-wrap">
        {kategoriUnik.map((kategori, idx) => (
          <button
            key={idx}
            className="btn btn-sm rounded-pill"
            style={{
              backgroundColor:
                kategoriAktif === kategori ? "#C99D4D" : "transparent",
              color: kategoriAktif === kategori ? "white" : "#0E2A1D",
              border: `1px solid ${
                kategoriAktif === kategori ? "#C99D4D" : "#0E2A1D"
              }`,
            }}
            onClick={() => setKategoriAktif(kategori)}
          >
            {kategori}
          </button>
        ))}
      </div>

      {/* Konten */}
      <div className="container flex-grow-1">
        <div className="row g-4">
          {menuTampil.map((menu, idx) => (
            <div key={idx} className="col-4">
              <div className="card shadow-sm">
                <img
                  src={menu.gambar}
                  className="card-img-top img-fluid rounded mx-auto d-block"
                  alt={menu.nama}
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <h4 className="card-title fw-bold">{menu.nama}</h4>
                  <h6 className="card-text">
                    Rp. {menu.harga.toLocaleString("id-ID")}
                  </h6>
                  <p
                    className="card-text text-muted small"
                    style={{
                      minHeight: "60px",
                      overflow: "hidden",
                    }}
                  >
                    {menu.deskripsi}
                  </p>

                  <button
                    className="btn w-100"
                    style={{
                      backgroundColor: menu.habis ? "gray" : "#C99D4D",
                      color: "white",
                      cursor: menu.habis ? "not-allowed" : "pointer",
                    }}
                    onClick={() => tambahKeKeranjang(menu)}
                    disabled={menu.habis}
                  >
                    {menu.habis ? "Habis" : "Tambah ke Pesanan"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Keranjang */}
        {keranjang.length > 0 && (
          <div className="mt-5">
            <h6 className="fw-bold">🧾 Konfirmasi Pesanan</h6>
            <div className="card p-3 shadow-sm" style={{ maxWidth: "400px" }}>
              <ul className="list-group list-group-flush">
                {keranjang.map((item, idx) => (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="fw-semibold">{item.nama}</div>
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge bg-primary rounded-pill px-3">
                        {item.jumlah}
                      </span>
                      <button
                        className="btn btn-danger"
                        onClick={() => kurangiItem(item.nama)}
                      >
                        -
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="text-center mt-3">
                <button className="btn btn-success" onClick={konfirmasiPesanan}>
                  Konfirmasi Pesanan
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Kembali */}
        <div className="text-center mt-5">
          <button
            onClick={() => navigate("/meja")}
            className="btn btn-outline-secondary px-4 py-2 rounded-pill"
          >
            Kembali ke Meja
          </button>
        </div>
      </div>

      {/* Footer */}
      <div
        className="text-center py-2"
        style={{ backgroundColor: "#0E2A1D", color: "white", fontSize: "13px" }}
      >
        2025 RESKOM . All rights reserved
      </div>

      {/* Tampilkan popup jika showPopup true */}
      {showPopup && (
        <Popup title={showPopupTitle} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}

export default HalamanMenu;
