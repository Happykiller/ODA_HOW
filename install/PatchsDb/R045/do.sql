INSERT INTO `how-tab_menu` (`id`, `Description`, `Description_courte`, `id_categorie`, `Lien`) VALUES
(25, 'Rapports matchs', 'Rapports matchs', 4, 'page_rapports_matchs.html'),
(26, 'Rapports cartes', 'Rapports cartes', 4, 'page_rapports_cartes.html');

UPDATE `how-tab_menu_rangs_droit`
SET `id_menu` = CONCAT(`id_menu`,"25;26;")
WHERE `id_rang` in (1,10,20,30)
; 