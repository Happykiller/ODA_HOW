<?php

namespace How;

require '../../header.php';
require "../../vendor/autoload.php";
require '../../config/config.php';

use \stdClass, \Oda\SimpleObject\OdaPrepareInterface, \Oda\SimpleObject\OdaPrepareReqSql, \Oda\OdaLibBd;
use cebe\markdown\GithubMarkdown;
use Oda\OdaRestInterface;
use Slim\Slim;

$app = new Slim();
//--------------------------------------------------------------------------

$app->notFound(function () use ($app) {
    $params = new OdaPrepareInterface();
    $params->slim = $app;
    $INTERFACE = new OdaRestInterface($params);
    $INTERFACE->dieInError('not found');
});

$app->get('/', function () {
    $markdown = file_get_contents('./doc.markdown', true);
    $parser = new GithubMarkdown();
    echo $parser->parse($markdown);
});

//---------------------------- Rapport -----------------------------------------
$app->get('/rapport/evol/drop/:userId', function ($userId) use ($app) {
    $params = new OdaPrepareInterface();
    $params->slim = $app;
    $INTERFACE = new RapportInterface($params);
    $INTERFACE->getEvolDropByMode($userId);
});

//----------------------------- Card ----------------------------------------
$app->post('/card/', function () use ($app) {
    $params = new OdaPrepareInterface();
    $params->arrayInput = array("id","nameFr","nameEn","quality","race","classe","type","cost","attack","life","desc","modeId");
    $params->modePublic = false;
    $params->slim = $app;
    $INTERFACE = new CardInterface($params);
    $INTERFACE->create();
});

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

$app->get('/card/:id', function ($id) use ($odaOffset, $odaLimit) {
    //Build the interface
    $params = new OdaPrepareInterface();
    $INTERFACE = new HowInterface($params);
    $params = new OdaPrepareReqSql();
    $params->sql = "SELECT `id`, `nom` as 'name', `qualite` as 'quality', `race`, `classe` as 'class', `cout` as 'cost', `attaque` as 'attack', `vie` as 'live', `type`, `mode_id`, `description`
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

$app->get('/card/', function () use ($odaOffset, $odaLimit) {
    $params = new OdaPrepareInterface();
    $INTERFACE = new HowInterface($params);
    $params = new OdaPrepareReqSql();
    $params->sql = "SELECT `id`, `nom` as 'name', `qualite` as 'quality', `race`, `classe` as 'class', `cout` as 'cost', `attaque` as 'attack', `vie` as 'live', `type`, `mode_id`, `description`
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

$app->get('/card/mode/:id', function ($id) use ($app) {
    $params = new OdaPrepareInterface();
    $params->slim = $app;
    $INTERFACE = new CardInterface($params);
    $INTERFACE->getAllByMode($id);
});


//----------------------------- mode ----------------------------------------
$app->get('/mode/', function () use ($app) {
    $params = new OdaPrepareInterface();
    $params->slim = $app;
    $INTERFACE = new ModeInterface($params);
    $INTERFACE->getAll();
});

//--------------------------------------------------------------------------

$app->run();