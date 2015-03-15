var tabSetting = { };
var tabInput = { };
var retour = $.functionsLib.callRest(domaine+"test/test_exemple.php", tabSetting, tabInput);

test( "[PHP]Test", function() {
    for(var indice in retour["details"]){
        for(var indiceRetour in retour["details"][indice]["retour"]){
            equal(retour["details"][indice]["retour"][indiceRetour]["statut"], "OK", "Test - " + retour["details"][indice]["name"] + " : " + retour["details"][indice]["retour"][indiceRetour]["message"] );
        }
    }
});;