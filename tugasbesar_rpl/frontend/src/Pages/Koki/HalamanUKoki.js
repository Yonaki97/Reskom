import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HalamanKoki() {
  const [tabAktif, setTabAktif] = useState('menu');
  const navigate = useNavigate();
  const [menuList, setMenuList] = useState([
    {
      nama: 'Nasi Goreng Spesial',
      deskripsi: 'Nasi goreng khas Reskom dengan ayam, udang, dan telur.',
      gambar: '/gambar/Nasgor.png',
      habis: false
    },
    // Tambahkan item menu lainnya sesuai kebutuhan
  ]);

  const toggleHabis = (index) => {
    const updatedList = [...menuList];
    updatedList[index].habis = !updatedList[index].habis;
    setMenuList(updatedList);
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3" style={{ backgroundColor: '#0E2A1D', color: 'white' }}>
        <h5 className="fw-bold m-0 mx-auto">RESKOM Restaurant</h5>
        <button onClick={handleLogout} className="btn btn-sm btn-outline-light">Logout</button>
      </div>

      {/* Tabs */}
      <div className="d-flex justify-content-around py-2 border-bottom">
        <span
          className={tabAktif === 'pesanan' ? 'fw-bold text-primary' : 'text-muted'}
          style={{ cursor: 'pointer' }}
          onClick={() => setTabAktif('pesanan')}
        >
          Pesanan Masuk
        </span>
        <span
          className={tabAktif === 'menu' ? 'fw-bold text-primary' : 'text-muted'}
          style={{ cursor: 'pointer' }}
          onClick={() => setTabAktif('menu')}
        >
          Kelola Menu
        </span>
      </div>

      {/* Konten */}
      <div className="container my-3 flex-grow-1">
        {tabAktif === 'menu' && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="text-primary fw-bold">Daftar Menu</h6>
              <button className="btn btn-success btn-sm">+ Tambah Menu</button>
            </div>

            {menuList.map((menu, index) => (
              <div key={index} className="card mb-3 shadow-sm">
                <div className="row g-0">
                  <div className="col-4 d-flex align-items-center justify-content-center">
                    <img
                      src={menu.gambar}
                      alt={menu.nama}
                      className="img-fluid rounded"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="col-8">
                    <div className="card-body">
                      <h6 className="card-title fw-bold mb-1 text-primary">{menu.nama}</h6>
                      <p className="card-text text-muted small mb-2">{menu.deskripsi}</p>
                      <button
                        className={`btn w-100 ${menu.habis ? 'btn-secondary' : 'btn-danger'}`}
                        onClick={() => toggleHabis(index)}
                      >
                        {menu.habis ? 'Tersedia' : 'Tandai Habis'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {tabAktif === 'pesanan' && (
          <div className="text-center mt-5">
            <h6 className="fw-bold">📥 Daftar Pesanan Masuk</h6>
            <p className="text-muted">Belum ada pesanan masuk.</p>
            <div className="text-center mt-4">
              <button onClick={handleLogout} className="btn btn-outline-danger px-4 py-2 rounded-pill">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-white py-2" style={{ backgroundColor: '#0E2A1D', fontSize: '13px' }}>
        2025 RESKOM Restaurant. All rights reserved
      </footer>
    </div>
  );
}

export default HalamanKoki;
