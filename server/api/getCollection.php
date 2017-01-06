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
$params->arrayInputOpt = array("qualite_commune" => null,"qualite_rare" => null,"qualite_epique" => null,"qualite_legendaire" => null);
$HOW_INTERFACE = new HowInterface($params);

//--------------------------------------------------------------------------
// api/getCollection.php?milis=123450&ctrl=ok&code_user=FRO

//--------------------------------------------------------------------------
$filtreQualiteCommune = "";
if($HOW_INTERFACE->inputs["qualite_commune"] == "true"){
    $filtreQualiteCommune = ", 'Commune'";
}
$filtreQualiteRare = "";
if($HOW_INTERFACE->inputs["qualite_rare"] == "true"){
    $filtreQualiteRare = ", 'Rare'";
}
$filtreQualiteEpique = "";
if($HOW_INTERFACE->inputs["qualite_epique"] == "true"){
    $filtreQualiteEpique = ", 'Épique'";
}
$filtreQualiteLegendaire = "";
if($HOW_INTERFACE->inputs["qualite_legendaire"] == "true"){
    $filtreQualiteLegendaire = ", 'Légendaire'";
}

$filtreQualite = "";
if($filtreQualiteCommune != "" || $filtreQualiteRare != "" || $filtreQualiteEpique != "" || $filtreQualiteLegendaire != ""){
    $filtreQualite = " AND b.`qualite` in ('defaut'".$filtreQualiteCommune."".$filtreQualiteRare."".$filtreQualiteEpique."".$filtreQualiteLegendaire.")";
}
    
//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql(); 
$params->sql = "SELECT b.`id`, c.`card_id`, b.`nom`, b.`qualite`, b.`classe`, b.`cout`, b.`mode_id`, c.`gold`, c.`nb`, c.`max_id_collec`
    FROM (	
        SELECT a.`card_id`, a.`gold`, count(*) as 'nb', max(a.`id`) as 'max_id_collec'
        FROM `tab_collection` a
        WHERE 1=1
        AND a.`code_user` = :code_user
        AND a.`date_dez` = '0000-00-00 00:00:00'
        GROUP BY a.`card_id`, a.`gold`
    ) c, `tab_inventaire` b
    WHERE 1=1
    AND c.`card_id` = b.`id`
    AND b.`actif` = 1
    ".$filtreQualite."
    ORDER BY b.`nom`
";
$params->bindsValue = [
    "code_user" => $HOW_INTERFACE->inputs["code_user"]
];
$params->typeSQL = OdaLibBd::SQL_GET_ALL;
$retour = $HOW_INTERFACE->BD_ENGINE->reqODASQL($params);

$params = new stdClass();
$params->label = "collection";
$params->retourSql = $retour;
$HOW_INTERFACE->addDataReqSQL($params);

if($retour->nombre == 0){
    //collection vide on init
    $params = new OdaPrepareReqSql(); 
    $params->sql = "INSERT INTO  `tab_collection`
    (`code_user`, `card_id`, `gold`, `source`, `date_ajout`, `auteur_ajout`)
    SELECT :code_user, a.`id`, 0, 'init', NOW(), :code_user
    FROM `tab_inventaire` a
    WHERE 1=1
    AND a.`mode` = 'Basique'
    ;

    INSERT INTO  `tab_collection`
    (`code_user`, `card_id`, `gold`, `source`, `date_ajout`, `auteur_ajout`)
    SELECT :code_user, a.`id`, 0, 'init', NOW(), :code_user
    FROM `tab_inventaire` a
    WHERE 1=1
    AND a.`mode` = 'Basique'
    ;";
    $params->bindsValue = [
        "code_user" => $HOW_INTERFACE->inputs["code_user"]
    ];
    $params->typeSQL = OdaLibBd::SQL_SCRIPT;
    $retour = $HOW_INTERFACE->BD_ENGINE->reqODASQL($params);

    $params = new stdClass();
    $params->label = "resultatInit";
    $params->value = $retour->data;
    $HOW_INTERFACE->addDataStr($params); 
}