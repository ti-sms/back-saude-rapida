/*
  Warnings:

  - Added the required column `carStatus` to the `car` table without a default value. This is not possible if the table is not empty.
  - Made the column `hospitalName` on table `hospital` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `car` ADD COLUMN `carStatus` VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE `hospital` ADD COLUMN `hospitalStatus` VARCHAR(45) NOT NULL DEFAULT '1',
    MODIFY `hospitalName` VARCHAR(45) NOT NULL;

-- AlterTable
ALTER TABLE `local` ADD COLUMN `localStatus` TINYINT NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `location` ADD COLUMN `locationStatus` TINYINT NULL DEFAULT 1;
