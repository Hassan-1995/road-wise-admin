/*
  Warnings:

  - A unique constraint covering the columns `[tripId,storeId]` on the table `DropoutAssignment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tripId` to the `DropoutAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dropoutassignment` ADD COLUMN `tripId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `DropoutAssignment_tripId_storeId_key` ON `DropoutAssignment`(`tripId`, `storeId`);

-- AddForeignKey
ALTER TABLE `DropoutAssignment` ADD CONSTRAINT `DropoutAssignment_tripId_fkey` FOREIGN KEY (`tripId`) REFERENCES `Trip`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
