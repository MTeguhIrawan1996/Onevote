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

  // Add Participant

  if (req.method === "POST") {
    const { candidate } = req.body;
    const result = await prisma.participant.create({
      data: {
        candidate,
        email: session?.user?.email!,
        code: code as string,
      },
    });

    return res.json(result);
  }

  // Get Participant Detail

  if (req.method === "GET") {
    const result = await prisma.participant.findFirst({
      where: {
        code: code as string,
        email: session?.user?.email!,
      },
    });

    const response = {
      status: 200,
      data: result,
    };

    return res.json(response);
  }
}
