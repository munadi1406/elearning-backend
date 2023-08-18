-- AlterTable
ALTER TABLE `otp` MODIFY `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updated_at` DATETIME(6) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `password` TEXT NOT NULL,
    MODIFY `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updated_at` DATETIME(6) NOT NULL;

-- CreateTable
CREATE TABLE `Course` (
    `id_course` INTEGER NOT NULL AUTO_INCREMENT,
    `id_users` INTEGER NOT NULL,
    `course` VARCHAR(40) NOT NULL,
    `desc_course` TEXT NOT NULL,
    `academy` VARCHAR(100) NOT NULL,
    `course_code` VARCHAR(50) NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL,

    INDEX `Course_course_code_idx`(`course_code`),
    PRIMARY KEY (`id_course`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CourseMember` (
    `id_member` INTEGER NOT NULL AUTO_INCREMENT,
    `id_course` INTEGER NOT NULL,
    `id_users` INTEGER NOT NULL,
    `status_member` BOOLEAN NOT NULL DEFAULT false,
    `join_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id_member`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_id_users_fkey` FOREIGN KEY (`id_users`) REFERENCES `Users`(`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseMember` ADD CONSTRAINT `CourseMember_id_course_fkey` FOREIGN KEY (`id_course`) REFERENCES `Course`(`id_course`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseMember` ADD CONSTRAINT `CourseMember_id_users_fkey` FOREIGN KEY (`id_users`) REFERENCES `Users`(`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;
