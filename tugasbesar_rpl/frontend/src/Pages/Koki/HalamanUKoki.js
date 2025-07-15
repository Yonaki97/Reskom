import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import datamenu from "../List/ListMenu";
import Popup from "../../Components/popup"; // Import komponen popup

function HalamanKoki() {
  const navigate = useNavigate();
  const [tabAktif, setTabAktif] = useState("menu");
  const [PesananMasuk, setPesananMasuk] = useState([]);
  const [showFormTambahMenu, setShowFormTambahMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");


  const [itemDiselesaikan, setItemDiselesaikan] = useState(() => {
    const saved = localStorage.getItem("itemDiselesaikan");
    return saved ? JSON.parse(saved) : {};
  });

  const [menuList, setMenuList] = useState(() => {
    const saved = localStorage.getItem("statusMenuHabis");
    if (saved) return JSON.parse(saved);
    localStorage.setItem("statusMenuHabis", JSON.stringify(datamenu));
    return datamenu;
  });

  useEffect(() => {
  if (showPopup) {
    const timer = setTimeout(() => setShowPopup(false), 2000);
    return () => clearTimeout(timer);
  }
}, [showPopup]);

  useEffect(() => {
    const ambilDataPesanan = async () => {
      try {
        const res = await fetch("http://localhost:5000/pesanan");
        const data = await res.json();
        setPesananMasuk(
          data.filter((p) => !["selesai", "dibayar"].includes(p.status))
        );
      } catch (err) {
        console.error("Gagal mengambil pesanan", err);
      }
    };

    ambilDataPesanan();
    const intervalId = setInterval(ambilDataPesanan, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleHabis = (index) => {
    const updated = [...menuList];
    updated[index].habis = !updated[index].habis;
    setMenuList(updated);
    localStorage.setItem("statusMenuHabis", JSON.stringify(updated));
  };

  const handleLogout = () => navigate("/");

  const handleSelesaikanPesanan = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/pesanan/${id}/selesai`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "selesai" }),
      });

      if (res.ok) {
        setPesananMasuk((prev) => prev.filter((p) => p._id !== id));
      } else {
        console.error("Gagal menandai pesanan sebagai selesai");
      }
    } catch (err) {
      console.error("Terjadi kesalahan:", err);
    }
  };

  const handleItemSelesai = async (pesananId, namaItem) => {
    try {
      const res = await fetch(
        `http://localhost:5000/pesanan/${pesananId}/item`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ namaItem }),
        }
      );

      if (res.ok) {
        setPesananMasuk((prev) =>
          prev.map((p) =>
            p._id === pesananId
              ? {
                  ...p,
                  items: p.items.map((item) =>
                    item.nama === namaItem && item.jumlah > 0
                      ? { ...item, jumlah: item.jumlah - 1 }
                      : item
                  ),
                }
              : p
          )
        );
        setItemDiselesaikan((prev) => {
          const updated = { ...prev, [`${pesananId}_${namaItem}`]: true };
          localStorage.setItem("itemDiselesaikan", JSON.stringify(updated));
          return updated;
        });
      }
    } catch (err) {
      console.error("Gagal menyelesaikan item:", err);
    }
  };

  const renderMenuTab = () => (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold" style={{ color: "#C99D4D" }}>
          Daftar Menu
        </h6>
        <button
          className="btn btn-success btn-sm"
          onClick={() => setShowFormTambahMenu(true)}
        >
          + Tambah Menu
        </button>
      </div>

      <div className="row g-3">
        {menuList.map((menu, index) => (
          <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-6">
            <div className="card shadow-sm h-100">
              <img
                src={menu.gambar}
                alt={menu.nama}
                className="card-img-top mx-auto d-block mt-3 img-fluid"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <div className="card-body px-2 py-2 d-flex flex-column justify-content-between">
                <div>
                  <h6 className="fw-bold mb-1" style={{ color: "#C99D4D" }}>
                    {menu.nama}
                  </h6>
                  <p
                    className="text-muted mb-2"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {menu.deskripsi}
                  </p>
                </div>
                <button
                  className={`btn btn-sm ${
                    menu.habis ? "btn-secondary" : "btn-danger"
                  } w-100`}
                  onClick={() => toggleHabis(index)}
                >
                  {menu.habis ? "Tersedia" : "Tandai Habis"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderPesananTab = () => (
    <>
      <h6 className="fw-bold text-center mb-3">📥 Daftar Pesanan Masuk</h6>
      {PesananMasuk.length === 0 ? (
        <p className="text-muted text-center">Belum ada pesanan masuk.</p>
      ) : (
        PesananMasuk.map((pesanan, idx) => {
          const semuaHabis = pesanan.items.every((item) => item.jumlah <= 0);
          return (
            <div
              key={idx}
              className="mb-3 p-3 border rounded shadow-sm bg-white"
            >
              <h6 className="fw-bold" style={{ color: "#C99D4D" }}>
                Meja {pesanan.nomorMeja}
              </h6>
              <ul className="mb-0">
                {pesanan.items.map((item, i) => (
                  <div
                    key={i}
                    className="d-flex justify-content-between align-items-center mb-1"
                  >
                    <span className="text-muted small">
                      {item.jumlah}x {item.nama}
                    </span>
                    <button
                      className={`btn btn-sm ${
                        itemDiselesaikan[`${pesanan._id}_${item.nama}`] ||
                        item.jumlah <= 0
                          ? "btn-secondary"
                          : "btn-success"
                      }`}
                      onClick={() => handleItemSelesai(pesanan._id, item.nama)}
                      disabled={
                        itemDiselesaikan[`${pesanan._id}_${item.nama}`] ||
                        item.jumlah <= 0
                      }
                    >
                      ✓
                    </button>
                  </div>
                ))}
              </ul>
              {!semuaHabis && (
                <div className="d-flex justify-content-end mt-3">
                  <button
                    className="btn btn-success"
                    onClick={() => handleSelesaikanPesanan(pesanan._id)}
                  >
                    Selesai
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}
    </>
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <div
        className="d-flex justify-content-between align-items-center p-3"
        style={{ backgroundColor: "#0E2A1D", color: "white" }}
      >
        <h5 className="fw-bold m-0 mx-auto">RESKOM </h5>
        <button onClick={handleLogout} className="btn btn-sm btn-outline-light">
          Logout
        </button>
      </div>

      <div className="d-flex justify-content-around py-2 border-bottom">
        <span
          className={tabAktif === "pesanan" ? "fw-bold" : "text-muted"}
          style={{ cursor: "pointer", color: "#C99D4D" }}
          onClick={() => setTabAktif("pesanan")}
        >
          Pesanan Masuk
        </span>
        <span
          className={tabAktif === "menu" ? "fw-bold" : "text-muted"}
          style={{ cursor: "pointer", color: "#C99D4D" }}
          onClick={() => setTabAktif("menu")}
        >
          Kelola Menu
        </span>
      </div>

      <div className="container my-3 flex-grow-1">
        {tabAktif === "menu" ? renderMenuTab() : renderPesananTab()}
      </div>

      <footer
        className="text-center text-white py-2"
        style={{ backgroundColor: "#0E2A1D", fontSize: "13px" }}
      >
        2025 RESKOM . All rights reserved
      </footer>
      {showFormTambahMenu && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData();
                  formData.append("nama", e.target.nama.value);
                  formData.append("harga", e.target.harga.value);
                  formData.append("deskripsi", e.target.deskripsi.value);
                  formData.append("kategori", e.target.kategori.value);
                  formData.append("gambar", e.target.gambar.files[0]); // File dari input file

                  try {
                    const res = await fetch(
                      "http://localhost:5000/menu",
                      {
                        method: "POST",
                        body: formData,
                      }
                    );

                    if (res.ok) {
                      const dataBaru = await res.json(); // { nama, gambar, ... }
                      const savedMenu = [...menuList, dataBaru];
                      setMenuList(savedMenu);
                      localStorage.setItem(
                        "statusMenuHabis",
                        JSON.stringify(savedMenu)
                      );
                        // 👇 Tambahkan ini
  setPopupTitle("Tambahan menu berhasil!");
  setShowPopup(true);
                      setShowFormTambahMenu(false);
                    } else {
                      alert("Gagal menambahkan menu.");
                    }
                  } catch (err) {
                    console.error("Error tambah menu:", err);
                  }
                }}
              >
                <div className="modal-header">
                  <h5 className="modal-title">Tambah Menu Baru</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowFormTambahMenu(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nama Menu</label>
                    <input
                      type="text"
                      name="nama"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Harga</label>
                    <input
                      type="number"
                      name="harga"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <textarea
                      name="deskripsi"
                      className="form-control"
                      rows="2"
                    />
                    <div className="mb-3">
  <label className="form-label">Kategori</label>
  <select name="kategori" className="form-control" required>
    <option value="">Pilih Kategori</option>
    <option value="makanan">Makanan</option>
    <option value="minuman">Minuman</option>
  </select>
</div>

                  </div>
                  <div className="mb-3">
                    <label className="form-label">URL Gambar</label>
                    <input
                      type="file"
                      name="gambar"
                      className="form-control"
                      accept="image/*"
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">
                    Simpan
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowFormTambahMenu(false)}
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
      )}
      {/* Tampilkan popup jika showPopup true */}
      {showPopup && (
        <Popup title={popupTitle} onClose={() => setShowPopup(false)} />
      )}
    </div>
    
  );
}

export default HalamanKoki;
