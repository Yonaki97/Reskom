import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HalamanKasir() {
  const navigate = useNavigate();
  const [tabAktif, setTabAktif] = useState("pesanan");
  const [dataPesanan, setDataPesanan] = useState([]);

  useEffect(() => {
    const ambilPesanan = async () => {
      try {
        const res = await fetch("http://localhost:5000/pesanan");
        const data = await res.json();
        setDataPesanan(data);
      } catch (err) {
        console.error("Gagal mengambil data pesanan", err);
      }
    };

    ambilPesanan();
    const interval = setInterval(ambilPesanan, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  // Pisahkan pesanan berdasarkan status
  const pesananBelumLunas = dataPesanan.filter(p => !p.dibayar);
  const pesananLunas = dataPesanan.filter(p => p.dibayar);

  // Hitung total pendapatan
  const totalPendapatanHariIni = () => {
    const today = new Date().toISOString().split("T")[0];
    return pesananLunas
      .filter(p => p.tanggal?.startsWith(today))
      .reduce((acc, cur) => acc + (cur.total || 0), 0);
  };

  const totalPendapatan = pesananLunas.reduce(
    (acc, cur) => acc + (cur.total || 0),
    0
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center p-3"
        style={{ backgroundColor: "#0E2A1D", color: "white" }}
      >
        <h5 className="fw-bold m-0 mx-auto">RESKOM Restaurant</h5>
        <button onClick={handleLogout} className="btn btn-sm btn-outline-light">
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="d-flex justify-content-around py-2 border-bottom">
        <span
          className={tabAktif === "pesanan" ? "fw-bold" : "text-muted"}
          style={{ cursor: "pointer", color: "#C99D4D" }}
          onClick={() => setTabAktif("pesanan")}
        >
          Pesanan Masuk
        </span>
        <span
          className={tabAktif === "riwayat" ? "fw-bold" : "text-muted"}
          style={{ cursor: "pointer", color: "#C99D4D" }}
          onClick={() => setTabAktif("riwayat")}
        >
          Riwayat Transaksi
        </span>
      </div>

      <main className="flex-grow-1 px-3 py-4">
        {tabAktif === "pesanan" && (
          <>
            {/* Ringkasan */}
            <section>
              <h5 className="fw-bold mb-3" style={{color:"#C99D4D"}}>Ringkasan Pendapatan</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="card shadow-sm p-3">
                    <p className="mb-1">Pendapatan Hari Ini</p>
                    <h4 className="text-dark fw-bold">
                      Rp {totalPendapatanHariIni().toLocaleString()}
                    </h4>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card shadow-sm p-3">
                    <p className="mb-1">Total Pendapatan (Per bulan)</p>
                    <h4 className="text-dark fw-bold">
                      Rp {totalPendapatan.toLocaleString()}
                    </h4>
                  </div>
                </div>
              </div>
            </section>

            {/* Pesanan Belum Lunas */}
            <section className="mt-4">
              <h6 className="fw-bold" style={{color:"#C99D4D"}}>
                Pesanan Perlu Diproses Pembayaran
              </h6>
              {pesananBelumLunas.length === 0 ? (
                <p className="text-muted">
                  Tidak ada pesanan yang perlu diproses pembayarannya.
                </p>
              ) : (
                pesananBelumLunas.map((pesanan, idx) => (
                  <div
                    key={idx}
                    className="p-3 mb-3 border rounded shadow-sm bg-white"
                  >
                    <h6 className="fw-bold text-dark">
                      Meja {pesanan.nomorMeja}
                    </h6>
                    <ul className="mb-1">
                      {pesanan.items.map((item, i) => (
                        <li key={i} className="small text-muted">
                          {item.jumlah}x {item.nama}
                        </li>
                      ))}
                    </ul>
                    <p className="fw-bold text-dark">
                      Total: Rp {pesanan.total?.toLocaleString() || 0}
                    </p>
                    <button className="btn btn-sm" 
                    style={{backgroundColor:"#C99D4D",
                      color: "white",
                    }}>
                      
                      Proses Pembayaran
                    </button>
                  </div>
                ))
              )}
            </section>
          </>
        )}

        {tabAktif === "riwayat" && (
          <section>
            <h6 className="fw-bold " style={{color:"#C99D4D"}}>Riwayat Transaksi (Lunas)</h6>
            {pesananLunas.length === 0 ? (
              <p className="text-muted">Belum ada transaksi lunas.</p>
            ) : (
              pesananLunas.map((transaksi, idx) => (
                <div
                  key={idx}
                  className="p-3 mb-3 border rounded shadow-sm bg-white"
                >
                  <h6 className="fw-bold">Meja {transaksi.nomorMeja}</h6>
                  <ul className="mb-1">
                    {transaksi.items.map((item, i) => (
                      <li key={i} className="small text-muted">
                        {item.jumlah}x {item.nama}
                      </li>
                    ))}
                  </ul>
                  <p className="text-dark fw-bold">
                    Total: Rp {transaksi.total?.toLocaleString() || 0}
                  </p>
                  <p className="text-muted small">
                    Tanggal: {transaksi.tanggal || "-"}
                  </p>
                </div>
              ))
            )}
          </section>
        )}
      </main>

      {/* Footer */}
      <footer
        className="text-center text-white py-2"
        style={{ backgroundColor: "#0E2A1D", fontSize: "13px" }}
      >
        2025 RESKOM Restaurant. All rights reserved
      </footer>
    </div>
  );
}

export default HalamanKasir;
