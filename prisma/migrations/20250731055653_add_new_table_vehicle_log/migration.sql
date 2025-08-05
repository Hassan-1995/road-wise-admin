/*
  Warnings:

  - You are about to alter the column `pathPoints` on the `optimisedpath` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `optimisedpath` MODIFY `pathPoints` JSON NOT NULL;

-- CreateTable
CREATE TABLE `VehicleMaintenanceLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vehicleId` INTEGER NULL,
    `driverId` INTEGER NULL,
    `maintenanceDate` DATETIME(3) NOT NULL,
    `liters` DECIMAL(8, 2) NULL,
    `serviceType` ENUM('OIL_CHANGE', 'TIRE_ROTATION', 'BRAKE_INSPECTION', 'BATTERY_CHECK', 'GENERAL_SERVICE') NULL,
    `repairType` ENUM('ENGINE', 'TRANSMISSION', 'BRAKES', 'SUSPENSION', 'ELECTRICAL', 'BODY') NULL,
    `costRs` DECIMAL(10, 2) NOT NULL,
    `odometerKm` DECIMAL(10, 2) NOT NULL,
    `location` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `VML_driverId_fkey`(`driverId`),
    INDEX `VML_vehicleId_fkey`(`vehicleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VehicleMaintenanceLog` ADD CONSTRAINT `VML_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `Driver`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VehicleMaintenanceLog` ADD CONSTRAINT `VML_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
