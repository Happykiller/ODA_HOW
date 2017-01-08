SET FOREIGN_KEY_CHECKS=0;
-- --------------------------------------------------------
--
-- Structure de la table `@prefix@tab_collection`
--

ALTER TABLE `@prefix@tab_collection` ADD `card_id` INT(11) NOT NULL AFTER `code_user`;

UPDATE `@prefix@tab_collection`
SET `card_id` = (
  SELECT `@prefix@tab_inventaire`.`id`
  FROM `@prefix@tab_inventaire`
  WHERE 1=1
    AND `@prefix@tab_inventaire`.`nom` = `@prefix@tab_collection`.`nom`
    AND `@prefix@tab_inventaire`.`actif` = 1
  )
WHERE 1;

ALTER TABLE `@prefix@tab_collection` ADD INDEX( `card_id`);

ALTER TABLE `@prefix@tab_collection` ADD CONSTRAINT `fk_collection_cardId` FOREIGN KEY (`card_id`) REFERENCES `@prefix@tab_inventaire`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `@prefix@tab_collection` DROP `nom`;

--
-- Structure de la table `@prefix@tab_deck`
--

UPDATE `@prefix@tab_deck`
SET `nom_carte` = 'Protecteur d''Argent'
WHERE 1=1
AND `nom_carte` = 'Protecteur de l’Aube'
;

ALTER TABLE `@prefix@tab_deck` ADD `card_id` INT(11) NOT NULL AFTER `id_deck`;

UPDATE `@prefix@tab_deck`
SET `card_id` = (
  SELECT `@prefix@tab_inventaire`.`id`
  FROM `@prefix@tab_inventaire`
  WHERE 1=1
        AND `@prefix@tab_inventaire`.`nom` = `@prefix@tab_deck`.`nom_carte`
        AND `@prefix@tab_inventaire`.`actif` = 1
)
WHERE 1;

ALTER TABLE `@prefix@tab_deck` ADD INDEX( `card_id`);

ALTER TABLE `@prefix@tab_deck` ADD CONSTRAINT `fk_deck_cardId` FOREIGN KEY (`card_id`) REFERENCES `@prefix@tab_inventaire`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `@prefix@tab_deck` ADD CONSTRAINT `fk_deck_deckId` FOREIGN KEY (`id_deck`) REFERENCES `@prefix@tab_deck_header`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `@prefix@tab_deck` DROP `nom_carte`;

--
-- Structure de la table `@prefix@tab_decktemp`
--

UPDATE `@prefix@tab_decktemp`
SET `nom` = 'Protecteur d''Argent'
WHERE 1=1
      AND `nom` = 'Protecteur de l’Aube'
;

ALTER TABLE `@prefix@tab_decktemp` ADD `card_id` INT(11) NOT NULL AFTER `type`;

UPDATE `@prefix@tab_decktemp`
SET `card_id` = (
  SELECT `@prefix@tab_inventaire`.`id`
  FROM `@prefix@tab_inventaire`
  WHERE 1=1
        AND `@prefix@tab_inventaire`.`nom` = `@prefix@tab_decktemp`.`nom`
        AND `@prefix@tab_inventaire`.`actif` = 1
)
WHERE 1;

ALTER TABLE `@prefix@tab_decktemp` ADD INDEX( `card_id`);

ALTER TABLE `@prefix@tab_decktemp` ADD CONSTRAINT `fk_decktemp_cardId` FOREIGN KEY (`card_id`) REFERENCES `@prefix@tab_inventaire`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `@prefix@tab_decktemp` DROP `nom`;

--
-- Structure de la table `@prefix@tab_paquet`
--

ALTER TABLE `@prefix@tab_paquet` ADD `card_id` INT(11) NOT NULL AFTER `code_user`;

UPDATE `@prefix@tab_paquet`
SET `nom` = 'Protecteur d''Argent'
WHERE 1=1
      AND `nom` = 'Protecteur de l’Aube'
;

