<?php
namespace How;

use Exception;
use Oda\OdaLibBd;
use Oda\OdaRestInterface;
use Oda\SimpleObject\OdaPrepareReqSql;
use \stdClass;

/**
 * @author  Fabrice Rosito <rosito.fabrice@gmail.com>
 * @version 0.1703200
 */
class CardInterface extends OdaRestInterface {
    /**
     */
    function getById($id) {
        try {
            $params = new OdaPrepareReqSql();
            $params->sql = "SELECT `id`, `nom` as 'nameFr', `name_en` as 'nameEn', `qualite` as 'quality', `race`
                , `classe` as 'classe', `cout` as 'cost', `attaque` as 'attack', `vie` as 'life', `type`, `mode_id`, `description` as 'desc'
                , `actif` as 'active'
                FROM `tab_inventaire` a
                WHERE 1=1
                AND a.`id` = :id
            ;";
            $params->bindsValue = [
                "id" => $id
            ];
            $params->typeSQL = OdaLibBd::SQL_GET_ONE;
            $retour = $this->BD_ENGINE->reqODASQL($params);

            $params = new stdClass();
            $params->retourSql = $retour;
            $this->addDataReqSQL($params);
        } catch (Exception $ex) {
            $this->dieInError($ex.'');
        }
    }

    /**
     */
    function getLast() {
        try {
            $params = new OdaPrepareReqSql();
            $params->sql = "SELECT `id`, `nom` as 'nameFr', `name_en` as 'nameEn', `qualite` as 'quality', `race`,
                `classe` as 'class', `cout` as 'cost', `attaque` as 'attack', `vie` as 'live', `type`, `description`, `actif` as 'active',
                `mode_id`
                FROM `tab_inventaire` a
                WHERE 1=1
                ORDER BY `id` DESC
                LIMIT 1;
            ;";
            $params->typeSQL = OdaLibBd::SQL_GET_ONE;
            $retour = $this->BD_ENGINE->reqODASQL($params);
            $this->addDataObject($retour->data);
        } catch (Exception $ex) {
            $this->dieInError($ex.'');
        }
    }

    /**
     */
    function getAllByMode($id) {
        try {
            $params = new OdaPrepareReqSql();
            $params->sql = "SELECT `id`, `nom` as 'nameFr', `name_en` as 'nameEn', `qualite` as 'quality', `race`,
                `classe` as 'class', `cout` as 'cost', `attaque` as 'attack', `vie` as 'live', `type`, `description`, `actif` as 'active',
                `mode_id`
                FROM `tab_inventaire` a
                WHERE 1=1
                AND a.`mode_id` = :id
                ORDER BY `id` DESC
            ;";
            $params->bindsValue = [
                "id" => $id
            ];
            $params->typeSQL = OdaLibBd::SQL_GET_ALL;
            $retour = $this->BD_ENGINE->reqODASQL($params);
            $this->addDataObject($retour->data);
        } catch (Exception $ex) {
            $this->dieInError($ex.'');
        }
    }

    /**
     */
    function create() {
        try {
            $params = new OdaPrepareReqSql();
            $params->sql = "INSERT INTO  `tab_inventaire` (
                    `id`, `data_creation`, `actif`, `nom`, `name_en`, `qualite`, `race`, `classe`, `cout`, `attaque`, `vie`, `type`, `mode_id`, `description`
                )
                VALUES (
                    :id, NOW(), 1, :nameFr, :nameEn, :quality, :race, :classe, :cost, :attack, :life, :type, :modeId, :desc
                )
            ;";
            $params->bindsValue = [
                "id" => $this->inputs["id"],
                "nameFr" => $this->inputs["nameFr"],
                "nameEn" => $this->inputs["nameEn"],
                "quality" => $this->inputs["quality"],
                "race" => $this->inputs["race"],
                "classe" => $this->inputs["classe"],
                "cost" => $this->inputs["cost"],
                "attack" => $this->inputs["attack"],
                "life" => $this->inputs["life"],
                "type" => $this->inputs["type"],
                "modeId" => $this->inputs["modeId"],
                "desc" => $this->inputs["desc"]
            ];
            $params->typeSQL = OdaLibBd::SQL_INSERT_ONE;
            $retour = $this->BD_ENGINE->reqODASQL($params);

            $params = new stdClass();
            $params->retourSql = $retour;
            $this->addDataReqSQL($params);
        } catch (Exception $ex) {
            $this->dieInError($ex.'');
        }
    }

    /**
     * @param $id
     */
    function update($id) {
        try {
            $params = new OdaPrepareReqSql();
            $params->sql = "UPDATE `tab_inventaire`
                SET
                `actif`= :active,
                `nom`= :nameFr,
                `name_en`= :nameEn,
                `qualite` = :quality,
                `race` = :race,
                `classe` = :classe,
                `cout` = :cost,
                `attaque` = :attack,
                `type` = :type,
                `description` = :desc
                WHERE 1=1
                AND `id` = :id
                ;";
            $params->bindsValue = [
                "id" => $id,
                "active" => $this->inputs["active"],
                "nameFr" => $this->inputs["nameFr"],
                "nameEn" => $this->inputs["nameEn"],
                "quality" => $this->inputs["quality"],
                "race" => $this->inputs["race"],
                "classe" => $this->inputs["classe"],
                "cost" => $this->inputs["cost"],
                "attack" => $this->inputs["attack"],
                "type" => $this->inputs["type"],
                "desc" => $this->inputs["desc"]
            ];
            $params->typeSQL = OdaLibBd::SQL_SCRIPT;
            $retour = $this->BD_ENGINE->reqODASQL($params);

            $params = new stdClass();
            $params->value = $retour->data;
            $this->addDataStr($params);
        } catch (Exception $ex) {
            $this->dieInError($ex.'');
        }
    }
}