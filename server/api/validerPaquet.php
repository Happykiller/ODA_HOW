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
// api/validerPaquet.php?milis=123450&code_user=FRO
    
//--------------------------------------------------------------------------
$nbDez = 0;
$modeNoImpact = false;

//--------------------------------------------------------------------------
$params = new OdaPrepareReqSql(); 
$params->sql = "SELECT a.`card_id`, b.`nom`, a.`gold`
    FROM `tab_paquettemp` a, `tab_inventaire` b
    WHERE 1=1
    AND a.`card_id` = b.`id`
    AND a.`code_user` = '".$HOW_INTERFACE->inputs["code_user"]."'
";
$params->typeSQL = OdaLibBd::SQL_GET_ALL;
$retour = $HOW_INTERFACE->BD_ENGINE->reqODASQL($params);
$paquet = $retour->data->data;

foreach ($paquet as $carte) {
    $dez = false;

    $params = new OdaPrepareReqSql();
    $params->sql = "SELECT `qualite`
        FROM `tab_inventaire` a
        WHERE 1=1
        AND a.`id` = :card_id
    ";
    $params->bindsValue = [
        "card_id" => $carte->card_id
    ];
    $params->typeSQL = OdaLibBd::SQL_GET_ONE;
    $retourQualite = $HOW_INTERFACE->BD_ENGINE->reqODASQL($params);

    $limit = 2;
    if($retourQualite->data->qualite == "Légendaire"){
        $limit = 1;
    }

    $params = new OdaPrepareReqSql(); 
    $params->sql = "SELECT count(*) as 'nb'
        FROM `tab_collection` a
        WHERE 1=1
        AND a.`code_user` = :code_user
        AND a.`card_id` = :card_id
        AND a.`gold` = :gold
        AND a.`date_dez` = '0000-00-00 00:00:00'
    ";
    $params->bindsValue = [
        "code_user" => $HOW_INTERFACE->inputs["code_user"]
        , "card_id" => $carte->card_id
        , "gold" => $carte->gold
    ];
    $params->typeSQL = OdaLibBd::SQL_GET_ONE;
    $params->debug = false;
    $retour = $HOW_INTERFACE->BD_ENGINE->reqODASQL($params);

    if($retour->data->nb < $limit){
        if(!$modeNoImpact) {
            $params = new OdaPrepareReqSql();
            $params->sql = "INSERT INTO  `tab_collection`
                (`code_user`, `card_id`, `gold`, `source`, `date_ajout`, `auteur_ajout`)
                VALUES
                ( :code_user, :card_id, :gold, 'draft', NOW(), :code_user )
            ;";
            $params->bindsValue = [
                "code_user" => $HOW_INTERFACE->inputs["code_user"]
                , "card_id" => $carte->card_id
                , "gold" => $carte->gold
            ];
            $params->typeSQL = OdaLibBd::SQL_INSERT_ONE;
            $retour = $HOW_INTERFACE->BD_ENGINE->reqODASQL($params);

            $params = new stdClass();
            $params->label = "resultatAjoutCollection_" . $carte->nom . "_" . $carte->gold;
            $params->value = $retour->data;
            $HOW_INTERFACE->addDataStr($params);
        }
    }else{
        $dez = true;
        $nbDez += 1;
    }

    if(!$modeNoImpact) {
        $params = new OdaPrepareReqSql();
        $params->sql = "INSERT INTO  `tab_paquet`
            (`date_saisie`, `code_user`, `card_id`, `gold`, `dez`, `date_ajout`, `auteur_ajout`)
            VALUES
            ( NOW(), :code_user, :card_id, :gold, :dez, NOW(), :code_user )
        ;";
        $params->bindsValue = [
            "code_user" => $HOW_INTERFACE->inputs["code_user"]
            , "card_id" => $carte->card_id
            , "gold" => $carte->gold
            , "dez" => $dez
        ];
        $params->typeSQL = OdaLibBd::SQL_INSERT_ONE;
        $retour = $HOW_INTERFACE->BD_ENGINE->reqODASQL($params);
    }else{
        $retour = new stdClass();
        $retour->data = 1;
    }

    $params = new stdClass();
    $params->label = "resultatAjoutPaquet_".$carte->nom."_".$carte->gold;
    $params->value = $retour->data;
    $HOW_INTERFACE->addDataStr($params);
}

//--------------------------------------------------------------------------
if(!$modeNoImpact){
    $params = new OdaPrepareReqSql(); 
    $params->sql = "DELETE FROM `tab_paquettemp`
        WHERE 1=1
        AND `code_user` = :code_user
    ;";
    $params->bindsValue = [
        "code_user" => $HOW_INTERFACE->inputs["code_user"]
    ];
    $params->typeSQL = OdaLibBd::SQL_SCRIPT;
    $retour = $HOW_INTERFACE->BD_ENGINE->reqODASQL($params);

    $params = new stdClass();
    $params->label = "resultatVider";
    $params->value = $retour->nombre;
    $HOW_INTERFACE->addDataStr($params);
}

//--------------------------------------------------------------------------
$params = new stdClass();
$params->label = "nbDez";
$params->value = $nbDez;
$HOW_INTERFACE->addDataStr($params);