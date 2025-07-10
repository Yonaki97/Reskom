// HalamanKasir.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function HalamanKasir() {
  const navigate = useNavigate();
  const [tabAktif, setTabAktif] = useState("pesanan");
  const [dataPesanan, setDataPesanan] = useState([]);
  const [notaData, setNotaData] = useState(null);
  const [showNota, setShowNota] = useState(false);

  useEffect(() => {
    const ambilPesanan = async () => {
      if (showNota) return;
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
  }, [showNota]);

  const handleLogout = () => {
    navigate("/");
  };

  const handleProsesPembayaran = async (pesanan) => {
    try {
      const res = await fetch(`http://localhost:5000/pesanan/${pesanan._id}/bayar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const result = await res.json();
        const tanggal = result.data?.tanggal || new Date().toISOString();
        const transaksiId = `TRX-${Date.now()}-${uuidv4().slice(0, 6).toUpperCase()}`;

        const nota = {
          id: transaksiId,
          tanggal: new Date(tanggal).toLocaleString(),
          kasir: "Simulasi",
          items: pesanan.items,
          subtotal: pesanan.total,
          ppn: Math.round(pesanan.total * 0.11),
          total: Math.round(pesanan.total * 1.11),
        };

        setNotaData(nota);
        setShowNota(true);

        setDataPesanan((prev) =>
          prev.map((p) =>
            p._id === pesanan._id
              ? { ...p, dibayar: true, tanggal: tanggal, total: nota.total }
              : p
          )
        );
      }
    } catch (err) {
      console.error("Gagal memproses pembayaran", err);
    }
  };

  const cetakNota = () => {
    const originalContent = document.body.innerHTML;
    const notaHTML = document.getElementById("notaModal").innerHTML;
    document.body.innerHTML = notaHTML;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const pesananBelumLunas = dataPesanan.filter((p) => !p.dibayar);
  const pesananLunas = dataPesanan.filter((p) => p.dibayar);

  const totalPendapatanHariIni = () => {
    const today = new Date().toISOString().split("T")[0];
    return pesananLunas
      .filter((p) => p.tanggal?.startsWith(today))
      .reduce((acc, cur) => acc + (cur.total || 0), 0);
  };

  const totalPendapatan = pesananLunas.reduce(
    (acc, cur) => acc + (cur.total || 0),
    0
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: "#0E2A1D", color: "white" }}>
        <h5 className="fw-bold m-0 mx-auto">RESKOM Restaurant</h5>
        <button onClick={handleLogout} className="btn btn-sm btn-outline-light">Logout</button>
      </div>

      <div className="d-flex justify-content-around py-2 border-bottom">
        <span className={tabAktif === "pesanan" ? "fw-bold" : "text-muted"} style={{ cursor: "pointer", color: "#C99D4D" }} onClick={() => setTabAktif("pesanan")}>Pesanan Masuk</span>
        <span className={tabAktif === "riwayat" ? "fw-bold" : "text-muted"} style={{ cursor: "pointer", color: "#C99D4D" }} onClick={() => setTabAktif("riwayat")}>Riwayat Transaksi</span>
      </div>

      <main className="flex-grow-1 px-3 py-4">
        {tabAktif === "pesanan" && (
          <>
            <h5 className="fw-bold mb-3" style={{ color: "#C99D4D" }}>Ringkasan Pendapatan</h5>
            <div className="row g-3">
              <div className="col-md-6"><div className="card shadow-sm p-3"><p className="mb-1">Pendapatan Hari Ini</p><h4 className="text-dark fw-bold">Rp {totalPendapatanHariIni().toLocaleString()}</h4></div></div>
              <div className="col-md-6"><div className="card shadow-sm p-3"><p className="mb-1">Total Pendapatan</p><h4 className="text-dark fw-bold">Rp {totalPendapatan.toLocaleString()}</h4></div></div>
            </div>

            <section className="mt-4">
              <h6 className="fw-bold" style={{ color: "#C99D4D" }}>Pesanan Perlu Diproses Pembayaran</h6>
              {pesananBelumLunas.length === 0 ? <p className="text-muted">Tidak ada pesanan.</p> : pesananBelumLunas.map((pesanan, idx) => (
                <div key={idx} className="p-3 mb-3 border rounded shadow-sm bg-white">
                  <h6 className="fw-bold text-dark">Meja {pesanan.nomorMeja}</h6>
                  <ul className="mb-1">
                    {pesanan.items.map((item, i) => (
                      <li key={i} className="small text-muted">{item.jumlah}x {item.nama}</li>
                    ))}
                  </ul>
                  <p className="fw-bold text-dark">Total: Rp {pesanan.total?.toLocaleString() || 0}</p>
                  <button className="btn btn-sm" style={{ backgroundColor: "#C99D4D", color: "white" }} onClick={() => handleProsesPembayaran(pesanan)}>Proses Pembayaran</button>
                </div>
              ))}
            </section>
          </>
        )}

        {tabAktif === "riwayat" && (
          <section>
            <h6 className="fw-bold" style={{ color: "#C99D4D" }}>Riwayat Transaksi</h6>
            {pesananLunas.length === 0 ? <p className="text-muted">Belum ada transaksi.</p> : pesananLunas.map((transaksi, idx) => (
              <div key={idx} className="p-3 mb-3 border rounded shadow-sm bg-white">
                <h6 className="fw-bold">Meja {transaksi.nomorMeja}</h6>
                <ul className="mb-1">
                  {transaksi.items.map((item, i) => (
                    <li key={i} className="small text-muted">{item.jumlah}x {item.nama}</li>
                  ))}
                </ul>
                <p className="text-dark fw-bold">Total: Rp {transaksi.total?.toLocaleString() || 0}</p>
                <p className="text-muted small">Tanggal: {new Date(transaksi.tanggal).toLocaleString() || "-"}</p>
              </div>
            ))}
          </section>
        )}
      </main>

      {showNota && notaData && (
        <div id="notaModal" className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-75">
          <div className="bg-white p-4 rounded" style={{ width: "350px" }}>
            <h5 className="text-center">KAFE MODERN</h5>
            <p className="text-center small">Jl. Teknologi No. 123, Jakarta</p>
            <hr />
            <p className="small">ID Transaksi: {notaData.id}</p>
            <p className="small">Tanggal: {notaData.tanggal}</p>
            <p className="small">Kasir: {notaData.kasir}</p>
            <hr/>
            {notaData.items.map((item, i) => (
              <div key={i} className="d-flex justify-content-between small">
                <span>{item.nama}</span>
                <span>Rp {(item.jumlah * item.harga).toLocaleString()}</span>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Subtotal</span><span>Rp {notaData.subtotal.toLocaleString()}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>PPN (11%)</span><span>Rp {notaData.ppn.toLocaleString()}</span>
            </div>
            <div className="d-flex justify-content-between fs-5 fw-bold mt-2">
              <span>TOTAL</span><span>Rp {notaData.total.toLocaleString()}</span>
            </div>
            <p className="text-center mt-3">Terima Kasih!<br /><small className="text-muted">Silakan datang kembali.</small></p>
            <div className="d-flex gap-2">
              <button className="btn btn-primary w-100" onClick={cetakNota}>Cetak</button>
              <button className="btn btn-secondary w-100" onClick={() => setShowNota(false)}>Tutup</button>
            </div>
          </div>
        </div>
      )}

      <footer className="text-center text-white py-2" style={{ backgroundColor: "#0E2A1D", fontSize: "13px" }}>
        2025 RESKOM Restaurant. All rights reserved
      </footer>
    </div>
  );
}

export default HalamanKasir;