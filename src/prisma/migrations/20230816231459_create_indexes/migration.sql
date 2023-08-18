-- CreateTable
CREATE TABLE `Users` (
    `id_users` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phoneNumber` VARCHAR(15) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    `refresh_token` TEXT NULL,
    `image` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'inactive',

    UNIQUE INDEX `Users_email_key`(`email`),
    INDEX `idx_username`(`username`),
    INDEX `idx_email`(`email`),
    PRIMARY KEY (`id_users`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
