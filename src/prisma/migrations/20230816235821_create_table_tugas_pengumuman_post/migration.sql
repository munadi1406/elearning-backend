/*
  Warnings:

  - You are about to alter the column `status_member` on the `coursemember` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `coursemember` MODIFY `status_member` ENUM('instruktur', 'member', 'asisten') NOT NULL;

-- CreateTable
CREATE TABLE `Post` (
    `id_post` INTEGER NOT NULL AUTO_INCREMENT,
    `id_course` INTEGER NOT NULL,
    `id_users` INTEGER NOT NULL,
    `judul` VARCHAR(100) NOT NULL,
    `typePost` ENUM('Pengumuman', 'Presensi', 'Kuis', 'Tugas') NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME NOT NULL,

    PRIMARY KEY (`id_post`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pengumuman` (
    `id_pengumuman` INTEGER NOT NULL AUTO_INCREMENT,
    `id_post` INTEGER NOT NULL,
    `konten` TEXT NOT NULL,

    PRIMARY KEY (`id_pengumuman`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tugas` (
    `id_tugas` INTEGER NOT NULL AUTO_INCREMENT,
    `id_post` INTEGER NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `fromDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `toDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `file` VARCHAR(255) NOT NULL,
    `accept` ENUM('Doc', 'Pdf', 'Ppt') NOT NULL,

    PRIMARY KEY (`id_tugas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_id_course_fkey` FOREIGN KEY (`id_course`) REFERENCES `Course`(`id_course`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_id_users_fkey` FOREIGN KEY (`id_users`) REFERENCES `Users`(`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pengumuman` ADD CONSTRAINT `Pengumuman_id_post_fkey` FOREIGN KEY (`id_post`) REFERENCES `Post`(`id_post`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tugas` ADD CONSTRAINT `Tugas_id_post_fkey` FOREIGN KEY (`id_post`) REFERENCES `Post`(`id_post`) ON DELETE CASCADE ON UPDATE CASCADE;
