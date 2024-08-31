// pages/api/question.ts
import { prisma } from "@/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "GET") {
    try {
      const question = await prisma.question.findMany();
      return res.status(200).json({ question });
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch questions" });
    }
  }

  if (method === "POST") {
    const {  name, answer, option, solution, status } = req.body;

    const isValid = name && answer && option && status;

    if (!isValid) return res.status(400).send("Bad Request");

    try {
      const question = await prisma.question.create({
        data: { name, option, answer, solution, status },
      });
      return res.status(200).send({ question });
    } catch (err) {
      return res.status(500).json({ error: "Failed to create question" });
    }
  } else if (method === "PUT") {
    const { id, name, answer, option, solution, status } = req.body;

    const isValid = id && name && answer && option && status;

    if (!isValid) return res.status(400).send("Bad Request");
    const exit = await prisma.question.findFirst({ where: { id } });
    if (!exit) res.status(500).json("Bead Request");

    try {
      const question = await prisma.question.update({
        data: { name, option, answer, solution, status },
        where: { id },
      });

      return res.status(200).send({ question });
    } catch (err) {
      return res.status(500).json({ error: "Failed to update question" });
    }
  } else if (method === "DELETE") {
    const { id } = req.body;
    console.log("questionID", id);

    const isValid = typeof id === 'number';
    // // console.log("idValid", isValid);
     if (!isValid) return res.status(400).send("Bad Request");
    const exit = await prisma.question.findUnique({ where: { id: id } });
    console.log(exit);

    if (!exit) res.status(500).json("Not found");

    try {
      await prisma.question.delete({ where: { id: id } });
    } catch (err) {
      return res.status(500).json({ error: "Failed to delete question" });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "PUT","DELETE"]);
  res.status(405).end(`Method ${method} Not Allowed`);
}
