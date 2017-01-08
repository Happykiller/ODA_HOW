SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE `@prefix@api_tab_rangs`;

INSERT INTO `@prefix@api_tab_rangs` (`id`, `labelle`, `indice`) VALUES
  (1, 'Administrateur', 1),
  (2, 'Superviseur', 10),
  (3, 'Responsable', 20),
  (4, 'Utilisateur', 30),
  (5, 'Visiteur', 99)
;

TRUNCATE TABLE `@prefix@api_tab_menu_categorie`;

INSERT INTO `@prefix@api_tab_menu_categorie` (`id`, `Description`) VALUES
  (1, 'L''accueil'),
  (2, 'Administration'),
  (3, 'Gestion'),
  (4, 'Rapports'),
  (99, 'Liens externs');

SET FOREIGN_KEY_CHECKS = 1;