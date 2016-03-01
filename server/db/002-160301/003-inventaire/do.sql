SET FOREIGN_KEY_CHECKS=0;
-- --------------------------------------------------------
ALTER TABLE `@prefix@tab_inventaire`
DROP `elite`,
DROP `popularite`,
DROP `provocation`,
DROP `agonie`,
DROP `crie`,
DROP `combo`,
DROP `surcharge`,
DROP `sorts`,
DROP `vent`,
DROP `charge`,
DROP `bouclier`;
-- --------------------------------------------------------
SET FOREIGN_KEY_CHECKS=1;