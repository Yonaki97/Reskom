import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [form, setForm] = useState({ nama: '', nim: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get('http://localhost:5000/mahasiswa');
    setMahasiswa(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/mahasiswa', form);
    setForm({ nama: '', nim: '' });
    fetchData();
  };

  return (
    <div className="container mt-5">
      <h1>Daftar Mahasiswa</h1>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-3">
          <input type="text" placeholder="Nama" className="form-control" 
                 value={form.nama}
                 onChange={e => setForm({ ...form, nama: e.target.value })} />
        </div>
        <div className="mb-3">
          <input type="text" placeholder="NIM" className="form-control"
                 value={form.nim}
                 onChange={e => setForm({ ...form, nim: e.target.value })} />
        </div>
        <button type="submit" className="btn btn-primary">Tambah</button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nama</th>
            <th>NIM</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((mhs, index) => (
            <tr key={index}>
              <td>{mhs.nama}</td>
              <td>{mhs.nim}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
