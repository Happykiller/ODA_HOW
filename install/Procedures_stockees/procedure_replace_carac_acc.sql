/*
* procedure_replace_carac_acc.
*
* @param {text} p_input (ex : Amélioration !)
* @return {int} : Si pas d'erreur sortie par defaut (ex : 1)
* @example : select procedure_replace_carac_acc('Amélioration !');
*/
DROP FUNCTION IF EXISTS `procedure_replace_carac_acc`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `procedure_replace_carac_acc`( p_input TEXT ) RETURNS VARCHAR(255)
    DETERMINISTIC
BEGIN
	DECLARE v_retour VARCHAR(100);
	
	SET v_retour:= RTRIM(LTRIM(LCASE(REPLACE(p_input,'!',''))));
	SET v_retour:= REPLACE(v_retour,'?','');
	SET v_retour:= REPLACE(v_retour,'\r','');
	SET v_retour:= REPLACE(v_retour,' ','-');
	SET v_retour:= REPLACE(v_retour,':','-');
	SET v_retour:= REPLACE(v_retour,'à','-');
	SET v_retour:= REPLACE(v_retour,'â','-');
	SET v_retour:= REPLACE(v_retour,'ç','-');
	SET v_retour:= REPLACE(v_retour,'è','-');
	SET v_retour:= REPLACE(v_retour,'é','-');
	SET v_retour:= REPLACE(v_retour,'ê','-');
	SET v_retour:= REPLACE(v_retour,'î','-');
	SET v_retour:= REPLACE(v_retour,'ô','-');
	SET v_retour:= REPLACE(v_retour,'ù','-');
	SET v_retour:= REPLACE(v_retour,'û','-');
	SET v_retour:= REPLACE(v_retour,'û','-');
	SET v_retour:= REPLACE(v_retour,'ï','-');
	SET v_retour:= REPLACE(v_retour,'œ','-');
	SET v_retour:= REPLACE(v_retour,'’','-');
	SET v_retour:= REPLACE(v_retour,',','-');
	IF(SUBSTRING(v_retour,1,1) = '-') THEN
		SET v_retour:= SUBSTRING(v_retour,2);
	END IF;
	IF(SUBSTRING(v_retour,-1,1) = '-') THEN
		SET v_retour:= SUBSTRING(v_retour,1,CHAR_LENGTH(v_retour) - 1);
	END IF;
	SET v_retour:= REPLACE(v_retour,'---','-');
	SET v_retour:= REPLACE(v_retour,'--','-');

	RETURN v_retour; 
END$$