/*
  Warnings:

  - You are about to drop the `route` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `route` DROP FOREIGN KEY `Route_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `route` DROP FOREIGN KEY `Route_tripId_fkey`;

-- AlterTable
ALTER TABLE `optimisedpath` MODIFY `pathPoints` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `route`;
