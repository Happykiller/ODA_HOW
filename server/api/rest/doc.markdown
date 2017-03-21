# Routes
    
## Rapport
    
* `/rapport/evol/drop/:userId`
    * type: GET
    * desc: get the evolution of drop rate

## Card

* `/card/`
    * type: GET
    * public: true
    * desc: Get all cards

* `/card/mode/:i`
    * type: GET
    * public: true
    * desc: Get all cards by mode
    
* `/card/`
    * type: POST
    * mandatory params: "id","nameFr","nameEn","quality","race","classe","type","cost","attack","life","desc","modeId"
    * public: false
    * desc: Create a card

* `/card/:id`
    * type: GET
    * public: true
    * desc: get card informations

* `/card/last/`
    * type: GET
    * public: true
    * desc: get last card informations

## Mode
    
* `/mode/`
    * type: GET
    * desc: get all mode