UPDATE `@prefix@tab_paquet`
SET `card_id` = (
  SELECT `@prefix@tab_inventaire`.`id`
  FROM `@prefix@tab_inventaire`
  WHERE 1=1
        AND `@prefix@tab_inventaire`.`nom` = `@prefix@tab_paquet`.`nom`
        AND `@prefix@tab_inventaire`.`actif` = 1
)
WHERE 1;

ALTER TABLE `@prefix@tab_paquet` ADD INDEX( `card_id`);

ALTER TABLE `@prefix@tab_paquet` ADD CONSTRAINT `fk_paquet_cardId` FOREIGN KEY (`card_id`) REFERENCES `@prefix@tab_inventaire`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `@prefix@tab_paquet` DROP `nom`;

--
-- Structure de la table `@prefix@tab_paquettemp`
--

ALTER TABLE `@prefix@tab_paquettemp` ADD `card_id` INT(11) NOT NULL AFTER `code_user`;

UPDATE `@prefix@tab_paquettemp`
SET `nom` = 'Protecteur d''Argent'
WHERE 1=1
  AND `nom` = 'Protecteur de l’Aube'
;

UPDATE `@prefix@tab_paquettemp`
SET `card_id` = (
  SELECT `@prefix@tab_inventaire`.`id`
  FROM `@prefix@tab_inventaire`
  WHERE 1=1
        AND `@prefix@tab_inventaire`.`nom` = `@prefix@tab_paquettemp`.`nom`
        AND `@prefix@tab_inventaire`.`actif` = 1
)
WHERE 1;

ALTER TABLE `@prefix@tab_paquettemp` ADD INDEX( `card_id`);

ALTER TABLE `@prefix@tab_paquettemp` ADD CONSTRAINT `fk_paquettemp_cardId` FOREIGN KEY (`card_id`) REFERENCES `@prefix@tab_inventaire`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `@prefix@tab_paquettemp` DROP `nom`;

--
-- Structure de la table `@prefix@tab_mode`
--

CREATE TABLE IF NOT EXISTS `@prefix@tab_mode` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(250) NOT NULL,
  `label` varchar(250) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Contenu de la table `@prefix@tab_mode`
--

INSERT INTO `@prefix@tab_mode` (`code`, `label`, `date`) VALUES
  ('expert', 'Expert', '2016-02-29'),
  ('basique', 'Basique', '2016-02-29'),
  ('promotion', 'Promotion', '2016-02-29'),
  ('reward', 'Récompense', '2016-02-29'),
  ('naxxramas', 'La Malédiction de Naxxramas', '2016-02-29'),
  ('goblin-gnome', 'Gobelins et Gnomes', '2016-02-29'),
  ('rochenoir', 'Mont Rochenoire', '2016-02-29'),
  ('the-grand-tournament', 'the-grand-tournament', '2016-02-29');

--
-- Structure de la table `@prefix@tab_inventaire`
--

ALTER TABLE `@prefix@tab_inventaire` ADD `mode_id` INT(11) NOT NULL AFTER `type`;

UPDATE `@prefix@tab_inventaire`
SET `mode_id` = (
  SELECT `@prefix@tab_mode`.`id`
  FROM `@prefix@tab_mode`
  WHERE 1=1
    AND `@prefix@tab_mode`.`label` = `@prefix@tab_inventaire`.`mode`
)
WHERE 1;

ALTER TABLE `@prefix@tab_inventaire` ADD INDEX( `mode_id`);

ALTER TABLE `@prefix@tab_inventaire` ADD CONSTRAINT `fk_inv_modId` FOREIGN KEY (`mode_id`) REFERENCES `@prefix@tab_inventaire`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `@prefix@tab_inventaire` DROP `mode`;

--
-- Corection
--

UPDATE `@prefix@tab_inventaire`
SET `nom` = 'Maître des chevaux de guerre'
WHERE `nom` = 'Maitre des chevaux de guerre'
;

UPDATE `@prefix@tab_inventaire`
SET `nom` = 'Druidesse du Sabre'
WHERE `nom` = 'Druide du sabre'
;

-- --------------------------------------------------------
SET FOREIGN_KEY_CHECKS=1;