<?php
namespace How;

require '../header.php';
require '../vendor/autoload.php';
require '../config/config.php';

use \stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$params->arrayInput = array("code_user","type");
$HOW_INTERFACE = new HowInterface($params);

//--------------------------------------------------------------------------
// api/getCards.php?milis=123450&ctrl=ok&code_user=FRO&type=collection
    
//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql(); 
switch ($HOW_INTERFACE->inputs["type"]) {
    case "collection":
        $params->sql = "SELECT * FROM (
                SELECT a.`id`, a.`nom`, a.`qualite`, a.`actif`, a.`cout`, a.`mode_id` (
                    SELECT COUNT(*)
                    FROM `tab_collection` b
                    WHERE 1=1
                    AND b.`card_id` = a.`id`
                    AND b.`code_user` = '".$HOW_INTERFACE->inputs["code_user"]."'
                    AND b.`date_dez` = '0000-00-00 00:00:00'
                    AND b.`gold` = 0
                ) as 'nb_non_gold',(
                    SELECT COUNT(*)
                    FROM `tab_collection` c
                    WHERE 1=1
                    AND c.`card_id` = a.`id`
                    AND c.`code_user` = '".$HOW_INTERFACE->inputs["code_user"]."'
                    AND c.`date_dez` = '0000-00-00 00:00:00'
                    AND c.`gold` = 1
                ) as 'nb_gold'
                FROM `tab_inventaire` a
                WHERE 1=1
            ) d
            WHERE 1=1
            AND NOT (
                d.`nb_non_gold` >= 2 AND d.`nb_gold` >= 2
            )
            ORDER BY d.`nom`
        ";
        break;
    default:
        $params->sql = "Select a.`id`, a.`nom`, a.`qualite`, a.`actif`, a.`cout`, a.`mode_id`, 0 as 'nb_non_gold', 0 as 'nb_gold'
            from `tab_inventaire` a
            WHERE 1=1
            AND a.`actif` = 1
            ORDER BY a.`nom`
        ";
        break;
}
$params->typeSQL = OdaLibBd::SQL_GET_ALL;
$retour = $HOW_INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "cartes";
$params->retourSql = $retour;
$HOW_INTERFACE->addDataReqSQL($params);