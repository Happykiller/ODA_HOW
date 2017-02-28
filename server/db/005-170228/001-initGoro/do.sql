SET FOREIGN_KEY_CHECKS=0;
-- --------------------------------------------------------
UPDATE `@prefix@tab_inventaire`
SET `race` = 'Élémentaire'
WHERE 1=1
AND `nom` in (
    'Ragnaros, seigneur du feu',
    'Anomalus',
    'Neptulon',
    'Baron Geddon',
    'Ragnaros, porteur de Lumière',
    'Al’Akir, seigneur des Vents',
    'Élémentaire délié',
    'Élémentaire de terre',
    'Enragé du magma'
)
;

INSERT INTO `@prefix@tab_mode`(`id`, `code`, `label`, `date`) VALUES (19,'goro','goro','2017-02-28');

-- --------------------------------------------------------
SET FOREIGN_KEY_CHECKS=1;