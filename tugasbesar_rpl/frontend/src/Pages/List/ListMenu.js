const dataMenu = [
  // MAKANAN
  {
    nama: "Nasi Goreng Spesial",
    deskripsi: "Nasi goreng dengan isian lengkap: ayam suwir, telur, sosis, dan sayuran, disajikan dengan kerupuk dan acar",
    gambar: "/gambar/nasgorspesial.png",
    kategori: "Makanan",
    harga: 25000,
  },
  {
    nama: "Mie Goreng Spesial",
    deskripsi: "Mie ayam khas Reskom dengan topping lengkap.",
    gambar: "/gambar/migoreng.png",
    kategori: "Makanan",
    harga: 20000,
  },
  {
    nama: "Soto Betawi",
    deskripsi: "Kuah santan gurih dengan daging sapi empuk.",
    gambar: "/gambar/betawi.png",
    kategori: "Makanan",
    harga: 15000,
  },
  {
    nama: "Steak",
    deskripsi: "Daging sapi panggang disajikan dengan saus dan sayuran.",
    gambar: "/gambar/steak.png",
    kategori: "Makanan",
    harga: 30000,
  },
  {
    nama: "Jus Jeruk",
    deskripsi: "Segar dan manis, dibuat dari perasan jeruk asli",
    gambar: "/gambar/jeruk.png",
    kategori: "Minuman",
    harga: 7000,
  },
  {
    nama: "Es Teh",
    deskripsi: "Teh dingin manis yang menyegarkan.",
    gambar: "/gambar/teh.png",
    kategori: "Minuman",
    harga: 5000,
  },
  {
    nama: "Air Mineral",
    deskripsi:
      "Air putih kemasan, segar dan menyehatkan, cocok untuk semua jenis hidangan",
    gambar: "/gambar/AirMineral.png",
    kategori: "Minuman",
    harga: 4000,
  },
  {
    nama: "Cappucino",
    deskripsi:
      "Perpaduan espresso dan susu berbusa, dengan rasa kopi yang lembut dan aroma khas.",
    gambar: "/gambar/cappucino.png",
    kategori: "Minuman",
    harga: 18000,
  },
  {
    nama: "Es Kelapa Muda ",
    deskripsi:
      "Minuman segar dari kelapa muda asli, disajikan dengan es batu dan sirup atau gula cair",
    gambar: "/gambar/kelapamuda.png",
    kategori: "Minuman",
    harga: 17000,
  },
  {
    nama: "Jus Alpukat",
    deskripsi:
      "Jus alpukat kental dan creamy, disajikan dingin dengan topping coklat kental manis",
    gambar: "/gambar/jusalpukat.png",
    kategori: "Minuman",
    harga: 15000,
  },
  {
    nama: "Jus Mangga",
    deskripsi:
      "Minuman manis dan segar dari mangga matang, cocok diminum siang hari",
    gambar: "/gambar/jusmangga.png",
    kategori: "Minuman",
    harga: 15000,
  },
  {
    nama: "Lemon Tea",
    deskripsi:
      " Teh segar dengan sentuhan perasan lemon, tersedia dalam versi panas atau dingin.",
    gambar: "/gambar/lemontea.png",
    kategori: "Minuman",
    harga: 10000,
  },
  {
    nama: "Milkshake Coklat",
    deskripsi:
      " Minuman dingin berbasis susu dengan rasa coklat yang kaya dan creamy.",
    gambar: "/gambar/coklatmilk.png",
    kategori: "Minuman",
    harga: 20000,
  },
  {
    nama: "Milkshake Vanilla",
    deskripsi:
      "Milkshake manis dengan rasa vanilla lembut, disajikan dingin dengan krim di atasnya",
    gambar: "/gambar/vanillamilk.png",
    kategori: "Minuman",
    harga: 20000,
  },
  {
    nama: "Thai Tea",
    deskripsi:
      " Teh khas Thailand dengan susu kental dan es, manis dan creamy dengan aroma rempah ringan",
    gambar: "/gambar/thai.png",
    kategori: "Minuman",
    harga: 18000,
  },
  {
    nama: "Ayam Bakar + Nasi",
    deskripsi: "Potongan ayam dibakar dengan bumbu khas manis gurih, disajikan hangat dengan nasi putih, sambal, dan lalapan",
    gambar: "/gambar/ayambakar.png",
    kategori: "Makanan",
    harga: 28000,
  },
  {
    nama: "Bakso Komplit",
    deskripsi: "Semangkuk bakso berisi bakso urat, bakso halus, tahu, mie, bihun, dan pangsit, disiram kuah kaldu sapi gurih.",
    gambar: "/gambar/baksokomplit.png",
    kategori: "Makanan",
    harga: 25000,
  },
  {
    nama: "Chicken Steak + Kentang",
    deskripsi: "Dada ayam goreng tepung renyah disajikan dengan saus blackpepper atau mushroom, dilengkapi kentang goreng dan sayur rebus",
    gambar: "/gambar/chickensteak.png",
    kategori: "Makanan",
    harga: 40000,
  },
  {
    nama: "Iga Bakar",
    deskripsi: "Iga sapi empuk dibakar dengan bumbu kecap khas, disajikan dengan sambal, nasi, dan lalapan segar",
    gambar: "/gambar/igabakar.png",
    kategori: "Makanan",
    harga: 45000,
  },
  {
    nama: "Ramen Ayam Pedas",
    deskripsi: "Mie ramen kuah kaldu ayam pedas, dengan topping telur rebus, ayam suwir, jagung, dan rumput laut.",
    gambar: "/gambar/ramenayam.png",
    kategori: "Makanan",
    harga: 32000,
  },
  {
    nama: "Rawon Daging",
    deskripsi: "Sup daging sapi khas Jawa Timur dengan kuah hitam dari kluwek, disajikan dengan nasi, sambal, tauge, dan kerupuk.",
    gambar: "/gambar/rawondaging.png",
    kategori: "Makanan",
    harga: 30000,
  },
  {
    nama: "Sop Buntut",
    deskripsi: "Potongan buntut sapi empuk dalam kuah bening gurih dengan wortel, kentang, daun bawang, dan seledri",
    gambar: "/gambar/sopbuntut.png",
    kategori: "Makanan",
    harga: 45000,
  },
  {
    nama: "Soto Ayam",
    deskripsi: " Kuah kuning gurih dengan suwiran ayam, bihun, telur rebus, dan koya, disajikan bersama nasi hangat.",
    gambar: "/gambar/sotoayam.png",
    kategori: "Makanan",
    harga: 22000,
  },
  {
    nama: "Spaghetti Carbonara ",
    deskripsi: " Pasta spaghetti dengan saus creamy keju, daging asap, dan taburan parsley, cocok untuk pecinta western food",
    gambar: "/gambar/spageti.png",
    kategori: "Makanan",
    harga: 15000,
  },
];

export default dataMenu;
