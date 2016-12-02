/* global er */
//# sourceURL=OdaApp.js
// Library of tools for the exemple
/**
 * @author FRO
 * @date 15/05/08
 */

var wowhead_tooltips = { "colorlinks": true, "iconizelinks": true, "renamelinks": true };

(function() {
    'use strict';

    var
        /* version */
        VERSION = '0.1'
    ;
    
    ////////////////////////// PRIVATE METHODS ////////////////////////
    /**
     * @name _init
     * @desc Initialize
     */
    function _init() {
        $.Oda.Event.addListener({name : "oda-fully-loaded", callback : function(e){
            $.Oda.App.startApp();
        }});
    }

    ////////////////////////// PUBLIC METHODS /////////////////////////
    $.Oda.App = {
        /* Version number */
        version: VERSION,

        color : {
            INFO : "#5882FA",
            WARNING : "#f7931e",
            ERROR : "#B9121B",
            SUCCESS : "#AEEE00"
        },
        
        colorCard : {
            Commune : "#848484",
            Commune_inv : "#B0B0B0",
            Rare : "#2E2EFE",
            Rare_inv : "#5A5AFF",
            Épique : "#8904B1",
            Épique_inv : "#AA61C1",
            Légendaire : "#FF8000",
            Légendaire_inv : "#FFB163"
        },
        colorClasse : {
            Death_Knight : "#C41F3B",
            Druide : "#FF7D0A",
            Chasseur : "#ABD473",
            Mage : "#69CCF0",
            Moine : "#00FF96",
            Paladin : "#F58CBA",
            Prêtre : "#FFFFFF",
            Voleur : "#FFF569",
            Chaman : "#0070DE",
            Démoniste : "#9482C9",
            Guerrier : "#C79C6E"
        },
        
        chosenClass : "",

        tab_sets : ['Tous', 'Expert' , 'La Malédiction de Naxxramas', 'Gobelins et Gnomes', 'Mont Rochenoire','the-grand-tournament','league-explorers','old-gods','gadgetzan'],

        /**
         * @param {Object} p_params
         * @param p_params.attr
         * @returns {$.Oda.App}
         */
        startApp: function (p_params) {
            try {
                $.Oda.Context.projectLabel = "ODA HOW";

                $.Oda.Router.addDependencies("wowhead", {
                    ordered : false,
                    "list" : [
                        { "elt" : "http://static.wowhead.com/widgets/power.js", "type" : "script"}
                    ]
                });

                $.Oda.Router.addRoute("home", {
                    "path" : "partials/home.html",
                    "title" : "oda-main.home-title",
                    "urls" : ["","home"],
                    "dependencies" : ["dataTables","wowhead"],
                    "middleWares":["support","auth"]
                });

                $.Oda.Router.addRoute("saisir_paquet", {
                    "path" : "partials/paquet-add.html",
                    "title" : "paquet-add.title",
                    "urls" : ["saisir_paquet"],
                    "dependencies" : ["dataTables","wowhead"],
                    "middleWares":["support","auth"]
                });

                $.Oda.Router.addRoute("rapports_cartes", {
                    "path" : "partials/rapports_cartes.html",
                    "title" : "rapports-cartes.title",
                    "urls" : ["rapports_cartes"],
                    "dependencies" : ["dataTables","hightcharts","wowhead"],
                    "middleWares":["support","auth"]
                });

                $.Oda.Router.addRoute("gerer_collection", {
                    "path" : "partials/gerer_collection.html",
                    "title" : "gerer-coll.title",
                    "urls" : ["gerer_collection"],
                    "dependencies" : ["dataTables","wowhead"],
                    "middleWares":["support","auth"]
                });

                $.Oda.Router.addRoute("gerer_deck", {
                    "path" : "partials/gerer_deck.html",
                    "title" : "gerer-deck.title",
                    "urls" : ["gerer_deck"],
                    "dependencies" : ["dataTables", "hightcharts", "wowhead"],
                    "middleWares":["support","auth"]
                });

                $.Oda.Router.addRoute("saisir_matchs", {
                    "path" : "partials/rec_matchs.html",
                    "title" : "rec-matchs.title",
                    "urls" : ["saisir_matchs"],
                    "dependencies" : ["dataTables", "hightcharts", "wowhead"],
                    "middleWares":["support","auth"]
                });

                $.Oda.Router.addRoute("rapports_matchs", {
                    "path" : "partials/rapports_matchs.html",
                    "title" : "rapports-matchs.title",
                    "urls" : ["rapports_matchs"],
                    "dependencies" : ["dataTables", "hightcharts", "wowhead"],
                    "middleWares":["support","auth"]
                });

                $.Oda.Router.addRoute("rapports_meta", {
                    "path" : "partials/rapports_meta.html",
                    "title" : "rapports-meta.title",
                    "urls" : ["rapports_meta"],
                    "dependencies" : ["dataTables", "hightcharts", "wowhead"],
                    "middleWares":["support","auth"]
                });

                $.Oda.Router.startRooter();

                return this;
            } catch (er) {
                $.Oda.Log.error("$.Oda.App.startApp : " + er.message);
                return null;
            }
        },

        Controler : {
            GererDeck : {
                /**
                 * @param {Object} p_params
                 * @returns {$.Oda.App.Controler.GererDeck}
                 */
                start: function (p_params) {
                    try {
                        $.Oda.App.Controler.GererDeck.loadListDeck();
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.GererDeck.start : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @returns {$.Oda.App.Controler.GererDeck}
                 */
                loadListDeck: function (p_params) {
                    try {
                        $.Oda.Display.loading({elt : $("#listDeckContent")});

                        var tabSetting = { functionRetour : function(p_retour){
                            var strhtml = '<table cellpadding="0" cellspacing="0" border="0" class="display hover" id="table_listDeck" style="width: 100%"></table>';
                            $("#listDeckContent").html(strhtml);

                            var objDataTable = $.Oda.Tooling.objDataTableFromJsonArray(p_retour.data.listDeck.data);
                            var oTable = $('#table_listDeck').dataTable( {
                                "sPaginationType": "full_numbers",
                                "iDisplayLength": 20,
                                "aaData": objDataTable.data,
                                "aaSorting": [[5,'desc'],[2,'desc']],
                                "aoColumns": [
                                    { sTitle: "Nom"},
                                    { sTitle: "Classe"},
                                    { sTitle: "Quote"},
                                    { sTitle: "Type"},
                                    { sTitle: "Date", sClass: "dataTableColCenter", "sWidth": "175px"},
                                    { sTitle: "Actif", sClass: "dataTableColCenter"},
                                    { sTitle: "Action", sClass: "dataTableColCenter"}
                                ],
                                aoColumnDefs: [
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = '<a href="javascript:$.Oda.App.Controler.GererDeck.seeDeck({id:\''+row[objDataTable.entete["id"]]+'\'});">'+row[objDataTable.entete["nom_deck"]]+'</a>';
                                            return strHtml;
                                        },
                                        aTargets: [ 0 ]
                                    },
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = row[objDataTable.entete["classe"]];
                                            return strHtml;
                                        },
                                        aTargets: [ 1 ]
                                    },
                                    {
                                        mRender: function ( data, type, row ) {
                                            var quote = parseInt(row[objDataTable.entete["quote"]]);
                                            if ( type === 'display' ) {
                                                return quote+"%";
                                            }
                                            return quote;
                                        },
                                        aTargets: [ 2 ]
                                    },
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = row[objDataTable.entete["type"]];
                                            return strHtml;
                                        },
                                        aTargets: [ 3 ]
                                    },
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = row[objDataTable.entete["date"]];
                                            return strHtml;
                                        },
                                        aTargets: [ 4 ]
                                    },
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = row[objDataTable.entete["actif"]];
                                            return strHtml;
                                        },
                                        aTargets: [ 5 ]
                                    },
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = '<a href="javascript:$.Oda.App.Controler.GererDeck.seeDeck({id:\''+row[objDataTable.entete["id"]]+'\'});" class="btn btn-xs"><span class="glyphicon glyphicon-eye-open"></span></a>';
                                            strHtml += '<a href="javascript:$.Oda.App.Controler.GererDeck.editDeck({id:\''+row[objDataTable.entete["id"]]+'\', name : \''+row[objDataTable.entete["nom_deck"]]+'\'});" class="btn btn-xs"><span class="glyphicon glyphicon-pencil"></span></a>';
                                            return strHtml;
                                        },
                                        aTargets: [ 6 ]
                                    }
                                ],
                                "fnDrawCallback": function( oSettings ) {
                                    $('#table_listDeck')
                                        .removeClass( 'display' )
                                        .addClass('table table-striped table-bordered');
                                }
                            });
                        }};
                        var tabInput = { code_user : $.Oda.Session.code_user, option_actif : "", type : "" };
                        $.Oda.Interface.callRest($.Oda.Context.rest+"api/getListDeck.php", tabSetting, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.GererDeck.loadListDeck : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.id
                 * @param p_params.name
                 * @returns {$.Oda.App.Controler.GererDeck}
                 */
                editDeck: function (p_params) {
                    try {
                        var strHtmlDetails = $.Oda.Display.TemplateHtml.create({
                            template : "deck-list",
                            scope : {}
                        });

                        $.Oda.App.Controler.GererDeck.editTheDeck({id : p_params.id});

                        $.Oda.Display.Popup.open({size : "lg", label : '<span oda-label="gerer-deck.detailsDeck"></span> : '+p_params.name, details : strHtmlDetails});
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.GererDeck.editDeck : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @returns {$.Oda.App.Controler.GererDeck}
                 */
                newDeck: function (p_params) {
                    try {
                        $.Oda.Scope.refresh = function(){
                            if(($("#deckName").data("isOk")) && ($("#deckCmt").data("isOk")) && ($("#deckClass").data("isOk")) && ($("#deckType").data("isOk"))){
                                $("#bt_valider").removeClass("disabled");
                            }else{
                                $("#bt_valider").addClass("disabled");
                            }
                        };

                        var strHtmlDetails = $.Oda.Display.TemplateHtml.create({
                            template : "deck-new",
                            scope : {}
                        });

                        var strHtmlFooter = '';
                        strHtmlFooter += '<button type="button" onclick="$.Oda.App.Controler.GererDeck.recNewDeck();" class="btn btn-primary disabled" oda-submit="bt_valider"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> '+ $.Oda.I8n.get('oda-main','bt-submit')+'</button>';
                        strHtmlFooter += '<a href="javascript:$.Oda.Display.Popup.close();" class="btn btn-default" id="bt_annuler_user"><span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span> '+ $.Oda.I8n.get('oda-main','bt-cancel')+'</a>';

                        $.Oda.Display.Popup.open({size : "lg", label : '<span oda-label="gerer-deck.newDeck"></span>', details : strHtmlDetails, footer : strHtmlFooter});

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.GererDeck.newDeck : " + er.message);
                        return null;
                    }
                },

                /**
                 * @param {object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.GererDeck}
                 */
                editTheDeck: function (p_params) {
                    try {
                        if((p_params.hasOwnProperty("id"))&&(p_params.id !== 0)){
                            var tabInput = { id_deck : p_params.id, code_user : $.Oda.Session.code_user };
                            var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/getDeckDetails.php", {functionRetour : function(json_retour){
                                var nb_carte = parseInt(json_retour.data.nb_carte_in_deck);
                                if(nb_carte < 30){
                                    $.Oda.App.Controler.GererDeck.loadCards({idDeck :  p_params.id, type : json_retour.data.deck_header.type});
                                }else{
                                    $('#div_inventaire').html("Plus d'ajout possible.");
                                }

                                var strhtml = '<table cellpadding="0" cellspacing="0" border="0" class="display hover" style="width: 100%" id="table_deckList"></table>';
                                $('#div_paquet').html(strhtml);

                                var objDataTable = $.Oda.Tooling.objDataTableFromJsonArray(json_retour.data.resultat.data);
                                var oTable = $('#table_deckList').dataTable( {
                                    "sPaginationType": "full_numbers",
                                    "aaData": objDataTable.data,
                                    "aaSorting": [[2,'asc']],
                                    "bPaginate": false,
                                    "iDisplayLength": 50,
                                    "aoColumns": [
                                        { sTitle: "Nombre", sClass: "dataTableColCenter", sWidth: "30px" },
                                        { sTitle: "Nom", sClass: "left" },
                                        { sTitle: "Mana", sClass: "dataTableColCenter", sWidth: "30px" },
                                        { sTitle: "Action", sClass: "dataTableColCenter", sWidth: "30px" }
                                    ],
                                    aoColumnDefs: [
                                        {
                                            mRender: function ( data, type, row ) {
                                                var strHtml = row[objDataTable.entete["nb"]];
                                                return strHtml;
                                            },
                                            aTargets: [ 0 ]
                                        }, {
                                            mRender: function ( data, type, row ) {
                                                var dore = "";
                                                if(row[objDataTable.entete["gold"]] == "1"){
                                                    dore = "&amp;premium";
                                                }
                                                var strHtml = '<a href="http://www.wowhead.com/hearthstone/card='+row[objDataTable.entete["id_link"]]+dore+'" style="color: '+ $.Oda.App.colorCard[row[objDataTable.entete["qualite"]]]+';text-decoration: none">'+row[objDataTable.entete["nom_carte"]]+'</a>';
                                                return strHtml;
                                            },
                                            aTargets: [ 1 ]
                                        }, {
                                            mRender: function ( data, type, row ) {
                                                var strHtml = row[objDataTable.entete["cout"]];
                                                return strHtml;
                                            },
                                            aTargets: [ 2 ]
                                        }, {
                                            mRender: function ( data, type, row ) {
                                                var strHtml = '<a href="javascript:$.Oda.App.Controler.GererDeck.deckListDelete({idDeck : '+p_params.id+',nb : '+row[objDataTable.entete["nb"]]+', idCard : '+row[objDataTable.entete["max_id_collec"]]+'});" class="btn btn-xs"><span class="glyphicon glyphicon-remove"></span></a>';
                                                return strHtml;
                                            },
                                            aTargets: [ 3 ]
                                        }
                                    ],
                                    "fnDrawCallback": function( oSettings ) {
                                        $('#table_deckList')
                                            .removeClass( 'display' )
                                            .addClass('table table-striped table-bordered');
                                    }
                                });
                                $('#div_deckModifInfos').html('Nombre de carte dans le deck : '+json_retour.data.nb_carte_in_deck+'');
                                var datas = $.Oda.App.Controler.GererDeck.buildDatasForGraph(json_retour.data);

                                $('#div_graphCout').highcharts({
                                    chart: {
                                        type: 'column'
                                    },
                                    title: {
                                        text: 'La curve',
                                        style: {
                                            color: '#ecf0f1'
                                        }
                                    },
                                    tooltip: {
                                        enabled : false
                                    },
                                    exporting: {
                                        enabled: false
                                    },
                                    xAxis: {
                                        categories: datas.categories
                                    },
                                    yAxis: {
                                        gridLineColor: 'transparent',
                                        title: {
                                            enabled: false
                                        },
                                        labels: {
                                            enabled: false
                                        }
                                    },
                                    plotOptions : {
                                        column : {
                                            dataLabels : {
                                                enabled : true,
                                                formatter : function() {
                                                    if(this.x == "Total"){
                                                        return this.y*10;
                                                    }else{
                                                        return this.y;
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    series: datas.series
                                });

                                $('#div_graphRepart').highcharts({
                                    chart: {
                                        plotBackgroundColor: null,
                                        plotBorderWidth: null,
                                        plotShadow: false
                                    },
                                    title: {
                                        text: 'Type de carte'
                                    },
                                    tooltip: {
                                        pointFormat: 'Nombre : {point.y}: <br> Pourcentage : {point.percentage:.1f}%'
                                    },
                                    plotOptions: {
                                        pie: {
                                            allowPointSelect: true,
                                            cursor: 'pointer',
                                            dataLabels: {
                                                enabled: true,
                                                format: '{point.y} {point.name}(s)<br>{point.percentage:.1f}%',
                                                style: {
                                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                                }
                                            }
                                        }
                                    },
                                    series: [{
                                        type: 'pie',
                                        name: 'Type',
                                        data: datas.dataSeries
                                    }]
                                });
                            }}, tabInput);
                        }
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.GererDeck.editTheDeck : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.idDeck
                 * @param p_params.type
                 * @returns {$.Oda.App.Controler.GererDeck}
                 */
                loadCards: function (p_params) {
                    try {
                        var tabInput = { type : "arene", code_user : $.Oda.Session.code_user };
                        if(p_params.type === 'regular'){
                            tabInput.type = "collection";
                        }
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/getCards.php", {functionRetour : function(json_retour){
                            var strhtml = '<table cellpadding="0" cellspacing="0" border="0" class="display hover" style="width: 100%" id="table_cards"></table>';
                            $('#div_inventaire').html(strhtml);

                            var objDataTable = $.Oda.Tooling.objDataTableFromJsonArray(json_retour.data.cartes.data);
                            var oTable = $('#table_cards').dataTable( {
                                "sPaginationType": "full_numbers",
                                "aaData": objDataTable.data,
                                "aaSorting": [[0,'asc']],
                                "aoColumns": [
                                    { sTitle: "Nom", sClass: "left"  },
                                    { sTitle: "Mana", sClass: "dataTableColCenter", sWidth: "30px" },
                                    { sTitle: "Action", sClass: "dataTableColCenter", sWidth: "30px" }
                                ],
                                aoColumnDefs: [
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = '<a href="http://www.wowhead.com/hearthstone/card='+row[objDataTable.entete["id_link"]]+'" style="color: '+$.Oda.App.colorCard[row[objDataTable.entete["qualite"]]]+';text-decoration: none">'+row[objDataTable.entete["nom"]]+'</a>';
                                            return strHtml;
                                        },
                                        aTargets: [ 0 ]
                                    },
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = String(row[9]);
                                            return strHtml;
                                        },
                                        aTargets: [ 1 ]
                                    },
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = '<a href="javascript:$.Oda.App.Controler.GererDeck.addToDeck({idDeck : '+p_params.idDeck+',idCard : '+row[objDataTable.entete["id"]]+', gold : 0});" class="btn btn-xs"><span class="glyphicon glyphicon-plus"></span></a>';
                                            return strHtml;
                                        },
                                        aTargets: [ 2 ]
                                    }
                                ],
                                "fnDrawCallback": function( oSettings ) {
                                    $('#table_cards')
                                        .removeClass( 'display' )
                                        .addClass('table table-striped table-bordered');
                                }
                            });
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.GererDeck.loadCards : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.idDeck
                 * @param p_params.idCard
                 * @param p_params.gold
                 * @returns {$.Oda.App.Controler.GererDeck}
                 */
                addToDeck: function (p_params) {
                    try {
                        var tabInput = { id_deck : p_params.idDeck, code_user : $.Oda.Session.code_user, id_card : p_params.idCard, gold : p_params.gold};
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/deckEditionAdd.php", {functionRetour : function(data){
                            $.Oda.App.Controler.GererDeck.editTheDeck({id : p_params.idDeck});
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.GererDeck.addToDeck : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.nb
                 * @param p_params.idDeck
                 * @param p_params.idCard
                 * @returns {$.Oda.App.Controler.GererDeck}
                 */
                deckListDelete: function (p_params) {
                    try {
                        var tabInput = { id_deck : p_params.idDeck, id_card_in_deck : p_params.idCard, code_user : $.Oda.Session.code_user };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/deckEditionRemove.php", {functionRetour : function(data){
                            $.Oda.App.Controler.GererDeck.editTheDeck({id : p_params.idDeck});
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.GererDeck.deckListDelete : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.GererDeck}
                 */
                seeDeck: function (p_params) {
                    try {
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/getHeaderDeck.php", {functionRetour : function(data){

                            var strHtmlDetails = $.Oda.Display.TemplateHtml.create({
                                template : "deck-details",
                                scope : {
                                    deckActif : data.data.resultat.actif,
                                    deckName : data.data.resultat.nom_deck,
                                    deckType : data.data.resultat.type,
                                    deckCmt : data.data.resultat.commentaire
                                }
                            });

                            var strHtmlFooter = '';
                            strHtmlFooter += '<button type="button" onclick="$.Oda.App.Controler.GererDeck.recHeaderDeck({deckId : '+p_params.id+', oldName : \''+data.data.resultat.nom_deck+'\'});" class="btn btn-primary disabled" oda-submit="bt_valider"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> '+ $.Oda.I8n.get('oda-main','bt-submit')+'</button>';
                            strHtmlFooter += '<a href="javascript:$.Oda.Display.Popup.close();" class="btn btn-default" id="bt_annuler_user"><span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span> '+ $.Oda.I8n.get('oda-main','bt-cancel')+'</a>';

                            $.Oda.Display.Popup.open({size : "lg", label : '<span oda-label="gerer-deck.detailsDeck"></span> : '+data.data.resultat.nom_deck, details : strHtmlDetails, footer : strHtmlFooter, callback : function(data){
                                var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/getDeckDetails.php", {functionRetour : function(data){
                                    var datas = $.Oda.App.Controler.GererDeck.buildDatasForGraph(data["data"]);

                                    $('#div_graphCout').highcharts({
                                        chart: {
                                            type: 'column'
                                        },
                                        title: {
                                            text: 'La curve',
                                            style: {
                                                color: '#ecf0f1'
                                            }
                                        },
                                        tooltip: {
                                            enabled : false
                                        },
                                        exporting: {
                                            enabled: false
                                        },
                                        xAxis: {
                                            categories: datas.categories
                                        },
                                        yAxis: {
                                            gridLineColor: 'transparent',
                                            title: {
                                                enabled: false
                                            },
                                            labels: {
                                                enabled: false
                                            }
                                        },
                                        legend: {
                                            itemStyle: {
                                                color: '#ecf0f1'
                                            }
                                        },
                                        plotOptions : {
                                            column : {
                                                dataLabels : {
                                                    enabled : true,
                                                    formatter : function() {
                                                        if(this.x == "Total"){
                                                            return this.y*10;
                                                        }else{
                                                            return this.y;
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        series: datas.series
                                    });

                                    $('#div_graphRepart').highcharts({
                                        chart: {
                                            plotBackgroundColor: null,
                                            plotBorderWidth: null,
                                            plotShadow: false
                                        },
                                        title: {
                                            text: 'Type de carte',
                                            style: {
                                                color: '#ecf0f1'
                                            }
                                        },
                                        tooltip: {
                                            pointFormat: 'Nombre : {point.y}: <br> Pourcentage : {point.percentage:.1f}%'
                                        },
                                        legend: {
                                            itemStyle: {
                                                color: '#ecf0f1'
                                            }
                                        },
                                        plotOptions: {
                                            pie: {
                                                allowPointSelect: true,
                                                cursor: 'pointer',
                                                dataLabels: {
                                                    enabled: true,
                                                    format: '{point.y} {point.name}(s)<br>{point.percentage:.1f}%',
                                                    style: {
                                                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                                    }
                                                }
                                            }
                                        },
                                        series: [{
                                            type: 'pie',
                                            name: 'Type',
                                            data: datas.dataSeries
                                        }]
                                    });
                                }}, {id_deck : p_params.id, code_user : $.Oda.Session.code_user});
                            }});

                            $.Oda.Scope.refresh = function(){
                                if(($("#deckName").data("isOk")) && ($("#deckCmt").data("isOk"))){
                                    $("#bt_valider").removeClass("disabled");
                                }else{
                                    $("#bt_valider").addClass("disabled");
                                }
                            };
                        }}, { id_deck : p_params.id });

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.GererDeck.seeDeck : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @returns {$.Oda.App.Controler.GererDeck}
                 */
                recNewDeck: function (p_params) {
                    try {
                        var input_actif = $('#deckActif').val();
                        var input_nom = $('#deckName').val();
                        var input_type = $('#deckType').val();

                        var tabInput = { code_user : $.Oda.Session.code_user, nomDeck : input_nom };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/checkNomDeck.php", {functionRetour : function(json_retour){
                            if(json_retour["data"]["resultat"]["exists"] !== "0"){
                                $.Oda.Display.Notification.warning( "Nom du deck déjà existant.");
                            }else{
                                var tabInput = {
                                    nom_deck : input_nom,
                                    type : input_type,
                                    classe : $('#deckClass').val(),
                                    code_user : $.Oda.Session.code_user
                                };
                                var json_retour = $.Oda.Interface.callRest($.Oda.Context.rest+"api/validerDeck.php", {functionRetour : function(json_retour){
                                    $.Oda.App.Controler.GererDeck.loadListDeck();
                                    $.Oda.Display.Popup.close();
                                    $.Oda.Display.Notification.success( "Création réussi.");
                                }}, tabInput);
                            }
                        }}, tabInput);

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.GererDeck.recNewDeck : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.id
                 * @param p_params.oldName
                 * @returns {$.Oda.App.Controler.GererDeck}
                 */
                recHeaderDeck: function (p_params) {
                    try {
                        var input_actif = $('#deckActif').val();
                        var input_nom = $('#deckName').val();
                        var input_type = $('#deckType').val();
                        var input_cmt = $('#deckCmt').val();

                        if(input_nom !== ""){
                            if(p_params.oldName !== input_nom){
                                var tabInput = { code_user : $.Oda.Session.code_user, nomDeck : input_nom };
                                var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/checkNomDeck.php", { context : {idDeck : p_params.deckId}, functionRetour : function(json_retour){
                                    if(json_retour["data"]["resultat"]["exists"] !== "0"){
                                        $.Oda.Display.Notification.warning( "Nom du deck déjà existant.");
                                    }else{
                                        var tabInput = {
                                            id_deck : json_retour.context.idDeck,
                                            input_actif : (input_actif === "on")?1:0,
                                            input_nom : input_nom,
                                            input_type : input_type,
                                            input_cmt : input_cmt
                                        };
                                        var json_retour = $.Oda.Interface.callRest($.Oda.Context.rest+"api/setHeaderDeck.php", {functionRetour : function(json_retour){
                                            $.Oda.App.Controler.GererDeck.loadListDeck();
                                            $.Oda.Display.Popup.close();
                                            $.Oda.Display.Notification.success( "Mise &agrave; jour r&eacute;ussi.");
                                        }}, tabInput);
                                    }
                                }}, tabInput);
                            }else{
                                var tabInput = {
                                    id_deck : p_params.deckId,
                                    input_actif : (input_actif === "on")?1:0,
                                    input_nom : '',
                                    input_type : input_type,
                                    input_cmt : input_cmt
                                };
                                var json_retour = $.Oda.Interface.callRest($.Oda.Context.rest+"api/setHeaderDeck.php", {functionRetour : function(json_retour){
                                    $.Oda.App.Controler.GererDeck.loadListDeck();
                                    $.Oda.Display.Popup.close();
                                    $.Oda.Display.Notification.success( "Mise &agrave; jour r&eacute;ussi.");
                                }}, tabInput);
                            }
                        }else{
                            $.Oda.Display.Notification.warning( "Nom du deck vide.");
                        }
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.GererDeck.recHeaderDeck : " + er.message);
                        return null;
                    }
                },
                /**
                 * @name buildDatasForGraph
                 * @param {type} p_datas
                 * @returns {buildDatasForGraph.obj}
                 */
                 buildDatasForGraph : function(p_datas){
                    try {
                        var obj = {categories : ["0", "1", "2", "3", "4", "5", "6", "7+", "Total"], series : [] };

                        var data = { name : "Coût", color: '#0040FF'};
                        var array = [];
                        for (var indice in p_datas["coutRepartition"]["data"]) {
                            array[array.length] = parseInt(p_datas["coutRepartition"]["data"][indice]["nb"]);
                        }
                        array[array.length] = parseInt(p_datas["coutSum"])/10;
                        data.data = array;
                        obj.series[obj.series.length] = data;

                        var data = { name : "Vie", color: '#BA1F1F'};
                        var array = [];
                        for (var indice in p_datas.vieRepartition.data) {
                            array[array.length] = parseInt(p_datas.vieRepartition.data[indice].nb);
                        }
                        array[array.length] = parseInt(p_datas.vieSum)/10;
                        data.data = array;
                        obj.series[obj.series.length] = data;

                        var data = { name : "Attaque", color: '#D8E524'};
                        var array = [];
                        for (var indice in p_datas.attaqueRepartition.data) {
                            array[array.length] = parseInt(p_datas.attaqueRepartition.data[indice].nb);
                        }
                        array[array.length] = parseInt(p_datas["attaqueSum"])/10;
                        data.data = array;
                        obj.series[obj.series.length] = data;

                        var array = [];
                        for (var indice in p_datas["reparType"]["data"]) {
                            var data = { name : "", y : 0};
                            data.name = p_datas["reparType"]["data"][indice]["type"];
                            data.y = parseInt(p_datas["reparType"]["data"][indice]["nb"]);
                            array[array.length] = data;
                        }
                        obj.dataSeries = array;

                        return obj;
                    } catch (er) {
                        $.Oda.Log.error("buildSimpleSeriesForSimpleColumn :" + er.message);
                    }
                }
            },
            RecMatchs : {
                oTableListMatchs : null,
                advName : null,
                deckName : null,
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.RecMatchs}
                 */
                start : function (p_params) {
                    try {
                        $.Oda.App.Controler.RecMatchs.getMatch();
                        $.Oda.App.Controler.RecMatchs.histoMatchs();
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RecMatchs.start : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.RecMatchs}
                 */
                getMatch : function (p_params) {
                    try {
                        if($.Oda.Tooling.isUndefined(p_params)){
                            p_params = {
                                id : 0
                            };
                        }
                        var tabInput = { id_match : p_params.id, code_user : $.Oda.Session.code_user };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/getMatch.php", {functionRetour : function(p_retour){
                            if(typeof p_retour.data.match.id != "undefined"){
                                $.Oda.App.Controler.RecMatchs.advName = p_retour.data.match.nom_adversaire;
                                $.Oda.App.Controler.RecMatchs.deckName = p_retour.data.match.nom_deck;
                                $.Oda.App.Controler.RecMatchs.seeMatch({id : p_retour.data.match.id});
                            }else{
                                $.Oda.App.Controler.RecMatchs.newMatch();
                            }
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RecMatchs.getMatch : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.RecMatchs}
                 */
                newMatch : function (p_params) {
                    try {
                        var strHtml = $.Oda.Display.TemplateHtml.create({
                            template : "recMatchNew",
                            scope : {

                            }
                        });
                        $('#content-recMatchs').html(strHtml);
                        $.Oda.Scope.init({id:'content-recMatchs'});
                        $.Oda.Scope.refresh = function(){
                            if(($("#matchType").data("isOk")) && ($("#matchNameAdv").data("isOk")) && ($("#matchClass").data("isOk")) && ($("#input_deck").data("isOk")) ){
                                $("#bt_valider").removeClass("disabled");
                            }else{
                                $("#bt_valider").addClass("disabled");
                            }
                        };
                        $('#matchType').on('change', function (event) {
                            var optionSelected = $("option:selected", this);
                            var valueSelected = this.value;
                            $.Oda.App.Controler.RecMatchs.chargerListDeck({optionSelected : optionSelected, valueSelected : valueSelected});
                        });
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RecMatchs.newMatch : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.optionSelected
                 * @param p_params.valueSelected
                 * @returns {$.Oda.App.Controler.RecMatchs}
                 */
                chargerListDeck : function (p_params) {
                    try {
                        var type = "";
                        switch (p_params.valueSelected)
                        {
                            case "Classé":
                            case "Non classé":
                                type = "regular";
                                break;
                            case "Arène":
                                type = "arene";
                                break;
                        }

                        var tabInput = { code_user : $.Oda.Session.code_user, option_actif : 1, type :  type, typeMatch : p_params.valueSelected};
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/getListDeck.php", { odaCacheOnDemande : true, functionRetour : function(json_retour){
                            var strHtml = '<div class="form-group"><label for="input_deck" class="select">Deck choisi :</label>';
                            strHtml += '<select class="form-control" oda-input-select="input_deck" required>';
                            strHtml += '<option value="" oda-label="oda-main.select-default"></option>';
                            for (var indice in json_retour.data.listDeck.data) {
                                strHtml += '<option value="'+json_retour.data.listDeck.data[indice].id+'">'+json_retour.data.listDeck.data[indice].classe+' - '+json_retour.data.listDeck.data[indice].nom_deck+' ('+json_retour.data.listDeck.data[indice].quote+'%)</option>';
                            }
                            strHtml += '</select></div>';
                            $.Oda.Display.render({id:'div_nom_deck', html : strHtml});
                            $('#input_deck').on('change', function (event) {
                                var optionSelected = $("option:selected", this);
                                var valueSelected = this.value;
                                $.Oda.App.Controler.RecMatchs.deckName = optionSelected;
                            });
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RecMatchs.chargerListDeck : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.RecMatchs}
                 */
                recNewMatch : function (p_params) {
                    try {
                        $.Oda.App.Controler.RecMatchs.idDeck = $('#input_deck').val();
                        var type = $('#matchType').val();
                        $.Oda.App.Controler.RecMatchs.advName = $('#matchNameAdv').val();
                        var input_coin = $('#matchCoin').val();
                        var classe_adv = $('#matchClass').val();

                        var tabInput = { id_deck : $.Oda.App.Controler.RecMatchs.idDeck, type : type, nom_adv : $.Oda.App.Controler.RecMatchs.advName, classe_adv : classe_adv, code_user : $.Oda.Session.code_user, coin : input_coin };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/creerMatch.php", {functionRetour : function(json_retour){
                            $('#content-recMatchs').html("");
                            $.Oda.App.Controler.RecMatchs.getMatch({id:json_retour.data.resultatInsert});
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RecMatchs.recNewMatch : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.RecMatchs}
                 */
                seeMatch: function (p_params) {
                    try {
                        var strHtml = $.Oda.Display.TemplateHtml.create({
                            template : "seeMatchNew",
                            scope : {
                                idMatch : p_params.id,
                                deckName : $.Oda.App.Controler.RecMatchs.deckName,
                                advName : $.Oda.App.Controler.RecMatchs.advName
                            }
                        });
                        $('#content-recMatchs').html(strHtml);
                        $.Oda.Scope.init({id:'content-recMatchs'});
                        $.Oda.Scope.refresh = function(){
                            if(($("#leftLive").data("isOk")) && ($("#advType").data("isOk")) && ($("#myRank").data("isOk")) && ($("#advRank").data("isOk")) ){
                                $("#bt_valider").removeClass("disabled");
                            }else{
                                $("#bt_valider").addClass("disabled");
                            }
                        };
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RecMatchs.seeMatch : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.RecMatchs}
                 */
                updateNewMatch: function (p_params) {
                    try {
                        var leftLive = $('#leftLive').val();
                        var typeAdv = $('#advType').val();
                        var myRank = $('#myRank').val();
                        var advRank = $('#advRank').val();
                        var tabInput = { id_match : p_params.id, vie : leftLive, type_adversaire : typeAdv, code_user : $.Oda.Session.code_user, my_rang : myRank, adv_rang : advRank };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/finirMatch.php", {functionRetour : function(){
                            $('#content-recMatchs').html("");
                            $.Oda.App.Controler.RecMatchs.getMatch();
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RecMatchs.updateNewMatch.updateNewMatch : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.onDemande
                 * @returns {$.Oda.App.Controler.RecMatchs}
                 */
                histoMatchs: function (p_params) {
                    try {
                        if($.Oda.Tooling.isUndefined(p_params)){
                            p_params = {onDemande : false};
                        }

                        var tabInput = { code_user : $.Oda.Session.code_user };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/getMatchs.php", {odaCacheOnDemande : p_params.onDemande, functionRetour : function(p_retour){
                            var strhtml = '<table cellpadding="0" cellspacing="0" border="0" class="display hover" id="table_matchs" width="100%"></table>';
                            $('#content-histoMatchs').html(strhtml);

                            var objDataTable = $.Oda.Tooling.objDataTableFromJsonArray(p_retour.data.matchs.data);
                            $.Oda.App.Controler.RecMatchs.oTableListMatchs = $('#table_matchs').dataTable( {
                                "sPaginationType": "full_numbers",
                                "aaData": objDataTable.data,
                                "aaSorting": [[0,'desc']],
                                "aoColumns": [
                                    { sTitle: "Date", sClass: "left", sWidth : 180},
                                    { sTitle: "Type match", sClass: "left"},
                                    { sTitle: "Pièce", sClass: "left"},
                                    { sTitle: "Mon deck", sClass: "left"  },
                                    { sTitle: "Ma classe", sClass: "left"  },
                                    { sTitle: "Adversaire", sClass: "left"  },
                                    { sTitle: "Classe adver", sClass: "left"},
                                    { sTitle: "Ma vie", sClass: "left"},
                                    { sTitle: "Durée", sClass: "left"}
                                ],
                                aoColumnDefs: [
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = String(row[objDataTable.entete["date_start"]]);
                                            return strHtml;
                                        },
                                        aTargets: [ 0 ]
                                    },
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = String(row[objDataTable.entete["type"]]);
                                            return strHtml;
                                        },
                                        aTargets: [ 1 ]
                                    },
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = String(row[objDataTable.entete["coin"]]);
                                            return strHtml;
                                        },
                                        aTargets: [ 2 ]
                                    },
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = String(row[objDataTable.entete["nom_deck"]]);
                                            return strHtml;
                                        },
                                        aTargets: [ 3 ]
                                    },
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = String(row[objDataTable.entete["ma_classe"]]);
                                            return strHtml;
                                        },
                                        aTargets: [ 4 ]
                                    },
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = String(row[objDataTable.entete["nom_adversaire"]]);
                                            return strHtml;
                                        },
                                        aTargets: [ 5 ]
                                    },
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = String(row[objDataTable.entete["classe_adversaire"]]);
                                            return strHtml;
                                        },
                                        aTargets: [ 6 ]
                                    },
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = String(row[objDataTable.entete["vie"]]);
                                            return strHtml;
                                        },
                                        aTargets: [ 7 ]
                                    },
                                    {
                                        mRender: function ( data, type, row ) {
                                            var strHtml = String(row[objDataTable.entete["duree"]]);
                                            return strHtml;
                                        },
                                        aTargets: [ 8 ]
                                    }
                                ],
                                "fnDrawCallback": function( oSettings ) {
                                    $('#table_matchs')
                                        .removeClass( 'display' )
                                        .addClass('table table-striped table-bordered');
                                }
                            });
                        }}, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RecMatchs.histoMatchs : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.name
                 * @returns {$.Oda.App.Controler.RecMatchs}
                 */
                filterByAdv: function (p_params) {
                    try {
                        $.Oda.App.Controler.RecMatchs.oTableListMatchs.fnFilter( p_params.name );
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RecMatchs.filterByAdv : " + er.message);
                        return null;
                    }
                },
            },
            RapportsMatchs : {
                setting: {},
                /**
                 * @param {object} p_params
                 * @param p_params.filter
                 * @returns {$.Oda.App.Controler.RapportsMatchs}
                 */
                start: function (p_params) {
                    try {
                        if ($.Oda.Tooling.isUndefined(p_params)) {
                            $.Oda.App.Controler.RapportsMatchs.setting = $.Oda.Storage.get("RAPPORTS-MATCHS-" + $.Oda.Session.code_user, {filter: "all"});
                        } else {
                            if (p_params.hasOwnProperty("filter")) {
                                $.Oda.App.Controler.RapportsMatchs.setting.filter = p_params.filter;
                                $.Oda.Storage.set("RAPPORTS-MATCHS-" + $.Oda.Session.code_user, $.Oda.App.Controler.RapportsMatchs.setting);
                            }
                        }

                        $('[id^="li-"]').each(function (index, value) {
                            var elt = $(value);
                            if (elt.attr('id') === ('li-' + $.Oda.App.Controler.RapportsMatchs.setting.filter)) {
                                elt.addClass("active");
                            } else {
                                elt.removeClass("active");
                            }
                        });

                        $.Oda.App.Controler.RecMatchs.histoMatchs({onDemande: true});
                        $.Oda.App.Controler.RapportsMatchs.chargerDureesMatchs();
                        $.Oda.App.Controler.RapportsMatchs.chargerEvolRatioMatchs();
                        $.Oda.App.Controler.RapportsMatchs.chargerMetricsMatchs();
                        $.Oda.App.Controler.RapportsMatchs.chargerMetricsMatchsWeek();
                        $.Oda.App.Controler.RapportsMatchs.chargerDetailsMatchs();
                        $.Oda.App.Controler.RapportsMatchs.chargerMetricsCoin();

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RapportsMatchs.start : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.RapportsMatchs}
                 */
                chargerDureesMatchs: function (p_params) {
                    try {
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest + "api/getRepartitionDureeMatchs.php", {
                            odaCacheOnDemande: true, functionRetour: function (p_retour) {
                                var categories = new Array();
                                categories = $.Oda.Tooling.getListValeurPourAttribut(p_retour.data.resultat.data, "minutes");

                                var serie = new Array();
                                serie = $.Oda.Tooling.getListValeurPourAttribut(p_retour.data.resultat.data, "nb", "int");

                                var series = [{name: $.Oda.Session.code_user, data: serie}];

                                var retour = $('#div_dureesMatchs').highcharts({
                                    chart: {
                                        backgroundColor:'rgba(0,0,0,0)',
                                        type: 'column'
                                    },
                                    title: {
                                        text: 'Répartition de la durée des matchs (sur 6 mois)'
                                    },
                                    xAxis: {
                                        categories: categories
                                    },
                                    tooltip: {
                                        headerFormat: '<span style="font-size:10px">Nombre de match de {point.key} minute(s) </span>',
                                        pointFormat: '<span style="font-size:10px">pour {series.name} => {point.y}</span>',
                                        footerFormat: '<span style="font-size:10px">.</span>',
                                        shared: true,
                                        useHTML: true
                                    },
                                    series: series
                                });
                            }
                        }, {code_user: $.Oda.Session.code_user});

                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RapportsMatchs.chargerDureesMatchs : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.RapportsMatchs}
                 */
                chargerEvolRatioMatchs: function (p_params) {
                    try {
                        var currentTime = new Date();
                        currentTime.setDate(currentTime.getDate() - 90);

                        var annee = currentTime.getFullYear();
                        var mois = $.Oda.Tooling.pad2(currentTime.getMonth() + 1);
                        var jour = $.Oda.Tooling.pad2(currentTime.getDate());

                        var strDate = annee + "-" + mois + "-" + jour;

                        var tabInput = {
                            code_user: $.Oda.Session.code_user,
                            dateDebut: strDate,
                            filtre_nonClasse: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "nonClasse") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false,
                            filtre_classe: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "classe") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false,
                            filtre_arene: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "arene") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false
                        };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest + "api/getEvolRatioMatchs.php", {
                            odaCacheOnDemande: true, functionRetour: function (json_retour) {
                                var dbDatas = json_retour.data.evolRatioMatchs.data;
                                var datas = new Array();
                                for (var indice in dbDatas) {
                                    datas[datas.length] = {
                                        y: parseFloat(dbDatas[indice]["ratio"]),
                                        name: $.Oda.Date.getStrDateFrFromUs(dbDatas[indice]["date"]) + " : " + dbDatas[indice]["win"] + "/" + dbDatas[indice]["total"] + " (" + $.Oda.Tooling.arrondir(parseInt(dbDatas[indice]["win"]) / parseInt(dbDatas[indice]["total"]) * 100, 2) + "%)"
                                    };
                                }

                                // Create the chart
                                $('#div_evolRatioMatchs').highcharts({
                                    chart: {
                                        type: 'spline',
                                        backgroundColor:'rgba(0,0,0,0)'
                                    },
                                    title: {
                                        text: 'Ratio sur le temps',
                                        style: {
                                            color: '#ecf0f1'
                                        }
                                    },
                                    subtitle: {
                                        text: 'Score de victoire'
                                    },
                                    legend: {
                                        enabled: false
                                    },
                                    xAxis: {
                                        labels: {
                                            enabled: false
                                        }
                                    },
                                    legend: {
                                        itemStyle: {
                                            color: '#ecf0f1'
                                        }
                                    },
                                    yAxis: {
                                        title: {
                                            text: ''
                                        },
                                        min: 0,
                                        max: 800,
                                        minorGridLineWidth: 0,
                                        gridLineWidth: 0,
                                        alternateGridColor: null,
                                        plotBands: [{ // Light air
                                            from: 0,
                                            to: 150,
                                            color: 'rgba(223, 58, 1, 0.1)',
                                            label: {
                                                text: 'Mauvais',
                                                style: {
                                                    color: '#606060'
                                                }
                                            }
                                        }, { // Light breeze
                                            from: 150,
                                            to: 300,
                                            color: 'rgba(0, 128, 255, 0.1)',
                                            label: {
                                                text: 'Bon',
                                                style: {
                                                    color: '#606060'
                                                }
                                            }
                                        }, { // Gentle breeze
                                            from: 300,
                                            to: 800,
                                            color: 'rgba(1, 223, 1, 0.1)',
                                            label: {
                                                text: 'Excellent',
                                                style: {
                                                    color: '#606060'
                                                }
                                            }
                                        }]
                                    },
                                    tooltip: {
                                        valueSuffix: ''
                                    },
                                    plotOptions: {
                                        spline: {
                                            lineWidth: 4,
                                            states: {
                                                hover: {
                                                    lineWidth: 5
                                                }
                                            },
                                            marker: {
                                                enabled: false
                                            }
                                        }
                                    },
                                    series: [{
                                        name: 'Score',
                                        data: datas

                                    }]
                                });
                            }
                        }, tabInput);
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RapportsMatchs.chargerEvolRatioMatchs : " + er.message);
                        return null;
                    }
                },
                /**
                 * chargerMetricsMatchs
                 */
                chargerMetricsMatchs : function (){
                    try {
                        var tabInput = {
                            div_graph : "div_metrics_matchs",
                            titre : "Réussite par classe totale",
                            filtre_nonClasse: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "nonClasse") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false,
                            filtre_classe: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "classe") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false,
                            filtre_arene: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "arene") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false
                        };
                        $.Oda.App.Controler.RapportsMatchs.chargerMetricsGenerique(tabInput);
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RapportsMatchs.chargerMetricsMatchs : " + er.message);
                    }
                },
                /**
                 * chargerMetricsMatchsWeek
                 */
                chargerMetricsMatchsWeek : function(){
                    try {
                        var currentTime = new Date();
                        currentTime.setDate(currentTime.getDate() - 7);

                        var annee = currentTime.getFullYear();
                        var mois = $.Oda.Tooling.pad2(currentTime.getMonth()+1);
                        var jour = $.Oda.Tooling.pad2(currentTime.getDate());

                        var strDate = annee+"-"+mois+"-"+jour;

                        var tabInput = {
                            div_graph : "div_metrics_matchs_week",
                            titre : "Réussite par deck de la semaine",
                            dateDebut : strDate,
                            regrp : "nom_deck",
                            filtre_nonClasse: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "nonClasse") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false,
                            filtre_classe: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "classe") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false,
                            filtre_arene: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "arene") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false
                        };
                        $.Oda.App.Controler.RapportsMatchs.chargerMetricsGenerique(tabInput);
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RapportsMatchs.chargerMetricsMatchsWeek : " + er.message);
                    }
                },
                /**
                 * chargerDetailsMatchs
                 */
                chargerDetailsMatchs : function(){
                    try {
                        for (var i=0;i<9;i++) {
                            $('#div_1_'+i+'_metrics_matchs').text('');
                            $('#fromdiv_1_'+i+'_metrics_matchs').remove();
                            $('#div_2_'+i+'_metrics_matchs').text('');
                            $('#fromdiv_1_'+i+'_metrics_matchs').remove();
                        }

                        var currentTime = new Date();
                        currentTime.setDate(currentTime.getDate() - 30);

                        var annee = currentTime.getFullYear();
                        var mois = $.Oda.Tooling.pad2(currentTime.getMonth()+1);
                        var jour = $.Oda.Tooling.pad2(currentTime.getDate());

                        var strDate = annee+"-"+mois+"-"+jour;

                        var tabInput = {
                            code_user : $.Oda.Session.code_user,
                            dateDebut : strDate,
                            filtre_nonClasse: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "nonClasse") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false,
                            filtre_classe: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "classe") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false,
                            filtre_arene: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "arene") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false
                        };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/getClassementClasse.php", {functionRetour : function(json_retour){
                            var tabInput = {
                                legend : "false",
                                dateDebut : strDate,
                                regrp : "classe_adversaire",
                                filtre_nonClasse: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "nonClasse") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false,
                                filtre_classe: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "classe") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false,
                                filtre_arene: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "arene") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false
                            };

                            for (var indice in json_retour["data"]["classement"]["data"]) {
                                var classe = json_retour["data"]["classement"]["data"][indice]["classe"];
                                var ite = parseInt(indice)+1;
                                tabInput.div_graph = "div_1_"+ite+"_metrics_matchs";
                                tabInput.titre = classe;
                                tabInput.classe = tabInput.titre;
                                $.Oda.App.Controler.RapportsMatchs.chargerMetricsGenerique(tabInput);
                            }
                        }}, tabInput);

                        //------------------------------------------------------------------
                        var tabInput = {
                            code_user : $.Oda.Session.code_user,
                            dateDebut : "",
                            filtre_nonClasse: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "nonClasse") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false,
                            filtre_classe: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "classe") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false,
                            filtre_arene: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "arene") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false
                        };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/getClassementClasse.php", {functionRetour : function(json_retour){
                            var tabInput = {
                                legend : "false",
                                dateDebut : "",
                                regrp : "classe_adversaire",
                                filtre_nonClasse: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "nonClasse") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false,
                                filtre_classe: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "classe") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false,
                                filtre_arene: (($.Oda.App.Controler.RapportsMatchs.setting.filter === "arene") || ($.Oda.App.Controler.RapportsMatchs.setting.filter === "all")) ? true : false
                            };

                            for (var indice in json_retour["data"]["classement"]["data"]) {
                                var classe = json_retour["data"]["classement"]["data"][indice]["classe"];
                                var ite = parseInt(indice)+1;
                                tabInput.div_graph = "div_2_"+ite+"_metrics_matchs";
                                tabInput.titre = classe;
                                tabInput.classe = tabInput.titre;
                                $.Oda.App.Controler.RapportsMatchs.chargerMetricsGenerique(tabInput);
                            }
                        }}, tabInput);
                    } catch (er) {
                        $.Oda.Log.error("chargerDetailsMatchs : " + er.message);
                    }
                },
                /**
                 * @param {Object} p_tabInput
                 * @returns {$.Oda.App.Controler.RapportsMatchs.chargerMetricsGenerique}
                 */
                chargerMetricsGenerique: function (p_tabInput) {
                    try {
                        var tabInput = $.Oda.App.Controler.RapportsMatchs.buildInput(p_tabInput);
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest + "api/getMetricsMatchs.php", {functionRetour : function(json_retour){
                            var div_graph = json_retour["data"]["div_graph"];
                            var legend = (json_retour["data"]["legend"] === 'true');
                            var titre = json_retour["data"]["titre"];
                            var regrp = json_retour["data"]["regrp"];

                            if((json_retour["data"]["metricsMatchsWin"]["nombre"] == "0")&&(json_retour["data"]["metricsMatchsLoss"]["nombre"] == "0")){
                                $('#from'+div_graph).remove();
                                $('#'+div_graph).html(json_retour["data"]["titre"]+"<br>Pas de match.");
                            }else if(json_retour["data"]["metricsMatchsWin"]["nombre"] == "0"){
                                $('#from'+div_graph).remove();
                                $('#'+div_graph).html(json_retour["data"]["titre"]+"<br>"+json_retour.data.metricsMatchsLoss.nombre+" perdu(s)");
                            }else if(json_retour["data"]["metricsMatchsLoss"]["nombre"] == "0"){
                                $('#from'+div_graph).remove();
                                $('#'+div_graph).html(json_retour["data"]["titre"]+"<br>"+json_retour["data"]["metricsMatchsWin"]["nombre"]+" gagn&eacute;(s)");
                            }else{
                                var victoire = json_retour["data"]["metricsMatchsWin"]["data"];
                                var countVictoire = parseInt(victoire[0]["countReussite"]);
                                var categoriesVictoire = $.Oda.Tooling.getListValeurPourAttribut(victoire,"regrp");
                                var classesVictoire = $.Oda.Tooling.getListValeurPourAttribut(victoire,"classe");
                                var dataVictoire = $.Oda.Tooling.getListValeurPourAttribut(victoire,"nb",Number);
                                var colorsDataVictoire = new Array();
                                for (var indice in categoriesVictoire) {
                                    switch (regrp) {
                                        case 'classe_adversaire':
                                        case "classe":
                                            colorsDataVictoire[colorsDataVictoire.length] = $.Oda.App.colorClasse[categoriesVictoire[indice]];
                                            break;
                                        case "nom_deck":
                                            colorsDataVictoire[colorsDataVictoire.length] = $.Oda.App.colorClasse[classesVictoire[indice]];
                                            break;
                                        default:
                                            colorsDataVictoire[colorsDataVictoire.length] = $.Oda.App.colorClasse[classesVictoire[indice]];
                                            break;
                                    }
                                }

                                var defaite = json_retour["data"]["metricsMatchsLoss"]["data"];
                                var countDefaite = parseInt(defaite[0]["countReussite"]);
                                var categoriesDefaite = $.Oda.Tooling.getListValeurPourAttribut(defaite,"regrp");
                                var classesDefaite = $.Oda.Tooling.getListValeurPourAttribut(defaite,"classe");
                                var dataDefaite = $.Oda.Tooling.getListValeurPourAttribut(defaite,"nb",Number);
                                var colorsDataDefaite  = new Array();
                                for (var indice in categoriesDefaite) {
                                    switch (regrp) {
                                        case 'classe_adversaire':
                                        case "classe":
                                            colorsDataDefaite[colorsDataDefaite.length] = $.Oda.App.colorClasse[categoriesDefaite[indice]];
                                            break;
                                        case "nom_deck":
                                            colorsDataDefaite[colorsDataDefaite.length] = $.Oda.App.colorClasse[classesDefaite[indice]];
                                            break;
                                        default:
                                            colorsDataDefaite[colorsDataDefaite.length] = $.Oda.App.colorClasse[classesDefaite[indice]];
                                            break;
                                    }
                                }

                                var colors = Highcharts.getOptions().colors,
                                    categories = ['Victoires', 'Defaites'],
                                    name = 'Réussite',
                                    data = [{
                                        y: countVictoire,
                                        color: colors[0],
                                        drilldown: {
                                            name: 'Victoire',
                                            categories: categoriesVictoire,
                                            data: dataVictoire,
                                            color: colorsDataVictoire
                                        }
                                    }, {
                                        y: countDefaite,
                                        color: colors[1],
                                        drilldown: {
                                            name: 'Defaite',
                                            categories: categoriesDefaite,
                                            data: dataDefaite,
                                            color: colorsDataDefaite
                                        }
                                    }];


                                // Build the data arrays
                                var browserData = [];
                                var versionsData = [];
                                for (var i = 0; i < data.length; i++) {

                                    // add browser data
                                    browserData.push({
                                        name: categories[i],
                                        y: data[i].y,
                                        color: data[i].color
                                    });

                                    // add version data
                                    for (var j = 0; j < data[i].drilldown.data.length; j++) {
                                        var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5 ;
                                        versionsData.push({
                                            name: data[i].drilldown.categories[j],
                                            y: data[i].drilldown.data[j],
                                            color: data[i].drilldown.color[j]
                                        });
                                    }
                                }

                                // Create the chart
                                $('#'+div_graph).highcharts({
                                    chart: {
                                        type: 'pie',
                                        backgroundColor:'rgba(0,0,0,0)'
                                    },
                                    exporting: {
                                        enabled: false
                                    },
                                    title: {
                                        text: titre,
                                        style: {
                                            color: '#ecf0f1'
                                        }
                                    },
                                    yAxis: {
                                        title: {
                                            text: 'Répartition'
                                        }
                                    },
                                    plotOptions: {
                                        pie: {
                                            shadow: true,
                                            center: ['50%', '50%']
                                        }
                                    },
                                    legend: {
                                        itemStyle: {
                                            color: '#ecf0f1'
                                        }
                                    },
                                    tooltip: {
                                        formatter: function() {
                                            var s;
                                            if(legend){
                                                s = this.point.name +' : '+$.Oda.Tooling.arrondir(this.point.percentage,2)+"% ("+this.y+")";
                                            }else{
                                                s = this.point.name.substring(0,2) +':'+$.Oda.Tooling.arrondir(this.point.percentage,2)+"%("+this.y+")";
                                            }
                                            return s;
                                        }
                                    },
                                    series: [{
                                        name: 'Réussite',
                                        data: browserData,
                                        size: '63%',
                                        dataLabels: {
                                            formatter: function() {
                                                return this.y > 5 ? this.point.name : null;
                                            },
                                            color: 'white',
                                            distance: -60,
                                            enabled : legend
                                        }
                                    }, {
                                        name: 'Deck',
                                        data: versionsData,
                                        size: '90%',
                                        innerSize: '70%',
                                        dataLabels: {
                                            formatter: function() {
                                                var s;
                                                if (this.point.percentage > 2) { // the pie chart
                                                    s = this.point.name;
                                                }
                                                return s;
                                            },
                                            enabled : legend
                                        }
                                    }]
                                });
                                var nb = parseInt(json_retour["data"]["metricsMatchsWin"]["data"][0]["countReussite"])+parseInt(json_retour["data"]["metricsMatchsLoss"]["data"][0]["countReussite"]);
                                $('#from'+div_graph).remove();
                                $('#'+div_graph).after('<div id="from'+div_graph+'" style="text-align:right;"><label style="font-size:70%;color:#BDBDBD;">From:'+nb+'</label><div>');
                            }
                        }}, tabInput);
                       return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RapportsMatchs.chargerMetricsGenerique : " + er.message);
                        return null;
                    }
                },
                /**
                 * Ajouter les params par defaut
                 * @param {type} p_input
                 * @returns {buildInput.input_defaut}
                 */
                buildInput : function (p_input) {
                    try {
                        var input_defaut = {
                            code_user : $.Oda.Session.code_user,
                            div_graph : "",
                            titre : "",
                            legend : "true",
                            dateDebut : "",
                            type : "",
                            classeAdv : "",
                            regrp : "classe",
                            classe : "",
                            deck : "",
                            filtre_nonClasse : "false",
                            filtre_classe : "false",
                            filtre_arene : "false"
                        };
            
                        for(var indice in p_input){
                            input_defaut[indice] = p_input[indice];
                        }
            
                        return input_defaut;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RapportsMatchs.buildInput : " + er.message);
                    }
                },
                /**
                 * chargerMetricsCoin
                 */
                chargerMetricsCoin : function (){
                    try {
                        var tabInput = { code_user : $.Oda.Session.code_user };
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/getMetricsCoin.php", {functionRetour : function(p_retour){
                            var strHtml = "";
                            var txPieceWeek = $.Oda.Tooling.arrondir(parseInt(p_retour["data"]["nbAvecPieceWeek"]) / parseInt(p_retour["data"]["totalWeek"])*100,2);
                            var txPiece = $.Oda.Tooling.arrondir(parseInt(p_retour["data"]["nbAvecPieceAll"]) / parseInt(p_retour["data"]["totalAll"])*100,2);
                            strHtml += 'Taux de piece : '+txPieceWeek+'%. (depuis le d&eacute;but : '+txPiece+'%)<br>';

                            var txVicPieceWeek = $.Oda.Tooling.arrondir(parseInt(p_retour["data"]["vicAvecPieceWeek"]) / parseInt(p_retour["data"]["nbAvecPieceWeek"])*100,2);
                            var txVicPiece = $.Oda.Tooling.arrondir(parseInt(p_retour["data"]["vicAvecPieceAll"]) / parseInt(p_retour["data"]["nbAvecPieceAll"])*100,2);
                            strHtml += 'Taux de victoire avec piece : '+txVicPieceWeek+'%. (depuis le d&eacute;but : '+txVicPiece+'%)<br>';

                            var txVicSansPieceWeek = $.Oda.Tooling.arrondir(parseInt(p_retour["data"]["vicSansPieceWeek"]) / (parseInt(p_retour["data"]["totalWeek"])-parseInt(p_retour["data"]["nbAvecPieceWeek"]))*100,2);
                            var txVicSansPiece = $.Oda.Tooling.arrondir(parseInt(p_retour["data"]["vicSansPieceAll"]) / (parseInt(p_retour["data"]["totalAll"])-parseInt(p_retour["data"]["nbAvecPieceAll"]))*100,2);
                            strHtml += 'Taux de victoire sans piece : '+txVicSansPieceWeek+'%. (depuis le d&eacute;but : '+txVicSansPiece+'%)<br>';
                            $('#div_metricsCoin').html(strHtml);
                        }}, tabInput);
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RapportsMatchs.chargerMetricsCoin : " + er.message);
                    }
                },
            },
            RapportsMeta : {
                /**
                 * @param {Object} p_params
                 * @param p_params.id
                 * @returns {$.Oda.App.Controler.RapportsMeta.start}
                 */
                start : function (p_params) {
                    try {
                        $.Oda.App.Controler.RapportsMeta.chargerRepartitionMetaG();
                        $.Oda.App.Controler.RapportsMeta.chargerRepartitionMetaNC();
                        $.Oda.App.Controler.RapportsMeta.chargerRepartitionMetaC();
                        $.Oda.App.Controler.RapportsMeta.chargerRepartitionMetaA();
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RapportsMeta.start : " + er.message);
                        return null;
                    }
                },
                /**
                 * chargerRepartitionMetaG
                 */
                chargerRepartitionMetaG : function (){
                    try {
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/getRepartitionMeta.php", {functionRetour : function(json_retour){
                            $.Oda.App.Controler.RapportsMeta.afficherMeta('Meta Générale', '#div_repartitionMetaG', json_retour);
                        }}, { type : '' });
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RapportsMeta.chargerRepartitionMetaG : " + er.message);
                    }
                },
                /**
                 * chargerRepartitionMetaNC
                 */
                chargerRepartitionMetaNC : function (){
                    try {
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/getRepartitionMeta.php", {functionRetour : function(json_retour){
                            $.Oda.App.Controler.RapportsMeta.afficherMeta('Meta Non Classé', '#div_repartitionMetaNC', json_retour);
                        }}, { type : 'Non classé' });
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RapportsMeta.chargerRepartitionMetaNC : " + er.message);
                    }
                },
                /**
                 * chargerRepartitionMetaC
                 */
                chargerRepartitionMetaC : function (){
                    try {
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/getRepartitionMeta.php", {functionRetour : function(json_retour){
                            $.Oda.App.Controler.RapportsMeta.afficherMeta('Meta Classé', '#div_repartitionMetaC', json_retour);
                        }}, { type : 'Classé' });
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RapportsMeta.chargerRepartitionMetaC : " + er.message);
                    }
                },
                /**
                 * chargerRepartitionMetaA
                 */
                chargerRepartitionMetaA : function (){
                    try {
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/getRepartitionMeta.php", {functionRetour : function(json_retour){
                            $.Oda.App.Controler.RapportsMeta.afficherMeta('Meta Arène', '#div_repartitionMetaA', json_retour);
                        }}, { type : 'Arene' });
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RapportsMeta.chargerRepartitionMetaA : " + er.message);
                    }
                },
                /**
                 * @name afficherMeta
                 * @desc Affiche la répartition de la meta
                 * @param {type} p_div
                 * @param {type} p_dbDatas
                 * @returns {undefined}
                 */
                afficherMeta : function (p_titre, p_div, p_json_retour){
                    try {
                        var pieDbDatas = p_json_retour["data"]["resultats"]["data"];
                        var pieDatas = new Array();
                        for (var indice in pieDbDatas) {
                            pieDatas[pieDatas.length] = {
                                name : pieDbDatas[indice]["classe_adversaire"],
                                color : $.Oda.App.colorClasse[pieDbDatas[indice]["classe_adversaire"]],
                                y : parseInt(pieDbDatas[indice]["nb"])
                            };
                        }

                        // Create the chart
                        $(p_div).highcharts({
                            chart: {
                                type: 'pie',
                                backgroundColor:'rgba(0,0,0,0)'
                            },
                            exporting: {
                                enabled: false
                            },
                            title: {
                                text: p_titre,
                                style: {
                                    color: '#ecf0f1'
                                }
                            },
                            plotOptions: {
                                pie: {
                                    shadow: true,
                                    center: ['50%', '50%']
                                }
                            },
                            tooltip: {
                                formatter: function() {
                                    var s;
                                    s = this.point.name +' : '+$.Oda.Tooling.arrondir(this.point.percentage,2)+"% ("+this.y+")";
                                    return s;
                                }
                            },
                            legend: {
                                itemStyle: {
                                    color: '#ecf0f1'
                                }
                            },
                            series: [{
                                name: 'Classe',
                                data: pieDatas,
                                dataLabels: {
                                    formatter: function() {
                                        var s;
                                        if (this.point.percentage > 2) { // the pie chart
                                            s = this.point.name +':'+$.Oda.Tooling.arrondir(this.point.percentage,2)+"%";
                                        }
                                        return s;
                                    }
                                }
                            }]
                        });
                        var nb = parseInt(p_json_retour["data"]["resultat"]["nb"]);
                        $(p_div).after('<label style="font-size:70%;color:#BDBDBD;">From:'+nb+'</label>');
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RapportsMeta.afficherMeta : " + er.message);
                    }
                }
            },
            RapportCartes : {
                /**
                 * @returns {$.Oda.App.Controler.RapportCartes}
                 */
                start: function () {
                    try {
                        this.evolDrop();
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.RapportCartes.start : " + er.message);
                        return null;
                    }
                },
                /**
                 * @returns {$.Oda.App.Controler.RapportCartes}
                 */
                evolDrop: function () {
                    try {
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/rest/rapport/evol/drop/"+$.Oda.Session.id, {callback : function(response){

                            var cate = ["general","Expert","Gobelins et Gnomes","the-grand-tournament","old-gods","gadgetzan"];

                            var series = {
                                Commune: {
                                    name: 'Commune',
                                    color : $.Oda.App.colorCard["Commune"],
                                    data: []
                                },
                                Commune_perso: {
                                    name: 'Commune_perso',
                                    color : $.Oda.App.colorCard["Commune_inv"],
                                    data: []
                                },
                                Rare: {
                                    name: 'Rare',
                                    color : $.Oda.App.colorCard["Rare"],
                                    data: []
                                },
                                Rare_perso: {
                                    name: 'Rare_perso',
                                    color : $.Oda.App.colorCard["Rare_inv"],
                                    data: []
                                },
                                Épique: {
                                    name: 'Épique',
                                    color : $.Oda.App.colorCard["Épique"],
                                    data: []
                                },
                                Épique_perso: {
                                    name: 'Épique_perso',
                                    color : $.Oda.App.colorCard["Épique_inv"],
                                    data: []
                                },
                                Légendaire: {
                                    name: 'Légendaire',
                                    color : $.Oda.App.colorCard["Légendaire"],
                                    data: []
                                },
                                Légendaire_perso: {
                                    name: 'Légendaire_perso',
                                    color : $.Oda.App.colorCard["Légendaire_inv"],
                                    data: []
                                }
                            };

                            for(var index in response.data.general){
                                var elt = response.data.general[index];
                                series[elt.qualite].data.push(parseFloat(elt.perc));
                            }
                            for(var index in response.data.personal){
                                var elt = response.data.personal[index];
                                series[elt.qualite+"_perso"].data.push(parseFloat(elt.perc));
                            }

                            for(var index in response.data.general_Expert){
                                var elt = response.data.general_Expert[index];
                                series[elt.qualite].data.push(parseFloat(elt.perc));
                            }
                            for(var index in response.data.personal_Expert){
                                var elt = response.data.personal_Expert[index];
                                series[elt.qualite+"_perso"].data.push(parseFloat(elt.perc));
                            }

                            for(var index in response.data["general_Gobelins et Gnomes"]){
                                var elt = response.data["general_Gobelins et Gnomes"][index];
                                series[elt.qualite].data.push(parseFloat(elt.perc));
                            }
                            for(var index in response.data["personal_Gobelins et Gnomes"]){
                                var elt = response.data["personal_Gobelins et Gnomes"][index];
                                series[elt.qualite+"_perso"].data.push(parseFloat(elt.perc));
                            }

                            for(var index in response.data["general_the-grand-tournament"]){
                                var elt = response.data["general_the-grand-tournament"][index];
                                series[elt.qualite].data.push(parseFloat(elt.perc));
                            }
                            for(var index in response.data["personal_the-grand-tournament"]){
                                var elt = response.data["personal_the-grand-tournament"][index];
                                series[elt.qualite+"_perso"].data.push(parseFloat(elt.perc));
                            }

                            for(var index in response.data["general_old-gods"]){
                                var elt = response.data["general_old-gods"][index];
                                series[elt.qualite].data.push(parseFloat(elt.perc));
                            }
                            for(var index in response.data["personal_old-gods"]){
                                var elt = response.data["personal_old-gods"][index];
                                series[elt.qualite+"_perso"].data.push(parseFloat(elt.perc));
                            }

                            var series_tab = [];
                            for(var key in series){
                                series_tab.push(series[key]);
                            }

                            $('#divEvolDrop').highcharts({
                                chart: {
                                    backgroundColor:'rgba(0,0,0,0)'
                                    , type : "column"
                                },
                                title: {
                                    text: 'Evol Drop',
                                    style: {
                                        color: '#ecf0f1'
                                    }
                                },
                                xAxis: {
                                    categories: ["general","Expert","Gobelins et Gnomes","the-grand-tournament","old-gods"]
                                },
                                yAxis: {
                                    min: 0,
                                    title: {
                                        text: '%'
                                    }
                                },
                                legend: {
                                    itemStyle: {
                                        color: '#ecf0f1'
                                    }
                                },
                                series: series_tab
                            });
                        }});
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.evolDrop.start : " + er.message);
                        return null;
                    }
                }
            }
        }
    };

    // Initialize
    _init();

})();
