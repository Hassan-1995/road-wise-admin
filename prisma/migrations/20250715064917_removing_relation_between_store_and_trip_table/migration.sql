/*
  Warnings:

  - You are about to drop the column `storeId` on the `trip` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `trip` DROP FOREIGN KEY `Trip_storeId_fkey`;

-- DropIndex
DROP INDEX `Trip_storeId_fkey` ON `trip`;

-- AlterTable
ALTER TABLE `trip` DROP COLUMN `storeId`;
