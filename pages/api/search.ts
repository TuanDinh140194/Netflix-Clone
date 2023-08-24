import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req, res);
    const { q } = req.query;

    if (!q || typeof q !== "string") {
        return res.status(400).json({ error: "Invalid search query" });
    }

    const movies = await prismadb.movie.findMany({
      where: {
        title: {
            contains: q, // Use 'contains' filter to match titles containing the search query
            mode: "insensitive",
          },
      },
    });
    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}