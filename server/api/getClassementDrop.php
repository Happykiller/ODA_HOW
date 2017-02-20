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
$params->arrayInputOpt = array("qualite" => null,"set" => "Tous");
$HOW_INTERFACE = new HowInterface($params);

//--------------------------------------------------------------------------
// api/getClassementDrop.php?milis=123450&code_user=FRO

//--------------------------------------------------------------------------
$fitreSet = "";
If ($HOW_INTERFACE->inputs['set'] != 'Tous'){
    $fitreSet = " AND z.`label` = '".$HOW_INTERFACE->inputs['set']."' ";
}else{
    $fitreSet = " AND z.`label` not in ('Basique','Promotion','Récompense') ";
}

//--------------------------------------------------------------------------
$filtreQualite = '';
if($HOW_INTERFACE->inputs["qualite"] != null){
    $filtreQualite = "AND c.`qualite` = '".$HOW_INTERFACE->inputs["qualite"]."'";
}

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql(); 
$params->sql = "SELECT c.`id`, c.`nom`, d.`nb`, c.`qualite`, c.`classe`, c.`cout`
FROM (
    SELECT a.`card_id`, b.`nom`, count(*) as 'nb'
    FROM `tab_paquet` a, `tab_inventaire` b, `tab_mode` z
    WHERE 1=1
    AND b.`mode_id` = z.`id`
    AND a.`card_id` = b.`id`
    AND a.`code_user` = :code_user
    ".$fitreSet."
    GROUP BY a.`card_id`
) d, `tab_inventaire` c
WHERE 1=1
AND d.`card_id` = c.`id`
".$filtreQualite."
ORDER BY `nb` desc
LIMIT 0, 10
;";
$params->bindsValue = [
    "code_user" => $HOW_INTERFACE->inputs["code_user"]
];
$params->typeSQL = OdaLibBd::SQL_GET_ALL;
$retour = $HOW_INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->retourSql = $retour;
$HOW_INTERFACE->addDataReqSQL($params);