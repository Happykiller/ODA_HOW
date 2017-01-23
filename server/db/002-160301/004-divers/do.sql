SET FOREIGN_KEY_CHECKS=0;
-- --------------------------------------------------------
UPDATE `@prefix@tab_craft` SET `qualite` = 'Commune' WHERE `qualite` = 'Classique';
-- --------------------------------------------------------
SET FOREIGN_KEY_CHECKS=1;