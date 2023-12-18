-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 08, 2023 at 11:52 AM
-- Server version: 8.1.0
-- PHP Version: 7.4.3-4ubuntu2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `portalberita`
--

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE `answer` (
  `id_answer` int NOT NULL,
  `id_quiz` int NOT NULL,
  `id_users` int NOT NULL,
  `id_question` int NOT NULL,
  `id_answer_option` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`id_answer`, `id_quiz`, `id_users`, `id_question`, `id_answer_option`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, 36, 141, '2023-09-15 11:01:26', '2023-09-15 11:01:26'),
(2, 2, 1, 38, 152, '2023-09-15 11:01:32', '2023-09-15 11:01:32'),
(3, 2, 1, 35, 139, '2023-09-15 11:01:33', '2023-09-15 11:01:33'),
(4, 2, 1, 42, 167, '2023-09-15 11:01:41', '2023-09-15 11:01:41'),
(5, 2, 1, 43, 172, '2023-09-15 11:01:41', '2023-09-15 11:01:41'),
(6, 2, 1, 44, 174, '2023-09-15 11:01:42', '2023-09-15 11:01:42'),
(7, 2, 1, 41, 163, '2023-09-15 11:01:45', '2023-09-15 11:01:45'),
(8, 2, 1, 37, 148, '2023-09-15 11:01:48', '2023-09-15 11:01:48'),
(9, 2, 1, 40, 159, '2023-09-15 11:01:50', '2023-09-15 11:01:50'),
(10, 2, 1, 39, 153, '2023-09-15 11:01:53', '2023-09-15 11:01:53'),
(11, 1, 1, 26, 101, '2023-09-15 11:44:55', '2023-09-15 11:44:55'),
(12, 3, 1, 49, 193, '2023-09-16 01:32:40', '2023-09-16 01:32:40'),
(30, 5, 2, 72, 288, '2023-09-18 05:44:15', '2023-09-18 05:44:15'),
(31, 5, 2, 65, 259, '2023-09-18 05:44:21', '2023-09-18 05:44:21'),
(32, 5, 2, 68, 272, '2023-09-18 05:44:24', '2023-09-18 05:44:24'),
(33, 5, 2, 71, 282, '2023-09-18 05:44:26', '2023-09-18 05:44:26'),
(34, 5, 2, 73, 292, '2023-09-18 05:44:29', '2023-09-18 05:44:29'),
(35, 5, 2, 67, 268, '2023-09-18 05:44:38', '2023-09-18 05:44:38'),
(36, 5, 2, 66, 264, '2023-09-18 05:44:40', '2023-09-18 05:44:40'),
(37, 5, 2, 70, 280, '2023-09-18 05:44:42', '2023-09-18 05:44:42'),
(38, 5, 2, 69, 273, '2023-09-18 05:44:45', '2023-09-18 05:45:53'),
(39, 5, 2, 74, 296, '2023-09-18 05:45:11', '2023-09-18 05:46:00'),
(40, 6, 1, 79, 313, '2023-09-19 02:35:38', '2023-09-19 02:35:38'),
(41, 6, 1, 77, 305, '2023-09-19 02:35:49', '2023-09-19 02:35:49'),
(42, 6, 1, 84, 334, '2023-09-19 02:35:52', '2023-09-19 02:35:52'),
(43, 6, 1, 81, 324, '2023-09-19 02:35:58', '2023-09-19 02:35:58'),
(44, 6, 1, 75, 298, '2023-09-19 02:36:04', '2023-09-19 02:36:04'),
(45, 6, 1, 83, 332, '2023-09-19 02:36:09', '2023-09-19 02:36:09'),
(46, 6, 1, 80, 320, '2023-09-19 02:36:12', '2023-09-19 02:36:12'),
(47, 6, 1, 82, 328, '2023-09-19 02:36:15', '2023-09-19 02:36:15'),
(48, 6, 1, 76, 303, '2023-09-19 02:36:20', '2023-09-19 02:36:20'),
(49, 6, 1, 78, 312, '2023-09-19 02:36:23', '2023-09-19 02:36:23'),
(50, 6, 2, 78, 309, '2023-09-19 02:43:36', '2023-09-19 02:43:36'),
(51, 6, 2, 77, 306, '2023-09-19 02:46:56', '2023-09-19 02:46:56'),
(52, 6, 2, 79, 314, '2023-09-19 02:47:05', '2023-09-19 02:47:05'),
(53, 6, 2, 76, 304, '2023-09-19 02:47:10', '2023-09-19 02:47:10'),
(54, 6, 2, 84, 336, '2023-09-19 02:47:29', '2023-09-19 02:47:29'),
(55, 6, 2, 75, 300, '2023-09-19 02:47:30', '2023-09-19 02:47:30'),
(60, 6, 2, 81, 323, '2023-09-19 02:49:32', '2023-09-19 02:49:32'),
(61, 6, 2, 82, 327, '2023-09-19 02:49:37', '2023-09-19 02:49:37'),
(63, 6, 2, 80, 317, '2023-09-19 02:50:10', '2023-09-19 02:50:10'),
(65, 6, 2, 83, 330, '2023-09-19 02:50:24', '2023-09-19 02:50:42'),
(66, 7, 1, 92, 365, '2023-09-19 04:04:38', '2023-09-19 04:04:38'),
(67, 7, 1, 94, 373, '2023-09-19 04:06:23', '2023-09-19 04:06:23'),
(68, 7, 1, 85, 337, '2023-09-19 04:06:38', '2023-09-19 04:06:38'),
(69, 7, 1, 90, 357, '2023-09-19 04:07:08', '2023-09-19 04:07:08'),
(70, 7, 1, 89, 353, '2023-09-19 04:07:22', '2023-09-19 04:07:22'),
(71, 7, 1, 87, 345, '2023-09-19 04:07:37', '2023-09-19 04:07:37'),
(72, 7, 1, 93, 369, '2023-09-19 04:07:48', '2023-09-19 04:07:48'),
(73, 7, 1, 91, 361, '2023-09-19 04:08:09', '2023-09-19 04:08:09'),
(74, 7, 1, 88, 349, '2023-09-19 04:08:55', '2023-09-19 04:08:55'),
(75, 7, 1, 86, 341, '2023-09-19 04:09:02', '2023-09-19 04:09:02'),
(76, 8, 1, 102, 408, '2023-09-19 15:32:46', '2023-09-19 15:32:46'),
(77, 8, 1, 96, 384, '2023-09-19 15:32:53', '2023-09-19 15:32:53'),
(78, 8, 1, 100, 400, '2023-09-19 15:33:00', '2023-09-19 15:33:00'),
(79, 8, 1, 99, 393, '2023-09-19 15:33:05', '2023-09-19 15:33:05'),
(80, 8, 1, 95, 380, '2023-09-19 15:33:08', '2023-09-19 15:33:08'),
(81, 8, 1, 101, 403, '2023-09-19 15:33:11', '2023-09-19 15:33:11'),
(82, 8, 1, 97, 388, '2023-09-19 15:33:13', '2023-09-19 15:33:13'),
(83, 8, 1, 103, 412, '2023-09-19 15:33:16', '2023-09-19 15:33:16'),
(84, 8, 1, 98, 392, '2023-09-19 15:33:18', '2023-09-19 15:33:18'),
(85, 8, 1, 104, 416, '2023-09-19 15:33:20', '2023-09-19 15:33:20');

-- --------------------------------------------------------

--
-- Table structure for table `answer_option`
--

