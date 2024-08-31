/*
  Warnings:

  - You are about to drop the `MediumQuestion` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "QuestionStatus" AS ENUM ('EASY', 'MEDIUM', 'DIFFICULT');

-- DropTable
DROP TABLE "MediumQuestion";
