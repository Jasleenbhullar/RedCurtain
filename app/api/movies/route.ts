import { NextResponse } from "next/server";
import clientPromise from '../../../utils/mongodb';


export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("movie-app");

    const body = await request.json();

    const movie = {
      id: body.id,
      title: body.title,
      poster: body.poster,
      description: body.description,
      rating: body.rating,
      releaseDate: body.releaseDate ?? null,
      genre: body.genre ?? null,
      language: body.language ?? null,
    };

    const result = await db.collection("movies").insertOne(movie);

    return NextResponse.json({ message: "Movie added successfully", movieId: result.insertedId });
  } catch (err: any) {
    console.error("POST /api/movies error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Use POST to add movies." });
}
