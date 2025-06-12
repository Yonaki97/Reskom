const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./Config/ConnectDb'); // koneksi DB

const Mahasiswa = require('./models/Mahasiswa');
const Dosen = require('./models/Dosen');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect DB
connectDB()

// Routes contoh
app.get('/mahasiswa', async (req, res) => {
  const data = await Mahasiswa.find();
  res.json(data);
});

app.post('/mahasiswa', async (req, res) => {
  const mahasiswa = new Mahasiswa(req.body);
  await mahasiswa.save();
  res.json(mahasiswa);
});


app.delete('/mahasiswa/:id', async (req, res) => {
    try {
        const mahasiswaId = req.params.id;
        const deleted = await Mahasiswa.findByIdAndDelete(mahasiswaId);
        if (!deleted) {
            return res.status(404).send("Mahasiswa not found");
        }
        res.send("Mahasiswa has been deleted");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
