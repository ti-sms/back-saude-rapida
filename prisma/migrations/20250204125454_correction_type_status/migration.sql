/*
  Warnings:

  - You are about to alter the column `hospitalStatus` on the `hospital` table. The data in that column could be lost. The data in that column will be cast from `VarChar(45)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `hospital` MODIFY `hospitalStatus` TINYINT NOT NULL DEFAULT 1;
