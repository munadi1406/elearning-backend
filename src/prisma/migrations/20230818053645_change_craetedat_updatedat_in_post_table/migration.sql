/*
  Warnings:

  - You are about to alter the column `fromDate` on the `tugas` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `toDate` on the `tugas` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `post` MODIFY `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    MODIFY `updated_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6);

-- AlterTable
ALTER TABLE `tugas` MODIFY `fromDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `toDate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
