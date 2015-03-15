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

#####################################################################
#Les definitions

#Procedure de lecture
def load() :
    global config_json
    try:
        MyLogger.logger.info("Debut load")

        now = datetime.datetime.now()
        dateTime = now.strftime("%y-%m-%d")

        arrayList = []
        carte = {} #Json
        elite = False
        premiereLigne = None
        secondeLigne = None
        troisiemeLigne = None

        MyLogger.logger.debug("Chargement du fichier : "+config_json["parameter"]["datas_hearthhead"])

        # Ouverture du fichier source
        with open(config_json["parameter"]["datas_hearthhead"], encoding='utf-8') as csvfile:
            reader = csv.reader(csvfile, delimiter=';')

            nbligne = 0
            nbElite = 0
            nbCarte = 0
            for rows in reader:
                nbligne += 1
                if(premiereLigne is None):
                    premiereLigne = rows
                elif(secondeLigne is None):
                    secondeLigne = rows
                elif((elite is True) and (secondeLigne is not None) and (troisiemeLigne is None)):
                    troisiemeLigne = rows
                else :
                    if(elite is False):
                        carte["nom"] = premiereLigne[0]
                        carte["elite"] = "" 
                        carte["race"] = premiereLigne[1] 
                        carte["classe"] = premiereLigne[2]
                        carte["cout"] = premiereLigne[3] 
                        carte["attaque"] = premiereLigne[4] 
                        carte["vie"] = premiereLigne[5] 
                        carte["type"] = secondeLigne[6] 
                        carte["mode"] = premiereLigne[6] 
                        carte["popularite"] = premiereLigne[7]
                        carte["description"] = secondeLigne[0]
                    else:
                        carte["nom"] = secondeLigne[0]
                        carte["elite"] = premiereLigne[0]
                        carte["race"] = premiereLigne[1] 
                        carte["classe"] = premiereLigne[2]
                        carte["cout"] = premiereLigne[3] 
                        carte["attaque"] = premiereLigne[4] 
                        carte["vie"] = premiereLigne[5]  
                        carte["type"] = secondeLigne[6] 
                        carte["mode"] = premiereLigne[6] 
                        carte["popularite"] = premiereLigne[7]
                        carte["description"] = troisiemeLigne[0]

                    arrayList.append(carte)

                    nbCarte += 1
                    premiereLigne = rows
                    secondeLigne = None
                    troisiemeLigne = None
                    elite = False
                    carte = {}
                    
                    if(rows[0] == "Élite"):
                        nbElite += 1
                        elite = True

        MyLogger.logger.info("Fin lecture du fichier de datas")
        MyLogger.logger.info("[nbligne:"+str(nbligne)+"][nbElite:"+str(nbElite)+"][nbCarte:"+str(nbCarte)+"]")

        nb_ligne_erreur = 0
        nb_ligne_succes = 0
        cnx = mysql.connector.connect(user=config_json["config_db"]["db"], database=config_json["config_db"]["db"], password=config_json["config_db"]["mdp"], host=config_json["config_db"]["host"])
        cur = cnx.cursor(buffered=True)

        sql = "TRUNCATE TABLE `how-rec_inventaire`"
        try:
            cur.execute(sql)
        except mysql.connector.Error as err:
            MyLogger.logger.error("Erreur : "+format(err))
            MyLogger.logger.debug("SQL : "+sql)
        
        for carte in arrayList:
            sql = "INSERT INTO `how-rec_inventaire` (`id`, `data_creation`, `nom`, `elite`, `race`, `classe`, `cout`, `attaque`, `vie`, `type`, `mode`, `popularite`, `description`) VALUES "
            sql += "(NULL, '"+dateTime+"', '"+carte["nom"]+"', '"+carte["elite"]+"', '"+carte["race"]+"', '"+carte["classe"]+"', '"+carte["cout"]+"', '"+carte["attaque"]+"', '"+carte["vie"]+"', '"+carte["type"]+"', '"+carte["mode"]+"', '"+carte["popularite"]+"', '"+carte["description"]+"');"

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
    MyLogger.logger.info("Exemple de syntax pour 'updateAll' : 'python ....load_data\script_load_data.py ....load_data\exemple.config.load_data.json load'.")
    MyLogger.logger.info("Exemple de syntax pour 'more' : '....read_testPhp\script_load_data.py more'.")  

#####################################################################
#Le programme

#Message de bienvenu.
MyLogger.logger.info ("Bienvenue dans le script le chargement des data ODA_HOW.")

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

    
