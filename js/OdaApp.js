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

        tab_sets : ['Tous', 'Expert', 'La Malédiction de Naxxramas', 'Gobelins et Gnomes', 'Mont Rochenoire', 'the-grand-tournament', 'league-explorers', 'old-gods', 'gadgetzan', 'goro'],

        /**
         * @param {Object} p_params
         * @param p_params.attr
         * @returns {$.Oda.App}
         */
        startApp: function (p_params) {
            try {
                $.Oda.Context.projectLabel = "ODA HOW";

                $.Oda.Display.Polyfill.createHtmlElement({
                    name: "oda-card",
                    createdCallback: function(){
                        var elt = $(this);
                        var id = elt.attr("card-id");
                        var qualite = elt.attr("card-quality");
                        var mode = elt.attr("card-mode");
                        if(parseInt(mode) >= 13){
                            elt.before('<img src="img/mode/'+mode+'.png" height="22" width="22" /> ');
                        }
                        elt.css("color", $.Oda.App.colorCard[qualite]);
                        elt.css("font-weight", "bold");
                        elt.attr("data-toggle","tooltip");
                        elt.attr("data-placement","auto");
                        elt.attr("data-html",true);
                        elt.attr("class",'oda-tooltip-class');
                        elt.attr("title",'<img src="img/cards/'+id+'.png" height="276" width="200" />');
                        elt.tooltip();
                    }
                });

                $.Oda.Router.addRoute("home", {
                    "path" : "partials/home.html",
                    "title" : "oda-main.home-title",
                    "urls" : ["","home"],
                    "dependencies" : ["dataTables"],
                    "middleWares":["support","auth"]
                });

                $.Oda.Router.addRoute("saisir_paquet", {
                    "path" : "partials/paquet-add.html",
                    "title" : "paquet-add.title",
                    "urls" : ["saisir_paquet"],
                    "dependencies" : ["dataTables"],
                    "middleWares":["support","auth"]
                });

                $.Oda.Router.addRoute("rapports_cartes", {
                    "path" : "partials/rapports_cartes.html",
                    "title" : "rapports-cartes.title",
                    "urls" : ["rapports_cartes"],
                    "dependencies" : ["dataTables","hightcharts"],
                    "middleWares":["support","auth"]
                });

                $.Oda.Router.addRoute("gerer_collection", {
                    "path" : "partials/gerer_collection.html",
                    "title" : "gerer-coll.title",
                    "urls" : ["gerer_collection"],
                    "dependencies" : ["dataTables"],
                    "middleWares":["support","auth"]
                });

                $.Oda.Router.addRoute("rapports_meta", {
                    "path" : "partials/rapports_meta.html",
                    "title" : "rapports-meta.title",
                    "urls" : ["rapports_meta"],
                    "dependencies" : ["dataTables", "hightcharts"],
                    "middleWares":["support","auth"]
                });

                $.Oda.Router.addRoute("modeManage", {
                    "path" : "partials/modeManage.html",
                    "title" : "modeManage.title",
                    "urls" : ["modeManage"],
                    "dependencies" : ["dataTables"],
                    "middleWares" : ["support","auth"]
                });

                $.Oda.Router.startRooter();

                return this;
            } catch (er) {
                $.Oda.Log.error("$.Oda.App.startApp : " + er.message);
                return null;
            }
        },

        Controler: {
            RapportCartes: {
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

                            for(var index in response.data["general_gadgetzan"]){
                                var elt = response.data["general_gadgetzan"][index];
                                series[elt.qualite].data.push(parseFloat(elt.perc));
                            }
                            for(var index in response.data["personal_gadgetzan"]){
                                var elt = response.data["personal_gadgetzan"][index];
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
                                    categories: ["general","Expert","Gobelins et Gnomes","the-grand-tournament","old-gods","gadgetzan"]
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
            },
            ModeManage: {
                currentModeId:0,
                /**
                 * @returns {$.Oda.App.Controler.ModeManage}
                 */
                start: function () {
                    try {
                        $.Oda.App.Controler.ModeManage.loadModes();
                        $.Oda.App.Controler.ModeManage.loadCards();

                        $.Oda.Scope.Gardian.add({
                            id : "changeMode",
                            listElt : ["modeId"],
                            function : function(e){
                                if( ($("#modeId").data("isOk")) ){
                                    $.Oda.App.Controler.ModeManage.currentModeId = $('#modeId').val();
                                    $.Oda.App.Controler.ModeManage.loadCards({id:$('#modeId').val()});
                                }
                            }
                        });
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ModeManage.start : " + er.message);
                        return null;
                    }
                },
                /**
                 * @returns {$.Oda.App.Controler.ModeManage}
                 */
                loadModes: function () {
                    try {
                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/rest/mode/", {callback : function(response){
                            var datas = $.Oda.Tooling.jsonToStringHtml({json: response.data});
                            $( "oda-input-select[oda-input-select-name='modeId']" ).attr('oda-input-select-availables',datas);
                        }});
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ModeManage.loadModes : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p
                 * @param {String} p.id 
                 * @returns {$.Oda.App.Controler.ModeManage}
                 */
                loadCards: function (p) {
                    try {
                        if(p === undefined){
                            return this;
                        }

                        var btNewCard = $.Oda.Display.TemplateHtml.create({
                            template: "btNewCard"
                        });
                        $.Oda.Display.render({
                            "id": "newCard",
                            "html": btNewCard
                        });

                        var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/rest/card/mode/"+p.id, {callback: function(response){
                            $.Oda.Display.Table.createDataTable({
                                target: "tabCards",
                                data: response.data.data,
                                option: {
                                    "aaSorting": [[0, 'desc']],
                                },
                                attribute: [
                                    {
                                        header: $.Oda.I8n.get("modeManage","id"),
                                        size: "50px",
                                        align: "center",
                                        value: function(data, type, full, meta, row){
                                            var strHtml = '<oda-card card-id="'+row.id+'" card-mode="'+row.mode_id+'" card-quality="'+row.quality+'">'+row.id+'</oda-card>';
                                            return strHtml;
                                        }
                                    },{
                                        header: $.Oda.I8n.get("modeManage","nameFr"),
                                        value: function(data, type, full, meta, row){
                                            return row.nameFr;
                                        }
                                    },{
                                        header: $.Oda.I8n.get("modeManage","nameEn"),
                                        value: function(data, type, full, meta, row){
                                            return row.nameEn;
                                        }
                                    },{
                                        header: $.Oda.I8n.get("modeManage","type"),
                                        value: function(data, type, full, meta, row){
                                            return row.type;
                                        }
                                    },{
                                        header: $.Oda.I8n.get("modeManage","classe"),
                                        value: function(data, type, full, meta, row){
                                            return row.class;
                                        }
                                    },{
                                        header: $.Oda.I8n.get("modeManage","cost"),
                                        size: "50px",
                                        align: "center",
                                        value: function(data, type, full, meta, row){
                                            return row.cost;
                                        }
                                    },{
                                        header: $.Oda.I8n.get("modeManage","attack"),
                                        size: "50px",
                                        align: "center",
                                        value: function(data, type, full, meta, row){
                                            return row.attack;
                                        }
                                    },{
                                        header: $.Oda.I8n.get("modeManage","life"),
                                        size: "50px",
                                        align: "center",
                                        value: function(data, type, full, meta, row){
                                            return row.life;
                                        }
                                    },{
                                        header: $.Oda.I8n.get("modeManage","active"),
                                        size: "50px",
                                        align: "center",
                                        value: function(data, type, full, meta, row){
                                            return row.active;
                                        }
                                    },{
                                        header: "Actions",
                                        size: "50px",
                                        align: "center",
                                        value: function(data, type, full, meta, row){
                                            var strHtml = '<a onclick="$.Oda.App.Controler.ModeManage.edit({id:'+row.id+'});" class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-edit"></span></a>';
                                            return strHtml;
                                        }
                                    }
                                ]
                            });
                        }});
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ModeManage.loadCards : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p
                 * @param {String} p.id 
                 * @returns {$.Oda.App.Controler.ModeManage}
                 */
                newCard: function (p) {
                    try {
                        if(p === undefined){
                            var call = $.Oda.Interface.callRest($.Oda.Context.rest+"api/rest/card/last/", {callback: function(response){
                                var strHtmlContent = $.Oda.Display.TemplateHtml.create({
                                    template: "tplPopupCardContent",
                                    scope:{
                                        id:parseInt(response.data.id)+1,
                                        nameFr:"",
                                        nameEn:"",
                                        quality:"",
                                        race:"",
                                        classe:"",
                                        type:"",
                                        cost:0,
                                        attack:0,
                                        life:0,
                                        desc:"",
                                        active:null
                                    }
                                });
                                $.Oda.Display.Popup.open({
                                    "name" : "pCard",
                                    "label" : $.Oda.I8n.get('modeManage','newCard'),
                                    "details" : strHtmlContent,
                                    "footer" : $.Oda.Display.TemplateHtml.create({template: "tplPopupCardNew"}),
                                    "callback" : function(){
                                        $.Oda.Scope.Gardian.add({
                                            id : "gPopupCard",
                                            listElt : ["id","nameFr","nameEn","quality","race","classe","type","cost","attack","life","desc"],
                                            function : function(e){
                                                if( ($("#id").data("isOk")) && ($("#nameFr").data("isOk")) && ($("#nameEn").data("isOk")) 
                                                    && ($("#quality").data("isOk")) && ($("#race").data("isOk")) && ($("#classe").data("isOk")) && ($("#type").data("isOk")) 
                                                    && ($("#cost").data("isOk")) && ($("#attack").data("isOk")) && ($("#life").data("isOk"))
                                                ){
                                                    $("#submitFinishAndNew").btEnable();
                                                    $("#submitNewCard").btEnable();
                                                }else{
                                                    $("#submitFinishAndNew").btDisable();
                                                    $("#submitNewCard").btDisable();
                                                }
                                            }
                                        });
                                    }
                                });
                            }});
                        }
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ModeManage.newCard: " + er.message);
                        return null;
                    }
                },
                /**
                 * @returns {$.Oda.App.Controler.ModeManage}
                 */
                newCardSubmit: function () {
                    try {
                        $.Oda.Interface.callRest($.Oda.Context.rest+"api/rest/card/", {type:'POST', callback: function(response){
                            $.Oda.Display.Popup.close({"name":"pCard"});
                            $.Oda.App.Controler.ModeManage.loadCards({id:$.Oda.App.Controler.ModeManage.currentModeId});
                            $.Oda.Display.Notification.successI8n("modeManage.createSuccess");
                        }}, {
                            modeId:$.Oda.App.Controler.ModeManage.currentModeId,
                            id:$('#id').val(),
                            nameFr:$('#nameFr').val(),
                            nameEn:$('#nameEn').val(),
                            quality:$('#quality').val(),
                            race:$('#race').val(),
                            classe:$('#classe').val(),
                            type:$('#type').val(),
                            cost:$('#cost').val(),
                            attack:$('#attack').val(),
                            life:$('#life').val(),
                            desc:$('#desc').val()
                        });
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ModeManage.newCardSubmit : " + er.message);
                        return null;
                    }
                },
                /**
                 * @returns {$.Oda.App.Controler.ModeManage}
                 */
                finishAndNewSubmit: function () {
                    try {
                        $.Oda.Interface.callRest($.Oda.Context.rest+"api/rest/card/", {type:'POST', callback: function(response){
                            $.Oda.App.Controler.ModeManage.loadCards({id:$.Oda.App.Controler.ModeManage.currentModeId});
                            $.Oda.Display.Notification.successI8n("modeManage.createSuccess");
                            $.Oda.App.Controler.ModeManage.newCard();
                        }}, {
                            modeId:$.Oda.App.Controler.ModeManage.currentModeId,
                            id:$('#id').val(),
                            nameFr:$('#nameFr').val(),
                            nameEn:$('#nameEn').val(),
                            quality:$('#quality').val(),
                            race:$('#race').val(),
                            classe:$('#classe').val(),
                            type:$('#type').val(),
                            cost:$('#cost').val(),
                            attack:$('#attack').val(),
                            life:$('#life').val(),
                            desc:$('#desc').val()
                        });
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ModeManage.finishAndNewSubmit : " + er.message);
                        return null;
                    }
                },
                /**
                 * @param {Object} p
                 * @param {String} p.id 
                 * @returns {$.Oda.App.Controler.ModeManage}
                 */
                edit: function (p) {
                    try {
                        $.Oda.Interface.callRest($.Oda.Context.rest+"api/rest/card/"+p.id, {callback: function(response){
                            var strHtmlContent = $.Oda.Display.TemplateHtml.create({
                                template: "tplPopupCardContent",
                                scope:{
                                    id: response.data.id,
                                    nameFr: response.data.nameFr,
                                    nameEn: response.data.nameEn,
                                    quality: response.data.quality,
                                    race: response.data.race,
                                    classe: response.data.classe,
                                    type: response.data.type,
                                    cost: response.data.cost,
                                    attack: response.data.attack,
                                    life: response.data.life,
                                    desc: response.data.desc,
                                    active: response.data.active
                                }
                            });
                            $.Oda.Display.Popup.open({
                                "name" : "pCardUpdate",
                                "label" : $.Oda.I8n.get('modeManage','editCard'),
                                "details" : strHtmlContent,
                                "footer" : $.Oda.Display.TemplateHtml.create({template: "tplPopupCardUpdate"}),
                                "callback" : function(){
                                    $.Oda.Scope.Gardian.add({
                                        id : "gPopupCard",
                                        listElt : ["id","nameFr","nameEn","quality","race","classe","type","cost","attack","life","desc","active"],
                                        function : function(e){
                                            if( ($("#id").data("isOk")) && ($("#nameFr").data("isOk")) && ($("#nameEn").data("isOk")) 
                                                && ($("#quality").data("isOk")) && ($("#race").data("isOk")) && ($("#classe").data("isOk")) && ($("#type").data("isOk")) 
                                                && ($("#cost").data("isOk")) && ($("#attack").data("isOk")) && ($("#life").data("isOk"))
                                            ){
                                                $("#submitFinishAndNew").btEnable();
                                                $("#submitNewCard").btEnable();
                                            }else{
                                                $("#submitFinishAndNew").btDisable();
                                                $("#submitNewCard").btDisable();
                                            }
                                        }
                                    });
                                }
                            });
                        }}, {
                            id: p.id
                        });
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ModeManage.newCard: " + er.message);
                        return null;
                    }
                },
                /**
                 * @returns {$.Oda.App.Controler.ModeManage}
                 */
                editCardSubmit: function () {
                    try {
                        $.Oda.Interface.callRest($.Oda.Context.rest+"api/rest/card/"+$('#id').val(), {type:'PUT', callback: function(response){
                            $.Oda.Display.Popup.close({"name":"pCardUpdate"});
                            $.Oda.App.Controler.ModeManage.loadCards({id:$.Oda.App.Controler.ModeManage.currentModeId});
                            $.Oda.Display.Notification.successI8n("modeManage.updateSuccess");
                        }}, {
                            id:$('#id').val(),
                            nameFr:$('#nameFr').val(),
                            nameEn:$('#nameEn').val(),
                            quality:$('#quality').val(),
                            race:$('#race').val(),
                            classe:$('#classe').val(),
                            type:$('#type').val(),
                            cost:$('#cost').val(),
                            attack:$('#attack').val(),
                            life:$('#life').val(),
                            desc:$('#desc').val(),
                            active:($('#active').prop('checked'))?1:0
                        });
                        return this;
                    } catch (er) {
                        $.Oda.Log.error("$.Oda.App.Controler.ModeManage.editCardSubmit : " + er.message);
                        return null;
                    }
                },
            }
        }
    };

    // Initialize
    _init();

})();
