-- CreateTable
CREATE TABLE `Otp` (
    `id_otp` INTEGER NOT NULL AUTO_INCREMENT,
    `otp` VARCHAR(20) NOT NULL,
    `otp_expires` DATETIME(6) NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME NOT NULL,
    `id_users` INTEGER NOT NULL,

    INDEX `Otp_otp_idx`(`otp`),
    PRIMARY KEY (`id_otp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Otp` ADD CONSTRAINT `Otp_id_users_fkey` FOREIGN KEY (`id_users`) REFERENCES `Users`(`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;