CREATE TABLE `answer_option` (
  `id_answer_option` int NOT NULL,
  `id_question` int DEFAULT NULL,
  `answer_option` text,
  `answer_is_true` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `answer_option`
--

INSERT INTO `answer_option` (`id_answer_option`, `id_question`, `answer_option`, `answer_is_true`) VALUES
(1, 1, 'Sebuah paradigma pemrograman yang berfokus pada objek-objek yang memiliki atribut dan metode.', 1),
(2, 1, 'Sebuah metode pemrograman untuk menghindari pengulangan kode.', 0),
(3, 1, 'Sebuah pendekatan pemrograman yang hanya menggunakan fungsi-fungsi.', 0),
(4, 1, 'Sebuah pendekatan pemrograman yang mengabaikan objek.', 0),
(5, 2, 'Proses mengubah data menjadi tipe data yang berbeda.', 0),
(6, 2, 'Proses menyembunyikan rincian implementasi dan hanya menampilkan fungsionalitas yang relevan.', 1),
(7, 2, 'Proses menggabungkan dua objek menjadi satu.', 0),
(8, 2, 'Proses mengelompokkan objek dalam hierarki.', 0),
(9, 3, 'Proses mengelompokkan objek dalam hierarki.', 0),
(10, 3, 'Proses mengubah data menjadi tipe data yang berbeda.', 0),
(11, 3, 'Proses menyembunyikan rincian implementasi dan hanya menampilkan fungsionalitas yang relevan.', 1),
(12, 3, 'Proses menggabungkan dua objek menjadi satu.', 0),
(13, 4, 'Static Binding adalah proses menentukan tipe objek pada waktu kompilasi, sementara Dynamic Binding adalah proses menentukan tipe objek pada waktu runtime.', 1),
(14, 4, 'Static Binding adalah proses menentukan tipe objek pada waktu runtime, sementara Dynamic Binding adalah proses menentukan tipe objek pada waktu kompilasi.', 0),
(15, 4, 'Static Binding dan Dynamic Binding adalah konsep yang sama dalam OOP.', 0),
(16, 4, 'Static Binding dan Dynamic Binding tidak ada dalam OOP.', 0),
(17, 5, 'Kemampuan untuk mengubah tipe data.', 0),
(18, 5, 'Kemampuan untuk mengubah nilai variabel.', 0),
(19, 5, 'Kemampuan untuk menghindari pengulangan kode.', 0),
(20, 5, 'Kemampuan objek dari kelas yang berbeda untuk merespons metode dengan nama yang sama.', 1),
(21, 6, 'Proses mengubah operator menjadi metode dalam kelas.', 0),
(22, 6, 'Proses mengganti operator dengan tanda kurung.', 0),
(23, 6, 'Proses mengganti operator dengan komentar.', 0),
(24, 6, 'Proses memberikan makna yang berbeda kepada operator tergantung pada jenis operand yang digunakan.', 1),
(25, 7, 'Proses menambahkan metode ke dalam kelas.', 0),
(26, 7, 'Proses menggabungkan dua kelas menjadi satu.', 0),
(27, 7, 'Proses menggandakan objek dari kelas yang sudah ada.', 0),
(28, 7, 'Proses mewariskan atribut dan metode dari kelas yang sudah ada ke kelas baru.', 1),
(29, 8, 'Sebuah kelas yang tidak dapat diinstansiasi dan hanya berfungsi sebagai dasar untuk kelas-kelas turunannya.', 1),
(30, 8, 'Sebuah kelas yang hanya berisi metode-metode abstrak.', 0),
(31, 8, 'Sebuah kelas yang hanya berisi metode-metode statis.', 0),
(32, 8, 'Sebuah kelas yang hanya berisi atribut tanpa metode.', 0),
(33, 9, 'Sebuah kelas yang tidak dapat diinstansiasi dan hanya berfungsi sebagai dasar untuk kelas-kelas turunannya.', 0),
(34, 9, 'Sebuah kelas yang hanya berisi metode-metode abstrak.', 0),
(35, 9, 'Sebuah kelas yang hanya berisi metode-metode statis.', 0),
(36, 9, 'Sebuah kontrak yang mendefinisikan metode-metode yang harus diimplementasikan oleh kelas-kelas lain.', 1),
(37, 10, 'Dengan menghindari penggunaan multiple inheritance sepenuhnya.', 0),
(38, 10, 'Dengan menggunakan multiple inheritance hanya pada satu tingkat kelas.', 0),
(39, 10, 'Dengan menggunakan mekanisme seperti virtual inheritance untuk mengatasi konflik yang timbul.', 1),
(40, 10, 'Diamond Problem tidak ada dalam pemrograman berorientasi objek.', 0),
(41, 11, 'Proses membersihkan sampah di lingkungan yang ramah lingkungan.', 0),
(42, 11, 'Proses mengganti kode lama dengan kode yang lebih baru.', 0),
(43, 11, 'Proses menghitung jumlah objek yang digunakan dalam program.', 0),
(44, 11, 'Proses otomatis mengidentifikasi dan menghapus objek yang tidak lagi digunakan oleh program untuk menghindari kebocoran memori.', 1),
(45, 12, 'Pola desain yang menerapkan banyak objek dalam satu kelas.', 0),
(46, 12, 'Pola desain yang menghindari penggunaan objek dalam program.', 0),
(47, 12, 'Pola desain yang membatasi pembuatan objek dari kelas tertentu menjadi hanya satu instance.', 1),
(48, 12, 'Pola desain yang memaksa setiap objek dalam program untuk menjadi unik.', 0),
(49, 13, 'Solusi unik untuk masalah yang hanya muncul sekali.', 0),
(50, 13, 'Konsep abstrak yang tidak terkait dengan pemrograman.', 0),
(51, 13, 'Solusi umum untuk masalah yang sering muncul dalam pengembangan perangkat lunak.', 1),
(52, 13, 'Pola yang hanya digunakan dalam pemrograman web.', 0),
(53, 14, 'Proses menggantikan semua variabel dalam program dengan variabel yang lebih besar.', 0),
(54, 14, 'Proses memindahkan semua dependensi ke dalam sebuah kelas.', 0),
(55, 14, 'Proses menghindari penggunaan objek dalam program.', 0),
(56, 14, 'Proses memberikan objek yang dibutuhkan oleh sebuah kelas melalui konstruktor atau metode.', 1),
(57, 15, 'Sebuah notasi yang digunakan untuk mengevaluasi ukuran memori.', 0),
(58, 15, 'Sebuah notasi yang digunakan untuk menilai kualitas kode.', 0),
(59, 15, 'Sebuah notasi yang digunakan untuk mengukur waktu eksekusi sebuah algoritma terhadap ukuran masukannya.', 1),
(60, 15, 'Sebuah notasi yang hanya digunakan dalam pemrograman berbasis teks.', 0),
(61, 16, 'Sebuah metode untuk mengganti perulangan (loop) dalam kode.', 0),
(62, 16, 'Sebuah pendekatan untuk menghindari penggunaan fungsi.', 0),
(63, 16, 'Sebuah proses di mana sebuah fungsi memanggil dirinya sendiri untuk menyelesaikan tugas.', 1),
(64, 16, 'Sebuah proses yang melibatkan dua atau lebih fungsi dalam sebuah program.', 0),
(65, 17, 'Sebuah paradigma pemrograman yang berfokus pada objek-objek.', 0),
(66, 17, 'Sebuah paradigma pemrograman yang berfokus pada fungsi-fungsi dan menghindari perubahan data.', 0),
(67, 17, 'Sebuah paradigma pemrograman yang menggantikan perulangan dengan fungsi-fungsi.', 0),
(68, 17, 'Sebuah paradigma pemrograman yang hanya menggunakan loop.', 1),
(69, 18, 'Proses menggabungkan dua program menjadi satu.', 0),
(70, 18, 'Proses menghindari penggunaan objek dalam program.', 0),
(71, 18, 'Proses menjalankan dua atau lebih tugas secara bersamaan tanpa harus menunggu satu tugas selesai sebelum tugas lainnya dimulai.', 1),
(72, 18, 'Proses mengubah kode sumber menjadi bahasa mesin.', 0),
(73, 19, 'Proses menjalankan dua atau lebih tugas secara bersamaan tanpa harus menunggu satu tugas selesai sebelum tugas lainnya dimulai.', 0),
(74, 19, 'Proses menggabungkan dua program menjadi satu.', 0),
(75, 19, 'Proses menghindari penggunaan objek dalam program.', 0),
(76, 19, 'Situasi di mana hasil dari sebuah program bergantung pada urutan atau kecepatan eksekusi tugas-tugas konkuren.', 1),
(77, 20, 'Proses menggantikan data dalam memori dengan data yang lebih lama.', 0),
(78, 20, 'Proses mengganti data dengan kode baru.', 0),
(79, 20, 'Proses menghindari penggunaan data dalam program.', 0),
(80, 20, 'Proses menyimpan data yang sering diakses dalam memori atau penyimpanan cepat untuk mengurangi waktu akses data.', 1),
(81, 21, 'Sebuah fungsi yang tidak memiliki akses ke variabel-variabel di luar cakupannya, kecuali jika variabel-variabel tersebut dideklarasikan sebagai variabel global.', 1),
(82, 21, 'Sebuah fungsi yang selalu mengembalikan nilai boolean.', 0),
(83, 21, 'Sebuah metode untuk mengubah tipe data dalam JavaScript.', 0),
(84, 21, 'Sebuah tipe data yang digunakan untuk menyimpan daftar nilai.', 0),
(85, 22, 'Proses mengangkat (membawa) deklarasi variabel dan fungsi ke atas cakupan (scope) fungsinya.', 1),
(86, 22, 'Proses mengubah kode JavaScript menjadi kode mesin.', 0),
(87, 22, 'Proses mengganti variabel dengan nilai default.', 0),
(88, 22, 'Sebuah cara untuk menambahkan animasi pada halaman web.', 0),
(89, 23, 'Sebuah proses di mana event di elemen terdalam (anak) terlebih dahulu diproses, kemudian event di elemen terluar (induk) diproses.', 1),
(90, 23, 'Sebuah teknik untuk menggabungkan dua atau lebih objek menjadi satu.', 0),
(91, 23, 'Sebuah teknik untuk menggabungkan dua atau lebih fungsi menjadi satu.', 0),
(92, 23, 'Sebuah cara untuk menggabungkan HTML dan CSS.', 0),
(93, 24, 'Sebuah situasi di mana terdapat banyak callback nested (bertingkat) dalam kode, sehingga sulit untuk dibaca dan dipahami.', 1),
(94, 24, 'Sebuah teknik untuk menggabungkan dua atau lebih fungsi menjadi satu.', 0),
(95, 24, 'Sebuah cara untuk mengganti variabel dengan nilai default.', 0),
(96, 24, 'Sebuah metode untuk mengganti operator dengan tanda kurung.', 0),
(97, 25, 'Sebuah objek yang digunakan untuk melakukan tindakan asinkron dan mengelola responsnya.', 1),
(98, 25, 'Sebuah tipe data untuk menggantikan variabel biasa.', 0),
(99, 25, 'Sebuah metode untuk menunda eksekusi kode.', 0),
(100, 25, 'Sebuah tipe data yang digunakan untuk menyimpan daftar nilai.', 0),
(101, 26, 'Sebuah fungsi anonim yang singkat ditulis dengan menggunakan sintaksis panah (=>) dan tidak memiliki konteks this sendiri.', 1),
(102, 26, 'Sebuah teknik untuk menghindari penggunaan fungsi.', 0),
(103, 26, 'Sebuah metode untuk mengganti operator dengan tanda kurung.', 0),
(104, 26, 'Sebuah cara untuk menambahkan animasi pada halaman web.', 0),
(105, 27, 'Dengan menggunakan kata kunci \"let\" diikuti oleh nama variabel yang ingin Anda deklarasikan. Contoh: let namaVariabel;', 1),
(106, 27, 'Dengan menggunakan kata kunci \"const\" diikuti oleh nama variabel yang ingin Anda deklarasikan. Contoh: const namaVariabel;', 0),
(107, 27, 'Dengan menggunakan kata kunci \"var\" diikuti oleh nama variabel yang ingin Anda deklarasikan. Contoh: var namaVariabel;', 0),
(108, 27, 'Dengan menambahkan tanda kurung di awal variabel. Contoh: (namaVariabel);', 0),
(109, 28, 'Sebuah metode untuk mengekstrak nilai dari objek atau array dan menginisialisasi variabel dengan nilai-nilai tersebut.', 1),
(110, 28, 'Sebuah teknik untuk menghancurkan objek dalam bahasa pemrograman JavaScript.', 0),
(111, 28, 'Sebuah metode untuk memberikan nilai default pada parameter fungsi.', 0),
(112, 28, 'Sebuah metode untuk menghapus variabel dalam lingkup tertentu.', 0),
(113, 29, 'Sebuah fitur dalam JavaScript yang digunakan untuk menangani operasi asinkron dengan cara yang lebih bersih dan mudah dibaca dengan menggunakan kata kunci \"async\" dan \"await\".', 1),
(114, 29, 'Sebuah teknik untuk menggabungkan dua atau lebih fungsi menjadi satu.', 0),
(115, 29, 'Sebuah teknik untuk membuat animasi halaman web.', 0),
(116, 29, 'Sebuah cara untuk mengganti variabel dengan nilai default.', 0),
(117, 30, 'Sebuah teknik untuk menggabungkan dua atau lebih variabel.', 0),
(118, 30, 'Representasi struktur halaman web yang dapat diakses dan dimanipulasi menggunakan JavaScript.', 1),
(119, 30, 'Sebuah metode untuk mengganti tipe data dalam JavaScript.', 0),
(120, 30, 'Sebuah cara untuk mengubah jenis font pada teks HTML.', 0),
(121, 31, 'Tidak ada perbedaan, keduanya dapat digunakan secara bergantian.', 0),
(122, 31, '\"null\" adalah nilai yang sengaja diberikan untuk menunjukkan bahwa sebuah variabel tidak memiliki nilai atau objek, sedangkan \"undefined\" menunjukkan bahwa variabel belum diinisialisasi.', 1),
(123, 31, '\"null\" digunakan untuk menghapus variabel, sedangkan \"undefined\" digunakan untuk menginisialisasi variabel dengan nilai awal.', 0),
(124, 31, '\"null\" hanya digunakan dalam operasi matematika, sementara \"undefined\" digunakan dalam operasi logika.', 0),
(125, 32, 'Sebuah teknik untuk menggabungkan dua atau lebih fungsi menjadi satu.', 0),
(126, 32, 'Lingkup atau ruang lingkup yang menentukan bagian kode di mana sebuah variabel dapat diakses.', 1),
(127, 32, 'Sebuah metode untuk mengganti nilai dari variabel global.', 0),
(128, 32, 'Sebuah cara untuk mengatur tampilan elemen HTML.', 0),
(129, 33, 'Tidak mungkin menghindari \"callback hell\" karena itu adalah bagian alami dari pengembangan JavaScript.', 0),
(130, 33, 'Dengan menggunakan metode \"async/await\" untuk mengatasi callback bersarang (nested callback).', 1),
(131, 33, 'Dengan menambahkan lebih banyak callback ke dalam kode untuk menjadikannya lebih terstruktur.', 0),
(132, 33, 'Dengan mengabaikan callback dan menggunakan fungsi konvensional.', 0),
(133, 34, 'Sebuah metode untuk mengganti variabel dengan nilai default.', 0),
(134, 34, 'Sebuah cara untuk membuat fungsi yang dieksekusi secara otomatis setelah dideklarasikan.', 1),
(135, 34, 'Sebuah tipe data yang digunakan untuk menyimpan daftar nilai.', 0),
(136, 34, 'Sebuah teknik untuk mengatur urutan eksekusi kode.', 0),
(137, 35, '8', 1),
(138, 35, '7', 0),
(139, 35, '6', 0),
(140, 35, '9', 0),
(141, 36, '7', 1),
(142, 36, '6', 0),
(143, 36, '8', 0),
(144, 36, '9', 0),
(145, 37, '13', 1),
(146, 37, '14', 0),
(147, 37, '12', 0),
(148, 37, '15', 0),
(149, 38, '54', 1),
(150, 38, '45', 0),
(151, 38, '48', 0),
(152, 38, '63', 0),
(153, 39, '6.25', 1),
(154, 39, '5.5', 0),
(155, 39, '6', 0),
(156, 39, '7', 0),
(157, 40, '225', 1),
(158, 40, '210', 0),
(159, 40, '240', 0),
(160, 40, '250', 0),
(161, 41, '7', 1),
(162, 41, '8', 0),
(163, 41, '6', 0),
(164, 41, '9', 0),
(165, 42, '8', 1),
(166, 42, '7', 0),
(167, 42, '6', 0),
(168, 42, '9', 0),
(169, 43, '28', 1),
(170, 43, '24', 0),
(171, 43, '30', 0),
(172, 43, '35', 0),
(173, 44, '9', 1),
(174, 44, '8', 0),
(175, 44, '10', 0),
(176, 44, '7', 0),
(177, 45, '8', 1),
(178, 45, '7', 0),
(179, 45, '6', 0),
(180, 45, '9', 0),
(181, 46, '7', 1),
(182, 46, '6', 0),
(183, 46, '8', 0),
(184, 46, '9', 0),
(185, 47, '13', 1),
(186, 47, '14', 0),
(187, 47, '12', 0),
(188, 47, '15', 0),
(189, 48, '54', 1),
(190, 48, '45', 0),
(191, 48, '48', 0),
(192, 48, '63', 0),
(193, 49, '6.25', 1),
(194, 49, '5.5', 0),
(195, 49, '6', 0),
(196, 49, '7', 0),
(197, 50, '225', 1),
(198, 50, '210', 0),
(199, 50, '240', 0),
(200, 50, '250', 0),
(201, 51, '7', 1),
(202, 51, '8', 0),
(203, 51, '6', 0),
(204, 51, '9', 0),
(205, 52, '8', 1),
(206, 52, '7', 0),
(207, 52, '6', 0),
(208, 52, '9', 0),
(209, 53, '28', 1),
(210, 53, '24', 0),
(211, 53, '30', 0),
(212, 53, '35', 0),
(213, 54, '9', 1),
(214, 54, '8', 0),
(215, 54, '10', 0),
(216, 54, '7', 0),
(257, 65, '8', 1),
(258, 65, '7', 0),
(259, 65, '6', 0),
(260, 65, '9', 0),
(261, 66, '7', 1),
(262, 66, '6', 0),
(263, 66, '8', 0),
(264, 66, '9', 0),
(265, 67, '13', 1),
(266, 67, '14', 0),
(267, 67, '12', 0),
(268, 67, '15', 0),
(269, 68, '54', 1),
(270, 68, '45', 0),
(271, 68, '48', 0),
(272, 68, '63', 0),
(273, 69, '6.25', 1),
(274, 69, '5.5', 0),
(275, 69, '6', 0),
(276, 69, '7', 0),
(277, 70, '225', 1),
(278, 70, '210', 0),
(279, 70, '240', 0),
(280, 70, '250', 0),
(281, 71, '7', 1),
(282, 71, '8', 0),
(283, 71, '6', 0),
(284, 71, '9', 0),
(285, 72, '8', 1),
(286, 72, '7', 0),
(287, 72, '6', 0),
(288, 72, '9', 0),
(289, 73, '28', 1),
(290, 73, '24', 0),
(291, 73, '30', 0),
(292, 73, '35', 0),
(293, 74, '9', 1),
(294, 74, '8', 0),
(295, 74, '10', 0),
(296, 74, '7', 0),
(297, 75, '8', 1),
(298, 75, '7', 0),
(299, 75, '6', 0),
(300, 75, '9', 0),
(301, 76, '7', 1),
(302, 76, '6', 0),
(303, 76, '8', 0),
(304, 76, '9', 0),
(305, 77, '13', 1),
(306, 77, '14', 0),
(307, 77, '12', 0),
(308, 77, '15', 0),
(309, 78, '54', 1),
(310, 78, '45', 0),
(311, 78, '48', 0),
(312, 78, '63', 0),
(313, 79, '6.25', 1),
(314, 79, '5.5', 0),
(315, 79, '6', 0),
(316, 79, '7', 0),
(317, 80, '225', 1),
(318, 80, '210', 0),
(319, 80, '240', 0),
(320, 80, '250', 0),
(321, 81, '7', 1),
(322, 81, '8', 0),
(323, 81, '6', 0),
(324, 81, '9', 0),
(325, 82, '8', 1),
(326, 82, '7', 0),
(327, 82, '6', 0),
(328, 82, '9', 0),
(329, 83, '28', 1),
(330, 83, '24', 0),
(331, 83, '30', 0),
(332, 83, '35', 0),
(333, 84, '9', 1),
(334, 84, '8', 0),
(335, 84, '10', 0),
(336, 84, '7', 0),
(337, 85, '8', 1),
(338, 85, '7', 0),
(339, 85, '6', 0),
(340, 85, '9', 0),
(341, 86, '7', 1),
(342, 86, '6', 0),
(343, 86, '8', 0),
(344, 86, '9', 0),
(345, 87, '13', 1),
(346, 87, '14', 0),
(347, 87, '12', 0),
(348, 87, '15', 0),
(349, 88, '54', 1),
(350, 88, '45', 0),
(351, 88, '48', 0),
(352, 88, '63', 0),
(353, 89, '6.25', 1),
(354, 89, '5.5', 0),
(355, 89, '6', 0),
(356, 89, '7', 0),
(357, 90, '225', 1),
(358, 90, '210', 0),
(359, 90, '240', 0),
(360, 90, '250', 0),
(361, 91, '7', 1),
(362, 91, '8', 0),
(363, 91, '6', 0),
(364, 91, '9', 0),
(365, 92, '8', 1),
(366, 92, '7', 0),
(367, 92, '6', 0),
(368, 92, '9', 0),
(369, 93, '28', 1),
(370, 93, '24', 0),
(371, 93, '30', 0),
(372, 93, '35', 0),
(373, 94, '9', 1),
(374, 94, '8', 0),
(375, 94, '10', 0),
(376, 94, '7', 0),
(377, 95, '8', 1),
(378, 95, '7', 0),
(379, 95, '6', 0),
(380, 95, '9', 0),
(381, 96, '7', 1),
(382, 96, '6', 0),
(383, 96, '8', 0),
(384, 96, '9', 0),
(385, 97, '13', 1),
(386, 97, '14', 0),
(387, 97, '12', 0),
(388, 97, '15', 0),
(389, 98, '54', 1),
(390, 98, '45', 0),
(391, 98, '48', 0),
(392, 98, '63', 0),
(393, 99, '6.25', 1),
(394, 99, '5.5', 0),
(395, 99, '6', 0),
(396, 99, '7', 0),
(397, 100, '225', 1),
(398, 100, '210', 0),
(399, 100, '240', 0),
(400, 100, '250', 0),
(401, 101, '7', 1),
(402, 101, '8', 0),
(403, 101, '6', 0),
(404, 101, '9', 0),
(405, 102, '8', 1),
(406, 102, '7', 0),
(407, 102, '6', 0),
(408, 102, '9', 0),
(409, 103, '28', 1),
(410, 103, '24', 0),
(411, 103, '30', 0),
(412, 103, '35', 0),
(413, 104, '9', 1),
(414, 104, '8', 0),
(415, 104, '10', 0),
(416, 104, '7', 0);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id_comments` int NOT NULL,
  `id_post` int NOT NULL,
  `id_users` int NOT NULL,
  `comment` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id_comments`, `id_post`, `id_users`, `comment`, `createdAt`, `updatedAt`) VALUES
