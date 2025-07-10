import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import datamenu from "../List/ListMenu";

function HalamanKoki() {
  const [tabAktif, setTabAktif] = useState("menu");
  const navigate = useNavigate();
  const [itemDiselesaikan, setItemDiselesaikan] = useState(() => {
    const saved = localStorage.getItem("itemDiselesaikan");
    return saved ? JSON.parse(saved) : {};
  });

  const [menuList, setMenuList] = useState(() => {
    const saved = localStorage.getItem("statusMenuHabis");
    if (saved) {
      return JSON.parse(saved);
    } else {
      localStorage.setItem("statusMenuHabis", JSON.stringify(datamenu));
      return datamenu;
    }
  });

  const [PesananMasuk, setPesananMasuk] = useState([]);

  useEffect(() => {
    const ambilDataPesanan = async () => {
      try {
        const res = await fetch("http://localhost:5000/pesanan");
        const data = await res.json();
        setPesananMasuk(data.filter((p) => p.status !== "selesai"));
      } catch (err) {
        console.error("gagal mengambil pesanan", err);
      }
    };

    ambilDataPesanan();
    const intervalId = setInterval(ambilDataPesanan, 2000);
    return () => clearInterval(intervalId);
  }, []);

  const toggleHabis = (index) => {
    const updatedList = [...menuList];
    updatedList[index].habis = !updatedList[index].habis;
    setMenuList(updatedList);
    localStorage.setItem("statusMenuHabis", JSON.stringify(updatedList));
  };

  const handleLogout = () => navigate("/");

  const handleSelesaikanPesanan = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/pesanan/${id}/selesai`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "selesai" }),
      });

      if (res.ok) {
        setPesananMasuk((prev) => prev.filter((p) => p._id !== id));
      } else {
        console.error("Gagal menandai pesanan sebagai selesai");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  const handleItemSelesai = async (pesananId, namaItem) => {
    try {
      const res = await fetch(`http://localhost:5000/pesanan/${pesananId}/item`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ namaItem }),
      });

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
    } catch (error) {
      console.error("Gagal menyelesaikan item:", error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: "#0E2A1D", color: "white" }}>
        <h5 className="fw-bold m-0 mx-auto">RESKOM Restaurant</h5>
        <button onClick={handleLogout} className="btn btn-sm btn-outline-light">Logout</button>
      </div>

      {/* Tabs */}
      <div className="d-flex justify-content-around py-2 border-bottom">
        <span className={tabAktif === "pesanan" ? "fw-bold" : "text-muted"} style={{ cursor: "pointer", color: "#C99D4D" }} onClick={() => setTabAktif("pesanan")}>Pesanan Masuk</span>
        <span className={tabAktif === "menu" ? "fw-bold" : "text-muted"} style={{ cursor: "pointer", color: "#C99D4D" }} onClick={() => setTabAktif("menu")}>Kelola Menu</span>
      </div>

      <div className="container my-3 flex-grow-1">
        {tabAktif === "menu" && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold" style={{ color: "#C99D4D" }}>Daftar Menu</h6>
              <button className="btn btn-success btn-sm">+ Tambah Menu</button>
            </div>

            <div className="row g-3">
              {menuList.map((menu, index) => (
                <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-6">
                  <div className="card shadow-sm h-100" style={{ fontSize: "0.85rem" }}>
                    <img src={menu.gambar} alt={menu.nama} className="card-img-top mx-auto d-block mt-3" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }} />
                    <div className="card-body px-2 py-2 d-flex flex-column justify-content-between">
                      <div>
                        <h6 className="fw-bold mb-1" style={{ color: "#C99D4D", fontSize: "0.9rem" }}>{menu.nama}</h6>
                        <p className="text-muted mb-2" style={{ fontSize: "0.75rem" }}>{menu.deskripsi}</p>
                      </div>
                      <button
                        className={`btn btn-sm ${menu.habis ? "btn-secondary" : "btn-danger"} w-100`}
                        onClick={() => toggleHabis(index)}
                        style={{ fontSize: "0.75rem" }}
                      >
                        {menu.habis ? "Tersedia" : "Tandai Habis"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tabAktif === "pesanan" && (
          <div>
            <h6 className="fw-bold text-center mb-3">📥 Daftar Pesanan Masuk</h6>
            {PesananMasuk.length === 0 ? (
              <p className="text-muted text-center">Belum ada pesanan masuk.</p>
            ) : (
              PesananMasuk.map((pesanan, idx) => {
                const semuaHabis = pesanan.items.every((item) => item.jumlah <= 0);
                return (
                  <div key={idx} className="mb-3 p-3 border rounded shadow-sm bg-white">
                    <h6 className="fw-bold" style={{ color: "#C99D4D" }}>Meja {pesanan.nomorMeja}</h6>
                    <ul className="mb-0">
                      {pesanan.items.map((item, i) => (
                        <div key={i} className="d-flex justify-content-between align-items-center mb-1">
                          <span className="text-muted small">{item.jumlah}x {item.nama}</span>
                          <button
                            className={`btn btn-sm ${
                              itemDiselesaikan[`${pesanan._id}_${item.nama}`] || item.jumlah <= 0
                                ? "btn-secondary"
                                : "btn-success"
                            }`}
                            onClick={() => handleItemSelesai(pesanan._id, item.nama)}
                            disabled={itemDiselesaikan[`${pesanan._id}_${item.nama}`] || item.jumlah <= 0}
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
          </div>
        )}
      </div>

      <footer className="text-center text-white py-2" style={{ backgroundColor: "#0E2A1D", fontSize: "13px" }}>
        2025 RESKOM Restaurant. All rights reserved
      </footer>
    </div>
  );
}

export default HalamanKoki;
