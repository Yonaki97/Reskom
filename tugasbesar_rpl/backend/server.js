const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./Config/ConnectDb'); // koneksi DB
const PesananRoutes = require('./src/Routes/PesananRoutes')

// memanggil Halaman
const User = require('./Models/User');
const Pesanan = require ('./Models/Pesanan')
// memanggil express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect DB
connectDB()
// Express (Node.js)
app.use('/pesanan', PesananRoutes); // <-- semua /pesanan diarahkan ke routes
// Tambah pesanan
app.get('/pesanan', async (req, res) => {
  try {
    const pesananAktif = await Pesanan.find({ status: 'menunggu' });
    res.json(pesananAktif);
  } catch (error) {
    console.error('❌ Gagal mengambil data pesanan:', error);
    res.status(500).json({ message: 'Gagal mengambil data pesanan', error: error.message });
  }
});
app.post('/register', async (req, res) => {
    const { email, username, password, role } = req.body;
    if (!email || !username || !password || !role) {
      return res.status(400).json({ message: 'Data tidak lengkap' });
    }
 try {
    // Cek apakah username sudah ada
const existingUser = await User.findOne({
  $or: [
    { username: username },
    { email: email }
  ]
});
    if (existingUser) {
      return res.status(400).json({ message: 'Username/email sudah digunakan' });
    }

    // Simpan ke database
    const newUser = new User({ email, username, password, role });
    await newUser.save();
 
    res.status(201).json({ message: 'Pendaftaran berhasil', user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint Login
app.post('/login', async (req, res) => {
  const { userIdentifier, password } = req.body;

  if (!userIdentifier || !password) {
    return res.status(400).json({ message: 'Data tidak lengkap' });
  }
  try {
    // Cek apakah userIdentifier berupa email atau username
    const user = await User.findOne({
      $or: [{ email: userIdentifier }, { username: userIdentifier }]
    });

    if (!user) {
      return res.status(401).json({ message: 'User tidak ditemukan' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Password salah' });
    }
    
    res.status(200).json({ message: 'Login berhasil', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