(26, 56, 1, 'wahai jamaludin', '2023-09-18 05:32:14', '2023-09-18 05:32:14'),
(27, 55, 2, 'pak kenapa ulun 0 pak', '2023-09-18 05:37:23', '2023-09-18 05:37:23'),
(28, 55, 1, 'ikam minus akhlak jadi pang 0', '2023-09-18 05:37:44', '2023-09-18 05:37:44'),
(29, 55, 2, 'ada remed kah pak', '2023-09-18 05:38:34', '2023-09-18 05:38:34'),
(30, 55, 1, 'kdd mun gasan ikan', '2023-09-18 05:38:42', '2023-09-18 05:38:42'),
(31, 58, 2, 'ada remed kah pak', '2023-09-18 05:49:59', '2023-09-18 05:49:59'),
(32, 58, 1, 'tf ke rek bapa 100K', '2023-09-18 05:50:12', '2023-09-18 05:50:12'),
(33, 58, 2, '200 nah pak', '2023-09-18 05:50:19', '2023-09-18 05:50:19'),
(34, 58, 1, 'sip langsung A nilai ikam', '2023-09-18 05:50:32', '2023-09-18 05:50:32'),
(35, 58, 1, 'teting', '2023-09-19 00:19:32', '2023-09-19 00:19:32'),
(36, 58, 1, 'oke pak', '2023-09-19 00:24:35', '2023-09-19 00:24:35'),
(37, 58, 1, 'libur pak ?', '2023-09-19 00:25:14', '2023-09-19 00:25:14'),
(38, 58, 1, 'oke aja nih ', '2023-09-19 00:25:22', '2023-09-19 00:25:22'),
(39, 58, 1, 'okakaka', '2023-09-19 00:26:28', '2023-09-19 00:26:28'),
(40, 58, 1, 'kdd libur', '2023-09-19 00:27:49', '2023-09-19 00:27:49'),
(41, 58, 1, 'muyak', '2023-09-19 00:28:22', '2023-09-19 00:28:22'),
(42, 58, 1, 'mauk', '2023-09-19 00:28:55', '2023-09-19 00:28:55'),
(43, 58, 1, 'muyak', '2023-09-19 00:29:01', '2023-09-19 00:29:01'),
(44, 58, 1, 'muyak lagi', '2023-09-19 00:29:07', '2023-09-19 00:29:07'),
(45, 58, 1, 'tambahi lagi', '2023-09-19 00:32:04', '2023-09-19 00:32:04'),
(46, 58, 1, 'sdasd', '2023-09-19 00:32:57', '2023-09-19 00:32:57'),
(47, 58, 1, 'jamal', '2023-09-19 00:33:44', '2023-09-19 00:33:44'),
(48, 58, 1, 'tambahi lagi', '2023-09-19 00:33:56', '2023-09-19 00:33:56'),
(49, 58, 1, 'taipan', '2023-09-19 00:34:46', '2023-09-19 00:34:46'),
(50, 58, 1, 'iyakah', '2023-09-19 00:35:08', '2023-09-19 00:35:08'),
(51, 58, 1, 'okeh', '2023-09-19 00:35:28', '2023-09-19 00:35:28'),
(52, 58, 1, 'tambahi', '2023-09-19 00:36:02', '2023-09-19 00:36:02'),
(53, 58, 1, 'push ', '2023-09-19 00:36:30', '2023-09-19 00:36:30'),
(54, 58, 1, 'okekkee', '2023-09-19 00:36:42', '2023-09-19 00:36:42'),
(55, 58, 1, 'adasda', '2023-09-19 00:37:16', '2023-09-19 00:37:16'),
(56, 58, 1, 'asdasd', '2023-09-19 00:38:17', '2023-09-19 00:38:17'),
(57, 58, 1, 'daaaaaaaaaaaaaaaaaa', '2023-09-19 00:38:43', '2023-09-19 00:38:43'),
(58, 58, 1, 'asdaaaaa', '2023-09-19 00:39:09', '2023-09-19 00:39:09'),
(59, 58, 1, 'asd', '2023-09-19 00:39:26', '2023-09-19 00:39:26'),
(60, 58, 1, 'asd', '2023-09-19 00:39:40', '2023-09-19 00:39:40'),
(61, 58, 1, 'asdad', '2023-09-19 00:40:19', '2023-09-19 00:40:19'),
(62, 58, 1, 'asdad', '2023-09-19 00:40:35', '2023-09-19 00:40:35'),
(63, 58, 1, 'aaaaaaaaaaaaaaaaaaaaaa', '2023-09-19 00:40:38', '2023-09-19 00:40:38'),
(64, 58, 1, 'aaaaaaaaaaaa', '2023-09-19 00:40:50', '2023-09-19 00:40:50'),
(65, 58, 1, 'aaaaaaaaaaaaaa', '2023-09-19 00:40:54', '2023-09-19 00:40:54'),
(66, 58, 1, 'a', '2023-09-19 00:41:14', '2023-09-19 00:41:14'),
(67, 58, 1, 'a', '2023-09-19 00:41:28', '2023-09-19 00:41:28'),
(68, 58, 1, 'asdasd', '2023-09-19 00:41:52', '2023-09-19 00:41:52'),
(69, 58, 1, 'asdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', '2023-09-19 00:42:34', '2023-09-19 00:42:34'),
(70, 58, 1, 'asddddddd', '2023-09-19 00:43:01', '2023-09-19 00:43:01'),
(71, 51, 1, 'asdddddddddddddd', '2023-09-19 00:44:33', '2023-09-19 00:44:33'),
(72, 51, 1, 'addddddddddd', '2023-09-19 00:44:36', '2023-09-19 00:44:36'),
(73, 51, 1, 'asddddd', '2023-09-19 00:45:09', '2023-09-19 00:45:09'),
(74, 51, 1, 'aaaaaaaaaaaaaaaaaaaaaaaaaa', '2023-09-19 00:45:34', '2023-09-19 00:45:34'),
(75, 51, 1, 'adddddd', '2023-09-19 00:46:44', '2023-09-19 00:46:44'),
(76, 51, 1, 'asdasdasd', '2023-09-19 00:47:13', '2023-09-19 00:47:13'),
(77, 51, 1, 'asdasda', '2023-09-19 00:48:28', '2023-09-19 00:48:28'),
(78, 51, 1, 'asdasd', '2023-09-19 00:48:58', '2023-09-19 00:48:58'),
(79, 51, 1, 'asdasdasd', '2023-09-19 00:49:05', '2023-09-19 00:49:05'),
(80, 51, 1, 'assaas', '2023-09-19 00:49:41', '2023-09-19 00:49:41'),
(81, 51, 1, 'mkkk', '2023-09-19 00:49:47', '2023-09-19 00:49:47'),
(82, 51, 1, 'munadi', '2023-09-19 00:49:51', '2023-09-19 00:49:51'),
(83, 51, 1, 'yoi', '2023-09-19 00:50:00', '2023-09-19 00:50:00'),
(84, 51, 1, 'mkmkmk', '2023-09-19 00:50:22', '2023-09-19 00:50:22'),
(85, 51, 1, 'asda', '2023-09-19 00:51:00', '2023-09-19 00:51:00'),
(86, 51, 1, 'aa', '2023-09-19 00:51:18', '2023-09-19 00:51:18'),
(87, 51, 1, 'as', '2023-09-19 00:51:32', '2023-09-19 00:51:32'),
(88, 51, 1, 'asdasd', '2023-09-19 00:52:51', '2023-09-19 00:52:51'),
(89, 51, 1, 'miqum', '2023-09-19 00:53:01', '2023-09-19 00:53:01'),
(90, 51, 1, 'asdasdsad', '2023-09-19 00:53:47', '2023-09-19 00:53:47'),
(91, 51, 1, 'aaaaaaaaaaaaaaaa', '2023-09-19 00:53:57', '2023-09-19 00:53:57'),
(92, 51, 1, 'as', '2023-09-19 00:54:26', '2023-09-19 00:54:26'),
(93, 51, 1, 'mkkmk', '2023-09-19 00:54:42', '2023-09-19 00:54:42'),
(94, 51, 1, 'das', '2023-09-19 00:55:18', '2023-09-19 00:55:18'),
(95, 51, 1, 'm', '2023-09-19 00:55:37', '2023-09-19 00:55:37'),
(96, 51, 1, 'a', '2023-09-19 00:56:23', '2023-09-19 00:56:23'),
(97, 51, 1, 'm', '2023-09-19 00:57:02', '2023-09-19 00:57:02'),
(98, 51, 1, 'a', '2023-09-19 00:58:01', '2023-09-19 00:58:01'),
(99, 51, 1, 'sad', '2023-09-19 00:58:50', '2023-09-19 00:58:50'),
(100, 51, 1, 'a', '2023-09-19 00:59:25', '2023-09-19 00:59:25'),
(101, 51, 1, 'aaa', '2023-09-19 00:59:34', '2023-09-19 00:59:34'),
(102, 51, 1, 'a', '2023-09-19 01:00:57', '2023-09-19 01:00:57'),
(103, 51, 1, 'ads', '2023-09-19 01:03:38', '2023-09-19 01:03:38'),
(104, 51, 1, 'baru', '2023-09-19 01:03:51', '2023-09-19 01:03:51'),
(105, 51, 1, 'baru 2', '2023-09-19 01:04:28', '2023-09-19 01:04:28'),
(106, 51, 1, 'asd', '2023-09-19 01:04:58', '2023-09-19 01:04:58'),
(107, 51, 1, 'asd', '2023-09-19 01:05:39', '2023-09-19 01:05:39'),
(108, 51, 1, 'sadasd', '2023-09-19 01:06:07', '2023-09-19 01:06:07'),
(109, 51, 1, 'ads', '2023-09-19 01:06:30', '2023-09-19 01:06:30'),
(110, 51, 1, 'ads', '2023-09-19 01:06:36', '2023-09-19 01:06:36'),
(111, 51, 1, 'asd', '2023-09-19 01:06:58', '2023-09-19 01:06:58'),
(112, 51, 1, 'sad', '2023-09-19 01:07:20', '2023-09-19 01:07:20'),
(113, 51, 1, 'das', '2023-09-19 01:07:41', '2023-09-19 01:07:41'),
(114, 51, 1, 'asd', '2023-09-19 01:08:25', '2023-09-19 01:08:25'),
(115, 51, 1, 'das', '2023-09-19 01:08:46', '2023-09-19 01:08:46'),
(116, 51, 1, 'ads', '2023-09-19 01:09:22', '2023-09-19 01:09:22'),
(117, 51, 1, 'ds', '2023-09-19 01:09:48', '2023-09-19 01:09:48'),
(118, 51, 1, 'a', '2023-09-19 01:10:28', '2023-09-19 01:10:28'),
(119, 51, 1, 'a', '2023-09-19 01:10:51', '2023-09-19 01:10:51'),
(120, 51, 1, 'da', '2023-09-19 01:11:43', '2023-09-19 01:11:43'),
(121, 51, 1, 'adsads', '2023-09-19 01:12:04', '2023-09-19 01:12:04'),
(122, 51, 1, 'ads', '2023-09-19 01:12:28', '2023-09-19 01:12:28'),
(123, 51, 1, 'das', '2023-09-19 01:12:51', '2023-09-19 01:12:51'),
(124, 51, 1, 'da', '2023-09-19 01:13:40', '2023-09-19 01:13:40'),
(125, 51, 1, 'asd', '2023-09-19 01:14:14', '2023-09-19 01:14:14'),
(126, 51, 1, 'a', '2023-09-19 01:14:47', '2023-09-19 01:14:47'),
(127, 51, 1, 'b', '2023-09-19 01:14:52', '2023-09-19 01:14:52'),
(128, 51, 1, 'c', '2023-09-19 01:14:55', '2023-09-19 01:14:55'),
(129, 51, 1, 'd', '2023-09-19 01:14:58', '2023-09-19 01:14:58'),
(130, 51, 1, 'e', '2023-09-19 01:15:00', '2023-09-19 01:15:00'),
(131, 51, 1, 'a', '2023-09-19 01:15:15', '2023-09-19 01:15:15'),
(132, 51, 1, 'a', '2023-09-19 01:15:45', '2023-09-19 01:15:45'),
(133, 51, 1, 'a', '2023-09-19 01:15:48', '2023-09-19 01:15:48'),
(134, 51, 1, 'd', '2023-09-19 01:15:52', '2023-09-19 01:15:52'),
(135, 51, 1, 'd', '2023-09-19 01:15:54', '2023-09-19 01:15:54'),
(136, 51, 1, 'c', '2023-09-19 01:15:57', '2023-09-19 01:15:57'),
(137, 51, 1, 'f', '2023-09-19 01:16:00', '2023-09-19 01:16:00'),
(138, 51, 1, 'e', '2023-09-19 01:16:02', '2023-09-19 01:16:02'),
(139, 51, 1, 'ads', '2023-09-19 01:17:44', '2023-09-19 01:17:44'),
(140, 51, 1, 'a', '2023-09-19 01:18:09', '2023-09-19 01:18:09'),
(141, 51, 1, 'a', '2023-09-19 01:18:32', '2023-09-19 01:18:32'),
(142, 51, 1, 'a', '2023-09-19 01:19:04', '2023-09-19 01:19:04'),
(143, 51, 1, 'sad', '2023-09-19 01:19:32', '2023-09-19 01:19:32'),
(144, 51, 1, 'qwe', '2023-09-19 01:19:48', '2023-09-19 01:19:48'),
(145, 51, 1, 'q', '2023-09-19 01:20:22', '2023-09-19 01:20:22'),
(146, 51, 1, 'a', '2023-09-19 01:21:47', '2023-09-19 01:21:47'),
(147, 51, 1, 'dsa', '2023-09-19 01:22:50', '2023-09-19 01:22:50'),
(148, 51, 1, 'das', '2023-09-19 01:24:06', '2023-09-19 01:24:06'),
(149, 51, 1, 'dsa', '2023-09-19 01:24:10', '2023-09-19 01:24:10'),
(150, 51, 1, 'sad', '2023-09-19 01:24:16', '2023-09-19 01:24:16'),
(151, 34, 1, 'ga kenal sok asik', '2023-09-19 01:24:34', '2023-09-19 01:24:34'),
(152, 34, 1, 'k', '2023-09-19 01:24:54', '2023-09-19 01:24:54'),
(153, 34, 1, 'a', '2023-09-19 01:25:20', '2023-09-19 01:25:20'),
(154, 34, 1, 'a', '2023-09-19 01:25:34', '2023-09-19 01:25:34'),
(155, 34, 1, 'a', '2023-09-19 01:25:42', '2023-09-19 01:25:42'),
(156, 34, 1, 'c', '2023-09-19 01:25:43', '2023-09-19 01:25:43'),
(157, 34, 1, 'd', '2023-09-19 01:25:45', '2023-09-19 01:25:45'),
(158, 34, 1, 'a', '2023-09-19 01:27:07', '2023-09-19 01:27:07'),
(159, 34, 1, 'as', '2023-09-19 01:28:43', '2023-09-19 01:28:43'),
(160, 34, 1, 'dsa', '2023-09-19 01:29:10', '2023-09-19 01:29:10'),
(161, 34, 1, 'dasads', '2023-09-19 01:29:28', '2023-09-19 01:29:28'),
(162, 34, 1, 'das', '2023-09-19 01:29:55', '2023-09-19 01:29:55'),
(163, 34, 1, 'da', '2023-09-19 01:29:59', '2023-09-19 01:29:59'),
(164, 34, 1, 'a', '2023-09-19 01:30:15', '2023-09-19 01:30:15'),
(165, 34, 1, 'a', '2023-09-19 01:31:47', '2023-09-19 01:31:47'),
(166, 34, 1, 'a', '2023-09-19 01:35:29', '2023-09-19 01:35:29'),
(167, 34, 1, 'asdasd', '2023-09-19 01:35:59', '2023-09-19 01:35:59'),
(168, 34, 1, 'dsaaaaaaaaaaaaa', '2023-09-19 01:36:06', '2023-09-19 01:36:06'),
(169, 34, 1, 'das', '2023-09-19 01:36:33', '2023-09-19 01:36:33'),
(170, 34, 1, 'baru', '2023-09-19 01:36:41', '2023-09-19 01:36:41'),
(171, 34, 1, 'baru 2', '2023-09-19 01:49:47', '2023-09-19 01:49:47'),
(172, 34, 1, 'baru2', '2023-09-19 01:50:05', '2023-09-19 01:50:05'),
(173, 34, 1, 'testing', '2023-09-19 01:53:18', '2023-09-19 01:53:18'),
(174, 34, 1, 'bongkar', '2023-09-19 01:56:21', '2023-09-19 01:56:21'),
(175, 34, 1, 'tmbahi lagi', '2023-09-19 01:56:43', '2023-09-19 01:56:43'),
(176, 58, 1, 'ads', '2023-09-19 01:57:27', '2023-09-19 01:57:27'),
(177, 59, 2, 'remed kah pak', '2023-09-19 03:58:12', '2023-09-19 03:58:12'),
(178, 60, 2, 'tes 123', '2023-09-19 15:26:57', '2023-09-19 15:26:57'),
(179, 60, 1, 'Tes jua ', '2023-09-19 15:27:32', '2023-09-19 15:27:32'),
(180, 60, 2, 'remed kah pak', '2023-09-19 15:27:52', '2023-09-19 15:27:52'),
(181, 60, 1, 'Kdd remed gasan ikam', '2023-09-19 15:28:06', '2023-09-19 15:28:06'),
(182, 60, 1, 'Aja pak , umpat betakun adakah seratus', '2023-09-19 15:28:46', '2023-09-19 15:28:46'),
(183, 60, 2, 'kdd bisi 200 ada ai nh', '2023-09-19 15:29:05', '2023-09-19 15:29:05'),
(184, 61, 1, 'Seratus adakah ?', '2023-09-19 15:34:14', '2023-09-19 15:34:14'),
(185, 61, 2, 'kdd', '2023-09-19 15:35:04', '2023-09-19 15:35:04'),
(186, 61, 1, 'Syulit', '2023-09-19 15:35:17', '2023-09-19 15:35:17'),
(187, 51, 1, 'Sada', '2023-09-19 15:46:12', '2023-09-19 15:46:12'),
(188, 60, 1, 'Komentar Anda disini', '2023-09-24 11:52:01', '2023-09-24 11:52:01'),
(189, 60, 1, 'Komentar Anda disini', '2023-09-24 11:52:16', '2023-09-24 11:52:16'),
(190, 60, 1, 'oke', '2023-09-24 11:53:31', '2023-09-24 11:53:31'),
(191, 60, 1, 'oke aja kah ', '2023-09-24 11:53:47', '2023-09-24 11:53:47'),
(192, 60, 1, 'asddddddddd', '2023-09-24 11:58:49', '2023-09-24 11:58:49'),
(193, 60, 1, 'oke aja kah ', '2023-09-24 11:59:16', '2023-09-24 11:59:16'),
(194, 60, 1, 'oke aja kah ', '2023-09-24 11:59:16', '2023-09-24 11:59:16'),
(195, 60, 1, 'oke aja kah ', '2023-09-24 11:59:17', '2023-09-24 11:59:17'),
(196, 60, 1, 'ads', '2023-09-24 12:01:06', '2023-09-24 12:01:06'),
(197, 60, 1, 'ads', '2023-09-24 12:01:06', '2023-09-24 12:01:06'),
(198, 60, 1, 'ads', '2023-09-24 12:01:07', '2023-09-24 12:01:07'),
(199, 60, 1, 'ads', '2023-09-24 12:01:07', '2023-09-24 12:01:07'),
(200, 60, 1, 'ads', '2023-09-24 12:01:16', '2023-09-24 12:01:16'),
(201, 60, 1, 'ads', '2023-09-24 12:01:17', '2023-09-24 12:01:17'),
(202, 60, 1, 'ads', '2023-09-24 12:03:05', '2023-09-24 12:03:05'),
(203, 60, 1, 'ads', '2023-09-24 12:03:13', '2023-09-24 12:03:13'),
(204, 60, 1, 'ads', '2023-09-24 12:03:37', '2023-09-24 12:03:37'),
(205, 60, 1, 'das', '2023-09-24 12:04:29', '2023-09-24 12:04:29'),
(206, 60, 1, 'dasa', '2023-09-24 12:04:34', '2023-09-24 12:04:34'),
(207, 60, 1, 'dasaa', '2023-09-24 12:04:38', '2023-09-24 12:04:38'),
(208, 60, 1, 'aaaaaa', '2023-09-24 12:06:20', '2023-09-24 12:06:20'),
(209, 60, 1, 'aaaaaa', '2023-09-24 12:06:23', '2023-09-24 12:06:23'),
(210, 60, 1, 'aaaaaa', '2023-09-24 12:06:25', '2023-09-24 12:06:25'),
(211, 60, 1, 'aaaaaa', '2023-09-24 12:07:04', '2023-09-24 12:07:04'),
(212, 60, 1, 'aaaaaa', '2023-09-24 12:07:23', '2023-09-24 12:07:23'),
(213, 60, 1, 'aaaaaa', '2023-09-24 12:08:45', '2023-09-24 12:08:45'),
(214, 60, 1, 'aaaaaa', '2023-09-24 12:14:09', '2023-09-24 12:14:09'),
(215, 60, 1, 'aaaaaa', '2023-09-24 12:14:17', '2023-09-24 12:14:17'),
(216, 60, 1, 'aaaaaa', '2023-09-24 12:14:20', '2023-09-24 12:14:20'),
(217, 60, 1, 'aaaaaa', '2023-09-24 12:14:24', '2023-09-24 12:14:24'),
(218, 60, 1, 'aaaaaa', '2023-09-24 12:14:28', '2023-09-24 12:14:28'),
(219, 60, 1, 'aaaaaa', '2023-09-24 12:16:27', '2023-09-24 12:16:27'),
(220, 60, 1, 'aaaaaa', '2023-09-24 12:16:28', '2023-09-24 12:16:28'),
(221, 60, 1, 'aaaaaa', '2023-09-24 12:21:43', '2023-09-24 12:21:43'),
(222, 60, 1, 'aaaaaa', '2023-09-24 12:21:49', '2023-09-24 12:21:49'),
(223, 60, 1, 'aaaaaa', '2023-09-24 12:24:16', '2023-09-24 12:24:16'),
(224, 60, 1, 'aaaaaa', '2023-09-24 12:24:19', '2023-09-24 12:24:19'),
(225, 60, 1, 'aaaaaa', '2023-09-24 12:24:22', '2023-09-24 12:24:22'),
(226, 60, 1, 'aaaaaa', '2023-09-24 12:24:36', '2023-09-24 12:24:36'),
(227, 1, 1, 'asd', '2023-09-24 12:31:42', '2023-09-24 12:31:42'),
(228, 1, 1, 'asda', '2023-09-24 12:36:43', '2023-09-24 12:36:43'),
(229, 1, 1, 'asdasd', '2023-09-24 12:36:49', '2023-09-24 12:36:49'),
(230, 1, 1, 'ad', '2023-09-24 12:36:53', '2023-09-24 12:36:53'),
(231, 1, 1, 'ad', '2023-09-24 12:37:23', '2023-09-24 12:37:23');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id_course` int NOT NULL,
  `id_users` int DEFAULT NULL,
  `course` varchar(255) DEFAULT NULL,
  `desc_course` text,
  `academy` varchar(100) DEFAULT NULL,
  `course_code` varchar(50) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id_course`, `id_users`, `course`, `desc_course`, `academy`, `course_code`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Belajar Javascript', 'Belajar Javascript DOM', 'Enjoy Aman', 'o)IWKkN_f', '2023-09-03 11:03:51', '2023-09-03 11:03:51'),
