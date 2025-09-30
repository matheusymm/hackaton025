-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `age` DATE NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `verfifiedAccount` BOOLEAN NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserMetrics` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `lastLogginTime` DATETIME(3) NOT NULL,
    `lastAppUseTime` INTEGER NOT NULL,
    `lastContentType` VARCHAR(191) NULL,
    `lastContentCategory` VARCHAR(191) NULL,
    `videosWatched` INTEGER NOT NULL,

    UNIQUE INDEX `UserMetrics_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserMetrics` ADD CONSTRAINT `UserMetrics_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
