/*
  Warnings:

  - You are about to drop the column `subject` on the `class_schedules` table. All the data in the column will be lost.
  - Added the required column `lessonNumber` to the `class_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `class_schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `class_schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `teachers_email_key` ON `teachers`;

-- AlterTable
ALTER TABLE `class_schedules` DROP COLUMN `subject`,
    ADD COLUMN `lessonNumber` INTEGER NOT NULL,
    ADD COLUMN `period` ENUM('MORNING', 'AFTERNOON') NOT NULL,
    ADD COLUMN `teacherId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `teachers` ADD COLUMN `subject` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `class_schedules` ADD CONSTRAINT `class_schedules_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `teachers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `admin` RENAME INDEX `Admin_email_key` TO `admin_email_key`;
