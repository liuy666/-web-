-- phpMyAdmin SQL Dump
-- version 2.11.2.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2018 年 03 月 16 日 05:41
-- 服务器版本: 5.0.45
-- PHP 版本: 5.2.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- 数据库: `biyao`
--

-- --------------------------------------------------------

--
-- 表的结构 `mall_users`
--

CREATE TABLE `mall_users` (
  `uid` int(11) NOT NULL auto_increment,
  `phonenumber` varchar(11) collate utf8_unicode_ci NOT NULL,
  `password` varchar(50) collate utf8_unicode_ci NOT NULL,
  `score` int(11) default '100',
  `level` varchar(50) collate utf8_unicode_ci default 'VIP01',
  `createtime` timestamp NULL default CURRENT_TIMESTAMP,
  PRIMARY KEY  (`uid`),
  UNIQUE KEY `phonenumber` (`phonenumber`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=20 ;

--
-- 导出表中的数据 `mall_users`
--

INSERT INTO `mall_users` (`uid`, `phonenumber`, `password`, `score`, `level`, `createtime`) VALUES
(17, '13547936524', '123456', 100, 'VIP01', '2018-03-12 15:44:01'),
(18, '15777770130', '1223', 100, 'VIP01', '2018-03-12 15:45:07'),
(19, '18888888888', '123', 100, 'VIP01', '2018-03-14 20:09:11');
