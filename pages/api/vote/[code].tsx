import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../lib/prisma";
import { votes } from "@prisma/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Login dulu bos" });

  const { code } = req.query;

  // Get Detail By Code
  if (req.method === "GET") {
    const result = await prisma.votes.findFirst({
      select: {
        id: true,
        publisher: true,
        title: true,
        code: true,
        startDateTime: true,
        endDateTime: true,
        candidate: true,
        createdAt: true,
        deletedAt: true,
      },
      where: {
        code: code as string,
        deletedAt: null,
      },
    });

    if (!result) return res.status(404).json({ message: "Data not found" });

    const response: Response<votes> = {
      status: 200,
      data: result,
    };
    return res.json(response);
  }

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

  // Update By code
  if (req.method === "PUT") {
    try {
      const { title, candidate, endDateTime, startDateTime } = req.body;
      const result = await prisma.votes.update({
        where: {
          code: code as string,
        },
        data: {
          title,
          candidate,
          endDateTime,
          startDateTime,
        },
      });

      return res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "Something Wrong" });
    }
  }
}
