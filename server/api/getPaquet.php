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
$HOW_INTERFACE = new HowInterface($params);

//--------------------------------------------------------------------------
// api/getPaquet.php?milis=123450&ctrl=ok&code_user=FRO
    
//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql(); 
$params->sql = "SELECT b.`id`, b.`nom`, b.`qualite`, b.`classe`, b.`cout`, b.`mode_id`, c.`gold`, c.`nb`, c.`max_id_collec`
    FROM (	
        SELECT a.`card_id`, a.`gold`, count(*) as 'nb', max(a.`id`) as 'max_id_collec'
        FROM `tab_paquettemp` a
        WHERE 1=1
        AND a.`code_user` = :code_user
        GROUP BY a.`card_id`, a.`gold`
    ) c, `tab_inventaire` b
    WHERE 1=1
    AND c.`card_id` = b.`id`
    AND b.`actif` = 1
    ORDER BY c.`card_id`
";
$params->bindsValue = [
    "code_user" => $HOW_INTERFACE->inputs["code_user"]
];
$params->typeSQL = OdaLibBd::SQL_GET_ALL;
$retour = $HOW_INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "paquet";
$params->retourSql = $retour;
$HOW_INTERFACE->addDataReqSQL($params);

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql(); 
$params->sql = "SELECT COUNT(*) as 'nombre'
    FROM `tab_paquettemp` a
    WHERE 1=1
    AND a.`code_user` = :code_user
;";
$params->bindsValue = [
    "code_user" => $HOW_INTERFACE->inputs["code_user"]
];
$params->typeSQL = OdaLibBd::SQL_GET_ONE;
$retour = $HOW_INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "nbInPaquet";
$params->value = $retour->data->nombre;
$HOW_INTERFACE->addDataStr($params);