/*
* procedure_merge.
*
* @param {text} p_date (ex : 2013-08-01)
* @return {int} : Si pas d'erreur sortie par defaut (ex : 1)
* @example : select procedure_merge('');
*/
DROP FUNCTION IF EXISTS `procedure_merge`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `procedure_merge`( p_date TEXT ) RETURNS int(11)
    DETERMINISTIC
BEGIN
	UPDATE `how-tab_inventaire` a
	JOIN `how-rec_inventaire` b
	ON 1=1
	AND a.`nom` = b.`nom`
	AND (
		a.`elite` != b.`elite`
		OR
		a.`race` != b.`race`
		OR
		a.`classe` != b.`classe`
		OR
		a.`cout` != b.`cout`
		OR
		a.`attaque` != b.`attaque`
		OR
		a.`vie` != b.`vie`
		OR
		a.`type` != b.`type`
		OR
		a.`mode` != b.`mode`
		OR
		a.`popularite` != b.`popularite`
		OR
		a.`description` != b.`description`
	)
	SET a.`actif` = 0
	WHERE 1=1
	AND a.`actif` = 1;

	INSERT INTO  `how-tab_inventaire` 
	(`data_creation` ,`nom` , `id_link`, `elite` ,`race` ,`classe` ,`cout` ,`attaque` ,`vie` ,`type` ,`mode` ,`popularite` ,`description` ,`actif`
	, `qualite`, `provocation`, `agonie`, `crie`, `combo`, `surcharge`, `sorts`, `vent`, `charge`, `bouclier`)
	SELECT a.`data_creation`, a.`nom`,
	c.`id_link` as 'id_link',
	a.`elite`, a.`race`, a.`classe`, a.`cout`, a.`attaque`, a.`vie`, a.`type`, a.`mode`, a.`popularite`, a.`description`, 1 as 'actif',
	IF(a.`elite` = 'Élite', 'Légendaire', IF(b.`qualite` is not null, b.`qualite`, 'Classique')) as 'qualite',
	IF(a.`description` like '%Provocation%', 1, 0) as 'provocation',
	IF(a.`description` like '%Râle d’agonie%', 1, 0) as 'agonie',
	IF(a.`description` like '%Cri de guerre%', 1, 0) as 'crie',
	IF(a.`description` like '%Combo%', 1, 0) as 'combo',
	IF(a.`description` like '%Surcharge%', 1, 0) as 'surcharge',
	IF(a.`description` like '%Dégâts des sorts%', 1, 0) as 'sorts',
	IF(a.`description` like '%Furie des vents%', 1, 0) as 'vent',
	IF(a.`description` like '%Charge%', 1, 0) as 'charge',
	IF(a.`description` like '%Bouclier Divin%', 1, 0) as 'bouclier'
	FROM `how-rec_inventaire` a
	LEFT OUTER JOIN `how-rec_ref_qualite` b
		ON a.`nom` = b.`nom`
	LEFT OUTER JOIN `how-rec_ref_link` c
		ON procedure_replace_carac_acc(a.`nom`) = c.`name`
	WHERE 1=1
	AND NOT EXISTS (
		SELECT 1
		FROM `how-tab_inventaire` b
		WHERE 1=1
		AND b.`nom` = a.`nom`
		AND b.`elite` = a.`elite`
		AND b.`race` = a.`race`
		AND b.`classe` = a.`classe`
		AND b.`cout` = a.`cout`
		AND b.`attaque` = a.`attaque`
		AND b.`vie` = a.`vie`
		AND b.`type` = a.`type`
		AND b.`mode` = a.`mode`
		AND b.`popularite` = a.`popularite`
		AND b.`description` = a.`description`
	)
	;

	RETURN 1; 
END$$