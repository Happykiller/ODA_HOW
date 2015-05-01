<?php
namespace How;
use stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;
//--------------------------------------------------------------------------
//Header
require("../API/php/header.php");
require("../php/class/HowInterface.php");

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("id_deck","id_card_in_deck","code_user");
$HOW_INTERFACE = new HowInterface($params);

//--------------------------------------------------------------------------
// phpsql/deckEditionRemove.php?milis=123450&id_deck=5&id_card_in_deck=339&code_user=FRO
    
//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql();
$params->sql = "DELETE FROM `tab_deck`
    WHERE 1=1
    AND `id` = ".$HOW_INTERFACE->inputs["id_card_in_deck"].";
;";
$params->typeSQL = OdaLibBd::SQL_SCRIPT;
$retour = $HOW_INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->value = $retour->nombre;
$HOW_INTERFACE->addDataStr($params);