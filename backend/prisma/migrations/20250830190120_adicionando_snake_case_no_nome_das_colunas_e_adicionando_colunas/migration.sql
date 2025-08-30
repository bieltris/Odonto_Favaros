/*
  Warnings:

  - You are about to drop the column `createdAt` on the `agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `dataHora` on the `agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `pacienteId` on the `agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `procedimentoId` on the `agendamento` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `paciente` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `paciente` table. All the data in the column will be lost.
  - Added the required column `data_hora` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doutor` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paciente_id` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `procedimento_id` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `Paciente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relatorio` to the `Procedimento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `agendamento` DROP FOREIGN KEY `Agendamento_pacienteId_fkey`;

-- DropForeignKey
ALTER TABLE `agendamento` DROP FOREIGN KEY `Agendamento_procedimentoId_fkey`;

-- DropIndex
DROP INDEX `Agendamento_pacienteId_fkey` ON `agendamento`;

-- DropIndex
DROP INDEX `Agendamento_procedimentoId_fkey` ON `agendamento`;

-- AlterTable
ALTER TABLE `agendamento` DROP COLUMN `createdAt`,
    DROP COLUMN `dataHora`,
    DROP COLUMN `pacienteId`,
    DROP COLUMN `procedimentoId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `data_hora` DATETIME(3) NOT NULL,
    ADD COLUMN `doutor` VARCHAR(20) NOT NULL,
    ADD COLUMN `paciente_id` INTEGER NOT NULL,
    ADD COLUMN `procedimento_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `paciente` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `update_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `procedimento` ADD COLUMN `relatorio` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `Agendamento_paciente_id_fkey` FOREIGN KEY (`paciente_id`) REFERENCES `Paciente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agendamento` ADD CONSTRAINT `Agendamento_procedimento_id_fkey` FOREIGN KEY (`procedimento_id`) REFERENCES `Procedimento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
