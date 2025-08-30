/*
  Warnings:

  - You are about to drop the column `email` on the `paciente` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `paciente` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `paciente` table. All the data in the column will be lost.
  - Added the required column `usuario_id` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Paciente_email_key` ON `paciente`;

-- AlterTable
ALTER TABLE `paciente` DROP COLUMN `email`,
    DROP COLUMN `nome`,
    DROP COLUMN `telefone`,
    ADD COLUMN `usuario_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `perfil_id` INTEGER NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `senha` VARCHAR(40) NOT NULL,
    `telefone` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Perfil` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `Perfil_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_perfil_id_fkey` FOREIGN KEY (`perfil_id`) REFERENCES `Perfil`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Paciente` ADD CONSTRAINT `Paciente_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
