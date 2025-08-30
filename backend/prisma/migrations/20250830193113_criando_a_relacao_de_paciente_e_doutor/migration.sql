/*
  Warnings:

  - You are about to drop the column `update_at` on the `paciente` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `paciente` table. All the data in the column will be lost.
  - Added the required column `doutor_id` to the `Paciente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paciente_id` to the `Paciente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `paciente` DROP FOREIGN KEY `Paciente_usuario_id_fkey`;

-- DropIndex
DROP INDEX `Paciente_usuario_id_fkey` ON `paciente`;

-- AlterTable
ALTER TABLE `paciente` DROP COLUMN `update_at`,
    DROP COLUMN `usuario_id`,
    ADD COLUMN `doutor_id` INTEGER NOT NULL,
    ADD COLUMN `paciente_id` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Paciente` ADD CONSTRAINT `Paciente_paciente_id_fkey` FOREIGN KEY (`paciente_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paciente` ADD CONSTRAINT `Paciente_doutor_id_fkey` FOREIGN KEY (`doutor_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
