-- CreateTable
CREATE TABLE "MediumQuestion" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "solution" JSONB NOT NULL,
    "option" JSONB NOT NULL,

    CONSTRAINT "MediumQuestion_pkey" PRIMARY KEY ("id")
);
