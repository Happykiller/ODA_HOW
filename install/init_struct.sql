-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Client: 127.0.0.1
-- Généré le : Mer 15 Janvier 2014 à 13:31
-- Version du serveur: 5.5.16
-- Version de PHP: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données: `happy_sandbox`
--

-- --------------------------------------------------------

--
-- Structure de la table `how-rec_inventaire`
--

CREATE TABLE IF NOT EXISTS `how-rec_inventaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data_creation` date NOT NULL,
  `nom` varchar(255) NOT NULL,
  `elite` varchar(50) NOT NULL,
  `race` varchar(255) NOT NULL,
  `classe` varchar(255) NOT NULL,
  `cout` tinyint(2) NOT NULL,
  `attaque` tinyint(2) NOT NULL,
  `vie` tinyint(2) NOT NULL,
  `type` varchar(255) NOT NULL,
  `mode` varchar(255) NOT NULL,
  `popularite` int(4) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Structure de la table `how-rec_ref_qualite`
--

CREATE TABLE IF NOT EXISTS `how-rec_ref_qualite` (
  `nom` varchar(255) NOT NULL,
  `qualite` varchar(50) NOT NULL
);

--
-- Structure de la table `how-tab_inventaire`
--

CREATE TABLE IF NOT EXISTS `how-tab_inventaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `data_creation` date NOT NULL,
  `actif` int(2) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `id_link` int(11) NOT NULL,
  `elite` varchar(50) NOT NULL,
  `qualite` varchar(50) NOT NULL,
  `race` varchar(255) NOT NULL,
  `classe` varchar(255) NOT NULL,
  `cout` tinyint(2) NOT NULL,
  `attaque` tinyint(2) NOT NULL,
  `vie` tinyint(2) NOT NULL,
  `type` varchar(255) NOT NULL,
  `mode` varchar(255) NOT NULL,
  `popularite` int(4) NOT NULL,
  `description` varchar(255) NOT NULL,
  `provocation` tinyint(2) NOT NULL,
  `agonie` tinyint(2) NOT NULL,
  `crie` tinyint(2) NOT NULL,
  `combo` tinyint(2) NOT NULL,
  `surcharge` tinyint(2) NOT NULL,
  `sorts` tinyint(2) NOT NULL,
  `vent` tinyint(2) NOT NULL,
  `charge` tinyint(2) NOT NULL,
  `bouclier` tinyint(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `actif` (`actif`,`nom`)
);

--
-- Structure de la table `how-rec_ref_link`
--

CREATE TABLE IF NOT EXISTS `how-rec_ref_link` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_link` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `data_creation` date NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Structure de la table `how-tab_collection`
--

CREATE TABLE IF NOT EXISTS `how-tab_collection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code_user` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `gold` tinyint(2) NOT NULL,
  `source` varchar(255) NOT NULL,
  `date_ajout` datetime NOT NULL,
  `auteur_ajout` varchar(255) NOT NULL,
  `date_dez` datetime NOT NULL,
  `auteur_dez` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `how-tab_deck`
--

CREATE TABLE IF NOT EXISTS `how-tab_deck` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_saisie` datetime NOT NULL,
  `code_user` varchar(255) NOT NULL,
  `nom_deck` varchar(255) NOT NULL,
  `classe` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `gold` tinyint(2) NOT NULL,
  `date_ajout` datetime NOT NULL,
  `auteur_ajout` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `how-tab_deck_header`
--

CREATE TABLE IF NOT EXISTS `how-tab_deck_header` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code_user` varchar(10) NOT NULL,
  `nom_deck` varchar(50) NOT NULL,
  `classe` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `actif` tinyint(2) NOT NULL,
  `creation_date` datetime NOT NULL,
  `creation_code_user` varchar(10) NOT NULL,
  `commentaire` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `code_user` (`code_user`)
);

-- --------------------------------------------------------

--
-- Structure de la table `how-tab_decktemp`
--

CREATE TABLE IF NOT EXISTS `how-tab_decktemp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code_user` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `gold` tinyint(2) NOT NULL,
  `date_ajout` datetime NOT NULL,
  `auteur_ajout` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `how-tab_paquet`
--

CREATE TABLE IF NOT EXISTS `how-tab_paquet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_saisie` datetime NOT NULL,
  `code_user` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `gold` tinyint(2) NOT NULL,
  `dez` tinyint(2) NOT NULL,
  `date_ajout` datetime NOT NULL,
  `auteur_ajout` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

-- --------------------------------------------------------

--
-- Structure de la table `how-tab_paquettemp`
--

CREATE TABLE IF NOT EXISTS `how-tab_paquettemp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code_user` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `gold` tinyint(2) NOT NULL,
  `date_ajout` datetime NOT NULL,
  `auteur_ajout` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Structure de la table `how-tab_matchs`
--

CREATE TABLE IF NOT EXISTS `how-tab_matchs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code_user` varchar(255) NOT NULL,
  `nom_deck` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `nom_adversaire` varchar(255) NOT NULL,
  `classe_adversaire` varchar(255) NOT NULL,
  `date_start` datetime NOT NULL,
  `date_end` datetime NOT NULL,
  `vie` int(11) NOT NULL,
  `coin` int(2) NOT NULL,
  `type_adversaire` varchar(50) NOT NULL,
  `my_rang` tinyint(2) NOT NULL,
  `adv_rang` tinyint(50) NOT NULL,
  PRIMARY KEY (`id`)
)

-- --------------------------------------------------------

--
-- Structure de la table `how-tab_craft`
--

CREATE TABLE IF NOT EXISTS `how-tab_craft` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `qualite` varchar(50) NOT NULL,
  `craft_normal` int(4) NOT NULL,
  `dez_normal` int(4) NOT NULL,
  `craft_gold` int(4) NOT NULL,
  `dez_gold` int(4) NOT NULL,
  PRIMARY KEY (`id`)
);