<?php
namespace How;

require '../header.php';
require '../vendor/autoload.php';
require '../config/config.php';

use \stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("id_coll","code_user");
$HOW_INTERFACE = new HowInterface($params);

//--------------------------------------------------------------------------
// api/removeCollection.php?milis=123450&ctrl=ok&id_coll=1&code_user=FRO
    
//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql(); 
$params->sql = "UPDATE `tab_collection`
    SET `date_dez` = NOW()
    , `auteur_dez` = :code_user
    WHERE 1=1
    AND `id` = :id
;";
$params->bindsValue = [
    "code_user" => $HOW_INTERFACE->inputs["code_user"]
    , "id" => $HOW_INTERFACE->inputs["id_coll"]
];
$params->typeSQL = OdaLibBd::SQL_SCRIPT;
$retour = $HOW_INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->value = $retour->nombre;
$HOW_INTERFACE->addDataStr($params);