(3, 1, 'CSS CUY', 'asdasdas', 'asdasdads', 'E1Z1Wfguf', '2023-09-05 02:03:53', '2023-09-05 02:03:53'),
(4, 2, 'Testin', 'asdasdasdasd', 'asdasda', 'eKqKFXnmj', '2023-09-05 02:47:49', '2023-09-05 02:47:49'),
(5, 2, 'WebSocket ', 'Ini Course WebSocket', 'Enjoy Aman', 'websocket', '2023-09-05 12:38:17', '2023-09-05 12:38:17');

-- --------------------------------------------------------

--
-- Table structure for table `coursemembers`
--

CREATE TABLE `coursemembers` (
  `id_member` int NOT NULL,
  `id_course` int NOT NULL,
  `id_users` int NOT NULL,
  `status_member` enum('member','instruktur') DEFAULT NULL,
  `join_at` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `coursemembers`
--

INSERT INTO `coursemembers` (`id_member`, `id_course`, `id_users`, `status_member`, `join_at`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 'instruktur', '2023-09-03 11:03:51', '2023-09-03 11:03:51', '2023-09-03 11:03:51'),
(2, 1, 2, 'member', '2023-09-03 11:53:41', '2023-09-03 11:53:41', '2023-09-03 11:53:41'),
(4, 3, 1, 'instruktur', '2023-09-05 02:03:53', '2023-09-05 02:03:53', '2023-09-05 02:03:53'),
(5, 4, 2, 'instruktur', '2023-09-05 02:47:49', '2023-09-05 02:47:49', '2023-09-05 02:47:49'),
(6, 5, 2, 'instruktur', '2023-09-05 12:38:17', '2023-09-05 12:38:17', '2023-09-05 12:38:17'),
(7, 5, 1, 'member', '2023-09-05 12:39:57', '2023-09-05 12:39:57', '2023-09-05 12:39:57');

-- --------------------------------------------------------

--
-- Table structure for table `gps_presensi`
--

CREATE TABLE `gps_presensi` (
  `id_presensi` int NOT NULL,
  `name_location` varchar(255) NOT NULL,
  `gps_latitude` decimal(10,8) NOT NULL,
  `gps_longitude` decimal(11,8) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `log_presensi`
--

CREATE TABLE `log_presensi` (
  `id_log_presensi` int NOT NULL,
  `id_presensi` int NOT NULL,
  `id_users` int NOT NULL,
  `type_presensi` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `desc` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `nilai_tugas`
--

CREATE TABLE `nilai_tugas` (
  `id_nilai_tugas` int NOT NULL,
  `id_tugas_submission` int NOT NULL,
  `id_users` int NOT NULL,
  `nilai` varchar(3) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `nilai_tugas`
--

INSERT INTO `nilai_tugas` (`id_nilai_tugas`, `id_tugas_submission`, `id_users`, `nilai`, `createdAt`, `updatedAt`) VALUES
(3, 6, 2, '65', '2023-09-10 07:37:17', '2023-09-10 07:37:17');

-- --------------------------------------------------------

--
-- Table structure for table `otp`
--

CREATE TABLE `otp` (
  `id_otp` int NOT NULL,
  `otp` varchar(20) NOT NULL,
  `otp_expires` datetime(6) NOT NULL,
  `id_users` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `otp`
--

INSERT INTO `otp` (`id_otp`, `otp`, `otp_expires`, `id_users`, `createdAt`, `updatedAt`) VALUES
(3, '554350', '2023-09-06 09:24:35.892000', 3, '2023-09-06 09:14:37', '2023-09-06 09:14:37');

-- --------------------------------------------------------

--
-- Table structure for table `pengumuman`
--

CREATE TABLE `pengumuman` (
  `id_pengumuman` int NOT NULL,
  `id_post` int NOT NULL,
  `konten` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pengumuman`
--

INSERT INTO `pengumuman` (`id_pengumuman`, `id_post`, `konten`) VALUES
(1, 1, 'Halo Guys'),
(3, 34, '<p><strong>Hai Selamat Datang</strong></p>'),
(7, 39, '<p><strong>Besok Kita Praktiukun&nbsp;</strong></p>\n<p>Dan Yang Perlu Di Persiapkan Adalah Sebagai Berikut</p>\n<ol>\n  <li>Xampp</li>\n  <li>Vs Code</li>\n</ol>\n<p><br></p>'),
(16, 51, '<h1>Pengumuman Praktikum Web 1</h1><p>Kepada seluruh mahasiswa dan mahasiswi yang mengambil mata kuliah Praktikum Web 1,</p><p>Kami dengan senang hati ingin memberikan pengumuman terkait praktikum yang akan segera dimulai. Berikut informasi lengkapnya:</p><p>Jadwal Praktikum:</p><ul><li>Hari: Setiap Selasa dan Kamis</li><li>Waktu: Pukul 09:00 - 11:30 WIB</li><li>Lokasi: Ruang Praktikum Web (Gedung A, Lantai 3)</li></ul><p>Pemateri:</p><ul><li>Dr. John Doe</li><li>Dr. Jane Smith</li></ul><p>Deskripsi Praktikum:</p><p>Praktikum Web 1 adalah mata kuliah yang akan membawa Anda ke dalam dunia pengembangan web. Anda akan belajar mengenai dasar-dasar pemrograman web, HTML, CSS, dan JavaScript. Praktikum ini dirancang untuk memperkenalkan Anda pada konsep-konsep kunci yang diperlukan untuk membuat halaman web yang interaktif dan responsif.</p><p>Persyaratan Praktikum:</p><ul><li>Harap hadir tepat waktu di setiap pertemuan praktikum.</li><li>Pastikan membawa laptop dan charger saat mengikuti praktikum.</li><li>Instal perangkat lunak yang diperlukan sebelum praktikum dimulai (instruksi akan diberikan pada pertemuan pertama).</li><li>Kerjakan tugas praktikum dengan penuh dedikasi dan ikuti instruksi dari dosen dan asisten praktikum.</li></ul><p>Bahan Referensi:</p><ul><li>\"Web Development Fundamentals\" oleh John Doe (Buku Teks)</li><li>Tutorial online dan sumber daya lainnya akan disediakan selama praktikum.</li></ul><p>Evaluasi:</p><ul><li>Tugas-tugas praktikum individu</li><li>Proyek akhir praktikum</li></ul><p>Kontak:</p><ul><li>Dr. John Doe (<a href=\"mailto:john.doe@email.com\" rel=\"noopener noreferrer\" target=\"_blank\">john.doe@email.com</a>)</li><li>Dr. Jane Smith (<a href=\"mailto:jane.smith@email.com\" rel=\"noopener noreferrer\" target=\"_blank\">jane.smith@email.com</a>)</li><li>Asisten Praktikum (<a href=\"mailto:asisten.praktikum@email.com\" rel=\"noopener noreferrer\" target=\"_blank\">asisten.praktikum@email.com</a>)</li></ul><p>Silakan jangan ragu untuk menghubungi dosen atau asisten praktikum jika Anda memiliki pertanyaan atau kebutuhan khusus.</p><p>Kami berharap Anda akan memiliki pengalaman yang berharga dalam mata kuliah Praktikum Web 1 ini dan menikmati perjalanan Anda dalam mempelajari pengembangan web.</p><p>Salam,</p><p>[Universitas Anda]</p><p>[Program Studi Anda]</p>');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id_post` int NOT NULL,
  `id_course` int NOT NULL,
  `id_users` int NOT NULL,
  `judul` varchar(100) DEFAULT NULL,
  `typePost` enum('Pengumuman','Presensi','Kuis','Tugas') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id_post`, `id_course`, `id_users`, `judul`, `typePost`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 'Pengumuman Sun Sep 03 2023 11:04:10 GMT+0000 (Coordinated Universal Time)', 'Pengumuman', '2023-09-03 11:04:10', '2023-09-03 11:04:10'),
(13, 1, 1, 'Tugas 2023-09-05T02:57:58.326Z', 'Tugas', '2023-09-05 02:57:58', '2023-09-05 02:57:58'),
(15, 5, 2, 'Tugas 2023-09-05T12:39:20.190Z', 'Tugas', '2023-09-05 12:39:20', '2023-09-05 12:39:20'),
(34, 1, 1, 'Pengumuman Sat Sep 09 2023 05:22:10 GMT+0000 (Coordinated Universal Time)', 'Pengumuman', '2023-09-09 05:22:10', '2023-09-09 05:22:10'),
(39, 1, 1, 'Pengumuman Sat Sep 09 2023 22:48:28 GMT+0000 (Coordinated Universal Time)', 'Pengumuman', '2023-09-09 22:48:28', '2023-09-09 22:48:28'),
(51, 1, 1, 'Pengumuman Sun Sep 10 2023 01:24:33 GMT+0000 (Coordinated Universal Time)', 'Pengumuman', '2023-09-10 01:24:33', '2023-09-10 01:24:33'),
(54, 1, 1, 'Kuis Pemrograman', 'Kuis', '2023-09-15 10:11:55', '2023-09-15 10:11:55'),
(55, 1, 1, 'Quiz Dua', 'Kuis', '2023-09-15 10:28:34', '2023-09-15 10:28:34'),
(56, 1, 1, 'Quiz Testing', 'Kuis', '2023-09-15 22:53:34', '2023-09-15 22:53:34'),
(58, 1, 1, 'Quiz 1', 'Kuis', '2023-09-18 05:43:09', '2023-09-18 05:43:09'),
(59, 1, 1, 'Quiz Testing', 'Kuis', '2023-09-19 02:30:59', '2023-09-19 02:30:59'),
(60, 1, 1, 'Uji Pengetahuan JavaScript', 'Kuis', '2023-09-19 04:01:59', '2023-09-19 04:01:59'),
(61, 5, 2, 'Kuis Pemrograman', 'Kuis', '2023-09-19 15:32:03', '2023-09-19 15:32:03');

-- --------------------------------------------------------

--
-- Table structure for table `presensi`
--

CREATE TABLE `presensi` (
  `id_presensi` int NOT NULL,
  `id_post` int NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `presensi_type` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `qrcode_presensi`
--

CREATE TABLE `qrcode_presensi` (
  `id_presensi` int NOT NULL,
  `qrcode_token` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id_question` int NOT NULL,
  `id_quiz` int NOT NULL,
  `question` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id_question`, `id_quiz`, `question`) VALUES
(1, 1, 'Apa yang dimaksud dengan \"Object-Oriented Programming\" (OOP) dalam pemrograman?\r\n'),
(2, 1, 'Apa itu \"Abstraction\" (abstraksi) dalam OOP?\r\n'),
(3, 1, 'Apa yang dimaksud dengan \"Encapsulation\" (enkapsulasi) dalam OOP?\r\n'),
(4, 1, 'Apa perbedaan antara \"Static Binding\" dan \"Dynamic Binding\" dalam OOP?\r\n'),
(5, 1, 'Apa yang dimaksud dengan \"Polymorphism\" (polimorfisme) dalam OOP?\r\n'),
(6, 1, 'Apa yang dimaksud dengan \"Operator Overloading\" dalam OOP?\r\n'),
(7, 1, 'Apa itu \"Inheritance\" (pewarisan) dalam OOP?\r\n'),
(8, 1, 'Apa yang dimaksud dengan \"Abstract Class\" dalam OOP?\r\n'),
(9, 1, 'Apa itu \"Interface\" dalam OOP?\r\n'),
(10, 1, 'Bagaimana Anda menghindari \"Diamond Problem\" dalam multiple inheritance?\r\n'),
(11, 1, 'Apa yang dimaksud dengan \"Garbage Collection\" dalam pemrograman?\r\n'),
(12, 1, 'Apa itu \"Singleton Pattern\" dalam desain perangkat lunak?\r\n'),
(13, 1, 'Apa yang dimaksud dengan \"Design Patterns\" dalam pemrograman berorientasi objek?\r\n'),
(14, 1, 'Apa itu \"Dependency Injection\" dalam pemrograman berorientasi objek?\r\n'),
(15, 1, 'Apa yang dimaksud dengan \"Big O notation\" dalam analisis kinerja algoritma?\r\n'),
(16, 1, 'Apa yang dimaksud dengan \"Recursion\" (rekursi) dalam pemrograman?\r\n'),
(17, 1, 'Apa yang dimaksud dengan \"Functional Programming\" (pemrograman fungsional)?\r\n'),
(18, 1, 'Apa yang dimaksud dengan \"Concurrency\" dalam pemrograman?\r\n'),
(19, 1, 'Apa yang dimaksud dengan \"Race Condition\" dalam pemrograman konkurensi?\r\n'),
(20, 1, 'Apa yang dimaksud dengan \"Caching\" dalam konteks pengembangan web?\r\n'),
(21, 1, 'Apa yang dimaksud dengan \"Closure\" dalam JavaScript?\r\n'),
(22, 1, 'Apa itu \"Hoisting\" dalam JavaScript?\r\n'),
(23, 1, 'Apa yang dimaksud dengan \"Event Bubbling\" dalam JavaScript?\r\n'),
(24, 1, 'Apa yang dimaksud dengan \"Callback Hell\" dalam JavaScript?\r\n'),
(25, 1, 'Apa itu \"Promise\" dalam JavaScript?\r\n'),
(26, 1, 'Apa yang dimaksud dengan \"Arrow Function\" dalam JavaScript?\r\n'),
(27, 1, 'Bagaimana Anda mendeklarasikan variabel dalam JavaScript menggunakan \"let\"?\r\n'),
(28, 1, 'Apa yang dimaksud dengan \"Destructuring Assignment\" dalam JavaScript?\r\n'),
(29, 1, 'Apa itu \"Async/Await\" dalam JavaScript?\r\n'),
(30, 1, 'Apa yang dimaksud dengan \"DOM\" dalam JavaScript?\r\n'),
(31, 1, 'Apa perbedaan antara \"null\" dan \"undefined\" dalam JavaScript?\r\n'),
(32, 1, 'Apa yang dimaksud dengan \"Scope\" dalam JavaScript?\r\n'),
(33, 1, 'Bagaimana cara menghindari \"callback hell\" dalam JavaScript?\r\n'),
(34, 1, 'Apa yang dimaksud dengan \"IIFE\" dalam JavaScript?\r\n'),
(35, 2, 'Berapakah hasil dari 5 + 3?\r\n'),
(36, 2, 'Hitunglah 12 - 5.\r\n'),
(37, 2, 'Jika x = 20 dan y = 7, berapakah nilai dari x - y?\r\n'),
(38, 2, 'Berapakah hasil dari 6 x 9?\r\n'),
(39, 2, 'Jika a = 25 dan b = 4, berapakah hasil dari a / b?\r\n'),
(40, 2, 'Hitunglah 15 pangkat 2.\r\n'),
(41, 2, 'Berapakah hasil dari 10 - 3?\r\n'),
(42, 2, 'Jika p = 16 dan q = 2, berapakah nilai dari p / q?\r\n'),
(43, 2, 'Berapakah hasil dari 4 x 7?\r\n'),
(44, 2, 'Jika x = 36 dan y = 4, berapakah nilai dari x / y?\r\n'),
(45, 3, 'Berapakah hasil dari 5 + 3?\r\n'),
(46, 3, 'Hitunglah 12 - 5.\r\n'),
(47, 3, 'Jika x = 20 dan y = 7, berapakah nilai dari x - y?\r\n'),
(48, 3, 'Berapakah hasil dari 6 x 9?\r\n'),
(49, 3, 'Jika a = 25 dan b = 4, berapakah hasil dari a / b?\r\n'),
(50, 3, 'Hitunglah 15 pangkat 2.\r\n'),
(51, 3, 'Berapakah hasil dari 10 - 3?\r\n'),
(52, 3, 'Jika p = 16 dan q = 2, berapakah nilai dari p / q?\r\n'),
(53, 3, 'Berapakah hasil dari 4 x 7?\r\n'),
(54, 3, 'Jika x = 36 dan y = 4, berapakah nilai dari x / y?\r\n'),
(65, 5, 'Berapakah hasil dari 5 + 3?\r\n'),
(66, 5, 'Hitunglah 12 - 5.\r\n'),
(67, 5, 'Jika x = 20 dan y = 7, berapakah nilai dari x - y?\r\n'),
(68, 5, 'Berapakah hasil dari 6 x 9?\r\n'),
(69, 5, 'Jika a = 25 dan b = 4, berapakah hasil dari a / b?\r\n'),
(70, 5, 'Hitunglah 15 pangkat 2.\r\n'),
(71, 5, 'Berapakah hasil dari 10 - 3?\r\n'),
(72, 5, 'Jika p = 16 dan q = 2, berapakah nilai dari p / q?\r\n'),
(73, 5, 'Berapakah hasil dari 4 x 7?\r\n'),
(74, 5, 'Jika x = 36 dan y = 4, berapakah nilai dari x / y?\r\n'),
(75, 6, 'Berapakah hasil dari 5 + 3?\r\n'),
(76, 6, 'Hitunglah 12 - 5.\r\n'),
(77, 6, 'Jika x = 20 dan y = 7, berapakah nilai dari x - y?\r\n'),
(78, 6, 'Berapakah hasil dari 6 x 9?\r\n'),
(79, 6, 'Jika a = 25 dan b = 4, berapakah hasil dari a / b?\r\n'),
(80, 6, 'Hitunglah 15 pangkat 2.\r\n'),
(81, 6, 'Berapakah hasil dari 10 - 3?\r\n'),
(82, 6, 'Jika p = 16 dan q = 2, berapakah nilai dari p / q?\r\n'),
(83, 6, 'Berapakah hasil dari 4 x 7?\r\n'),
(84, 6, 'Jika x = 36 dan y = 4, berapakah nilai dari x / y?\r\n'),
(85, 7, 'Berapakah hasil dari 5 + 3?\r\n'),
(86, 7, 'Hitunglah 12 - 5.\r\n'),
(87, 7, 'Jika x = 20 dan y = 7, berapakah nilai dari x - y?\r\n'),
(88, 7, 'Berapakah hasil dari 6 x 9?\r\n'),
(89, 7, 'Jika a = 25 dan b = 4, berapakah hasil dari a / b?\r\n'),
(90, 7, 'Hitunglah 15 pangkat 2.\r\n'),
(91, 7, 'Berapakah hasil dari 10 - 3?\r\n'),
(92, 7, 'Jika p = 16 dan q = 2, berapakah nilai dari p / q?\r\n'),
(93, 7, 'Berapakah hasil dari 4 x 7?\r\n'),
(94, 7, 'Jika x = 36 dan y = 4, berapakah nilai dari x / y?\r\n'),
(95, 8, 'Berapakah hasil dari 5 + 3?\r\n'),
(96, 8, 'Hitunglah 12 - 5.\r\n'),
(97, 8, 'Jika x = 20 dan y = 7, berapakah nilai dari x - y?\r\n'),
(98, 8, 'Berapakah hasil dari 6 x 9?\r\n'),
(99, 8, 'Jika a = 25 dan b = 4, berapakah hasil dari a / b?\r\n'),
(100, 8, 'Hitunglah 15 pangkat 2.\r\n'),
(101, 8, 'Berapakah hasil dari 10 - 3?\r\n'),
(102, 8, 'Jika p = 16 dan q = 2, berapakah nilai dari p / q?\r\n'),
(103, 8, 'Berapakah hasil dari 4 x 7?\r\n'),
(104, 8, 'Jika x = 36 dan y = 4, berapakah nilai dari x / y?\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `id_quiz` int NOT NULL,
  `id_post` int NOT NULL,
  `deskripsi` text,
  `start_quiz` datetime(6) DEFAULT NULL,
  `end_quiz` datetime(6) DEFAULT NULL,
  `duration` int NOT NULL DEFAULT '30'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`id_quiz`, `id_post`, `deskripsi`, `start_quiz`, `end_quiz`, `duration`) VALUES
(1, 54, 'Ini Adalah Quiz Pemrograman', '2023-09-14 16:00:00.000000', '2023-09-15 16:00:00.000000', 60),
(2, 55, '<p>Kerjakan Kuis Ini</p>', '2023-09-14 16:00:00.000000', '2023-09-15 16:00:00.000000', 120),
(3, 56, '<h2>Aturan Quiz</h2><p>Quiz Ini Terntang Javacript Dengan Durasi 120 Menit</p><ol><li>selamat mengerjakan</li></ol>', '2023-09-15 16:00:00.000000', '2023-09-16 16:00:00.000000', 20),
(5, 58, '<p>Quiz 1</p>', '2023-09-17 16:00:00.000000', '2023-09-18 16:00:00.000000', 60),
(6, 59, '<p>asdasdasd</p>', '2023-09-18 16:00:00.000000', '2023-09-22 22:00:00.000000', 12),
(7, 60, '<p>Kuiz ini akan menguji seberapa baik Anda memahami bahasa pemrograman JavaScript. Ini mencakup berbagai topik, mulai dari dasar hingga konsep yang lebih canggih. Siapakah yang akan menjadi master JavaScript? Sertakan pengetahuan Anda dalam kuiz ini dan uji kemampuan Anda!</p><p><br></p><p><strong>Waktu Range Pengerjaan: </strong>09/19/2023 12:00 AM - 09/21/2023 12:00 AM</p><p><strong>Durasi Pengerjaan: 15 menit</strong></p>', '2023-09-18 16:00:00.000000', '2023-09-20 16:00:00.000000', 15),
(8, 61, '<h1>Quiz</h1>', '2023-09-18 16:00:00.000000', '2023-09-19 16:00:00.000000', 12);

-- --------------------------------------------------------

--
-- Table structure for table `quiz_log`
--

CREATE TABLE `quiz_log` (
  `id_quiz_log` int NOT NULL,
  `id_quiz` int NOT NULL,
  `id_users` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `quiz_log`
--

INSERT INTO `quiz_log` (`id_quiz_log`, `id_quiz`, `id_users`, `createdAt`, `updatedAt`) VALUES
(1, 5, 2, '2023-09-18 05:44:11', '2023-09-18 05:44:11'),
(2, 6, 1, '2023-09-19 02:35:19', '2023-09-19 02:35:19'),
(3, 6, 2, '2023-09-19 02:43:32', '2023-09-19 02:43:32'),
(4, 7, 1, '2023-09-19 04:04:13', '2023-09-19 04:04:13'),
(5, 8, 1, '2023-09-19 15:32:39', '2023-09-19 15:32:39');

-- --------------------------------------------------------

--
-- Table structure for table `score`
--

CREATE TABLE `score` (
  `id_score` int NOT NULL,
  `id_quiz` int NOT NULL,
  `id_users` int NOT NULL,
  `score` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `score`
--

INSERT INTO `score` (`id_score`, `id_quiz`, `id_users`, `score`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, 20, '2023-09-15 11:01:33', '2023-09-15 11:01:54'),
(2, 1, 1, 2.94118, '2023-09-15 11:44:56', '2023-09-15 11:44:56'),
(3, 3, 1, 10, '2023-09-16 01:32:41', '2023-09-16 01:32:41'),
(6, 5, 2, 10, '2023-09-18 05:44:16', '2023-09-18 05:46:01'),
(7, 6, 1, 20, '2023-09-19 02:35:40', '2023-09-19 02:36:24'),
(8, 6, 2, 20, '2023-09-19 02:43:37', '2023-09-19 02:50:43'),
(9, 7, 1, 100, '2023-09-19 04:04:40', '2023-09-19 04:09:03'),
(10, 8, 1, 10, '2023-09-19 15:32:47', '2023-09-19 15:33:21');

-- --------------------------------------------------------

--
-- Table structure for table `token_presensi`
--

CREATE TABLE `token_presensi` (
  `id_presensi` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tugas`
--

CREATE TABLE `tugas` (
  `id_tugas` int NOT NULL,
  `id_post` int NOT NULL,
  `deskripsi` text,
  `fromDate` datetime DEFAULT NULL,
  `toDate` datetime DEFAULT NULL,
  `file` varchar(255) DEFAULT NULL,
  `accept` enum('pdf','doc','docx','ppt','rar','zip','pptx') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tugas`
--

INSERT INTO `tugas` (`id_tugas`, `id_post`, `deskripsi`, `fromDate`, `toDate`, `file`, `accept`) VALUES
(7, 13, 'Tugas ini melibatkan pengembangan model jaringan syaraf buatan untuk pengenalan citra. Mahasiswa akan diminta untuk memilih dataset citra yang relevan dan mengembangkan model jaringan syaraf buatan yang mampu mengenali objek atau pola tertentu dalam citra.\\n\\nDeskripsi tugas ini mencakup beberapa poin utama:\\n\\n1. Pemilihan Dataset: Mahasiswa harus memilih dataset citra yang sesuai dengan tujuan pengenalan citra mereka. Dataset dapat berisi berbagai jenis citra, seperti citra medis, citra satelit, atau citra objek dalam kehidupan sehari-hari.\\n\\n2. Pra-pemrosesan Data: Melakukan pra-pemrosesan data yang diperlukan, seperti normalisasi, augmentasi, dan segmentasi, untuk mempersiapkan data latihan dan pengujian.\\n\\n3. Pengembangan Model: Merancang dan melatih model jaringan syaraf buatan, termasuk pemilihan arsitektur, fungsi aktivasi, dan parameter pelatihan.\\n\\n4. Evaluasi Model: Mengukur kinerja model menggunakan metrik yang relevan, seperti akurasi, presisi, recall, atau F1-score.\\n\\n5. Presentasi Hasil: Mahasiswa diharapkan untuk menyajikan hasil tugas, termasuk analisis kinerja model dan temuan yang didapatkan, dalam bentuk laporan atau presentasi.\\n\\nTugas ini bertujuan untuk memberikan pemahaman praktis tentang penggunaan jaringan syaraf buatan dalam pengenalan citra dan untuk mengembangkan keterampilan pemodelan dan evaluasi.', '2023-09-05 16:00:00', '2023-09-15 16:00:00', '1-1693882676934.pdf', 'pdf'),
(9, 15, 'Buatkan Chat App Dengan Mengimplementasikan webscoket ', '2023-09-05 16:00:00', '2023-09-15 16:00:00', '', 'pdf');

-- --------------------------------------------------------

--
-- Table structure for table `tugassubmission`
--

CREATE TABLE `tugassubmission` (
  `id_tugas_submission` int NOT NULL,
  `id_tugas` int NOT NULL,
  `id_user` int NOT NULL,
  `file` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tugassubmission`
--

INSERT INTO `tugassubmission` (`id_tugas_submission`, `id_tugas`, `id_user`, `file`, `createdAt`, `updatedAt`) VALUES
(6, 7, 2, '2-tescetak.pdf', '2023-09-05 10:14:34', '2023-09-05 10:14:34'),
(8, 9, 1, '1-140-Article Text-552-1-10-20221108.pdf', '2023-09-10 14:19:50', '2023-09-10 14:19:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_users` int NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phoneNumber` varchar(15) DEFAULT NULL,
  `password` text,
  `role` enum('admin','user') DEFAULT 'user',
  `refresh_token` text,
  `image` text,
  `status` enum('active','inactive') DEFAULT 'inactive',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_users`, `username`, `email`, `phoneNumber`, `password`, `role`, `refresh_token`, `image`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Fathullah Munadi', 'munadifathullah123@gmail.com', '081234567890', '$2b$10$L3gZYUT268K6071mdLNW.eW9OgTOPuj.vdfxPA62ey/K5dQpx8Tri', 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VycyI6MSwiaWF0IjoxNjk2MjUxMzYyLCJleHAiOjE2OTY4NTYxNjJ9.M159PwSXE65nJvV4Wuuxe1tMu59kow5Pvq6m2ASnb9g', '1-1695138137764.jpg', 'active', '2023-09-03 11:01:52', '2023-10-02 12:56:02'),
(2, 'Moon Sky', 'moonlighteverse@gmail.com', '082148167719', '$2b$10$fCd3HgCYj50c4PgzdyjE7eutdSgsRJ3MD/uR/kubSLtoIeS1xYX62', 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VycyI6MiwiaWF0IjoxNjk2Njg1NjAwLCJleHAiOjE2OTcyOTA0MDB9.KeZgLf--EDyi2N_KnHUhIeoAKXbD0wYV6SbJyYe2_pA', '2-1695138618772.jpg', 'active', '2023-09-03 11:52:02', '2023-10-07 13:33:20'),
(3, 'burhan grauine', 'burhan@gmail.com', '085895199163', '$2b$10$L5E4Jzu4PGAvK2a.LTyyKO19SMqGFMsQ637NBNl8v05y1Q9ULUiqK', 'user', NULL, NULL, 'inactive', '2023-09-06 09:14:35', '2023-09-06 09:14:35'),
(4, 'Ahmad Dandi Subhani', 'dandisubhani22@gmail.com', '089636035164', '$2b$10$FYmn6BQtLtDctudqQ8Mz8.ojWIw5JuneV/dqbszxNPxmFePwNxU4y', 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VycyI6NCwiaWF0IjoxNjk0OTA5NTI2LCJleHAiOjE2OTU1MTQzMjZ9.ADn88_LXin05neZJVbC6cSBEy1Sm-h-A1E6T9fcIfVs', NULL, 'active', '2023-09-17 00:11:29', '2023-09-17 00:12:06');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`id_answer`),
  ADD UNIQUE KEY `idx_quiz_question_answer` (`id_quiz`,`id_question`,`id_answer_option`),
  ADD KEY `id_question` (`id_question`),
  ADD KEY `id_answer_option` (`id_answer_option`),
  ADD KEY `idx_users` (`id_users`);

--
-- Indexes for table `answer_option`
--
ALTER TABLE `answer_option`
  ADD PRIMARY KEY (`id_answer_option`),
  ADD KEY `id_question` (`id_question`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id_comments`),
  ADD KEY `id_users` (`id_users`),
  ADD KEY `idx_comments_post_users` (`id_post`,`id_users`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id_course`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `coursemembers`
--
ALTER TABLE `coursemembers`
  ADD PRIMARY KEY (`id_member`),
  ADD KEY `id_course` (`id_course`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `gps_presensi`
--
ALTER TABLE `gps_presensi`
  ADD PRIMARY KEY (`id_presensi`);

--
-- Indexes for table `log_presensi`
--
ALTER TABLE `log_presensi`
  ADD PRIMARY KEY (`id_log_presensi`),
  ADD KEY `id_presensi` (`id_presensi`),
  ADD KEY `idx_log_Presensi` (`id_users`,`status`);

--
-- Indexes for table `nilai_tugas`
--
ALTER TABLE `nilai_tugas`
  ADD PRIMARY KEY (`id_nilai_tugas`),
  ADD UNIQUE KEY `nilai_tugas_id_tugas_submission_id_users` (`id_tugas_submission`,`id_users`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `otp`
--
ALTER TABLE `otp`
  ADD PRIMARY KEY (`id_otp`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `pengumuman`
--
ALTER TABLE `pengumuman`
  ADD PRIMARY KEY (`id_pengumuman`),
  ADD KEY `id_post` (`id_post`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id_post`),
  ADD KEY `Post_id_course_fkey` (`id_course`),
  ADD KEY `Post_id_users_fkey` (`id_users`);

--
-- Indexes for table `presensi`
--
ALTER TABLE `presensi`
  ADD PRIMARY KEY (`id_presensi`),
  ADD KEY `idx_presensi` (`id_post`);

--
-- Indexes for table `qrcode_presensi`
--
ALTER TABLE `qrcode_presensi`
  ADD PRIMARY KEY (`id_presensi`),
  ADD KEY `idx_qrcode_token` (`qrcode_token`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id_question`),
  ADD KEY `id_quiz` (`id_quiz`);

--
-- Indexes for table `quiz`
--
ALTER TABLE `quiz`
  ADD PRIMARY KEY (`id_quiz`),
  ADD KEY `id_post` (`id_post`);

--
-- Indexes for table `quiz_log`
--
ALTER TABLE `quiz_log`
  ADD PRIMARY KEY (`id_quiz_log`),
  ADD UNIQUE KEY `idx_quiz_log_users` (`id_quiz`,`id_users`),
  ADD KEY `id_users` (`id_users`);

--
-- Indexes for table `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`id_score`),
  ADD KEY `id_users` (`id_users`),
  ADD KEY `idx_quiz_users` (`id_quiz`,`id_users`);

--
-- Indexes for table `token_presensi`
--
ALTER TABLE `token_presensi`
  ADD PRIMARY KEY (`id_presensi`),
  ADD UNIQUE KEY `token` (`token`),
  ADD UNIQUE KEY `idx_token` (`token`);

--
-- Indexes for table `tugas`
--
ALTER TABLE `tugas`
  ADD PRIMARY KEY (`id_tugas`),
  ADD KEY `id_post` (`id_post`);

--
-- Indexes for table `tugassubmission`
--
ALTER TABLE `tugassubmission`
  ADD PRIMARY KEY (`id_tugas_submission`),
  ADD KEY `id_tugas` (`id_tugas`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `idx_email` (`email`),
  ADD KEY `idx_username` (`username`),
  ADD KEY `idx_status` (`status`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answer`
--
ALTER TABLE `answer`
  MODIFY `id_answer` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `answer_option`
--
ALTER TABLE `answer_option`
  MODIFY `id_answer_option` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=417;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id_comments` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=232;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id_course` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `coursemembers`
--
ALTER TABLE `coursemembers`
  MODIFY `id_member` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `log_presensi`
--
ALTER TABLE `log_presensi`
  MODIFY `id_log_presensi` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `nilai_tugas`
--
ALTER TABLE `nilai_tugas`
  MODIFY `id_nilai_tugas` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `otp`
--
ALTER TABLE `otp`
  MODIFY `id_otp` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pengumuman`
--
ALTER TABLE `pengumuman`
  MODIFY `id_pengumuman` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id_post` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `presensi`
--
ALTER TABLE `presensi`
  MODIFY `id_presensi` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id_question` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT for table `quiz`
--
ALTER TABLE `quiz`
  MODIFY `id_quiz` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `quiz_log`
--
ALTER TABLE `quiz_log`
  MODIFY `id_quiz_log` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `score`
--
ALTER TABLE `score`
  MODIFY `id_score` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tugas`
--
ALTER TABLE `tugas`
  MODIFY `id_tugas` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tugassubmission`
--
ALTER TABLE `tugassubmission`
  MODIFY `id_tugas_submission` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_users` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answer`
--
ALTER TABLE `answer`
  ADD CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`id_quiz`) REFERENCES `quiz` (`id_quiz`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `answer_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`) ON UPDATE CASCADE,
  ADD CONSTRAINT `answer_ibfk_3` FOREIGN KEY (`id_question`) REFERENCES `question` (`id_question`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `answer_ibfk_4` FOREIGN KEY (`id_answer_option`) REFERENCES `answer_option` (`id_answer_option`) ON UPDATE CASCADE;

--
-- Constraints for table `answer_option`
--
ALTER TABLE `answer_option`
  ADD CONSTRAINT `answer_option_ibfk_1` FOREIGN KEY (`id_question`) REFERENCES `question` (`id_question`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `coursemembers`
--
ALTER TABLE `coursemembers`
  ADD CONSTRAINT `coursemembers_ibfk_1` FOREIGN KEY (`id_course`) REFERENCES `course` (`id_course`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `coursemembers_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `gps_presensi`
--
ALTER TABLE `gps_presensi`
  ADD CONSTRAINT `gps_presensi_ibfk_1` FOREIGN KEY (`id_presensi`) REFERENCES `presensi` (`id_presensi`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `log_presensi`
--
ALTER TABLE `log_presensi`
  ADD CONSTRAINT `log_presensi_ibfk_1` FOREIGN KEY (`id_presensi`) REFERENCES `presensi` (`id_presensi`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `nilai_tugas`
--
ALTER TABLE `nilai_tugas`
  ADD CONSTRAINT `nilai_tugas_ibfk_1` FOREIGN KEY (`id_tugas_submission`) REFERENCES `tugassubmission` (`id_tugas_submission`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nilai_tugas_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `otp`
--
ALTER TABLE `otp`
  ADD CONSTRAINT `otp_ibfk_1` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pengumuman`
--
ALTER TABLE `pengumuman`
  ADD CONSTRAINT `pengumuman_ibfk_1` FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`id_course`) REFERENCES `course` (`id_course`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `presensi`
--
ALTER TABLE `presensi`
  ADD CONSTRAINT `presensi_ibfk_1` FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `qrcode_presensi`
--
ALTER TABLE `qrcode_presensi`
  ADD CONSTRAINT `qrcode_presensi_ibfk_1` FOREIGN KEY (`id_presensi`) REFERENCES `presensi` (`id_presensi`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`id_quiz`) REFERENCES `quiz` (`id_quiz`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `quiz`
--
ALTER TABLE `quiz`
  ADD CONSTRAINT `quiz_ibfk_1` FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `quiz_log`
--
ALTER TABLE `quiz_log`
  ADD CONSTRAINT `quiz_log_ibfk_1` FOREIGN KEY (`id_quiz`) REFERENCES `quiz` (`id_quiz`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `quiz_log_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `score`
--
ALTER TABLE `score`
  ADD CONSTRAINT `score_ibfk_1` FOREIGN KEY (`id_quiz`) REFERENCES `quiz` (`id_quiz`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `score_ibfk_2` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `token_presensi`
--
ALTER TABLE `token_presensi`
  ADD CONSTRAINT `token_presensi_ibfk_1` FOREIGN KEY (`id_presensi`) REFERENCES `presensi` (`id_presensi`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tugas`
--
ALTER TABLE `tugas`
  ADD CONSTRAINT `tugas_ibfk_1` FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tugassubmission`
--
ALTER TABLE `tugassubmission`
  ADD CONSTRAINT `tugassubmission_ibfk_1` FOREIGN KEY (`id_tugas`) REFERENCES `tugas` (`id_tugas`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tugassubmission_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
