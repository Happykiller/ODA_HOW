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
class ModeInterface extends OdaRestInterface {
    /**
     */
    function getAll() {
        try {
            //-------------------------------------------------------------------------------
            $params = new OdaPrepareReqSql();
            $params->sql = "SELECT a.`id`, a.`code`, a.`label`
                FROM `tab_mode` a
                WHERE 1=1
                AND a.id not in (10,11,12,13,15)
            ;";
            $params->typeSQL = OdaLibBd::SQL_GET_ALL;
            $retour = $this->BD_ENGINE->reqODASQL($params);
            $modes = $retour->data->data;
            $this->addDataObject($modes);
        } catch (Exception $ex) {
            $this->dieInError($ex.'');
        }
    }
}