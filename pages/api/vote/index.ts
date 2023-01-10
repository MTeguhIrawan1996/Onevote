import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) return res.status(404).json({ message: "Login dulu bos" });

  return res.status(200).json({ data: "Hallo World" });
}
