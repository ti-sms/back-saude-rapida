-- CreateTable
CREATE TABLE `address` (
    `addressId` INTEGER NOT NULL AUTO_INCREMENT,
    `addressStreet` VARCHAR(60) NULL,
    `addressDistrict` VARCHAR(45) NULL,
    `addressNumer` VARCHAR(10) NULL,
    `addressCity` VARCHAR(45) NULL,
    `addressState` VARCHAR(45) NULL DEFAULT 'CE',
    `addressCep` VARCHAR(45) NULL,

    UNIQUE INDEX `addressId_UNIQUE`(`addressId`),
    PRIMARY KEY (`addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `car` (
    `carId` INTEGER NOT NULL AUTO_INCREMENT,
    `carName` VARCHAR(100) NOT NULL,
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
CREATE TABLE `generalconfig` (
    `idgeneralConfig` INTEGER NOT NULL AUTO_INCREMENT,
    `logoImage` VARCHAR(45) NULL,
    `useCoordinatorCollaboratorId` INTEGER NOT NULL,
    `address_addressId` INTEGER NOT NULL,

    UNIQUE INDEX `idgeneralConfig_UNIQUE`(`idgeneralConfig`),
    INDEX `fk_generalConfig_address1_idx`(`address_addressId`),
    PRIMARY KEY (`idgeneralConfig`, `address_addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hospital` (
    `hospitalId` INTEGER NOT NULL AUTO_INCREMENT,
    `hospitalName` VARCHAR(45) NULL,
    `hospitalDescription` LONGTEXT NULL,
    `address_addressId` INTEGER NOT NULL,

    UNIQUE INDEX `hospitalId_UNIQUE`(`hospitalId`),
    INDEX `fk_hospital_address1_idx`(`address_addressId`),
    PRIMARY KEY (`hospitalId`, `address_addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `local` (
    `localId` INTEGER NOT NULL AUTO_INCREMENT,
    `localName` VARCHAR(45) NULL,
    `address_addressId` INTEGER NOT NULL,

    UNIQUE INDEX `localId_UNIQUE`(`localId`),
    INDEX `fk_local_address1_idx`(`address_addressId`),
    PRIMARY KEY (`localId`, `address_addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location` (
    `locationId` INTEGER NOT NULL AUTO_INCREMENT,
    `locationDateTimeInitial` VARCHAR(45) NOT NULL,
    `locationDateTimeFinal` VARCHAR(45) NULL,
    `locationObservations` LONGTEXT NULL,
    `userPermission_driverPermissionId` INTEGER NOT NULL,
    `car_carId` INTEGER NOT NULL,
    `local_localId` INTEGER NOT NULL,

    UNIQUE INDEX `locationId_UNIQUE`(`locationId`),
    INDEX `fk_location_car1_idx`(`car_carId`),
    INDEX `fk_location_local1_idx`(`local_localId`),
    INDEX `fk_location_userPermission1_idx`(`userPermission_driverPermissionId`),
    PRIMARY KEY (`locationId`, `userPermission_driverPermissionId`, `car_carId`, `local_localId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patientspecify` (
    `patientSpecifyId` INTEGER NOT NULL AUTO_INCREMENT,
    `patientCompanyName` VARCHAR(45) NULL,
    `patientCompanyPhone` VARCHAR(45) NULL,
    `person_patientId` INTEGER NOT NULL,

    UNIQUE INDEX `patientSpecifyId_UNIQUE`(`patientSpecifyId`),
    INDEX `fk_patientSpecify_person1_idx`(`person_patientId`),
    PRIMARY KEY (`patientSpecifyId`, `person_patientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `person` (
    `patientId` INTEGER NOT NULL AUTO_INCREMENT,
    `personName` VARCHAR(100) NOT NULL,
    `personCpf` VARCHAR(45) NOT NULL,
    `personCNS` VARCHAR(45) NULL,
    `personPhone` VARCHAR(20) NULL,
    `address_addressId` INTEGER NOT NULL,

    UNIQUE INDEX `patientId_UNIQUE`(`patientId`),
    INDEX `fk_person_address1_idx`(`address_addressId`),
    PRIMARY KEY (`patientId`, `address_addressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trip` (
    `tripId` INTEGER NOT NULL AUTO_INCREMENT,
    `tripDateTimeStart` VARCHAR(45) NOT NULL,
    `tripDateTimeFinish` VARCHAR(45) NULL,
    `tripState` VARCHAR(45) NOT NULL,
    `car_carId` INTEGER NOT NULL,
    `userPermission_driverPermissionid` INTEGER NOT NULL,

    UNIQUE INDEX `tripId_UNIQUE`(`tripId`),
    INDEX `fk_trip_car1_idx`(`car_carId`),
    INDEX `fk_trip_userPermission1_idx`(`userPermission_driverPermissionid`),
    PRIMARY KEY (`tripId`, `car_carId`, `userPermission_driverPermissionid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `userEmail` VARCHAR(100) NOT NULL,
    `userPassword` VARCHAR(20) NOT NULL,
    `userSusKey` LONGTEXT NOT NULL,
    `userCollaboratorId` INTEGER NULL,

    UNIQUE INDEX `userId_UNIQUE`(`userId`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userpermission` (
    `userPermissionId` INTEGER NOT NULL AUTO_INCREMENT,
    `userPermissionType` VARCHAR(45) NOT NULL,
    `userType` VARCHAR(45) NOT NULL,
    `userStatus` TINYINT NOT NULL,
    `person_persontId` INTEGER NOT NULL,
    `user_userId` INTEGER NOT NULL,

    UNIQUE INDEX `userPermissionId_UNIQUE`(`userPermissionId`),
    INDEX `fk_userPermission_person1_idx`(`person_persontId`),
    INDEX `fk_userPermission_user1_idx`(`user_userId`),
    PRIMARY KEY (`userPermissionId`, `person_persontId`, `user_userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vacacionpatient` (
    `vacacionPatientId` INTEGER NOT NULL AUTO_INCREMENT,
    `forwardingImage` LONGTEXT NULL,
    `patienteHaveCourtJudicial` TINYINT NULL DEFAULT 0,
    `patientCourtJudicialCode` VARCHAR(45) NULL DEFAULT '0',
    `PatientHaveCompany` TINYINT NOT NULL DEFAULT 0,
    `CompanyName` VARCHAR(60) NULL,
    `companyPhone` VARCHAR(45) NULL,
    `userPermission_patientPermissionId` INTEGER NOT NULL,
    `hospital_hospitalId` INTEGER NOT NULL,
    `trip_tripId` INTEGER NOT NULL,

    UNIQUE INDEX `vacacionPatientId_UNIQUE`(`vacacionPatientId`),
    INDEX `fk_vacacionPatient_hospital1_idx`(`hospital_hospitalId`),
    INDEX `fk_vacacionPatient_trip1_idx`(`trip_tripId`),
    INDEX `fk_vacacionPatient_userPermission1_idx`(`userPermission_patientPermissionId`),
    PRIMARY KEY (`vacacionPatientId`, `userPermission_patientPermissionId`, `hospital_hospitalId`, `trip_tripId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
