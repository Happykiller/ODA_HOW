SET FOREIGN_KEY_CHECKS=0;
-- --------------------------------------------------------
INSERT INTO `@prefix@api_tab_menu` (`Description`, `Description_courte`, `id_categorie`, `Lien`) VALUES ('modeManage.title', 'modeManage.title', 3, 'modeManage');

UPDATE `@prefix@api_tab_menu_rangs_droit` a
INNER JOIN `@prefix@api_tab_menu` b
ON b.`Lien` = 'modeManage'
INNER JOIN `@prefix@api_tab_rangs` c
ON c.`id` = a.`id_rang`
AND c.`indice` in (10,20)
SET `id_menu` = concat(`id_menu`,b.`id`,';');
-- --------------------------------------------------------
SET FOREIGN_KEY_CHECKS=1;