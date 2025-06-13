const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./Config/ConnectDb'); // koneksi DB

const Username = require('./Models/Username');
const Password = require('./Models/Password');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect DB
connectDB()

// Routes contoh
app.get('/Username', async (req, res) => {
  const data = await Username.find();
  res.json(data);
});

app.post('/Username', async (req, res) => {
  const Username = new Username(req.body);
  await Username.save();
  res.json(Username);
});

app.delete('/Username/:id', async (req, res) => {
    try {
        const UsernameId = req.params.id;
        const deleted = await Username.findByIdAndDelete(UsernameId);
        if (!deleted) {
            return res.status(404).send("Username not found");
        }
        res.send("Username has been deleted");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));
