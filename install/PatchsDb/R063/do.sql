--Creer deck header
CREATE TABLE IF NOT EXISTS `how-tab_deck_header` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code_user` varchar(10) NOT NULL,
  `nom_deck` varchar(50) NOT NULL,
  `classe` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `actif` tinyint(2) NOT NULL,
  `creation_date` datetime NOT NULL,
  `creation_code_user` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
)
;

--Importer donnée
INSERT INTO `how-tab_deck_header` (`code_user`, `nom_deck`, `classe`, `type`, `actif`, `creation_date`, `creation_code_user`)
SELECT DISTINCT  `code_user`, `nom_deck`, `classe`, `type`, `actif`, MIN(`date_ajout`), `auteur_ajout`
FROM `how-tab_deck` a
GROUP BY `nom_deck`, `code_user`, `classe`, `type`, `auteur_ajout`
ORDER BY MIN(`date_ajout`) asc
;

--------------------------------------------------------------------
-- tab_deck

--Ajout id_deck 
ALTER TABLE  `how-tab_deck` ADD  `id_deck` INT( 11 ) NOT NULL AFTER  `code_user`
;

ALTER TABLE  `how-tab_deck` ADD INDEX (  `id_deck` ) ;

--MAJ ID_DECK 
UPDATE `how-tab_deck` a
LEFT JOIN `how-tab_deck_header` b
	ON b.`nom_deck` = a.`nom_deck`
SET a.`id_deck` = b.`id`
WHERE a.`id_deck` = 0
;

--SUPP COLL 
ALTER TABLE  `how-tab_deck` DROP  `nom_deck` ,
DROP `code_user`, 
DROP  `classe` ,
DROP  `type` ,
DROP  `actif`,
DROP `date_saisie` ;

-- change non col trop flou
ALTER TABLE  `how-tab_deck` CHANGE  `nom`  `nom_carte` VARCHAR( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
;

-- Contraite
ALTER TABLE  `how-tab_deck` ADD FOREIGN KEY (  `id_deck` ) REFERENCES  `how-tab_deck_header` (
`id`
) ON DELETE CASCADE ON UPDATE CASCADE ;

--------------------------------------------------------------------
-- tab_matchs
ALTER TABLE  `how-tab_matchs` ADD  `id_deck` INT( 11 ) NOT NULL AFTER  `code_user`
;

ALTER TABLE  `how-tab_matchs` ADD INDEX (  `id_deck` ) ;

UPDATE `how-tab_matchs` a
LEFT JOIN `how-tab_deck_header` b
	ON b.`nom_deck` = a.`nom_deck`
SET a.`id_deck` = b.`id`
WHERE a.`id_deck` = 0
;

ALTER TABLE  `how-tab_matchs` DROP  `nom_deck` 
;

ALTER TABLE  `how-tab_matchs` ADD FOREIGN KEY (  `id_deck` ) REFERENCES  `how-tab_deck_header` (
`id`
) ON DELETE CASCADE ON UPDATE CASCADE ;
