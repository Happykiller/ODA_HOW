UPDATE  `db_how`.`how-tab_menu` SET  `Description` =  'G�rer ses decks',
`Description_courte` =  'G�rer ses decks',
`Lien` =  'page_gerer_deck.html' WHERE  `how-tab_menu`.`id` =20;

ALTER TABLE  `how-tab_deck` ADD  `actif` TINYINT( 2 ) NOT NULL DEFAULT  '1';