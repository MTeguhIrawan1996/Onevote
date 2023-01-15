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
  if (req.method === "GET") {
    const votes = await prisma.votes.findFirst({
      select: {
        id: true,
        publisher: true,
        title: true,
        code: true,
        startDateTime: true,
        endDateTime: true,
        candidate: true,
        createdAt: true,
        deletedAt: false,
      },
      where: {
        code: code as string,
        publisher: session?.user?.email!,
        deletedAt: null,
      },
    });

    if (!votes) return res.status(404).json({ message: "Data not found" });

    const participants = await prisma.participant.findMany({
      select: {
        candidate: true,
        email: true,
        createdAt: true,
      },
      where: {
        code: code as string,
      },
    });

    // /* Count Vote */

    var candidates: Candidate[] = [];

    if (participants) {
      candidates = votes?.candidate.map((candidate) => {
        const vote =
          participants.filter(
            (participant) => participant.candidate === candidate.name
          ).length || 0;
        return { ...candidate, vote };
      }) as Candidate[];
    }

    const result = {
      id: votes?.id,
      publisher: votes?.publisher,
      title: votes?.title,
      code: votes?.code,
      candidate: candidates,
      startDateTime: String(votes?.startDateTime),
      endDateTime: String(votes?.endDateTime),
      createdAt: String(votes?.createdAt),
      totalVotes: candidates
        ? candidates?.reduce(
            (acc, candidate) => acc + (candidate.vote ? candidate.vote : 0),
            0
          )
        : 0,
    } as Votes;

    const response = {
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

  // // Update By code
  // if (req.method === "PUT") {
  //   try {
  //     const { title, candidate, endDateTime, startDateTime } = req.body;

  //     const result = await prisma.votes.update({
  //       where: {
  //         code: code as string,
  //       },
  //       data: {
  //         title,
  //         candidate,
  //         endDateTime,
  //         startDateTime,
  //       },
  //     });

  //     return res.status(200).json(result);
  //   } catch (err) {
  //     res.status(500).json({ message: "Something Wrong" });
  //   }
  // }
}
