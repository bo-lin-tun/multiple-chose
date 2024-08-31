-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "option" JSONB NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);
