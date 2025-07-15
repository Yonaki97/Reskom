// pages/HalamanMeja.js
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import datameja from "../List/ListMeja";
import Popup from "../../Components/popup"; // Import komponen popup

function HalamanMeja() {
  const navigate = useNavigate();
  const [pesananAktif, setPesananAktif] = useState([]);
  const sudahAlert = useRef([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupTitle, setShowPopupTitle] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch("http://localhost:5000/pesanan")
        .then((res) => res.json())
        .then((data) => {
          const baruSiap = data.filter(
            (p) => p.status === "selesai" && !sudahAlert.current.includes(p._id)
          );

          if (baruSiap.length > 0) {
            baruSiap.forEach((p) => {
              setShowPopupTitle(`pesanan ${p.nomorMeja} telah siap`);
              setShowPopup(true);
            });

            sudahAlert.current.push(...baruSiap.map((p) => p._id));
          }
        })
        .catch((err) => {
          console.error("❌ Gagal mengambil pesanan:", err);
        });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);
useEffect(() => {
  const ambilDataPesanan = () => {
    fetch("http://localhost:5000/pesanan")
      .then((res) => res.json())
      .then((data) => {
        const mejaTerisi = data
          .filter((p) => !p.dibayar) // filter hanya yang belum dibayar
          .map((p) => p.nomorMeja); // ambil nomor mejanya saja

        setPesananAktif(mejaTerisi);
      })
      .catch((err) => console.error("Gagal mengambil data pesanan:", err));
  };

  ambilDataPesanan();
  const intervalId = setInterval(ambilDataPesanan, 2000);
  return () => clearInterval(intervalId);
}, []);


  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center p-3"
        style={{ backgroundColor: "#0E2A1D", color: "white" }}
      >
        <h5 className="fw-bold m-0 mx-auto">RESKOM </h5>
        <button onClick={handleLogout} className="btn btn-sm btn-outline-light">
          Logout
        </button>
      </div>

      {/* Konten */}
      <div className="container my-4 flex-grow-1">
        <h5 className="text-primary fw-bold mb-3">Status Meja</h5>
        <div className="row g-4 justify-content-center">
          {datameja.map((meja, index) => {
            const status = pesananAktif.includes(meja.nomor)
              ? "Terisi"
              : "Kosong";
            return (
              <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-4">
                <div
                  onClick={() => navigate(`/Menu/${meja.nomor}`)}
                  className="p-3 rounded shadow-sm text-center position-relative"
                  style={{
                    backgroundColor:
                      status === "Kosong" ? "#A8E6A3" : "#F8B3B3",
                    fontSize: "1.1rem",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.03)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <span
                    className="badge text-bg-primary position-absolute"
                    style={{
                      position: "absolute",
                      top: "6px",
                      right: "6px",
                      fontSize: "1rem",
                      padding: "5px 8px",
                      borderRadius: "999px",
                    }}
                  >
                    {meja.kapasitas}
                  </span>
                  <div>Meja {meja.nomor}</div>
                  <div>{status}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 text-center">
          <h6 className="text-primary fw-bold">Pesan Aktif</h6>
          <p className="text-muted small">
            {pesananAktif.length === 0
              ? "Tidak ada Pesanan Aktif saat ini."
              : `${pesananAktif.length} meja sedang aktif.`}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        className="text-center py-2"
        style={{ backgroundColor: "#0E2A1D", color: "white", fontSize: "13px" }}
      >
        2025 RESKOM . All rights reserved
      </div>
      {/* nampilin popup jika showPopup true */}
      {showPopup && (
        <Popup title={showPopupTitle} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}
export default HalamanMeja;