-- XAMPP-Lite
-- version 8.4.6
-- https://xampplite.sf.net/
--
-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2026 at 03:02 AM
-- Server version: 11.4.5-MariaDB-log
-- PHP Version: 8.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `geopulse`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `passwordHash` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `birthDate` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `name`, `passwordHash`, `createdAt`, `updatedAt`, `birthDate`) VALUES
('knullol-112822', 'knull.admin@geopulse.io', 'Knull Admin', '$2b$10$K.3/CVdB8BSsESMuO1vqFOefJ9I1Xkb.hyGYVGRXRG7gDF0yF2c/y', '2026-05-04 02:21:39.156', '2026-05-04 02:21:39.114', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `adminsession`
--

CREATE TABLE `adminsession` (
  `id` varchar(191) NOT NULL,
  `adminId` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `adminsession`
--

INSERT INTO `adminsession` (`id`, `adminId`, `token`, `expiresAt`, `createdAt`) VALUES
('cc3a1d7d-a468-48c9-89b9-ae4f0e812655', 'knullol-112822', '86245329-8938-4331-862f-5d97d5d755f7', '2026-06-03 02:39:33.015', '2026-05-04 02:39:33.017');

-- --------------------------------------------------------

--
-- Table structure for table `attendancelog`
--

CREATE TABLE `attendancelog` (
  `id` varchar(191) NOT NULL,
  `attendeeId` varchar(191) NOT NULL,
  `geofenceId` varchar(191) NOT NULL,
  `action` varchar(191) NOT NULL,
  `deviceLat` double NOT NULL,
  `deviceLng` double NOT NULL,
  `status` varchar(191) NOT NULL DEFAULT 'SUCCESS',
  `timestamp` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `afternoonTimeOut` datetime(3) DEFAULT NULL,
  `morningTimeIn` datetime(3) DEFAULT NULL,
  `afternoonTimeIn` datetime(3) DEFAULT NULL,
  `morningTimeOut` datetime(3) DEFAULT NULL,
  `isMock` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attendee`
--

CREATE TABLE `attendee` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `passwordHash` varchar(191) NOT NULL,
  `orgCode` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT 0,
  `categoryId` varchar(191) DEFAULT NULL,
  `birthDate` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attendee`
--

INSERT INTO `attendee` (`id`, `email`, `name`, `passwordHash`, `orgCode`, `createdAt`, `updatedAt`, `isVerified`, `categoryId`, `birthDate`) VALUES
('att-org-1-1', 'user1@acme123.io', 'Acme Geopulse Corp Employee 1', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'ACME123', '2026-05-04 02:21:39.261', '2026-05-04 02:21:39.259', 1, 'cat-org-1', NULL),
('att-org-1-10', 'user10@acme123.io', 'Acme Geopulse Corp Employee 10', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'ACME123', '2026-05-04 02:21:39.334', '2026-05-04 02:21:39.333', 0, 'cat-org-1', NULL),
('att-org-1-2', 'user2@acme123.io', 'Acme Geopulse Corp Employee 2', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'ACME123', '2026-05-04 02:21:39.268', '2026-05-04 02:21:39.267', 1, 'cat-org-1', NULL),
('att-org-1-3', 'user3@acme123.io', 'Acme Geopulse Corp Employee 3', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'ACME123', '2026-05-04 02:21:39.277', '2026-05-04 02:21:39.275', 1, 'cat-org-1', NULL),
('att-org-1-4', 'user4@acme123.io', 'Acme Geopulse Corp Employee 4', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'ACME123', '2026-05-04 02:21:39.285', '2026-05-04 02:21:39.283', 1, 'cat-org-1', NULL),
('att-org-1-5', 'user5@acme123.io', 'Acme Geopulse Corp Employee 5', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'ACME123', '2026-05-04 02:21:39.294', '2026-05-04 02:21:39.292', 1, 'cat-org-1', NULL),
('att-org-1-6', 'user6@acme123.io', 'Acme Geopulse Corp Employee 6', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'ACME123', '2026-05-04 02:21:39.301', '2026-05-04 02:21:39.300', 1, 'cat-org-1', NULL),
('att-org-1-7', 'user7@acme123.io', 'Acme Geopulse Corp Employee 7', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'ACME123', '2026-05-04 02:21:39.310', '2026-05-04 02:21:39.309', 1, 'cat-org-1', NULL),
('att-org-1-8', 'user8@acme123.io', 'Acme Geopulse Corp Employee 8', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'ACME123', '2026-05-04 02:21:39.318', '2026-05-04 02:21:39.317', 1, 'cat-org-1', NULL),
('att-org-1-9', 'user9@acme123.io', 'Acme Geopulse Corp Employee 9', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'ACME123', '2026-05-04 02:21:39.326', '2026-05-04 02:21:39.325', 0, 'cat-org-1', NULL),
('att-org-2-1', 'user1@gts456.io', 'Global Tech Solutions Employee 1', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'GTS456', '2026-05-04 02:21:39.383', '2026-05-04 02:21:39.382', 1, 'cat-org-2', NULL),
('att-org-2-10', 'user10@gts456.io', 'Global Tech Solutions Employee 10', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'GTS456', '2026-05-04 02:21:39.458', '2026-05-04 02:21:39.457', 0, 'cat-org-2', NULL),
('att-org-2-2', 'user2@gts456.io', 'Global Tech Solutions Employee 2', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'GTS456', '2026-05-04 02:21:39.391', '2026-05-04 02:21:39.391', 1, 'cat-org-2', NULL),
('att-org-2-3', 'user3@gts456.io', 'Global Tech Solutions Employee 3', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'GTS456', '2026-05-04 02:21:39.400', '2026-05-04 02:21:39.399', 1, 'cat-org-2', NULL),
('att-org-2-4', 'user4@gts456.io', 'Global Tech Solutions Employee 4', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'GTS456', '2026-05-04 02:21:39.408', '2026-05-04 02:21:39.407', 1, 'cat-org-2', NULL),
('att-org-2-5', 'user5@gts456.io', 'Global Tech Solutions Employee 5', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'GTS456', '2026-05-04 02:21:39.416', '2026-05-04 02:21:39.415', 1, 'cat-org-2', NULL),
('att-org-2-6', 'user6@gts456.io', 'Global Tech Solutions Employee 6', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'GTS456', '2026-05-04 02:21:39.425', '2026-05-04 02:21:39.424', 1, 'cat-org-2', NULL),
('att-org-2-7', 'user7@gts456.io', 'Global Tech Solutions Employee 7', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'GTS456', '2026-05-04 02:21:39.433', '2026-05-04 02:21:39.432', 1, 'cat-org-2', NULL),
('att-org-2-8', 'user8@gts456.io', 'Global Tech Solutions Employee 8', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'GTS456', '2026-05-04 02:21:39.442', '2026-05-04 02:21:39.440', 1, 'cat-org-2', NULL),
('att-org-2-9', 'user9@gts456.io', 'Global Tech Solutions Employee 9', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'GTS456', '2026-05-04 02:21:39.450', '2026-05-04 02:21:39.448', 0, 'cat-org-2', NULL),
('att-org-3-1', 'user1@logi789.io', 'Infinite Logistics Employee 1', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'LOGI789', '2026-05-04 02:21:39.508', '2026-05-04 02:21:39.506', 1, 'cat-org-3', NULL),
('att-org-3-10', 'user10@logi789.io', 'Infinite Logistics Employee 10', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'LOGI789', '2026-05-04 02:21:39.590', '2026-05-04 02:21:39.589', 0, 'cat-org-3', NULL),
('att-org-3-2', 'user2@logi789.io', 'Infinite Logistics Employee 2', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'LOGI789', '2026-05-04 02:21:39.516', '2026-05-04 02:21:39.514', 1, 'cat-org-3', NULL),
('att-org-3-3', 'user3@logi789.io', 'Infinite Logistics Employee 3', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'LOGI789', '2026-05-04 02:21:39.524', '2026-05-04 02:21:39.523', 1, 'cat-org-3', NULL),
('att-org-3-4', 'user4@logi789.io', 'Infinite Logistics Employee 4', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'LOGI789', '2026-05-04 02:21:39.532', '2026-05-04 02:21:39.531', 1, 'cat-org-3', NULL),
('att-org-3-5', 'user5@logi789.io', 'Infinite Logistics Employee 5', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'LOGI789', '2026-05-04 02:21:39.540', '2026-05-04 02:21:39.539', 1, 'cat-org-3', NULL),
('att-org-3-6', 'user6@logi789.io', 'Infinite Logistics Employee 6', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'LOGI789', '2026-05-04 02:21:39.549', '2026-05-04 02:21:39.547', 1, 'cat-org-3', NULL),
('att-org-3-7', 'user7@logi789.io', 'Infinite Logistics Employee 7', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'LOGI789', '2026-05-04 02:21:39.557', '2026-05-04 02:21:39.556', 1, 'cat-org-3', NULL),
('att-org-3-8', 'user8@logi789.io', 'Infinite Logistics Employee 8', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'LOGI789', '2026-05-04 02:21:39.565', '2026-05-04 02:21:39.564', 1, 'cat-org-3', NULL),
('att-org-3-9', 'user9@logi789.io', 'Infinite Logistics Employee 9', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'LOGI789', '2026-05-04 02:21:39.573', '2026-05-04 02:21:39.572', 0, 'cat-org-3', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `attendeesession`
--

CREATE TABLE `attendeesession` (
  `id` varchar(191) NOT NULL,
  `attendeeId` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `orgId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `orgId`, `createdAt`, `updatedAt`) VALUES
('cat-org-1', 'General Personnel', 'org-1', '2026-05-04 02:21:39.208', '2026-05-04 02:21:39.201'),
('cat-org-2', 'General Personnel', 'org-2', '2026-05-04 02:21:39.350', '2026-05-04 02:21:39.349'),
('cat-org-3', 'General Personnel', 'org-3', '2026-05-04 02:21:39.475', '2026-05-04 02:21:39.473');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `passwordHash` varchar(191) NOT NULL,
  `orgCode` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT 0,
  `birthDate` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `email`, `name`, `passwordHash`, `orgCode`, `createdAt`, `updatedAt`, `isVerified`, `birthDate`) VALUES
('2117cfb7-cfda-4b8f-91a5-f3bd024fbbfd', 'maria.domnena.anog@geopulse.io', 'Maria domnena i. anog', '$2b$10$QDpilWHeFMP.RyTi6PofIu80PD156APCuF5t5z0QdhaOKKJ/H2oEG', 'ORG-984K0Q', '2026-05-04 02:53:55.270', '2026-05-04 02:53:55.268', 1, NULL),
('client-org-1-1', 'client1@acme123.com', 'Acme Geopulse Corp Client 1', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'ACME123', '2026-05-04 02:21:39.221', '2026-05-04 02:21:39.218', 1, NULL),
('client-org-1-2', 'client2@acme123.com', 'Acme Geopulse Corp Client 2', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'ACME123', '2026-05-04 02:21:39.252', '2026-05-04 02:21:39.251', 1, NULL),
('client-org-2-1', 'client1@gts456.com', 'Global Tech Solutions Client 1', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'GTS456', '2026-05-04 02:21:39.359', '2026-05-04 02:21:39.358', 1, NULL),
('client-org-2-2', 'client2@gts456.com', 'Global Tech Solutions Client 2', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'GTS456', '2026-05-04 02:21:39.376', '2026-05-04 02:21:39.374', 1, NULL),
('client-org-3-1', 'client1@logi789.com', 'Infinite Logistics Client 1', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'LOGI789', '2026-05-04 02:21:39.483', '2026-05-04 02:21:39.481', 1, NULL),
('client-org-3-2', 'client2@logi789.com', 'Infinite Logistics Client 2', '$2b$10$xt25wCcRrTeqFUGGvczM5uhFC/hw8YLTL.a0i63gsiCE7ZrvQgNVq', 'LOGI789', '2026-05-04 02:21:39.499', '2026-05-04 02:21:39.498', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `clientsession`
--

CREATE TABLE `clientsession` (
  `id` varchar(191) NOT NULL,
  `clientId` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clientsession`
--

INSERT INTO `clientsession` (`id`, `clientId`, `token`, `expiresAt`, `createdAt`) VALUES
('469720be-5fa2-49cf-9033-04ae5635a404', '2117cfb7-cfda-4b8f-91a5-f3bd024fbbfd', '671c7dc4-d376-4d62-8458-3ea14446d90a', '2026-06-03 02:54:03.487', '2026-05-04 02:54:03.488');

-- --------------------------------------------------------

--
-- Table structure for table `enrollment`
--

CREATE TABLE `enrollment` (
  `id` varchar(191) NOT NULL,
  `attendeeId` varchar(191) NOT NULL,
  `geofenceId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `geofence`
--

CREATE TABLE `geofence` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `radius` int(11) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `orgId` varchar(191) NOT NULL,
  `createdByClientId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `geofence`
--

INSERT INTO `geofence` (`id`, `name`, `latitude`, `longitude`, `radius`, `isActive`, `orgId`, `createdByClientId`, `createdAt`, `updatedAt`) VALUES
('geo-org-1', 'Acme Geopulse Corp HQ', 14.600266643781056, 121.05460544823787, 150, 1, 'org-1', 'client-org-1-1', '2026-05-04 02:21:39.238', '2026-05-04 02:21:39.234'),
('geo-org-2', 'Global Tech Solutions HQ', 14.6362757787898, 121.03392726802016, 150, 1, 'org-2', 'client-org-2-1', '2026-05-04 02:21:39.367', '2026-05-04 02:21:39.366'),
('geo-org-3', 'Infinite Logistics HQ', 14.617461025823568, 121.05985519302642, 150, 1, 'org-3', 'client-org-3-1', '2026-05-04 02:21:39.491', '2026-05-04 02:21:39.490');

-- --------------------------------------------------------

--
-- Table structure for table `organization`
--

CREATE TABLE `organization` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `orgCode` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `organization`
--

INSERT INTO `organization` (`id`, `name`, `orgCode`, `createdAt`, `updatedAt`, `isActive`) VALUES
('6a79c19c-bea2-4dc3-b912-71a08e909077', 'Maria Domnena i. Anog', 'ORG-984K0Q', '2026-05-04 02:49:28.284', '2026-05-04 02:49:28.281', 1),
('f257fdbf-7f0c-403b-a78c-1aedf93f93c6', 'Sample', 'ORG-F4FQU1', '2026-05-04 02:44:07.265', '2026-05-04 02:44:07.260', 1),
('org-1', 'Acme Geopulse Corp', 'ACME123', '2026-05-04 02:21:39.185', '2026-05-04 02:21:39.181', 1),
('org-2', 'Global Tech Solutions', 'GTS456', '2026-05-04 02:21:39.343', '2026-05-04 02:21:39.341', 1),
('org-3', 'Infinite Logistics', 'LOGI789', '2026-05-04 02:21:39.466', '2026-05-04 02:21:39.465', 1);

-- --------------------------------------------------------

--
-- Table structure for table `systemconfig`
--

CREATE TABLE `systemconfig` (
  `key` varchar(191) NOT NULL,
  `value` text NOT NULL,
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Admin_email_key` (`email`);

--
-- Indexes for table `adminsession`
--
ALTER TABLE `adminsession`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `AdminSession_token_key` (`token`),
  ADD KEY `AdminSession_adminId_fkey` (`adminId`);

--
-- Indexes for table `attendancelog`
--
ALTER TABLE `attendancelog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `AttendanceLog_attendeeId_fkey` (`attendeeId`),
  ADD KEY `AttendanceLog_geofenceId_fkey` (`geofenceId`);

--
-- Indexes for table `attendee`
--
ALTER TABLE `attendee`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Attendee_email_key` (`email`),
  ADD KEY `Attendee_categoryId_idx` (`categoryId`),
  ADD KEY `Attendee_orgCode_fkey` (`orgCode`);

--
-- Indexes for table `attendeesession`
--
ALTER TABLE `attendeesession`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `AttendeeSession_token_key` (`token`),
  ADD KEY `AttendeeSession_attendeeId_fkey` (`attendeeId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Category_orgId_name_key` (`orgId`,`name`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Client_email_key` (`email`),
  ADD KEY `Client_orgCode_fkey` (`orgCode`);

--
-- Indexes for table `clientsession`
--
ALTER TABLE `clientsession`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ClientSession_token_key` (`token`),
  ADD KEY `ClientSession_clientId_fkey` (`clientId`);

--
-- Indexes for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Enrollment_attendeeId_geofenceId_key` (`attendeeId`,`geofenceId`),
  ADD KEY `Enrollment_geofenceId_fkey` (`geofenceId`);

--
-- Indexes for table `geofence`
--
ALTER TABLE `geofence`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Geofence_createdByClientId_fkey` (`createdByClientId`),
  ADD KEY `Geofence_orgId_fkey` (`orgId`);

--
-- Indexes for table `organization`
--
ALTER TABLE `organization`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Organization_orgCode_key` (`orgCode`);

--
-- Indexes for table `systemconfig`
--
ALTER TABLE `systemconfig`
  ADD PRIMARY KEY (`key`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adminsession`
--
ALTER TABLE `adminsession`
  ADD CONSTRAINT `AdminSession_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `attendancelog`
--
ALTER TABLE `attendancelog`
  ADD CONSTRAINT `AttendanceLog_attendeeId_fkey` FOREIGN KEY (`attendeeId`) REFERENCES `attendee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `AttendanceLog_geofenceId_fkey` FOREIGN KEY (`geofenceId`) REFERENCES `geofence` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `attendee`
--
ALTER TABLE `attendee`
  ADD CONSTRAINT `Attendee_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Attendee_orgCode_fkey` FOREIGN KEY (`orgCode`) REFERENCES `organization` (`orgCode`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `attendeesession`
--
ALTER TABLE `attendeesession`
  ADD CONSTRAINT `AttendeeSession_attendeeId_fkey` FOREIGN KEY (`attendeeId`) REFERENCES `attendee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `Category_orgId_fkey` FOREIGN KEY (`orgId`) REFERENCES `organization` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `Client_orgCode_fkey` FOREIGN KEY (`orgCode`) REFERENCES `organization` (`orgCode`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `clientsession`
--
ALTER TABLE `clientsession`
  ADD CONSTRAINT `ClientSession_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD CONSTRAINT `Enrollment_attendeeId_fkey` FOREIGN KEY (`attendeeId`) REFERENCES `attendee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Enrollment_geofenceId_fkey` FOREIGN KEY (`geofenceId`) REFERENCES `geofence` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `geofence`
--
ALTER TABLE `geofence`
  ADD CONSTRAINT `Geofence_createdByClientId_fkey` FOREIGN KEY (`createdByClientId`) REFERENCES `client` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Geofence_orgId_fkey` FOREIGN KEY (`orgId`) REFERENCES `organization` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
