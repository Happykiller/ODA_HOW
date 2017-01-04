<?php
namespace How;

require '../header.php';
require '../vendor/autoload.php';
require '../config/config.php';

use \stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("code_user");
$params->arrayInputOpt = array("set" => "Tous");
$HOW_INTERFACE = new HowInterface($params);

//--------------------------------------------------------------------------
// api/bestPaquetes.php?milis=123450&code_user=FRO

//--------------------------------------------------------------------------
$fitreSet = "";
If ($HOW_INTERFACE->inputs['set'] != 'Tous'){
    $fitreSet = " AND z.`label` = '".$HOW_INTERFACE->inputs['set']."' ";
}else{
    $fitreSet = " AND z.`label` not in ('Basique','Promotion','Récompense') ";
}
//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "CREATE TEMPORARY TABLE `tmp_drop` AS
SELECT b.`nom`, a.`card_id`, a.`gold`, b.`qualite`, a.`date_ajout`
, if(a.`gold` = 1, (SELECT c.`craft_gold` FROM `tab_craft` c WHERE c.`qualite` = b.`qualite`), (SELECT d.`craft_normal` FROM `tab_craft` d WHERE d.`qualite` = b.`qualite`)) as 'cost'
FROM `tab_paquet` a, `tab_inventaire` b, `tab_mode` z
WHERE 1=1
AND b.`mode_id` = z.`id`
AND a.`card_id` = b.`id`
AND a.`code_user` = '".$HOW_INTERFACE->inputs["code_user"]."'
".$fitreSet."
;

CREATE TEMPORARY TABLE `tmp_best_drop` AS
SELECT a.`date_ajout`, SUM(a.`cost`) as 'cost_total'
FROM `tmp_drop` a
GROUP BY a.`date_ajout`
ORDER BY `cost_total` desc
LIMIT 0, 5
;";
$params->typeSQL = OdaLibBd::SQL_SCRIPT;
$retour = $HOW_INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultatTableTemp";
$params->value = $retour->nombre;
$HOW_INTERFACE->addDataStr($params);

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "SELECT 
a.`nom`,
a.`gold`,
a.`qualite`,
a.`date_ajout`,
a.`cost`,
b.`cost_total`
FROM `tmp_drop` a, `tmp_best_drop` b
WHERE 1=1
AND a.`date_ajout` = b.`date_ajout`
ORDER BY b.`cost_total` desc, a.`date_ajout`, a.`cost` desc
;";
$params->typeSQL = OdaLibBd::SQL_GET_ALL;
$retour = $HOW_INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->retourSql = $retour;
$HOW_INTERFACE->addDataReqSQL($params);