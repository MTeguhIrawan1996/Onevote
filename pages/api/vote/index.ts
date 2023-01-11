import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";
import { code } from "../../../lib/code";
import { votes } from "@prisma/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) return res.status(404).json({ message: "Login dulu bos" });

  if (req.method === "POST") {
    const result = await prisma.votes.create({
      data: {
        title: req.body.title,
        candidate: req.body.candidate,
        startDateTime: req.body.startDateTime,
        endDateTime: req.body.endDateTime,
        publisher: req.body.publisher,
        code: code(6),
        deletedAt: null,
      },
    });
    return res.json(result);
  }

  // Get All By User

  if (req.method === "GET") {
    const result = await prisma.votes.findMany({
      where: {
        AND: [{ deletedAt: null }, { publisher: session?.user?.email! }],
      },
    });

    const response: Res<votes[]> = {
      status: 200,
      data: result,
    };

    return res.json(response);
  }

  return res.status(200).json({ data: "Hallo World" });
}
