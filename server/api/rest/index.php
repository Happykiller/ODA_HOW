<?php

namespace How;

require '../../header.php';
require "../../vendor/autoload.php";
require '../../include/config.php';

use \stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;

//--------------------------------------------------------------------------
//Build the interface
$params = new OdaPrepareInterface();
$INTERFACE = new HowInterface($params);
$app = new \Slim\Slim();

$odaOffset = $app->request->params('odaOffset');
if(is_null($odaOffset)){
    $odaOffset = 0;
}else{
    $odaOffset = intval($odaOffset);
}
$odaLimit = $app->request->params('odaLimit');
if(is_null($odaLimit)){
    $odaLimit = 9999;
}else{
    $odaLimit = intval($odaLimit);
}

$app->notFound(function () use ($INTERFACE) {
    $INTERFACE->dieInError('not found');
});

$app->get('/card/:id', function ($id) use ($INTERFACE, $odaOffset, $odaLimit) {
    $params = new OdaPrepareReqSql();
    $params->sql = "SELECT `id`, `nom` as 'name', `id_link`, `qualite` as 'quality', `race`, `classe` as 'class', `cout` as 'cost', `attaque` as 'attack', `vie` as 'live', `type`, `mode`, `description`
        FROM `tab_inventaire` a
        WHERE 1=1
        AND a.`id` = :id
        LIMIT :limit OFFSET :offset
    ;";
    $params->bindsValue = [
        "id" => $id,
        "limit" => $odaLimit,
        "offset" => $odaOffset
    ];
    $params->typeSQL = OdaLibBd::SQL_GET_ONE;
    $retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

    $params = new stdClass();
    $params->retourSql = $retour;
    $INTERFACE->addDataReqSQL($params);
});

$app->get('/card/', function () use ($INTERFACE, $odaOffset, $odaLimit) {
    $params = new OdaPrepareReqSql();
    $params->sql = "SELECT `id`, `nom` as 'name', `id_link`, `qualite` as 'quality', `race`, `classe` as 'class', `cout` as 'cost', `attaque` as 'attack', `vie` as 'live', `type`, `mode`, `description`
        FROM `tab_inventaire` a
        WHERE 1=1
        AND a.`actif` = 1
        LIMIT :limit OFFSET :offset
    ;";
    $params->bindsValue = [
        "limit" => $odaLimit,
        "offset" => $odaOffset
    ];
    $params->typeSQL = OdaLibBd::SQL_GET_ALL;
    $retour = $INTERFACE->BD_ENGINE->reqODASQL($params);

    $params = new stdClass();
    $params->retourSql = $retour;
    $INTERFACE->addDataReqSQL($params);
});

$app->run();