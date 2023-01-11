import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Login dulu bos" });

  const { code } = req.query;

  // Get Detail By Code

  // Delete By Code
  if (req.method === "DELETE") {
    try {
      const result = await prisma.votes.update({
        where: {
          code: code as string,
        },
        data: {
          deletedAt: new Date().toString(),
        },
      });

      return res.status(200).json({ result });
    } catch (err) {
      res.status(500).json({ message: "error" });
    }
  }
}
