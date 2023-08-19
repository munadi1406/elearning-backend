-- CreateTable
CREATE TABLE `TugasSubmission` (
    `id_tugas_submission` INTEGER NOT NULL AUTO_INCREMENT,
    `id_tugas` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `submit_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `file` VARCHAR(255) NOT NULL,

    INDEX `TugasSubmission_id_user_id_tugas_idx`(`id_user`, `id_tugas`),
    UNIQUE INDEX `TugasSubmission_id_tugas_id_user_key`(`id_tugas`, `id_user`),
    PRIMARY KEY (`id_tugas_submission`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TugasSubmission` ADD CONSTRAINT `TugasSubmission_id_tugas_fkey` FOREIGN KEY (`id_tugas`) REFERENCES `Tugas`(`id_tugas`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TugasSubmission` ADD CONSTRAINT `TugasSubmission_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Users`(`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;
