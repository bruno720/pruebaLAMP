-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-06-2024 a las 22:33:18
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `biblioteca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libro`
--

CREATE TABLE `libro` (
  `numl` int(11) NOT NULL,
  `titu` varchar(100) NOT NULL,
  `autor` varchar(50) NOT NULL,
  `tipo` varchar(15) NOT NULL,
  `prec` double NOT NULL,
  `std` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libro`
--

INSERT INTO `libro` (`numl`, `titu`, `autor`, `tipo`, `prec`, `std`) VALUES
(1, 'sangre de campeon', 'carlos', 'literario', 25, 'act'),
(2, 'odisea', 'homero', 'ficcion', 80, 'act'),
(3, 'el hobbit', 'J.R.R. Tolkien', 'ficcion', 120, 'act'),
(4, 'el alquimista', 'paulo', 'literario', 75, 'act'),
(5, 'don quijote de la mancha', 'miguel', 'biografia', 60, 'act'),
(6, 'el ogro', 'chura', 'biografia', 34, 'del'),
(9, 'sangre de osos y cuervos', 'alberto', 'literario', 34, 'arh'),
(10, 'el cangrejo', 'juan escamilla', 'ficcion', 12, 'del');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `libro`
--
ALTER TABLE `libro`
  ADD PRIMARY KEY (`numl`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `libro`
--
ALTER TABLE `libro`
  MODIFY `numl` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
