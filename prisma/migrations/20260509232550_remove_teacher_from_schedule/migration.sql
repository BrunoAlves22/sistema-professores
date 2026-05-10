/*
  Warnings:

  - You are about to drop the column `teacherId` on the `class_schedules` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `class_schedules` DROP FOREIGN KEY `class_schedules_teacherId_fkey`;

-- DropIndex
DROP INDEX `class_schedules_teacherId_fkey` ON `class_schedules`;

-- AlterTable
ALTER TABLE `class_schedules` DROP COLUMN `teacherId`;
