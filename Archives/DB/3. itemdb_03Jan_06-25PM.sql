-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 03, 2017 at 12:54 PM
-- Server version: 5.7.14
-- PHP Version: 7.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `itemdb`
--
CREATE DATABASE IF NOT EXISTS `itemdb` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `itemdb`;

-- --------------------------------------------------------

--
-- Table structure for table `bills_dec16`
--

CREATE TABLE `bills_dec16` (
  `bill_id` int(11) NOT NULL,
  `bill_no` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `qf` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit` varchar(20) NOT NULL,
  `price` decimal(7,2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bills_dec16`
--

INSERT INTO `bills_dec16` (`bill_id`, `bill_no`, `id`, `qf`, `quantity`, `unit`, `price`) VALUES
(1, 1, 6, 1, 1, 'Box', '22.00'),
(2, 1, 58, 1, 1, 'Packet', '18.00'),
(3, 1, 67, 1, 1, 'Packet', '48.00'),
(4, 1, 63, 1, 1, 'Packet', '28.00'),
(5, 1, 72, 1, 1, 'Packet', '31.00'),
(6, 1, 75, 1, 1, 'Packet', '10.00'),
(7, 1, 93, 1, 50, 'gm', '25.00'),
(8, 1, 129, 1, 1, 'Packet', '20.00'),
(9, 2, 141, 1, 1, 'Box', '45.00'),
(10, 3, 23, 1, 100, 'gm', '14.00'),
(11, 4, 132, 1, 500, 'gm', '15.00'),
(12, 4, 114, 1, 100, 'gm', '15.00'),
(13, 6, 68, 1, 1, 'Bottle', '67.00'),
(14, 6, 72, 1, 1, 'Packet', '31.00'),
(15, 6, 142, 1, 1, 'Bottle', '57.00'),
(16, 6, 129, 1, 1, 'Packet', '22.00'),
(17, 7, 143, 1, 500, 'gm', '10.00'),
(18, 7, 144, 1, 1, 'Piece', '25.00'),
(19, 7, 145, 0, 400, 'gm', '8.00'),
(20, 7, 146, 1, 500, 'gm', '20.00'),
(21, 8, 131, 2, 2, 'Piece', '10.00'),
(22, 8, 132, 1, 500, 'gm', '10.00'),
(23, 8, 134, 0, 50, 'gm', '10.00'),
(24, 8, 135, 0, 150, 'gm', '15.00'),
(25, 8, 133, 0, 400, 'gm', '10.00'),
(26, 8, 147, 0, 50, 'gm', '12.50'),
(27, 9, 136, 2, 2, 'Piece', '70.00'),
(28, 10, 140, 1, 750, 'gm', '35.25'),
(29, 10, 148, 2, 2, 'Packet', '32.00'),
(30, 11, 138, 1, 1, 'Packet', '18.00'),
(31, 11, 139, 0, 250, 'gm', '25.00'),
(32, 12, 149, 6, 6, 'Packet', '54.00'),
(33, 13, 61, 1, 1, 'Packet', '15.00'),
(34, 13, 67, 1, 1, 'Packet', '48.00'),
(35, 13, 58, 1, 1, 'Packet', '18.00'),
(36, 13, 148, 2, 2, 'Packet', '32.00'),
(37, 13, 150, 1, 1, 'Packet', '35.00'),
(38, 13, 60, 1, 1, 'Packet', '32.00'),
(39, 14, 144, 1, 1, 'Piece', '20.00'),
(40, 15, 151, 4, 4, 'Packet', '36.00');

-- --------------------------------------------------------

--
-- Table structure for table `grocery`
--

CREATE TABLE `grocery` (
  `id` int(11) NOT NULL,
  `shop` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `item` varchar(150) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit` varchar(20) NOT NULL,
  `price_based_on` varchar(50) NOT NULL,
  `MRP` decimal(6,2) NOT NULL,
  `sellers_price` decimal(6,2) NOT NULL,
  `last_updated_on` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `grocery`
--

INSERT INTO `grocery` (`id`, `shop`, `category`, `item`, `quantity`, `unit`, `price_based_on`, `MRP`, `sellers_price`, `last_updated_on`) VALUES
(1, 'Subhash', 'Rice', 'Fortune Super Basmati Rice', 1, 'kg', 'Packet', '150.00', '90.00', '2016-12-03'),
(2, 'Subhash', 'Rice', 'India Gate Super Basmati Rice', 1, 'kg', 'Packet', '135.00', '135.00', '2016-12-03'),
(3, 'Subhash', 'Rice', 'Punjab Basmati Rice', 1, 'kg', 'Kilos', '52.00', '52.00', '2016-12-03'),
(4, 'Subhash', 'Ata', 'Aashirvaad Multi Grain Ata', 5, 'kg', 'Packet', '250.00', '205.00', '2016-12-03'),
(5, 'Subhash', 'Ata', 'Ganesh Flour', 1, 'kg', 'Packet', '47.00', '40.00', '2016-12-03'),
(6, 'Subhash', 'Ata', 'WeikField Corn Flour', 100, 'gm', 'Box', '25.00', '22.00', '2016-12-03'),
(7, 'Subhash', 'Ata', 'Ganesh Sooji', 500, 'gm', 'Packet', '25.00', '21.00', '2016-12-03'),
(8, 'Subhash', 'Dal', 'Moong Dal', 1, 'kg', 'Kilos', '140.00', '140.00', '2016-12-03'),
(9, 'Subhash', 'Dal', 'Cholar Dal', 500, 'gm', 'Kilos', '70.00', '70.00', '2016-12-03'),
(10, 'Subhash', 'Dal', 'Motor Dal', 250, 'gm', 'Kilos', '19.00', '19.00', '2016-12-03'),
(11, 'Subhash', 'Dal', 'Ghoogni Motor', 500, 'gm', 'Kilos', '18.00', '18.00', '2016-12-03'),
(12, 'Subhash', 'Dal', 'Beauli Dal', 250, 'gm', 'Kilos', '30.00', '30.00', '2016-12-03'),
(13, 'Subhash', 'Dal', 'Ganesh Chana Sattu', 500, 'gm', 'Packet', '120.00', '98.00', '2016-12-03'),
(14, 'Subhash', 'Dal', 'Fortune Motor Besan', 500, 'gm', 'Packet', '45.00', '30.00', '2016-12-03'),
(15, 'Subhash', 'Dal', 'Mug Karai', 250, 'gm', 'Kilos', '20.00', '20.00', '2016-12-03'),
(16, 'Subhash', 'Oil and Dairy Products', 'Emami Healthy and Tastry Kacchi Ghani Mustard Oil', 1, 'Litre', 'Packet', '135.00', '128.00', '2016-12-03'),
(17, 'Subhash', 'Oil and Dairy Products', 'Saloni Kacchi Ghani Mustard Oil', 500, 'ml', 'Packet', '66.00', '37.00', '2016-12-03'),
(18, 'Subhash', 'Oil and Dairy Products', 'Emami Healthy and Tastry Rice Bran Oil', 1, 'Litre', 'Packet', '90.00', '80.00', '2016-12-03'),
(19, 'Subhash', 'Oil and Dairy Products', 'Pure Ghee', 250, 'gm', 'Bottle', '130.00', '110.00', '2016-12-03'),
(20, 'Subhash', 'Oil and Dairy Products', 'Amul Butter', 200, 'gm', 'Box', '85.00', '82.00', '2016-12-03'),
(21, 'Subhash', 'Oil and Dairy Products', 'Amul Butter', 100, 'gm', 'Box', '42.00', '42.00', '2016-12-03'),
(22, 'Yes Sir', 'Oil and Dairy Products', 'Fresh Cream', 200, 'ml', 'Box', '45.00', '45.00', '2016-12-03'),
(23, 'Amar', 'Oil and Dairy Products', 'Sour Curd(Tok Doi)', 100, 'gm', 'Kilos', '14.00', '14.00', '2016-12-03'),
(24, 'More', 'Oil and Dairy Products', 'Britannia Cheeza Cheese Block', 200, 'gm', 'Box', '125.00', '112.50', '2016-12-03'),
(25, 'More', 'Oil and Dairy Products', 'Milky Paneer', 250, 'gm', 'Packet', '80.00', '80.00', '2016-12-03'),
(26, 'Subhash', 'Spices', 'Sugar', 1, 'kg', 'Kilos', '41.20', '41.20', '2016-12-03'),
(27, 'Subhash', 'Spices', 'Tata Iodized Salt', 1, 'kg', 'Packet', '18.00', '17.00', '2016-12-03'),
(28, 'Subhash', 'Spices', 'Duta Turmeric Powder', 50, 'gm', 'Packet', '11.00', '9.00', '2016-12-03'),
(29, 'Subhash', 'Spices', 'Duta Cumin Powder', 50, 'gm', 'Packet', '19.00', '18.00', '2016-12-03'),
(141, 'Yes Sir', 'Oil and Dairy Products', 'Amul Fresh Cream', 200, 'ml', 'Box', '45.00', '45.00', '2016-12-05'),
(31, 'Subhash', 'Spices', 'Red Chilli Powder', 50, 'gm', 'Packet', '13.00', '13.00', '2016-12-03'),
(32, 'Subhash', 'Spices', 'Small Elaichi', 10, 'gm', 'Packet', '16.00', '16.00', '2016-12-03'),
(33, 'Subhash', 'Spices', 'Darchini', 10, 'gm', 'Packet', '4.00', '4.00', '2016-12-03'),
(34, 'Subhash', 'Spices', 'Dry Red Chili', 25, 'gm', 'Packet', '5.00', '5.00', '2016-12-03'),
(35, 'Subhash', 'Spices', 'Black Cumin (Kalo Jeere)', 25, 'gm', 'Packet', '5.00', '5.00', '2016-12-03'),
(36, 'Subhash', 'Spices', 'Cumin Seeds (Gota Jeere)', 25, 'gm', 'Packet', '7.00', '7.00', '2016-12-03'),
(37, 'Subhash', 'Spices', 'Poppy (Posto)', 100, 'gm', 'Kilos', '44.00', '44.00', '2016-12-03'),
(38, 'Subhash', 'Spices', 'Sunrise Mustard Powder', 40, 'gm', 'Packet', '15.00', '14.00', '2016-12-03'),
(39, 'Subhash', 'Spices', 'Everest Sabji Masala', 10, 'gm', 'Packet', '5.00', '5.00', '2016-12-03'),
(40, 'Subhash', 'Spices', 'Black Pepper', 10, 'gm', 'Packet', '15.00', '15.00', '2016-12-03'),
(41, 'Subhash', 'Spices', 'Everest Garam Masala', 50, 'gm', 'Packet', '41.00', '38.00', '2016-12-03'),
(42, 'Subhash', 'Spices', 'Sri Black Salt', 100, 'gm', 'Packet', '7.00', '7.00', '2016-12-03'),
(43, 'Subhash', 'Spices', 'Everest Chaat Masala', 100, 'gm', 'Box', '58.00', '58.00', '2016-12-03'),
(44, 'Subhash', 'Spices', 'Everest Tandoori Chicken Masala', 50, 'gm', 'Box', '31.00', '31.00', '2016-12-03'),
(45, 'Subhash', 'Spices', 'Everest Kashmiri Lal Mirch Powder', 50, 'gm', 'Box', '27.00', '27.00', '2016-12-03'),
(46, 'Subhash', 'Spices', 'Everest Pav Vaji Masala', 50, 'gm', 'Box', '31.00', '31.00', '2016-12-03'),
(47, 'Subhash', 'Spices', 'Everest Shahi Biriyani Masala', 50, 'gm', 'Box', '50.00', '50.00', '2016-12-03'),
(48, 'Subhash', 'Spices', 'Everest Sambhar Masala', 50, 'gm', 'Box', '33.00', '33.00', '2016-12-03'),
(49, 'More', 'Spices', 'JK White Pepper Powder', 50, 'gm', 'Packet', '125.00', '125.00', '2016-12-03'),
(50, 'Subhash', 'Spices', 'Sunrise Aloo Dum Masala', 8, 'gm', 'Packet', '5.00', '5.00', '2016-12-03'),
(51, 'Subhash', 'Spices', 'Jaifal', 10, 'gm', 'Kilos', '14.00', '14.00', '2016-12-03'),
(52, 'Subhash', 'Spices', 'Jaitri', 10, 'gm', 'Kilos', '18.00', '18.00', '2016-12-03'),
(53, 'Subhash', 'Spices', 'Large Elaichi', 10, 'gm', 'Kilos', '18.00', '18.00', '2016-12-03'),
(54, 'Subhash', 'Spices', 'Aamchur Powder', 100, 'gm', 'Packet', '14.00', '14.00', '2016-12-03'),
(55, 'Subhash', 'Sauce', 'Small Maggi Hot and Sweet Tomato Chili Sauce', 200, 'gm', 'Bottle', '54.00', '52.00', '2016-12-03'),
(56, 'Subhash', 'Sauce', 'Chili Sauce Small', 1, 'Bottle', 'Bottle', '25.00', '25.00', '2016-12-03'),
(57, 'Yes Sir', 'Sauce', 'Smith and Jones Imli Sauce', 90, 'gm', 'Packet', '15.00', '15.00', '2016-12-03'),
(58, 'Subhash', 'Chanachur', 'Chere Mixture Small', 1, 'Packet', 'Packet', '18.00', '18.00', '2016-12-03'),
(59, 'Subhash', 'Chanachur', 'Mona Jhuri Bhaja', 500, 'gm', 'Packet', '37.00', '37.00', '2016-12-03'),
(60, 'Subhash', 'Chanachur', 'Khasta Chanachur', 250, 'gm', 'Packet', '32.00', '32.00', '2016-12-03'),
(61, 'Subhash', 'Chanachur', 'Salted Peanuts (Badam)', 100, 'gm', 'Packet', '15.00', '15.00', '2016-12-03'),
(62, 'Subhash', 'Chanachur', 'Clean Chola Bhaja', 1, 'Packet', 'Packet', '34.00', '34.00', '2016-12-03'),
(63, 'Subhash', 'Biscuits', 'Priya Cream Cracker Biscuit', 1, 'Packet', 'Packet', '30.00', '28.00', '2016-12-03'),
(64, 'Subhash', 'Biscuits', 'Britannia Milk Rusk Biscuit', 1, 'Packet', 'Packet', '30.00', '29.00', '2016-12-03'),
(65, 'Subhash', 'Biscuits', 'Bisk Farm Gold Top Biscuit', 1, 'Packet', 'Packet', '48.00', '48.00', '2016-12-03'),
(66, 'Subhash', 'Biscuits', 'Mom\'s Magic Biscuit', 1, 'Packet', 'Packet', '33.00', '33.00', '2016-12-03'),
(67, 'Subhash', 'Biscuits', 'Nutritive Digestive Biscuit', 1, 'Packet', 'Packet', '0.00', '48.00', '2016-12-03'),
(68, 'Subhash', 'Tea and Coffee', 'Nescafe Instant Coffee', 25, 'gm', 'Bottle', '70.00', '67.00', '2016-12-16'),
(69, 'Subhash', 'Tea and Coffee', 'Nescafe Instant Coffee', 50, 'gm', 'Bottle', '115.00', '115.00', '2016-12-03'),
(70, 'Subhash', 'Tea and Coffee', 'Red Label Tea', 150, 'gm', 'Packet', '67.00', '67.00', '2016-12-03'),
(71, 'Subhash', 'Tea and Coffee', 'Lipton Green Tea', 100, 'gm', 'Packet', '99.00', '95.00', '2016-12-03'),
(72, 'Subhash', 'Tea and Coffee', 'Tata Premium Tea', 100, 'gm', 'Packet', '31.00', '31.00', '2016-12-16'),
(73, 'Subhash', 'Household Consumables', 'Goodnight Advanced Refill', 1, 'Bottle', 'Bottle', '69.00', '60.00', '2016-12-03'),
(74, 'Subhash', 'Household Consumables', 'Bengal Chemicals Napthalene Balls', 200, 'gm', 'Box', '90.00', '90.00', '2016-12-03'),
(75, 'Subhash', 'Household Consumables', 'Mosquito dhup', 1, 'Packet', 'Packet', '10.00', '10.00', '2016-12-03'),
(76, 'Subhash', 'Toiletries', 'Prill', 225, 'ml', 'Bottle', '55.00', '53.00', '2016-12-03'),
(77, 'Subhash', 'Toiletries', 'Prill Small (Refill)', 100, 'ml', 'Bottle', '19.00', '19.00', '2016-12-03'),
(78, 'Subhash', 'Toiletries', 'Vim Bar', 1, 'Piece', 'Piece', '19.00', '19.00', '2016-12-03'),
(79, 'Subhash', 'Toiletries', 'Lizol Green', 500, 'ml', 'Bottle', '76.00', '73.00', '2016-12-03'),
(80, 'Subhash', 'Toiletries', 'Dettol Handwash Refill', 185, 'ml', 'Packet', '44.00', '42.00', '2016-12-03'),
(81, 'Subhash', 'Toiletries', 'Sonali Glycerine Soap', 300, 'gm', 'Box', '67.50', '67.50', '2016-12-03'),
(82, 'Subhash', 'Toiletries', 'ExoRound Soap', 1, 'Box', 'Box', '39.00', '39.00', '2016-12-03'),
(83, 'Subhash', 'Toiletries', 'Biotin Sunsilk Shampoo', 100, 'ml', 'Bottle', '45.00', '45.00', '2016-12-03'),
(84, 'Subhash', 'Toiletries', 'Margo Neem Soap', 1, 'Box', 'Box', '20.00', '20.00', '2016-12-03'),
(85, 'Subhash', 'Toiletries', 'Dove Pink Soap', 100, 'gm', 'Box', '57.00', '57.00', '2016-12-03'),
(86, 'Subhash', 'Toiletries', 'Mach 3 Razor Cartridge', 1, 'Box', 'Box', '100.00', '100.00', '2016-12-03'),
(87, 'Subhash', 'Laundry', 'Surf Excel Easy Wash', 500, 'gm', 'Packet', '68.00', '65.00', '2016-12-03'),
(88, 'Subhash', 'Laundry', 'Ezee Liquid', 250, 'gm', 'Bottle', '49.00', '47.00', '2016-12-03'),
(89, 'Subhash', 'Laundry', 'Comfort Fabric Conditioner', 20, 'ml', 'Packet', '3.00', '3.00', '2016-12-03'),
(90, 'Subhash', 'Laundry', 'Vanish Laundry Additive', 120, 'gm', 'Packet', '45.00', '45.00', '2016-12-03'),
(91, 'Subhash', 'Pooja Items', 'Batasha', 200, 'gm', 'Kilos', '14.00', '14.00', '2016-12-03'),
(92, 'Subhash', 'Pooja Items', 'Nokul Dana', 200, 'gm', 'Kilos', '10.00', '10.00', '2016-12-03'),
(93, 'Subhash', 'Pooja Items', 'Camphor (Kappur) Crystals', 100, 'gm', 'Kilos', '50.00', '50.00', '2016-12-03'),
(94, 'Subhash', 'Pooja Items', 'Emotion Incense Sticks', 1, 'Box', 'Box', '15.00', '10.00', '2016-12-03'),
(95, 'Subhash', 'Pooja Items', 'Lavender Incense Sticks', 1, 'Box', 'Box', '15.00', '10.00', '2016-12-03'),
(96, 'Subhash', 'Pooja Items', 'Akashful Incense Sticks', 1, 'Box', 'Box', '13.00', '10.00', '2016-12-03'),
(97, 'Subhash', 'Pooja Items', 'Rose Incense Sticks', 1, 'Box', 'Box', '10.00', '10.00', '2016-12-03'),
(98, 'Subhash', 'Snacks and Fried Items', 'Sunfeast Yippee Noodles', 280, 'gm', 'Packet', '45.00', '45.00', '2016-12-03'),
(99, 'Subhash', 'Snacks and Fried Items', 'Sri Krishna Papad', 200, 'gm', 'Packet', '38.00', '30.00', '2016-12-03'),
(100, 'Subhash', 'Snacks and Fried Items', 'Top Ramen Noodles', 1, 'Packet', 'Packet', '43.00', '43.00', '2016-12-03'),
(101, 'Subhash', 'Food Consumables', 'Nutrella Soya Chunks (Veg)', 275, 'gm', 'Packet', '40.00', '40.00', '2016-12-03'),
(102, 'Subhash', 'Food Consumables', 'Nutrella Soya Granules (Veg)', 90, 'gm', 'Packet', '15.00', '15.00', '2016-12-03'),
(103, 'Subhash', 'Food Consumables', 'Raisins(Kishmish)', 50, 'gm', 'Kilos', '10.00', '10.00', '2016-12-03'),
(104, 'Subhash', 'Food Consumables', 'Cashew Nuts(Kaju Badam)', 100, 'gm', 'Kilos', '82.00', '82.00', '2016-12-03'),
(105, 'Subhash', 'Food Consumables', 'WeikField Custard Powder', 100, 'gm', 'Box', '35.00', '35.00', '2016-12-03'),
(106, 'Subhash', 'Food Consumables', 'Calcium Lactate', 100, 'gm', 'Box', '40.00', '40.00', '2016-12-03'),
(107, 'Yes Sir', 'Food Consumables', 'Maggi Coconut Milk Powder', 25, 'gm', 'Packet', '25.00', '25.00', '2016-12-03'),
(108, 'Subhash', 'Food Consumables', 'Fresh Chire', 1, 'kg', 'Kilos', '32.00', '32.00', '2016-12-03'),
(109, 'Subhash', 'Food Consumables', 'Sesame Seeds', 50, 'gm', 'Kilos', '7.00', '7.00', '2016-12-03'),
(110, 'Subhash', 'Food Consumables', 'Dabur Honey', 50, 'gm', 'Bottle', '37.00', '36.00', '2016-12-03'),
(111, 'Subhash', 'Food Consumables', 'Muri', 250, 'gm', 'Kilos', '10.00', '10.00', '2016-12-03'),
(112, 'More', 'Food Consumables', 'Modern White Bread', 400, 'gm', 'Packet', '20.00', '20.00', '2016-12-03'),
(114, 'Shanti', 'Vegetables', 'Spring Onions(Peyaj Koli)', 100, 'gm', 'Kilos', '15.00', '15.00', '2016-12-03'),
(115, 'Shanti', 'Vegetables', 'Green Pea(Motor suti)', 500, 'gm', 'Kilos', '30.00', '30.00', '2016-12-03'),
(116, 'More', 'Vegetables', 'Brinjal', 1, 'kg', 'Kilos', '20.00', '20.00', '2016-12-03'),
(117, 'More', 'Vegetables', 'Capsicum', 1, 'kg', 'Kilos', '32.00', '32.00', '2016-12-03'),
(118, 'More', 'Vegetables', 'Carrots', 1, 'kg', 'Kilos', '15.00', '15.00', '2016-12-03'),
(119, 'More', 'Vegetables', 'Cauliflower', 1, 'kg', 'Kilos', '15.00', '15.00', '2016-12-03'),
(120, 'More', 'Vegetables', 'Corriander', 1, 'Piece', 'Piece', '10.00', '10.00', '2016-12-03'),
(121, 'More', 'Vegetables', 'Cucumber', 1, 'kg', 'Kilos', '26.00', '26.00', '2016-12-03'),
(122, 'More', 'Vegetables', 'Double Bean(Seam)', 1, 'kg', 'Kilos', '36.00', '36.00', '2016-12-03'),
(123, 'More', 'Vegetables', 'Garlic', 1, 'kg', 'Kilos', '219.00', '219.00', '2016-12-03'),
(124, 'More', 'Vegetables', 'Onion', 1, 'kg', 'Kilos', '20.00', '20.00', '2016-12-03'),
(125, 'More', 'Vegetables', 'Papaya', 1, 'kg', 'Kilos', '19.00', '19.00', '2016-12-03'),
(126, 'More', 'Vegetables', 'Potatoes', 1, 'kg', 'Kilos', '27.00', '27.00', '2016-12-03'),
(127, 'More', 'Fruits', 'Apples', 1, 'kg', 'Kilos', '90.00', '90.00', '2016-12-03'),
(128, 'More', 'Fruits', 'Oranges (Nagpur)', 1, 'Piece', 'Piece', '8.00', '8.00', '2016-12-03'),
(129, 'Subhash', 'Food Consumables', 'Muri', 500, 'gm', 'Packet', '22.00', '22.00', '2016-12-16'),
(130, 'Nani', 'Fruits', 'Oranges', 6, 'Piece', 'Piece', '50.00', '50.00', '2016-12-16'),
(131, 'Shanti', 'Fruits', 'Green Banana', 1, 'Piece', 'Piece', '5.00', '5.00', '2016-12-18'),
(132, 'Shanti', 'Vegetables', 'Tomatoes', 1, 'kg', 'Kilos', '20.00', '20.00', '2016-12-18'),
(133, 'Shanti', 'Vegetables', 'Onion', 1, 'kg', 'Kilos', '25.00', '25.00', '2016-12-18'),
(134, 'Shanti', 'Vegetables', 'Garlic', 1, 'kg', 'Kilos', '200.00', '200.00', '2016-12-19'),
(135, 'Shanti', 'Vegetables', 'Karola', 1, 'kg', 'Kilos', '100.00', '100.00', '2016-12-18'),
(136, 'Nani', 'Fruits', 'Coconuts (Large)', 1, 'Piece', 'Piece', '35.00', '35.00', '2016-12-19'),
(138, 'Marwa', 'Food Consumables', 'Chire Bhaja (Plain)', 200, 'gm', 'Packet', '18.00', '18.00', '2016-12-19'),
(139, 'Marwa', 'Food Consumables', 'Khoi', 1, 'kg', 'Kilos', '100.00', '100.00', '2016-12-19'),
(140, 'Subhash', 'Food Consumables', 'Aakh er Gur', 1, 'kg', 'Kilos', '47.00', '47.00', '2016-12-19'),
(142, 'Subhash', 'Food Consumables', 'Dabur Honey', 100, 'gm', 'Bottle', '59.00', '57.00', '2016-12-16'),
(143, 'Shanti', 'Vegetables', 'Palang Saak', 1, 'kg', 'Kilos', '20.00', '20.00', '2016-12-17'),
(144, 'Shanti', 'Vegetables', 'Cauliflower', 1, 'Piece', 'Piece', '20.00', '20.00', '2016-12-23'),
(145, 'Shanti', 'Vegetables', 'Brinjal', 1, 'kg', 'Kilos', '20.00', '20.00', '2016-12-17'),
(146, 'Shanti', 'Vegetables', 'Papaya', 1, 'kg', 'Kilos', '40.00', '40.00', '2016-12-17'),
(147, 'Shanti', 'Vegetables', 'Capsicum', 1, 'kg', 'Kilos', '250.00', '250.00', '2016-12-18'),
(148, 'Subhash', 'Biscuits', 'Bakery Biscuits - 16', 1, 'Packet', 'Packet', '16.00', '16.00', '2016-12-19'),
(149, 'Jairam', 'Food Consumables', 'Belbotts Biri', 1, 'Packet', 'Packet', '9.00', '9.00', '2016-12-19'),
(150, 'Subhash', 'Biscuits', 'Bakery Biscuits - 35', 1, 'Packet', 'Packet', '35.00', '35.00', '2016-12-23'),
(151, 'Yes Sir', 'Food Consumables', 'Bun Bread', 1, 'Packet', 'Packet', '9.00', '9.00', '2016-12-23');

-- --------------------------------------------------------

--
-- Table structure for table `monthlybillindex_dec16`
--

CREATE TABLE `monthlybillindex_dec16` (
  `bill_no` int(11) NOT NULL,
  `exp_category` varchar(100) NOT NULL,
  `shopping_date` date NOT NULL,
  `shop` varchar(100) NOT NULL,
  `total_amount` decimal(7,2) DEFAULT NULL,
  `paid` decimal(7,2) DEFAULT NULL,
  `due` decimal(7,2) DEFAULT NULL,
  `mode_of_payment` varchar(20) NOT NULL,
  `account` varchar(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `monthlybillindex_dec16`
--

INSERT INTO `monthlybillindex_dec16` (`bill_no`, `exp_category`, `shopping_date`, `shop`, `total_amount`, `paid`, `due`, `mode_of_payment`, `account`) VALUES
(1, 'Grocery', '2016-12-05', 'Subhash', '202.00', '202.00', '0.00', 'Cash', NULL),
(2, 'Grocery', '2016-12-05', 'Yes Sir', '45.00', '45.00', '0.00', 'Cash', NULL),
(3, 'Sweets', '2016-12-05', 'Amar', '14.00', '14.00', '0.00', 'Cash', NULL),
(4, 'Vegetables', '2016-12-05', 'Shanti', '30.00', '30.00', '0.00', 'Cash', NULL),
(6, 'Grocery', '2016-12-16', 'Subhash', '177.00', '177.00', '0.00', 'Cash', NULL),
(7, 'Vegetables', '2016-12-17', 'Shanti', '63.00', '63.00', '0.00', 'Cash', NULL),
(8, 'Vegetables', '2016-12-18', 'Shanti', '67.50', '67.50', '0.00', 'Cash', NULL),
(9, 'Fruits', '2016-12-19', 'Nani', '70.00', '70.00', '0.00', 'Cash', NULL),
(10, 'Grocery', '2016-12-19', 'Subhash', '67.25', '67.25', '0.00', 'Cash', NULL),
(11, 'Grocery', '2016-12-19', 'Marwa', '43.00', '43.00', '0.00', 'Cash', NULL),
(12, 'Narcotics', '2016-12-19', 'Jairam', '54.00', '54.00', '0.00', 'Cash', NULL),
(13, 'Grocery', '2016-12-23', 'Subhash', '180.00', '180.00', '0.00', 'Cash', NULL),
(14, 'Vegetables', '2016-12-23', 'Shanti', '20.00', '20.00', '0.00', 'Cash', NULL),
(15, 'Grocery', '2016-12-23', 'Yes Sir', '36.00', '36.00', '0.00', 'Cash', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bills_dec16`
--
ALTER TABLE `bills_dec16`
  ADD PRIMARY KEY (`bill_id`),
  ADD KEY `bill_no` (`bill_no`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `grocery`
--
ALTER TABLE `grocery`
  ADD PRIMARY KEY (`id`);
ALTER TABLE `grocery` ADD FULLTEXT KEY `item_index` (`item`);

--
-- Indexes for table `monthlybillindex_dec16`
--
ALTER TABLE `monthlybillindex_dec16`
  ADD PRIMARY KEY (`bill_no`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bills_dec16`
--
ALTER TABLE `bills_dec16`
  MODIFY `bill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;
--
-- AUTO_INCREMENT for table `grocery`
--
ALTER TABLE `grocery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;
--
-- AUTO_INCREMENT for table `monthlybillindex_dec16`
--
ALTER TABLE `monthlybillindex_dec16`
  MODIFY `bill_no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
