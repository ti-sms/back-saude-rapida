/*
  Warnings:

  - The primary key for the `address` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `addressNumer` on the `address` table. All the data in the column will be lost.
  - The primary key for the `car` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `generalconfig` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `hospital` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `local` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `patientspecify` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `person` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `trip` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `userpermission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `vacacionpatient` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `address` DROP PRIMARY KEY,
    DROP COLUMN `addressNumer`,
    ADD COLUMN `addressNumber` VARCHAR(10) NULL,
    MODIFY `addressId` VARCHAR(60) NOT NULL,
    ADD PRIMARY KEY (`addressId`);

-- AlterTable
ALTER TABLE `car` DROP PRIMARY KEY,
    MODIFY `carId` VARCHAR(60) NOT NULL,
    ADD PRIMARY KEY (`carId`);

-- AlterTable
ALTER TABLE `generalconfig` DROP PRIMARY KEY,
    MODIFY `idgeneralConfig` VARCHAR(60) NOT NULL,
    MODIFY `address_addressId` VARCHAR(60) NOT NULL,
    ADD PRIMARY KEY (`idgeneralConfig`, `address_addressId`);

-- AlterTable
ALTER TABLE `hospital` DROP PRIMARY KEY,
    MODIFY `hospitalId` VARCHAR(60) NOT NULL,
    MODIFY `address_addressId` VARCHAR(60) NOT NULL,
    ADD PRIMARY KEY (`hospitalId`, `address_addressId`);

-- AlterTable
ALTER TABLE `local` DROP PRIMARY KEY,
    MODIFY `localId` VARCHAR(60) NOT NULL,
    MODIFY `address_addressId` VARCHAR(60) NOT NULL,
    ADD PRIMARY KEY (`localId`, `address_addressId`);

-- AlterTable
ALTER TABLE `location` DROP PRIMARY KEY,
    MODIFY `locationId` VARCHAR(60) NOT NULL,
    MODIFY `userPermission_driverPermissionId` VARCHAR(60) NOT NULL,
    MODIFY `car_carId` VARCHAR(60) NOT NULL,
    MODIFY `local_localId` VARCHAR(60) NOT NULL,
    ADD PRIMARY KEY (`locationId`, `userPermission_driverPermissionId`, `car_carId`, `local_localId`);

-- AlterTable
ALTER TABLE `patientspecify` DROP PRIMARY KEY,
    MODIFY `patientSpecifyId` VARCHAR(60) NOT NULL,
    MODIFY `person_patientId` VARCHAR(60) NOT NULL,
    ADD PRIMARY KEY (`patientSpecifyId`, `person_patientId`);

-- AlterTable
ALTER TABLE `person` DROP PRIMARY KEY,
    MODIFY `patientId` VARCHAR(60) NOT NULL,
    MODIFY `address_addressId` VARCHAR(60) NOT NULL,
    ADD PRIMARY KEY (`patientId`, `address_addressId`);

-- AlterTable
ALTER TABLE `trip` DROP PRIMARY KEY,
    MODIFY `tripId` VARCHAR(60) NOT NULL,
    MODIFY `car_carId` VARCHAR(60) NOT NULL,
    MODIFY `userPermission_driverPermissionid` VARCHAR(60) NOT NULL,
    ADD PRIMARY KEY (`tripId`, `car_carId`, `userPermission_driverPermissionid`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `userId` VARCHAR(60) NOT NULL,
    ADD PRIMARY KEY (`userId`);

-- AlterTable
ALTER TABLE `userpermission` DROP PRIMARY KEY,
    MODIFY `userPermissionId` VARCHAR(60) NOT NULL,
    MODIFY `person_persontId` VARCHAR(60) NOT NULL,
    MODIFY `user_userId` VARCHAR(60) NOT NULL,
    ADD PRIMARY KEY (`userPermissionId`, `person_persontId`, `user_userId`);

-- AlterTable
ALTER TABLE `vacacionpatient` DROP PRIMARY KEY,
    MODIFY `vacacionPatientId` VARCHAR(60) NOT NULL,
    MODIFY `userPermission_patientPermissionId` VARCHAR(60) NOT NULL,
    MODIFY `hospital_hospitalId` VARCHAR(60) NOT NULL,
    MODIFY `trip_tripId` VARCHAR(60) NOT NULL,
    ADD PRIMARY KEY (`vacacionPatientId`, `userPermission_patientPermissionId`, `hospital_hospitalId`, `trip_tripId`);

-- AddForeignKey
ALTER TABLE `generalconfig` ADD CONSTRAINT `fk_generalConfig_address1` FOREIGN KEY (`address_addressId`) REFERENCES `address`(`addressId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `hospital` ADD CONSTRAINT `fk_hospital_address1` FOREIGN KEY (`address_addressId`) REFERENCES `address`(`addressId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `local` ADD CONSTRAINT `fk_local_address1` FOREIGN KEY (`address_addressId`) REFERENCES `address`(`addressId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `fk_location_car1` FOREIGN KEY (`car_carId`) REFERENCES `car`(`carId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `fk_location_local1` FOREIGN KEY (`local_localId`) REFERENCES `local`(`localId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `fk_location_userPermission1` FOREIGN KEY (`userPermission_driverPermissionId`) REFERENCES `userpermission`(`userPermissionId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `patientspecify` ADD CONSTRAINT `fk_patientSpecify_person1` FOREIGN KEY (`person_patientId`) REFERENCES `person`(`patientId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `person` ADD CONSTRAINT `fk_person_address1` FOREIGN KEY (`address_addressId`) REFERENCES `address`(`addressId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `trip` ADD CONSTRAINT `fk_trip_car1` FOREIGN KEY (`car_carId`) REFERENCES `car`(`carId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `trip` ADD CONSTRAINT `fk_trip_userPermission1` FOREIGN KEY (`userPermission_driverPermissionid`) REFERENCES `userpermission`(`userPermissionId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `userpermission` ADD CONSTRAINT `fk_userPermission_person1` FOREIGN KEY (`person_persontId`) REFERENCES `person`(`patientId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `userpermission` ADD CONSTRAINT `fk_userPermission_user1` FOREIGN KEY (`user_userId`) REFERENCES `user`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vacacionpatient` ADD CONSTRAINT `fk_vacacionPatient_hospital1` FOREIGN KEY (`hospital_hospitalId`) REFERENCES `hospital`(`hospitalId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vacacionpatient` ADD CONSTRAINT `fk_vacacionPatient_trip1` FOREIGN KEY (`trip_tripId`) REFERENCES `trip`(`tripId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vacacionpatient` ADD CONSTRAINT `fk_vacacionPatient_userPermission1` FOREIGN KEY (`userPermission_patientPermissionId`) REFERENCES `userpermission`(`userPermissionId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
