SET FOREIGN_KEY_CHECKS=0;
-- --------------------------------------------------------

ALTER TABLE `@prefix@tab_inventaire` CHANGE `actif` `actif` INT(2) NOT NULL DEFAULT '1';

INSERT INTO `@prefix@tab_mode` (`code`, `label`, `date`) VALUES ('old-gods', 'old-gods', NOW());

SELECT @old_gods_id = a.`id`
  FROM `@prefix@tab_mode` a
  WHERE 1=1
  AND a.`code` = 'old-gods'
;

INSERT INTO `how-tab_inventaire`(`data_creation`, `nom`, `id_link`, `qualite`, `race`, `classe`, `cout`, `attaque`, `vie`, `type`, `mode_id`, `description`)
VALUES
  (NOW(),'C\'thun',0,'Légendaire','','Neutre',10,6,6,'Serviteur',@old_gods_id,'Cri de guerre : inflige des dégâts égaux à l''Attaque de ce serviteurs répartis aléatoirement entre tous les adversaires.'),
  (NOW(),'Lardeur, ruine d''Elwynn',0,'Légendaire','','Neutre',7,6,6,'Serviteur',@old_gods_id,'A chaque fois que ce serviteur subit des dégâts, invoque un gnoll 2/2 avec provocation.'),
  (NOW(),'Auspice funeste confirmé',0,'Épique','','Neutre',5,0,7,'Serviteur',@old_gods_id,'Au début de votre tour, porte l''Attaque de ce serviteur à 7.'),
  (NOW(),'Ver de sable géant',0,'Épique','Bête','Chasseur',8,8,8,'Serviteur',@old_gods_id,'Lorsque ce serviteur attaque un autre serviteur et qu''il le tue, il peut attaquer une fois supplémentaire.'),
  (NOW(),'Mange-secrets',0,'Rare','','Neutre',4,2,4,'Serviteur',@old_gods_id,'Cri de guerre : Détruisez tous les secrets de votre adversaire. Gagne +1/+1 pour chaque secret détruit.'),
  (NOW(),'Robot de soins corrompu',0,'Rare','Méca','Neutre',5,6,6,'Serviteur',@old_gods_id,'Râle d''agonie : rend 8 PV au héros adverse.'),
  (NOW(),'Amasseur vicié',0,'Commune','','Neutre',4,4,2,'Serviteur',@old_gods_id,'Rale d''agonie : vous piochez une carte.'),
  (NOW(),'Ancien du crépuscule',0,'Commune','','Neutre',3,3,4,'Serviteur',@old_gods_id,'À la fin de votre tour, donne +1/+1 à votre C''thun (où qu''il soit).'),
  (NOW(),'Annonciatrice du mal',0,'Commune','','Neutre',2,2,3,'Serviteur',@old_gods_id,'Cri de guerre : donne +2/+2 à votre C''thun (où qu''il soit).'),
  (NOW(),'Résister aux ténèbres',0,'Commune','','Paladin',5,0,0,'Sort',@old_gods_id,'Invoque cinq recrues de la Main d''argent 1/1.'),
  (NOW(),'Tisse-ambre klaxxi',0,'Rare','','Druide',4,4,5,'Serviteur',@old_gods_id,'Cri de guerre : gagne +5 PV si votre C''thun a au moins 10 Attaque.'),
  (NOW(),'Ancienne porte-bouclier',0,'Rare','','Neutre',7,6,6,'Serviteur',@old_gods_id,'Cri de guerre : gagne 10 points d''armure si votre C''thun a au moins 10 Attaque.'),
  (NOW(),'Élue de C''thun',0,'Commune','','Neutre',7,6,6,'Serviteur',@old_gods_id,'Bouclier divin. Cri de guerre : donne +2/+2 à votre C''thun (où qu''il soit.'),
  (NOW(),'Hallazèle l’Elevé',0,'Légendaire','','Chaman',5,4,6,'Serviteur',@old_gods_id,'Chaque fois que vous infligez des dégâts avec un sort, rend autant de points de vie à votre héros.'),
  (NOW(),'Héraut Volazj',0,'Légendaire','','Prêtre',6,5,5,'Serviteur',@old_gods_id,'Cri de guerre : invoque une copie 1/1 de chacun de vos autres serviteurs.'),
  (NOW(),'DOOM!',0,'Épique','','Démoniste',10,0,0,'Sort',@old_gods_id,'Détruit tous les serviteurs. Proche une carte par serviteur détruit.'),
  (NOW(),'Faceless Shambler',0,'Épique','','Neutre',4,1,1,'Serviteur',@old_gods_id,'Provocation. Cri de guerre : Copie l''Attaque et la Vie d''un serviteur allié.'),
  (NOW(),'Tentacule de N''Zoth',0,'Commune','','Neutre',1,1,1,'Serviteur',@old_gods_id,'Râle d''agonie : Inflige 1 point de dégât à tous les serviteurs.'),
  (NOW(),'Flamme interdite',0,'Épique','','Mage',0,0,0,'Sort',@old_gods_id,'Dépense tous vos cristaux de mana. Inflige l''équivalent sous forme de dégâts à un serviteur.'),
  (NOW(),'Mutation interdite',0,'Épique','','Prêtre',0,0,0,'Sort',@old_gods_id,'Dépense tous vos cristaux de mana. Invoque un serviteur aléatoire de même coût.'),
  (NOW(),'Soin Interdit',0,'Épique','','Paladin',0,0,0,'Sort',@old_gods_id,'	Dépense tous vos cristaux de mana. Rend deux fois l''équivalent en points de vie.'),
  (NOW(),'Tisse-ambre klaxxi',0,'Rare','','Druide',4,4,5,'Serviteur',@old_gods_id,'Cri de guerre : gagne +5 PV si votre C''thun a au moins 10 Attaque.'),
  (NOW(),'Second de N''Zoth',0,'Commune','Pirate','Guerrier',1,1,1,'Serviteur',@old_gods_id,'Cri de guerre : vous équipe d''un Crochet rouillé 1/3.'),
  (NOW(),'Tauren infesté',0,'Commune','','Neutre',4,2,3,'Serviteur',@old_gods_id,'Provocation. Râle d''agonie : invoque une gelée 2/2.'),
  (NOW(),'N''Zoth le corrupteur',0,'Légendaire','','Neutre',10,5,7,'Serviteur',@old_gods_id,'Cri de guerre : invoque vos serviteurs avec Râle d''agonie morts pendant cette partie.'),
  (NOW(),'Colporteur de Fossoyeuse',0,'Rare','','Voleur',2,2,2,'Serviteur',@old_gods_id,'Râle d''agonie : ajoute une carte aléatoire dans votre main (de la classe de votre adversaire).'),
  (NOW(),'Renoncer aux ténèbres',0,'Épique','','Démoniste',2,0,0,'Sort',@old_gods_id,'Remplace votre pouvoir héroïque et vos cartes Démoniste par ceux d''une autre classe. Les cartes coûtent (1) de moins.'),
  (NOW(),'Brood of N''Zoth',0,'Commune','','Neutre',3,2,2,'Serviteur',@old_gods_id,'Râle d''agonie : donne +1/+1 à vos serviteurs.'),
  (NOW(),'The Boogeymonster',0,'Légendaire','','Neutre',8,6,7,'Serviteur',@old_gods_id,'Quand ce serviteur attaque et détruit un autre serviteur, gagne +2/+2.'),
  (NOW(),'Xaril l''Esprit empoisonné',0,'Légendaire','','Neutre',4,3,2,'Serviteur',@old_gods_id,'Cri de guerre et Râle d''agonie : ajoute une carte Toxine aléatoire dans votre main.'),
  (NOW(),'Tentacules brachiaux',0,'Épique','','Guerrier',5,2,2,'Arme',@old_gods_id,'Râle d''agonie : retourne dans votre main.'),
  (NOW(),'Infester',0,'Rare','','Chasseur',3,0,0,'Sort',@old_gods_id,'Donne à vos serviteurs : "Râle d''agonie : ajoute une carte Bête aléatoire dans votre main."'),
  (NOW(),'Ragnaros, Lightlord',0,'Légendaire','','Paladin',8,8,8,'Serviteur',@old_gods_id,'	À la fin de votre tour, rend 8 points de vie à un personnage allié blessé.'),
  (NOW(),'Apothicaire du culte',0,'Commune','','Neutre',5,4,4,'Serviteur',@old_gods_id,'Cri de guerre : rend 2 PV à votre héros pour chaque serviteur adverse'),
  (NOW(),'Mukla, tyran du val',0,'Légendaire','Bête','Neutre',6,5,5,'Serviteur',@old_gods_id,'Cri de guerre : place 2 bananes dans votre main.'),
  (NOW(),'Dragon de cauchemar',0,'Épique','Dragon','Neutre',7,6,6,'Serviteur',@old_gods_id,'Au début de votre tour, double l''Attaque de ce serviteur.'),
  (NOW(),'Mot de l''ombre : horreur',0,'Rare','','Prêtre',4,0,0,'Sort',@old_gods_id,'Détruit tous les serviteurs avec 2 Attaque ou moins.'),
  (NOW(),'Marque d''Yshaarj',0,'Commune','','Druide',2,0,0,'Sort',@old_gods_id,'Donne +2/+2 à un serviteur. Si c''est une bête, pioche une carte.'),
  (NOW(),'Regisseur de Sombre-Comté',0,'Rare','','Paladin',3,3,3,'Serviteur',@old_gods_id,'	Chaque fois que vous invoquez un serviteur avec 1 PV, lui confère Bouclier divin.'),
  (NOW(),'Sectateur de Skeram',0,'Rare','','Neutre',6,7,6,'Serviteur',@old_gods_id,'Cri de guerre : donne +2/+2 à votre C''thun (où qu''il soit)'),
  (NOW(),'Tome du cabaliste',0,'Épique','','Mage',5,0,0,'Sort',@old_gods_id,'Ajoute 3 sorts de Mage aléatoires dans votre main.'),
  (NOW(),'Y''Shaarj, la rage déchaînée',0,'Légendaire','','Neutre',10,10,10,'Serviteur',@old_gods_id,'À la fin de votre tour, place un serviteur de votre deck sur le champ de bataille.'),
  (NOW(),'Ancien héraut',0,'Épique','','Neutre',6,4,6,'Serviteur',@old_gods_id,'Au début de votre tour, place un serviteur coûtant 10 cristaux de mana de votre deck dans votre main.'),
  (NOW(),'Vilefin Inquisitor',0,'Épique','Murloc','Paladin',1,1,3,'Serviteur',@old_gods_id,'Cri de guerre : votre pouvoir héroïque devient « Invoque un murloc 1/1 ».'),
  (NOW(),'Master of Evolution',0,'Rare','','Chaman',4,4,5,'Serviteur',@old_gods_id,'Cri de guerre : transforme un serviteur allié en un serviteur aléatoire qui coûte (1) cristal de plus.'),
  (NOW(),'Thing from Below',0,'Rare','','Chaman',6,5,5,'Serviteur',@old_gods_id,'Provocation. Coûte (1) cristal de moins pour chaque totem que vous avez invoqué pendant cette partie.'),  
  (NOW(),'Goule ravageuse',0,'Commune','','Guerrier',3,3,3,'Serviteur',@old_gods_id,'Cri de guerre : Inflige 1 point de dégâts à tous les autres serviteurs.'),
  (NOW(),'Gardien du bourbier',0,'Rare','','class',4,3,3,'Druide',@old_gods_id,'Choix des armes : invoque un limon 2/2 ou confère un cristal de mana vide'),
  (NOW(),'Marteau du crépuscule',0,'Épique','','Chaman',5,4,2,'Arme',@old_gods_id,'Râle d''agonie : invoque un Élémentaire 4/2.'),
  (NOW(),'Blood of the Ancient one',0,'Épique','','Neutre',9,9,9,'Serviteur',@old_gods_id,'Si vous contrôlez deux exemplaires de ce serviteur à la fin de votre tour, les transforme en «  The Ancient One »'),
  (NOW(),'Guerriers de sang',0,'Épique','','Guerrier',3,0,0,'Sort',@old_gods_id,'Place une copie de chaque serviteur allié blessé dans votre main.'),
  (NOW(),'Call of the Wild',0,'Épique','','Chasseur',8,0,0,'Sort',@old_gods_id,'Invoque les 3 compagnons animaux.'),
  (NOW(),'Cho''gall',0,'Légendaire','','Démoniste',7,7,7,'Serviteur',@old_gods_id,'Cri de guerre : le prochain sort que vous jouez pendant ce tour vous coûte des points de vie et non de mana.'),
  (NOW(),'Yogg-Saron, la fin de l''espoir',0,'Légendaire','','Neutre',10,5,7,'Serviteur',@old_gods_id,'Cri de guerre : lance un sort aléatoire pour chaque sort lancé pendant cette partie (cibles choisies au hasard)'),
  (NOW(),'Folie galopante',0,'Rare','','Démoniste',3,0,0,'type',@old_gods_id,'Inflige 9 points de dégâts répartis de façon aléatoire entre TOUS les personnages.'),
  (NOW(),'Villageois possédé',0,'Commune','','Démoniste',1,1,1,'Serviteur',@old_gods_id,'Râle d''agonie : Invoque une Bête d''ombre 1/1.'),
  (NOW(),'Feux follets funestes',0,'Épique','','Druide',7,0,0,'Sort',@old_gods_id,'Choix des armes : Invoque sept feux follets 1/1 ou donne +2/+2 à vos serviteurs.'),
  (NOW(),'Soggoth le Rampant',0,'Légendaire','','Neutre',9,5,9,'Serviteur',@old_gods_id,'Provocation Ne peut pas être la cible de sorts ou de pouvoirs héroïques.'),
  (NOW(),'Invocateur du crépuscule',0,'Épique','','Neutre',4,1,1,'Serviteur',@old_gods_id,'Râle d''agonie: invoque un destructeur sans-visage 5/5'),
  (NOW(),'Thé de chardon',0,'Rare','','Voleur',6,0,0,'Sort',@old_gods_id,'Vous piochez une carte. En place 2 copies supplémentaires dans votre main.'),
  (NOW(),'Embrace the Shadow',0,'Épique','','Prêtre',2,0,0,'Sort',@old_gods_id,'Vos effets de soins infligent des dégâts pendant ce tour.'),
  (NOW(),'Aile-de-mort, seigneur Dragon',0,'Légendaire','Dragon','Neutre',10,12,12,'Serviteur',@old_gods_id,'Râle d''agonie : place tous les Dragons de votre main sur le champ de bataille.'),
  (NOW(),'Forlorn Stalker',0,'Rare','','Chasseur',3,4,2,'Serviteur',@old_gods_id,'Cri de guerre : donne à vos serviteurs avec Râle d''agonie dans votre main +1/+1.'),
  (NOW(),'Invocateur sans-visage',0,'Commune','','Mage',6,5,5,'Serviteur',@old_gods_id,'Cri de guerre : invoque un serviteur aléatoire coûtant 3 cristaux.'),
  (NOW(),'Serviteur de Yogg-Saron',0,'Rare','','Mage',5,5,4,'Serviteur',@old_gods_id,'Cri de guerre : lance un sort aléatoire coûtant au maximum (5) cristaux de mana (cibles choisies au hasard).'),
  (NOW(),'Exhalombre',0,'Épique','','Voleur',5,4,4,'Serviteur',@old_gods_id,'Cri de guerre : Choisissez un serviteur allié. En place une copie 1/1 qui coûte (1) dans votre main'),
  (NOW(),'Twilight Flamecaller',0,'Commune','','Mage',3,2,2,'Serviteur',@old_gods_id,'Cri de guerre : inflige 1 point de dégâts à tous les serviteurs adverses.'),
  (NOW(),'Mad frost magician',0,'Rare','','Mage',4,2,4,'Serviteur',@old_gods_id,'Lorsque vous lancez un sort, gèle un adversaire aléatoire.'),
  (NOW(),'Shifting Shade',0,'Rare','','Prêtre',4,4,3,'Serviteur',@old_gods_id,'Râle d''agonie : copie une carte du deck adverse et la place dans votre main'),
  (NOW(),'Sombre Arakkoa',0,'Commune','','Druide',6,5,7,'Serviteur',@old_gods_id,'	Provocation. Cri de guerre : donne +3/+3 à votre C''thun (où qu''il soit).'),
  (NOW(),'Princesse Huhuran',0,'Légendaire','Bête','Chasseur',5,6,5,'Serviteur',@old_gods_id,'Cri de guerre : déclenche le Râle d''agonie d''un serviteur allié.'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description'),
  (NOW(),'name',0,'quality','race','class',7,6,6,'type',@old_gods_id,'description')
;

-- --------------------------------------------------------
SET FOREIGN_KEY_CHECKS=1;