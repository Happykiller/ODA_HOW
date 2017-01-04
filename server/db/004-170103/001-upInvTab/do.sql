SET FOREIGN_KEY_CHECKS=0;
-- --------------------------------------------------------

ALTER TABLE `@prefix@tab_inventaire` DROP `id_link`;
ALTER TABLE `@prefix@tab_inventaire` ADD `name_en` VARCHAR(250) NOT NULL AFTER `nom`;

-- --------------------------------------------------------
SET FOREIGN_KEY_CHECKS=1;