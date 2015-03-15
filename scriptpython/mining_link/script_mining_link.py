import sys
import os
import json
import urllib.request
from pprint import pprint
import datetime
from datetime import timedelta
import mysql.connector
import csv
import codecs
import re

import MyLogger
import MyLib

#Déclaration
arguments = dict() #dict
i = 0 #Int
config_json = {} #Json
arrayList = []

#####################################################################
#Les definitions

#Procedure de lecture
def load() :
    global config_json
    try:
        MyLogger.logger.info("Debut load")

        now = datetime.datetime.now()
        dateTime = now.strftime("%y-%m-%d")

        MyLogger.logger.debug("Chargement du fichier : "+config_json["parameter"]["datas_hearthhead"])

        # Ouverture du fichier source
        source=codecs.open(config_json["parameter"]["datas_hearthhead"], 'r','utf-8')
        str_fichier = ""

        for lig in source.readlines():
            lycos = lig.find("/card=")
            if(lycos != -1):
                temp = lig[lycos+6:]
                temp = temp.replace('" target="_parent"', '')
                temp = temp.replace('"', '').rstrip()
                tabTemp = temp.split('/')
                arrayList.append(tabTemp)
   
        source.close()

        nb_ligne_erreur = 0
        nb_ligne_succes = 0
        cnx = mysql.connector.connect(user=config_json["config_db"]["db"], database=config_json["config_db"]["db"], password=config_json["config_db"]["mdp"], host=config_json["config_db"]["host"])
        cur = cnx.cursor(buffered=True)

        sql = "TRUNCATE TABLE `how-rec_ref_link`"
        try:
            cur.execute(sql)
        except mysql.connector.Error as err:
            MyLogger.logger.error("Erreur : "+format(err))
            MyLogger.logger.debug("SQL : "+sql)
        
        for carte in arrayList:
            sql = "INSERT INTO `how-rec_ref_link` (`id_link`, `name`, `data_creation`) VALUES "
            sql += "('"+carte[0]+"', '"+carte[1]+"', '"+dateTime+"');"

            try:
                cur.execute(sql)
            except mysql.connector.Error as err:
                MyLogger.logger.error("Erreur : "+format(err))
                MyLogger.logger.debug("SQL : "+sql)
                nb_ligne_erreur += 1

            retour = cur.fetchone()
            if(retour is not None):
                MyLogger.logger.warning("Retour : "+retour+", SQL : "+sql)
                nb_ligne_warning += 1
            else :
                nb_ligne_succes += 1

        cnx.commit()

        cnx.close()

        MyLogger.logger.info("Fin insertion en base")
        MyLogger.logger.info("[nb_ligne_erreur:"+str(nb_ligne_erreur)+"][nb_ligne_succes:"+str(nb_ligne_succes)+"]")
        
        
        MyLogger.logger.info("Fin load")
    except Exception as e:
        MyLogger.logger.error("Erreur pendant load : ("+format(e)+")")

#Procedure Say More
def more() :
    MyLogger.logger.info("Les options disponible sont : 'more','load'.")
    MyLogger.logger.info("Exemple de syntax pour 'updateAll' : 'python ....load_data\script_mining_link.py ....load_data\exemple.config.mining_link.json load'.")
    MyLogger.logger.info("Exemple de syntax pour 'more' : '....read_testPhp\script_mining_link.py more'.")  

#####################################################################
#Le programme

#Message de bienvenu.
MyLogger.logger.info ("Bienvenue dans le script le mining des link de hearthhead.")

#Récupération des arguments.
for x in sys.argv :
    i += 1
    if i == 2 :
        arguments["jsonFile"] = x
    elif i == 3 :
        arguments["action"] = x
        if x not in ["load","more"] :
            MyLogger.logger.warning("Votre premier argument ("+x+") est incorrect, seul 'more','load' sont aurorisés.")
            sys.exit("Erreur")
        else :
            MyLogger.logger.info("Mode d'action choisi : "+x+".")
            arguments["action"] = x
            
    if len(arguments) == 0 :
        arguments["action"] = "more"

#Initialisation
config_json = MyLib.charger_config(arguments["jsonFile"]) 

#Affichage        
if arguments["action"] == "load" :
    load()
elif arguments["action"] == "more" :
    more()

#Message de fin.
MyLogger.logger.info ("Fin du script.")
sys.exit(0)

    
