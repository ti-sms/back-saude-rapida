-- CreateTable
CREATE TABLE `address` (
    `addressId` VARCHAR(60) NOT NULL,
    `addressStreet` VARCHAR(60) NULL,
    `addressDistrict` VARCHAR(45) NULL,
    `addressNumber` VARCHAR(10) NULL,
    `addressCity` VARCHAR(45) NULL,
    `addressState` VARCHAR(45) NULL DEFAULT 'CE',
    `addressCep` VARCHAR(45) NULL,

    UNIQUE INDEX `addressId_UNIQUE`(`addressId`),
    PRIMARY KEY (`addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `car` (
    `carId` VARCHAR(60) NOT NULL,
    `carName` VARCHAR(100) NOT NULL,
    `carStatus` VARCHAR(45) NOT NULL,
    `carPlate` VARCHAR(15) NOT NULL,
    `carModel` VARCHAR(100) NOT NULL,
    `carType` VARCHAR(45) NOT NULL,
    `carBrand` VARCHAR(100) NOT NULL,
    `carqQtdVacancy` INTEGER NOT NULL,
    `carObservations` LONGTEXT NULL,

    UNIQUE INDEX `carId_UNIQUE`(`carId`),
    PRIMARY KEY (`carId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `department` (
    `departmentId` VARCHAR(36) NOT NULL,
    `departmentName` VARCHAR(45) NOT NULL,
    `departmentDescription` LONGTEXT NULL,
    `secretary_secretaryId` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `departmentId_UNIQUE`(`departmentId`),
    INDEX `fk_department_secretary1_idx`(`secretary_secretaryId`),
    PRIMARY KEY (`departmentId`, `secretary_secretaryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `document` (
    `documentId` VARCHAR(36) NOT NULL,
    `documentSequence` INTEGER NULL,
    `documentState` VARCHAR(45) NOT NULL,
    `documentDateCreate` VARCHAR(45) NOT NULL,
    `documentDateAccept` VARCHAR(45) NULL,
    `documentTitle` VARCHAR(100) NOT NULL,
    `documentBody` LONGTEXT NOT NULL,
    `documentAnexo` LONGTEXT NULL,
    `documentObservations` LONGTEXT NULL,
    `documentUserSenderId_fk` VARCHAR(36) NOT NULL,
    `documentUserRecipientid_fk` VARCHAR(36) NULL,
    `documentType_type_id` VARCHAR(36) NOT NULL,
    `documentRecipientPosition` VARCHAR(100) NULL,
    `documentRecipientName` VARCHAR(100) NULL,

    UNIQUE INDEX `documentId_UNIQUE`(`documentId`),
    INDEX `fk_document_documentType1_idx`(`documentType_type_id`),
    PRIMARY KEY (`documentId`, `documentType_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documentsequence` (
    `documentSequenceId` VARCHAR(36) NOT NULL,
    `documentSeq` INTEGER NOT NULL,
    `documentType_id` VARCHAR(36) NOT NULL,

    INDEX `fk_documentSequence_documentType1_idx`(`documentType_id`),
    PRIMARY KEY (`documentSequenceId`, `documentType_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documenttype` (
    `documentTypeId` VARCHAR(36) NOT NULL,
    `documentTypeName` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`documentTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `generalconfig` (
    `idgeneralConfig` VARCHAR(60) NOT NULL,
    `logoImage` VARCHAR(45) NULL,
    `useCoordinatorCollaboratorId` INTEGER NOT NULL,
    `generalAddressId` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `idgeneralConfig_UNIQUE`(`idgeneralConfig`),
    PRIMARY KEY (`idgeneralConfig`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hospital` (
    `hospitalId` VARCHAR(60) NOT NULL,
    `hospitalName` VARCHAR(45) NOT NULL,
    `hospitalStatus` TINYINT NOT NULL DEFAULT 1,
    `hospitalDescription` LONGTEXT NULL,
    `hospitalAddressId_fk` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `hospitalId_UNIQUE`(`hospitalId`),
    PRIMARY KEY (`hospitalId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `listofhealthsystem` (
    `listOfHealthSystemId` VARCHAR(36) NOT NULL,
    `listOfHealthSystemName` VARCHAR(45) NOT NULL,
    `listOfHealthSystemDescription` LONGTEXT NULL,

    PRIMARY KEY (`listOfHealthSystemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `local` (
    `localId` VARCHAR(60) NOT NULL,
    `localName` VARCHAR(45) NULL,
    `localStatus` TINYINT NOT NULL DEFAULT 1,
    `localAddresId_fk` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `localId_UNIQUE`(`localId`),
    PRIMARY KEY (`localId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location` (
    `locationId` VARCHAR(60) NOT NULL,
    `locationDateTimeInitial` VARCHAR(45) NOT NULL,
    `locationDateTimeFinal` VARCHAR(45) NULL,
    `locationStatus` TINYINT NULL DEFAULT 1,
    `locationObservations` LONGTEXT NULL,
    `car_carId` VARCHAR(60) NOT NULL,
    `local_localId` VARCHAR(60) NOT NULL,
    `personDriverId_fk` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `locationId_UNIQUE`(`locationId`),
    INDEX `fk_location_car1_idx`(`car_carId`),
    INDEX `fk_location_local1_idx`(`local_localId`),
    PRIMARY KEY (`locationId`, `car_carId`, `local_localId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patientspecify` (
    `patientSpecifyId` VARCHAR(60) NOT NULL,
    `patientCompanyName` VARCHAR(45) NULL,
    `patientCompanyPhone` VARCHAR(45) NULL,
    `patientPersonId` VARCHAR(36) NULL,

    UNIQUE INDEX `patientSpecifyId_UNIQUE`(`patientSpecifyId`),
    PRIMARY KEY (`patientSpecifyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `person` (
    `personName` VARCHAR(100) NOT NULL,
    `personCpf` VARCHAR(45) NOT NULL,
    `personCNS` VARCHAR(45) NULL,
    `personPhone` VARCHAR(20) NULL,
    `address_addressId` VARCHAR(60) NOT NULL,
    `personId` VARCHAR(60) NOT NULL,

    UNIQUE INDEX `patientId_UNIQUE`(`personId`),
    INDEX `fk_person_address1_idx`(`address_addressId`),
    PRIMARY KEY (`personId`, `address_addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `secretary` (
    `secretaryName` VARCHAR(100) NOT NULL,
    `secretaryDescription` VARCHAR(200) NULL,
    `secretaryId` VARCHAR(36) NOT NULL,

    PRIMARY KEY (`secretaryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trip` (
    `tripId` VARCHAR(60) NOT NULL,
    `tripDateTimeStart` VARCHAR(45) NOT NULL,
    `tripDateTimeFinish` VARCHAR(45) NULL,
    `tripState` VARCHAR(45) NOT NULL,
    `car_carId` VARCHAR(60) NOT NULL,
    `personDriverId_fk` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `tripId_UNIQUE`(`tripId`),
    INDEX `fk_trip_car1_idx`(`car_carId`),
    PRIMARY KEY (`tripId`, `car_carId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `userId` VARCHAR(60) NOT NULL,
    `userEmail` VARCHAR(100) NOT NULL,
    `userPassword` VARCHAR(20) NOT NULL,
    `userSusKey` LONGTEXT NULL,
    `department_departmentId` VARCHAR(36) NOT NULL,
    `person_personId` VARCHAR(60) NOT NULL,
    `userPosition` VARCHAR(45) NOT NULL,
    `userSignature` LONGTEXT NULL,

    UNIQUE INDEX `userId_UNIQUE`(`userId`),
    UNIQUE INDEX `userEmail_UNIQUE`(`userEmail`),
    INDEX `fk_user_department1_idx`(`department_departmentId`),
    INDEX `fk_user_person1_idx`(`person_personId`),
    PRIMARY KEY (`userId`, `person_personId`, `department_departmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userpermision` (
    `userPermissionId` VARCHAR(60) NOT NULL,
    `userStatus` TINYINT NOT NULL,
    `userPermisionType` VARCHAR(45) NOT NULL,
    `user_userId` VARCHAR(60) NOT NULL,
    `listOfHealthSystem_listOfHealthSystemId` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `userPermissionId_UNIQUE`(`userPermissionId`),
    INDEX `fk_userPermission_listOfHealthSystem1_idx`(`listOfHealthSystem_listOfHealthSystemId`),
    INDEX `fk_userPermission_user1_idx`(`user_userId`),
    PRIMARY KEY (`userPermissionId`, `user_userId`, `listOfHealthSystem_listOfHealthSystemId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vacacionpatient` (
    `vacacionPatientId` VARCHAR(60) NOT NULL,
    `forwardingImage` LONGTEXT NULL,
    `patienteHaveCourtJudicial` TINYINT NULL DEFAULT 0,
    `patientCourtJudicialCode` VARCHAR(45) NULL DEFAULT '0',
    `PatientHaveCompany` TINYINT NOT NULL DEFAULT 0,
    `CompanyName` VARCHAR(60) NULL,
    `companyPhone` VARCHAR(45) NULL,
    `hospital_hospitalId` VARCHAR(60) NOT NULL,
    `trip_tripId` VARCHAR(60) NOT NULL,
    `personPatientId_fk` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `vacacionPatientId_UNIQUE`(`vacacionPatientId`),
    INDEX `fk_vacacionPatient_hospital1_idx`(`hospital_hospitalId`),
    INDEX `fk_vacacionPatient_trip1_idx`(`trip_tripId`),
    PRIMARY KEY (`vacacionPatientId`, `hospital_hospitalId`, `trip_tripId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `department` ADD CONSTRAINT `fk_department_secretary1` FOREIGN KEY (`secretary_secretaryId`) REFERENCES `secretary`(`secretaryId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `document` ADD CONSTRAINT `fk_document_documentType1` FOREIGN KEY (`documentType_type_id`) REFERENCES `documenttype`(`documentTypeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `documentsequence` ADD CONSTRAINT `fk_documentSequence_documentType1` FOREIGN KEY (`documentType_id`) REFERENCES `documenttype`(`documentTypeId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `fk_location_car1` FOREIGN KEY (`car_carId`) REFERENCES `car`(`carId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `fk_location_local1` FOREIGN KEY (`local_localId`) REFERENCES `local`(`localId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `person` ADD CONSTRAINT `fk_person_address1` FOREIGN KEY (`address_addressId`) REFERENCES `address`(`addressId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `trip` ADD CONSTRAINT `fk_trip_car1` FOREIGN KEY (`car_carId`) REFERENCES `car`(`carId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_user_department1` FOREIGN KEY (`department_departmentId`) REFERENCES `department`(`departmentId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `fk_user_person1` FOREIGN KEY (`person_personId`) REFERENCES `person`(`personId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `userpermision` ADD CONSTRAINT `fk_userPermission_listOfHealthSystem1` FOREIGN KEY (`listOfHealthSystem_listOfHealthSystemId`) REFERENCES `listofhealthsystem`(`listOfHealthSystemId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `userpermision` ADD CONSTRAINT `fk_userPermission_user1` FOREIGN KEY (`user_userId`) REFERENCES `user`(`userId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vacacionpatient` ADD CONSTRAINT `fk_vacacionPatient_hospital1` FOREIGN KEY (`hospital_hospitalId`) REFERENCES `hospital`(`hospitalId`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `vacacionpatient` ADD CONSTRAINT `fk_vacacionPatient_trip1` FOREIGN KEY (`trip_tripId`) REFERENCES `trip`(`tripId`) ON DELETE NO ACTION ON UPDATE NO ACTION;
