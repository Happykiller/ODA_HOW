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
  (NOW(),'Auspice funeste confirmé',0,'Épique','','Neutre',5,0,7,'Serviteur',@old_gods_id,'	Au début de votre tour, porte l''Attaque de ce serviteur à 7.'),
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
  (NOW(),'Héraut Volazj',0,'Légendaire','','Prêtre',6,5,5,'Serviteur',@old_gods_id,'	Cri de guerre : invoque une copie 1/1 de chacun de vos autres serviteurs.'),
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
  (NOW(),'Tentacles for Arms',0,'Épique','','Guerrier',5,2,2,,'Arme',@old_gods_id,'Râle d''agonie : retourne dans votre main.'),
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