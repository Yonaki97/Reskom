const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./Config/ConnectDb'); // koneksi DB

// Route
const PesananRoutes = require('./src/Routes/PesananRoutes')
const RegisterRoutes = require('./src/Routes/RegisterRoutes')
const LoginRoutes = require('./src/Routes/LoginRoutes')

// memanggil express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect DB
connectDB()

// Pesanan
app.use('/pesanan', PesananRoutes); 
// Register
app.use('/register', RegisterRoutes);
// Endpoint Login
app.use('/login', LoginRoutes); 

app.listen(5000, () => console.log('Server running on port 5000'));
