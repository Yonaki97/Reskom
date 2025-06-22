const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Reskom_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // keluar kalau gagal
  }
};

module.exports = connectDB;

// const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'blackleaner@gmail.com',
//     pass: '9087'
//   }
// });

// app.post('/ForgotPassword', async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) return res.json({ message: 'Email tidak ditemukan' });

//   const token = crypto.randomBytes(20).toString('hex');
//   user.resetToken = token;
//   user.tokenExpires = Date.now() + 3600000; // 1 jam
//   await user.save();

//   const link = `http://localhost:5173/ResetPassword/${token}`;

//   // Kirim email
//   try{
//     await transporter.sendMail({
//     to: user.email,
//     subject: "Reset Password",
//     html: `<a href="${link}">Klik untuk reset password</a>`
//   });

//   res.json({ message: 'Link reset dikirim ke email' });
// }catch (error) {
//     console.error("Gagal mengirim email:", error);
//     res.status(500).json({ message: "Gagal mengirim email", error: error.message });
//   }
// });


// app.post('/ResetPassword', async (req, res) => {
//   const { token, password } = req.body;
//   const user = await User.findOne({
//     resetToken: token,
//     tokenExpires: { $gt: Date.now() } // Token masih valid
//   });

//   if (!user) return res.json({ message: 'Token tidak valid atau expired' });

//   user.password = hash(password); // hash sesuai sistemmu
//   user.resetToken = undefined;
//   user.tokenExpires = undefined;
//   await user.save();

//   res.json({ message: 'Password berhasil direset' });
// });