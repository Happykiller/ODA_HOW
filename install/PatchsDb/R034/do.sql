DELETE FROM `how-tab_menu`
WHERE 1=1
AND `id` = 23;

UPDATE `how-tab_menu_rangs_droit`
SET `id_menu` = REPLACE(`id_menu`,"23;", "");