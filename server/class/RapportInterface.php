<?php
namespace How;

use Exception;
use Oda\OdaLibBd;
use Oda\OdaRestInterface;
use Oda\SimpleObject\OdaPrepareReqSql;
use \stdClass;
use Symfony\Component\Yaml\Yaml;

/**
 * Project class
 *
 * Tool
 *
 * @author  Fabrice Rosito <rosito.fabrice@gmail.com>
 * @version 0.150221
 */
class RapportInterface extends OdaRestInterface {
    /**
     * @param $id
     */
    function getEvolDropByMode($userId) {
        try {
            //-------------------------------------------------------------------------------
            // General
            $params = new OdaPrepareReqSql();
            $params->sql = "DROP TABLE IF EXISTS tmp0;
                CREATE TEMPORARY TABLE tmp0 AS
                SELECT count(*) as 'nb', b.`qualite`
                FROM `tab_paquet` a, `tab_inventaire` b
                WHERE 1=1
                AND a.`card_id` = b.`id`
                AND b.`mode_id` not in (10,11,12,13,15)
                GROUP BY b.`qualite`
                ORDER BY b.`qualite`
                ;
                
                DROP TABLE IF EXISTS tmp1;
                CREATE TEMPORARY TABLE tmp1 AS
                SELECT SUM(a.`nb`) as 'nb'
                FROM `tmp0` a
                ;
            ";
            $params->typeSQL = OdaLibBd::SQL_SCRIPT;
            $retour = $this->BD_ENGINE->reqODASQL($params);

            $params = new OdaPrepareReqSql();
            $params->sql = "SELECT ROUND((a.`nb` / b.`nb`) * 100, 2) as 'perc', a.`qualite`
                FROM `tmp0` a, `tmp1` b
                WHERE 1=1
                ;
            ";
            $params->typeSQL = OdaLibBd::SQL_GET_ALL;
            $retour = $this->BD_ENGINE->reqODASQL($params);

            $params = new stdClass();
            $params->label = "general";
            $params->value = $retour->data->data;
            $this->addDataObject($params);

            //-------------------------------------------------------------------------------
            // general by mode

            $params = new OdaPrepareReqSql();
            $params->sql = "SELECT a.`id`, a.`code`, a.`label`
                FROM `tab_mode` a
                WHERE 1=1
                AND a.id not in (10,11,12,13,15)
            ;";
            $params->typeSQL = OdaLibBd::SQL_GET_ALL;
            $retour = $this->BD_ENGINE->reqODASQL($params);
            $modes = $retour->data->data;

            foreach ($modes as $mode){
                $params = new OdaPrepareReqSql();
                $params->sql = "DROP TABLE IF EXISTS tmp0;
                    CREATE TEMPORARY TABLE tmp0 AS
                    SELECT count(*) as 'nb', b.`qualite`
                    FROM `tab_paquet` a, `tab_inventaire` b
                    WHERE 1=1
                    AND a.`card_id` = b.`id`
                    AND b.`mode_id` = ".$mode->id."
                    GROUP BY b.`qualite`
                    ORDER BY b.`qualite`
                    ;
                    
                    DROP TABLE IF EXISTS tmp1;
                    CREATE TEMPORARY TABLE tmp1 AS
                    SELECT SUM(a.`nb`) as 'nb'
                    FROM `tmp0` a
                    ;
                ";
                $params->typeSQL = OdaLibBd::SQL_SCRIPT;
                $retour = $this->BD_ENGINE->reqODASQL($params);

                $params = new OdaPrepareReqSql();
                $params->sql = "SELECT ROUND((a.`nb` / b.`nb`) * 100, 2) as 'perc', a.`qualite`
                    FROM `tmp0` a, `tmp1` b
                    WHERE 1=1
                    ;
                ";
                $params->typeSQL = OdaLibBd::SQL_GET_ALL;
                $retour = $this->BD_ENGINE->reqODASQL($params);

                $params = new stdClass();
                $params->label = "general_" . $mode->label;
                $params->value = $retour->data->data;
                $this->addDataObject($params);
            }

            //-------------------------------------------------------------------------------
            // personal

            $params = new OdaPrepareReqSql();
            $params->sql = "DROP TABLE IF EXISTS tmp0;
                CREATE TEMPORARY TABLE tmp0 AS
                SELECT count(*) as 'nb', b.`qualite`
                FROM `tab_paquet` a, `tab_inventaire` b, `api_tab_utilisateurs` c
                WHERE 1=1
                AND a.`card_id` = b.`id`
                AND b.`mode_id` not in (10,11,12,13,15)
                AND a.`code_user` = c.`code_user`
                AND c.`id` = ".$userId."
                GROUP BY b.`qualite`
                ORDER BY b.`qualite`
                ;
                
                DROP TABLE IF EXISTS tmp1;
                CREATE TEMPORARY TABLE tmp1 AS
                SELECT SUM(a.`nb`) as 'nb'
                FROM `tmp0` a
                ;
            ";
            $params->typeSQL = OdaLibBd::SQL_SCRIPT;
            $retour = $this->BD_ENGINE->reqODASQL($params);

            $params = new OdaPrepareReqSql();
            $params->sql = "SELECT ROUND((a.`nb` / b.`nb`) * 100, 2) as 'perc', a.`qualite`
                FROM `tmp0` a, `tmp1` b
                WHERE 1=1
                ;
            ";
            $params->typeSQL = OdaLibBd::SQL_GET_ALL;
            $retour = $this->BD_ENGINE->reqODASQL($params);

            $params = new stdClass();
            $params->label = "personal";
            $params->value = $retour->data->data;
            $this->addDataObject($params);

            //-------------------------------------------------------------------------------
            // personal by mode

            foreach ($modes as $mode){
                $params = new OdaPrepareReqSql();
                $params->sql = "DROP TABLE IF EXISTS tmp0;
                    CREATE TEMPORARY TABLE tmp0 AS
                    SELECT count(*) as 'nb', b.`qualite`
                    FROM `tab_paquet` a, `tab_inventaire` b, `api_tab_utilisateurs` c
                    WHERE 1=1
                    AND a.`card_id` = b.`id`
                    AND b.`mode_id` = ".$mode->id."
                    AND a.`code_user` = c.`code_user`
                    AND c.`id` = ".$userId."
                    GROUP BY b.`qualite`
                    ORDER BY b.`qualite`
                    ;
                    
                    DROP TABLE IF EXISTS tmp1;
                    CREATE TEMPORARY TABLE tmp1 AS
                    SELECT SUM(a.`nb`) as 'nb'
                    FROM `tmp0` a
                    ;
                ";
                $params->typeSQL = OdaLibBd::SQL_SCRIPT;
                $retour = $this->BD_ENGINE->reqODASQL($params);

                $params = new OdaPrepareReqSql();
                $params->sql = "SELECT ROUND((a.`nb` / b.`nb`) * 100, 2) as 'perc', a.`qualite`
                    FROM `tmp0` a, `tmp1` b
                    WHERE 1=1
                    ;
                ";
                $params->typeSQL = OdaLibBd::SQL_GET_ALL;
                $retour = $this->BD_ENGINE->reqODASQL($params);

                $params = new stdClass();
                $params->label = "personal_".$mode->label;
                $params->value = $retour->data->data;
                $this->addDataObject($params);
            }
            
        } catch (Exception $ex) {
            $this->object_retour->strErreur = $ex.'';
            $this->object_retour->statut = self::STATE_ERROR;
            die();
        }
    }
}