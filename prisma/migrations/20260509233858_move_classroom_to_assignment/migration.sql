/*
  Warnings:

  - You are about to drop the column `classRoomId` on the `class_schedules` table. All the data in the column will be lost.
  - Added the required column `classRoomId` to the `class_assignments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `class_schedules` DROP FOREIGN KEY `class_schedules_classRoomId_fkey`;

-- DropIndex
DROP INDEX `class_schedules_classRoomId_fkey` ON `class_schedules`;

-- AlterTable
ALTER TABLE `class_assignments` ADD COLUMN `classRoomId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `class_schedules` DROP COLUMN `classRoomId`;

-- AddForeignKey
ALTER TABLE `class_assignments` ADD CONSTRAINT `class_assignments_classRoomId_fkey` FOREIGN KEY (`classRoomId`) REFERENCES `classrooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
