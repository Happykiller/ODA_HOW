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
$params->arrayInputOpt = array("set" => 'Tous');
$HOW_INTERFACE = new HowInterface($params);

//--------------------------------------------------------------------------
// api/getMetricsDropRate.php?milis=123450&code_user=FRO

//--------------------------------------------------------------------------
$fitreSet = "";
If ($HOW_INTERFACE->inputs['set'] != 'Tous'){
    $fitreSet = " AND z.`label` = '".$HOW_INTERFACE->inputs['set']."' ";
}else{
    $fitreSet = " AND z.`label` not in ('Basique','Promotion','Récompense') ";
}  
//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql(); 
$params->sql = "SELECT ROUND(((SUM(a.`gold`) / COUNT(*))*100),2) as 'dropRate_gold' 
    FROM `tab_paquet` a, `tab_inventaire` b, `tab_mode` z
    WHERE 1=1
    AND a.`card_id` = b.`id`
    AND b.`mode_id` = z.`id`
    AND a.`code_user` = :code_user
    ".$fitreSet."
;";
$params->bindsValue = [
    "code_user" => $HOW_INTERFACE->inputs["code_user"]
];
$params->typeSQL = OdaLibBd::SQL_GET_ONE;
$retour = $HOW_INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "resultat";
$params->retourSql = $retour;
$HOW_INTERFACE->addDataReqSQL($params);

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql(); 
$params->sql = "SELECT d.`qualite`, IFNULL(e.`nb`, 0) as 'nb', IFNULL(e.`nbDez`, 0) as 'nbDez', IFNULL(e.`percDez`, 0) as 'percDez'
    FROM (
        SELECT DISTINCT c.`qualite`
        FROM `tab_inventaire` c
    ) d
    LEFT OUTER JOIN (
        SELECT b.`qualite`, COUNT(`dez`) as 'nb' , SUM(`dez`) as 'nbDez', ROUND(SUM(`dez`)/COUNT(`dez`)*100,2) as 'percDez'
        FROM `tab_paquet` a, `tab_inventaire` b , `tab_mode` z
        WHERE 1=1 
        AND a.`card_id` = b.`id`
        AND b.`mode_id` = z.`id`
        AND a.`code_user` = :code_user
        ".$fitreSet."
        GROUP BY b.`qualite`
    ) e
    ON e.`qualite` = d.`qualite`
    UNION
    SELECT 'gold', COUNT(`dez`) as 'nb' , SUM(`dez`) as 'nbDez', IFNULL(ROUND(SUM(`dez`)/COUNT(`dez`)*100,2),0) as 'percDez'
    FROM `tab_paquet` a, `tab_inventaire` b, `tab_mode` z
    WHERE 1=1
    AND a.`card_id` = b.`id`
    AND b.`mode_id` = z.`id`
    AND a.`code_user` = :code_user
    ".$fitreSet."
    AND a.`gold` = 1
;";
$params->bindsValue = [
    "code_user" => $HOW_INTERFACE->inputs["code_user"]
];
$params->typeSQL = OdaLibBd::SQL_GET_ALL;
$retour = $HOW_INTERFACE->BD_ENGINE->reqODASQL($params);
$paquet = $retour->data->data;

$params = new stdClass();
$params->label = "resultatDez";
$params->retourSql = $retour;
$HOW_INTERFACE->addDataReqSQL($params);

//--------------------------------------------------------------------------

$params = new OdaPrepareReqSql(); 
$params->sql = "SELECT d.`qualite`, d.`nbInv`, e.`nbMy`
    , IFNULL(ROUND(e.`nbMy` / IF(d.`qualite` != 'Légendaire', d.`nbInv`*2, d.`nbInv`) * 100,2),0) as 'avancement'
    , IF(d.`qualite` != 'Légendaire', d.`nbInv`*2, d.`nbInv`) - e.`nbMy` as 'rest'
    FROM (
        SELECT c.`qualite`, COUNT(c.`qualite`) as 'nbInv'
        FROM `tab_inventaire` c, `tab_mode` z
        WHERE 1=1
        AND c.`mode_id` = z.`id`
        ".$fitreSet."
        GROUP BY c.`qualite`
    ) d,
    (
        SELECT b.`qualite`, SUM(a.`nb`) as 'nbMy' 
        FROM (
            SELECT f.`card_id`, IF(COUNT(`card_id`) > 2, 2, COUNT(`card_id`)) as 'nb'
            FROM `tab_collection` f
            WHERE 1=1 
            AND f.`code_user` = :code_user
            GROUP BY f.`card_id`
    )	a, `tab_inventaire` b, `tab_mode` z
        WHERE 1=1
        AND b.`mode_id` = z.`id`
        AND a.`card_id` = b.`id`
        ".$fitreSet."
        GROUP BY b.`qualite`
    ) e
    WHERE 1=1
    AND d.`qualite` = e.`qualite`
;";
$params->bindsValue = [
    "code_user" => $HOW_INTERFACE->inputs["code_user"]
];
$params->typeSQL = OdaLibBd::SQL_GET_ALL;
$retour = $HOW_INTERFACE->BD_ENGINE->reqODASQL($params);
$paquet = $retour->data->data;

$params = new stdClass();
$params->label = "resultatAvan";
$params->retourSql = $retour;
$HOW_INTERFACE->addDataReqSQL($params);