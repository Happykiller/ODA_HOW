INSERT INTO `how-tab_menu` (`id`, `Description`, `Description_courte`, `id_categorie`, `Lien`) VALUES
(27, 'Rapports Meta', 'Rapports Meta', 4, 'page_rapports_meta.html')
;

UPDATE `how-tab_menu_rangs_droit`
SET `id_menu` = CONCAT(`id_menu`,"27;")
WHERE `id_rang` in (1,10,20,30)
; 